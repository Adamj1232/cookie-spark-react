import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useOrdering } from "@/features/ordering/context/OrderingProvider";
import type { CookieMenuItem } from "@/features/ordering/types";
import { formatCurrency } from "@/features/ordering/validation";

type ProductCardProps = {
  product: CookieMenuItem;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const { cartModel, setCartOpen } = useOrdering();
  const [quantity, setQuantity] = useState(1);
  const firstAvailableVariant = product.variants.find((variant) => variant.availableForSale) || product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailableVariant?.id || "");

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === variantId) || firstAvailableVariant,
    [firstAvailableVariant, product.variants, variantId],
  );

  const canAdd = Boolean(
    selectedVariant && selectedVariant.availableForSale && cartModel.isConfigured && !cartModel.isMutating,
  );

  const addToCart = async () => {
    if (!selectedVariant) {
      return;
    }

    const nextCart = await cartModel.addItem(selectedVariant.id, quantity);

    if (!nextCart) {
      toast({
        title: "Unable to add cookie",
        description: cartModel.error || "Please try again.",
      });
      return;
    }

    toast({
      title: `${product.title} added`,
      description: `${quantity} x ${selectedVariant.label} added to your cart.`,
    });

    setCartOpen(true);
    setQuantity(1);
  };

  return (
    <Card className="h-full border-cookie-brown/15 shadow-sm">
      <CardHeader className="pb-3">
        <div className="aspect-[4/3] rounded-lg bg-cookie-cream/80 p-4">
          <img
            alt={product.title}
            className="h-full w-full rounded-md object-contain"
            loading="lazy"
            src={product.image}
          />
        </div>
        <div className="flex items-start justify-between gap-3 pt-3">
          <CardTitle className="text-xl text-cookie-brown">{product.title}</CardTitle>
          {product.isSeasonal ? <Badge variant="secondary">Seasonal</Badge> : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="min-h-12 text-sm text-foreground/80">{product.description}</p>

        <div className="flex flex-wrap gap-2">
          {product.allergens.map((allergen) => (
            <Badge className="bg-cookie-cream text-cookie-brown" key={allergen} variant="outline">
              {allergen}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-cookie-brown" htmlFor={`variant-${product.id}`}>
            Box size
          </label>
          <Select onValueChange={setVariantId} value={selectedVariant?.id}>
            <SelectTrigger className="border-cookie-brown/30" id={`variant-${product.id}`}>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((variant) => (
                <SelectItem key={variant.id} value={variant.id}>
                  {variant.label} · {formatCurrency(variant.price)}
                  {variant.availableForSale ? "" : " (Unavailable)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between rounded-md border border-cookie-brown/20 p-2">
          <span className="text-sm font-semibold text-cookie-brown">Quantity</span>
          <div className="flex items-center gap-3">
            <Button
              aria-label={`Decrease ${product.title} quantity`}
              className="h-9 w-9"
              disabled={quantity === 1}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              size="icon"
              variant="outline"
            >
              -
            </Button>
            <span className="w-6 text-center text-sm font-bold">{quantity}</span>
            <Button
              aria-label={`Increase ${product.title} quantity`}
              className="h-9 w-9"
              onClick={() => setQuantity((current) => Math.min(24, current + 1))}
              size="icon"
              variant="outline"
            >
              +
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-3">
        <Button
          className="h-11 rounded-full bg-primary text-primary-foreground"
          disabled={!canAdd}
          onClick={addToCart}
        >
          {cartModel.isConfigured ? "Add to cart" : "Checkout setup in progress"}
        </Button>
        {selectedVariant ? (
          <p className="text-center text-xs text-foreground/70">Starting at {formatCurrency(selectedVariant.price)}</p>
        ) : null}
      </CardFooter>
    </Card>
  );
};
