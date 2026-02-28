import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useCart } from "@/features/ordering/hooks/useCart";

interface OrderingContextValue {
  cartOpen: boolean;
  setCartOpen: (value: boolean) => void;
  toggleCart: () => void;
  cartModel: ReturnType<typeof useCart>;
}

const OrderingContext = createContext<OrderingContextValue | null>(null);

export const OrderingProvider = ({ children }: { children: ReactNode }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartModel = useCart();

  const value = useMemo(
    () => ({
      cartOpen,
      setCartOpen,
      toggleCart: () => setCartOpen((previous) => !previous),
      cartModel,
    }),
    [cartModel, cartOpen],
  );

  return <OrderingContext.Provider value={value}>{children}</OrderingContext.Provider>;
};

export const useOrdering = () => {
  const context = useContext(OrderingContext);

  if (!context) {
    throw new Error("useOrdering must be used within OrderingProvider");
  }

  return context;
};
