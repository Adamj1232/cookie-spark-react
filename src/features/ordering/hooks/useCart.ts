import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addCartLine,
  createCart,
  fetchCart,
  removeCartLine,
  updateCartAttributes,
  updateCartLine,
} from "@/features/ordering/api/queries";
import { isShopifyConfigured } from "@/features/ordering/api/shopifyClient";
import { SHOPIFY_CART_STORAGE_KEY } from "@/features/ordering/config";
import type { CartState, FulfillmentSelection } from "@/features/ordering/types";
import {
  getMinimumFulfillmentDate,
  isDeliveryZipSupported,
  isFulfillmentDateValid,
  normalizeZip,
} from "@/features/ordering/validation";

const EMPTY_CART: CartState = {
  id: "",
  checkoutUrl: "",
  subtotal: 0,
  totalQuantity: 0,
  lines: [],
  attributes: {},
};

const defaultSelection = (): FulfillmentSelection => ({
  mode: "pickup",
  requestedDate: getMinimumFulfillmentDate(),
});

export const useCart = () => {
  const [cart, setCart] = useState<CartState>(EMPTY_CART);
  const [selection, setSelection] = useState<FulfillmentSelection>(defaultSelection);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persistCartId = (cartId: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SHOPIFY_CART_STORAGE_KEY, cartId);
    }
  };

  const getStoredCartId = () => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(SHOPIFY_CART_STORAGE_KEY);
  };

  const hydrateSelectionFromCart = useCallback((nextCart: CartState) => {
    setSelection((previous) => ({
      mode: nextCart.attributes.fulfillment_mode === "delivery" ? "delivery" : previous.mode,
      requestedDate: nextCart.attributes.requested_date || previous.requestedDate,
      zip: nextCart.attributes.delivery_zip || previous.zip,
    }));
  }, []);

  const initCart = useCallback(async () => {
    if (!isShopifyConfigured) {
      setError("Ordering is visible, but checkout is not connected yet.");
      setIsInitializing(false);
      return;
    }

    try {
      const storedCartId = getStoredCartId();

      const nextCart = storedCartId ? await fetchCart(storedCartId) : await createCart();

      setCart(nextCart);
      hydrateSelectionFromCart(nextCart);
      persistCartId(nextCart.id);
      setError(null);
    } catch {
      try {
        const freshCart = await createCart();
        setCart(freshCart);
        hydrateSelectionFromCart(freshCart);
        persistCartId(freshCart.id);
        setError(null);
      } catch {
        setError("Ordering is temporarily unavailable. Please try again shortly.");
      }
    } finally {
      setIsInitializing(false);
    }
  }, [hydrateSelectionFromCart]);

  useEffect(() => {
    void initCart();
  }, [initCart]);

  const ensureCartId = useCallback(async () => {
    if (!isShopifyConfigured) {
      throw new Error("Checkout is not configured.");
    }

    if (cart.id) {
      return cart.id;
    }

    const freshCart = await createCart();
    setCart(freshCart);
    persistCartId(freshCart.id);
    return freshCart.id;
  }, [cart.id]);

  const withCartMutation = useCallback(
    async (operation: () => Promise<CartState>) => {
      if (isMutating) {
        return null;
      }

      setIsMutating(true);
      try {
        const nextCart = await operation();
        setCart(nextCart);
        return nextCart;
      } catch (mutationError) {
        const message = mutationError instanceof Error ? mutationError.message : "Unable to update your cart.";
        setError(message);
        return null;
      } finally {
        setIsMutating(false);
      }
    },
    [isMutating],
  );

  const addItem = useCallback(
    async (merchandiseId: string, quantity: number) => {
      if (!isShopifyConfigured) {
        setError("Checkout is not connected yet. Add Shopify env values to enable purchasing.");
        return null;
      }

      const cartId = await ensureCartId();
      return withCartMutation(() => addCartLine(cartId, merchandiseId, quantity));
    },
    [ensureCartId, withCartMutation],
  );

  const setLineQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart.id) {
        return null;
      }

      if (quantity <= 0) {
        return withCartMutation(() => removeCartLine(cart.id, lineId));
      }

      return withCartMutation(() => updateCartLine(cart.id, lineId, quantity));
    },
    [cart.id, withCartMutation],
  );

  const deleteLine = useCallback(
    async (lineId: string) => {
      if (!cart.id) {
        return null;
      }

      return withCartMutation(() => removeCartLine(cart.id, lineId));
    },
    [cart.id, withCartMutation],
  );

  const saveFulfillment = useCallback(
    async (nextSelection: FulfillmentSelection) => {
      const normalizedZip = normalizeZip(nextSelection.zip || "");
      const validatedSelection: FulfillmentSelection = {
        ...nextSelection,
        zip: normalizedZip || undefined,
      };

      // Keep form inputs responsive even while selection is invalid.
      setSelection(validatedSelection);

      if (!isFulfillmentDateValid(validatedSelection.requestedDate)) {
        setError("Please choose a fulfillment date at least 24 hours in advance.");
        return null;
      }

      if (validatedSelection.mode === "delivery") {
        if (normalizedZip.length < 5) {
          setError("Enter a 5-digit ZIP code to confirm delivery eligibility.");
          return null;
        }

        if (!isDeliveryZipSupported(normalizedZip)) {
          setError("Delivery is only available for select Arvada and Denver ZIP codes.");
          return null;
        }
      }

      setError(null);

      if (!cart.id || !isShopifyConfigured) {
        return null;
      }

      return withCartMutation(() =>
        updateCartAttributes(cart.id, [
          { key: "fulfillment_mode", value: validatedSelection.mode },
          { key: "requested_date", value: validatedSelection.requestedDate },
          { key: "delivery_zip", value: validatedSelection.mode === "delivery" ? normalizedZip : "" },
        ]),
      );
    },
    [cart.id, withCartMutation],
  );

  const checkoutBlockedReason = useMemo(() => {
    if (!isShopifyConfigured) {
      return "Checkout is not connected yet.";
    }

    if (!cart.checkoutUrl || !cart.lines.length) {
      return "Add cookies to your cart to continue.";
    }

    if (!isFulfillmentDateValid(selection.requestedDate)) {
      return "Select a valid requested date.";
    }

    if (selection.mode === "delivery" && !isDeliveryZipSupported(selection.zip || "")) {
      return "Enter a supported delivery ZIP code.";
    }

    return null;
  }, [cart.checkoutUrl, cart.lines.length, selection.mode, selection.requestedDate, selection.zip]);

  const clearError = useCallback(() => setError(null), []);

  return {
    cart,
    selection,
    isConfigured: isShopifyConfigured,
    isInitializing,
    isMutating,
    error,
    checkoutBlockedReason,
    addItem,
    setLineQuantity,
    deleteLine,
    saveFulfillment,
    clearError,
  };
};
