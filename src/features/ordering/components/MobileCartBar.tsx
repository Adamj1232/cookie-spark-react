import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOrdering } from "@/features/ordering/context/OrderingProvider";
import { formatCurrency } from "@/features/ordering/validation";

export const MobileCartBar = () => {
  const isMobile = useIsMobile();
  const { cartModel, setCartOpen } = useOrdering();

  if (!isMobile || cartModel.cart.totalQuantity <= 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cookie-brown/20 bg-background/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div>
          <p className="text-xs text-foreground/70">{cartModel.cart.totalQuantity} item(s)</p>
          <p className="text-sm font-bold text-cookie-brown">{formatCurrency(cartModel.cart.subtotal)}</p>
        </div>
        <Button className="rounded-full px-6" onClick={() => setCartOpen(true)}>
          View cart
        </Button>
      </div>
    </div>
  );
};
