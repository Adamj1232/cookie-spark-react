export type FulfillmentMode = "pickup" | "delivery";

export interface CookieVariant {
  id: string;
  label: "6-pack" | "12-pack";
  price: number;
  availableForSale: boolean;
}

export interface CookieMenuItem {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
  allergens: string[];
  isSeasonal: boolean;
  variants: CookieVariant[];
}

export interface CartLine {
  id: string;
  merchandiseId: string;
  productTitle: string;
  variantTitle: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartState {
  id: string;
  checkoutUrl: string;
  subtotal: number;
  totalQuantity: number;
  lines: CartLine[];
  attributes: Record<string, string>;
}

export interface FulfillmentSelection {
  mode: FulfillmentMode;
  zip?: string;
  requestedDate: string;
}

export interface ShopifyCartAttribute {
  key: string;
  value: string;
}
