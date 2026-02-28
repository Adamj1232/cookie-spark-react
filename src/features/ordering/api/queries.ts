import {
  ALLERGEN_LABELS,
  ALLERGEN_TAG_PREFIX,
  FALLBACK_MENU_ITEMS,
  HOMEPAGE_COLLECTION_HANDLE,
  MENU_HANDLES,
  SEASONAL_COOKIE_HANDLES,
} from "@/features/ordering/config";
import { isShopifyConfigured, shopifyRequest } from "@/features/ordering/api/shopifyClient";
import type {
  CartState,
  CookieMenuItem,
  CookieVariant,
  ShopifyCartAttribute,
} from "@/features/ordering/types";

const MENU_QUERY = `
  query MenuProducts($handle: String!) {
    collectionByHandle(handle: $handle) {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            tags
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
      }
    }
    totalQuantity
    attributes {
      key
      value
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            amountPerQuantity {
              amount
            }
            totalAmount {
              amount
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
              }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartCreate($attributes: [AttributeInput!]) {
    cartCreate(input: { attributes: $attributes }) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
`;

const CART_QUERY = `
  ${CART_FRAGMENT}
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
`;

const CART_ATTRIBUTES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}
  mutation CartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) {
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart {
        ...CartFields
      }
      userErrors {
        message
      }
    }
  }
`;

type ProductEdge = { node: ShopifyProductNode };

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description?: string;
  tags: string[];
  images: { edges: Array<{ node: { url: string } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string };
      };
    }>;
  };
}

interface ShopifyMenuResponse {
  collectionByHandle: {
    products: {
      edges: ProductEdge[];
    };
  } | null;
}

interface ShopifyUserError {
  message: string;
}

interface ShopifyCartLineNode {
  id: string;
  quantity: number;
  cost: {
    amountPerQuantity: { amount: string };
    totalAmount: { amount: string };
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
    };
  };
}

interface ShopifyCartNode {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: { amount: string };
  };
  totalQuantity: number;
  attributes: ShopifyCartAttribute[];
  lines: {
    edges: Array<{ node: ShopifyCartLineNode }>;
  };
}

interface ShopifyCartPayload {
  cart: ShopifyCartNode;
  userErrors: ShopifyUserError[];
}

interface ShopifyCartCreateResponse {
  cartCreate: ShopifyCartPayload;
}

interface ShopifyCartQueryResponse {
  cart: ShopifyCartNode | null;
}

interface ShopifyCartLinesAddResponse {
  cartLinesAdd: ShopifyCartPayload;
}

interface ShopifyCartLinesUpdateResponse {
  cartLinesUpdate: ShopifyCartPayload;
}

interface ShopifyCartLinesRemoveResponse {
  cartLinesRemove: ShopifyCartPayload;
}

interface ShopifyCartAttributesUpdateResponse {
  cartAttributesUpdate: ShopifyCartPayload;
}

const toVariantLabel = (value: string): CookieVariant["label"] => {
  const lowerValue = value.toLowerCase();
  if (lowerValue.includes("12")) {
    return "12-pack";
  }
  return "6-pack";
};

const parseAllergens = (tags: string[]) => {
  const allergenTags = tags
    .filter((tag) => tag.startsWith(ALLERGEN_TAG_PREFIX))
    .map((tag) => tag.replace(ALLERGEN_TAG_PREFIX, "").toLowerCase())
    .map((tag) => ALLERGEN_LABELS[tag])
    .filter(Boolean);

  if (allergenTags.length) {
    return [...new Set(allergenTags)];
  }

  return ["Contains dairy", "Contains wheat", "Contains egg"];
};

const mapProduct = (node: ShopifyProductNode): CookieMenuItem => {
  const variants: CookieVariant[] = node.variants.edges.map((edge) => ({
    id: edge.node.id,
    label: toVariantLabel(edge.node.title),
    price: Number(edge.node.price.amount),
    availableForSale: edge.node.availableForSale,
  }));

  const sortedVariants = variants
    .sort((a, b) => (a.label === "6-pack" ? -1 : 1))
    .slice(0, 2);

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description || "Small-batch cookie, baked to order.",
    image: node.images.edges[0]?.node.url ?? FALLBACK_MENU_ITEMS[0].image,
    allergens: parseAllergens(node.tags || []),
    isSeasonal: SEASONAL_COOKIE_HANDLES.includes(node.handle as (typeof SEASONAL_COOKIE_HANDLES)[number]),
    variants: sortedVariants,
  };
};

const buildFixedMenu = (products: CookieMenuItem[]) => {
  const byHandle = new Map(products.map((product) => [product.handle, product]));

  return MENU_HANDLES.map((handle) => byHandle.get(handle) || FALLBACK_MENU_ITEMS.find((item) => item.handle === handle))
    .filter(Boolean)
    .slice(0, 6) as CookieMenuItem[];
};

const assertNoUserErrors = (errors: Array<{ message: string }> | undefined) => {
  if (errors?.length) {
    throw new Error(errors[0].message || "Shopify mutation error");
  }
};

const mapCart = (cart: ShopifyCartNode): CartState => ({
  id: cart.id,
  checkoutUrl: cart.checkoutUrl,
  subtotal: Number(cart.cost.subtotalAmount.amount),
  totalQuantity: cart.totalQuantity,
  lines: cart.lines.edges.map((edge) => ({
    id: edge.node.id,
    merchandiseId: edge.node.merchandise.id,
    productTitle: edge.node.merchandise.product.title,
    variantTitle: edge.node.merchandise.title,
    quantity: edge.node.quantity,
    unitPrice: Number(edge.node.cost.amountPerQuantity.amount),
    totalPrice: Number(edge.node.cost.totalAmount.amount),
  })),
  attributes: (cart.attributes || []).reduce((acc: Record<string, string>, attribute: ShopifyCartAttribute) => {
    if (attribute.key) {
      acc[attribute.key] = attribute.value;
    }
    return acc;
  }, {}),
});

export const fetchCookieMenuProducts = async () => {
  if (!isShopifyConfigured) {
    return FALLBACK_MENU_ITEMS;
  }

  const data = await shopifyRequest<ShopifyMenuResponse>(MENU_QUERY, {
    handle: HOMEPAGE_COLLECTION_HANDLE,
  });

  const edges = data.collectionByHandle?.products?.edges || [];

  if (!edges.length) {
    throw new Error(
      `No products found in Shopify collection "${HOMEPAGE_COLLECTION_HANDLE}".`,
    );
  }

  const mappedProducts = edges.map((edge) => mapProduct(edge.node));
  return buildFixedMenu(mappedProducts);
};

export const createCart = async (attributes: ShopifyCartAttribute[] = []) => {
  const data = await shopifyRequest<ShopifyCartCreateResponse>(CART_CREATE_MUTATION, {
    attributes,
  });

  assertNoUserErrors(data.cartCreate.userErrors);
  return mapCart(data.cartCreate.cart);
};

export const fetchCart = async (cartId: string) => {
  const data = await shopifyRequest<ShopifyCartQueryResponse>(CART_QUERY, { cartId });

  if (!data.cart) {
    throw new Error("Cart could not be loaded.");
  }

  return mapCart(data.cart);
};

export const addCartLine = async (cartId: string, merchandiseId: string, quantity: number) => {
  const data = await shopifyRequest<ShopifyCartLinesAddResponse>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ merchandiseId, quantity }],
  });

  assertNoUserErrors(data.cartLinesAdd.userErrors);
  return mapCart(data.cartLinesAdd.cart);
};

export const updateCartLine = async (cartId: string, lineId: string, quantity: number) => {
  const data = await shopifyRequest<ShopifyCartLinesUpdateResponse>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  assertNoUserErrors(data.cartLinesUpdate.userErrors);
  return mapCart(data.cartLinesUpdate.cart);
};

export const removeCartLine = async (cartId: string, lineId: string) => {
  const data = await shopifyRequest<ShopifyCartLinesRemoveResponse>(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  assertNoUserErrors(data.cartLinesRemove.userErrors);
  return mapCart(data.cartLinesRemove.cart);
};

export const updateCartAttributes = async (cartId: string, attributes: ShopifyCartAttribute[]) => {
  const data = await shopifyRequest<ShopifyCartAttributesUpdateResponse>(CART_ATTRIBUTES_UPDATE_MUTATION, {
    cartId,
    attributes,
  });

  assertNoUserErrors(data.cartAttributesUpdate.userErrors);
  return mapCart(data.cartAttributesUpdate.cart);
};
