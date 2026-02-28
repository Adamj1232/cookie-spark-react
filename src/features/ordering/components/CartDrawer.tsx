import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useOrdering } from "@/features/ordering/context/OrderingProvider";
import { FulfillmentSelector } from "@/features/ordering/components/FulfillmentSelector";
import { AllergenNotice } from "@/features/ordering/components/AllergenNotice";
import { formatCurrency } from "@/features/ordering/validation";
import { useToast } from "@/hooks/use-toast";

export const CartDrawer = () => {
  const { toast } = useToast();
  const { cartOpen, setCartOpen, cartModel } = useOrdering();

  const checkout = () => {
    if (cartModel.checkoutBlockedReason) {
      toast({
        title: "Checkout unavailable",
        description: cartModel.checkoutBlockedReason,
      });
      return;
    }

    window.location.href = cartModel.cart.checkoutUrl;
  };

  return (
    <Sheet onOpenChange={setCartOpen} open={cartOpen}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg" side="right">
        <SheetHeader>
          <SheetTitle className="font-heading text-cookie-brown">Your Cookie Cart</SheetTitle>
          <SheetDescription>
            Secure checkout powered by Shopify. Shop Pay, Apple Pay, and Google Pay available.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          {cartModel.cart.lines.length ? (
            <div className="space-y-4">
              {cartModel.cart.lines.map((line) => (
                <div className="rounded-md border border-cookie-brown/15 p-3" key={line.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-cookie-brown">{line.productTitle}</p>
                      <p className="text-sm text-foreground/70">{line.variantTitle}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatCurrency(line.totalPrice)}</p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        disabled={cartModel.isMutating || line.quantity <= 1}
                        onClick={() => void cartModel.setLineQuantity(line.id, line.quantity - 1)}
                        size="icon"
                        variant="outline"
                      >
                        -
                      </Button>
                      <span className="w-7 text-center text-sm font-semibold">{line.quantity}</span>
                      <Button
                        disabled={cartModel.isMutating}
                        onClick={() => void cartModel.setLineQuantity(line.id, line.quantity + 1)}
                        size="icon"
                        variant="outline"
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      className="text-xs"
                      disabled={cartModel.isMutating}
                      onClick={() => void cartModel.deleteLine(line.id)}
                      size="sm"
                      variant="ghost"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-md border border-dashed border-cookie-brown/30 p-5 text-sm text-foreground/75">
              Your cart is empty. Add a cookie box from the menu to start your order.
            </p>
          )}

          <FulfillmentSelector
            onChange={(nextSelection) => {
              void cartModel.saveFulfillment(nextSelection);
            }}
            value={cartModel.selection}
          />

          <AllergenNotice />

          <div className="space-y-2 text-xs text-foreground/70">
            <p>
              By checking out, you agree to our <Link className="underline" to="/terms">Terms</Link>,{" "}
              <Link className="underline" to="/privacy">Privacy Policy</Link>, and{" "}
              <Link className="underline" to="/refunds">Refund/Cancellation Policy</Link>.
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-cookie-brown">Subtotal</span>
            <span className="text-lg font-bold">{formatCurrency(cartModel.cart.subtotal)}</span>
          </div>

          {cartModel.error ? <p className="text-sm text-destructive">{cartModel.error}</p> : null}

          <Button
            className="h-11 w-full rounded-full"
            disabled={Boolean(cartModel.checkoutBlockedReason) || cartModel.isMutating}
            onClick={checkout}
          >
            Continue to secure checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
