import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isDeliveryZipSupported, normalizeZip } from "@/features/ordering/validation";

type ZipEligibilityInputProps = {
  value?: string;
  onChange: (zip: string) => void;
};

export const ZipEligibilityInput = ({ value = "", onChange }: ZipEligibilityInputProps) => {
  const normalizedZip = normalizeZip(value);
  const hasInput = normalizedZip.length > 0;
  const isSupported = isDeliveryZipSupported(normalizedZip);

  return (
    <div className="space-y-2">
      <Label htmlFor="delivery-zip">Delivery ZIP</Label>
      <Input
        autoComplete="postal-code"
        id="delivery-zip"
        inputMode="numeric"
        maxLength={5}
        onChange={(event) => onChange(normalizeZip(event.target.value))}
        placeholder="80002"
        value={normalizedZip}
      />
      {hasInput ? (
        <p className={`text-xs ${isSupported ? "text-emerald-700" : "text-destructive"}`}>
          {isSupported ? "Delivery is available for this ZIP." : "Delivery unavailable in this ZIP. Pickup is still available."}
        </p>
      ) : (
        <p className="text-xs text-foreground/70">Delivery available in select Arvada and Denver ZIP codes.</p>
      )}
    </div>
  );
};
