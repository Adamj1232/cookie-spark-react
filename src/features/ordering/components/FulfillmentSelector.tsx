import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FulfillmentSelection } from "@/features/ordering/types";
import { getMinimumFulfillmentDate } from "@/features/ordering/validation";
import { ZipEligibilityInput } from "@/features/ordering/components/ZipEligibilityInput";

type FulfillmentSelectorProps = {
  value: FulfillmentSelection;
  onChange: (selection: FulfillmentSelection) => void;
};

export const FulfillmentSelector = ({ value, onChange }: FulfillmentSelectorProps) => {
  const minDate = useMemo(() => getMinimumFulfillmentDate(), []);

  return (
    <div className="space-y-4 rounded-lg border border-cookie-brown/20 bg-cookie-cream/50 p-4">
      <p className="text-sm font-semibold text-cookie-brown">Fulfillment</p>
      <RadioGroup
        className="grid grid-cols-2 gap-3"
        onValueChange={(mode) => onChange({ ...value, mode: mode as FulfillmentSelection["mode"] })}
        value={value.mode}
      >
        <Label className="flex items-center gap-2 rounded-md border border-cookie-brown/30 bg-white p-3" htmlFor="pickup-option">
          <RadioGroupItem id="pickup-option" value="pickup" />
          Pickup (Arvada)
        </Label>
        <Label className="flex items-center gap-2 rounded-md border border-cookie-brown/30 bg-white p-3" htmlFor="delivery-option">
          <RadioGroupItem id="delivery-option" value="delivery" />
          Local delivery
        </Label>
      </RadioGroup>

      {value.mode === "delivery" ? (
        <ZipEligibilityInput onChange={(zip) => onChange({ ...value, zip })} value={value.zip} />
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="requested-date">Requested date</Label>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
          id="requested-date"
          min={minDate}
          onChange={(event) => onChange({ ...value, requestedDate: event.target.value })}
          type="date"
          value={value.requestedDate}
        />
        <p className="text-xs text-foreground/70">Minimum lead time is 24 hours to keep every batch fresh.</p>
      </div>
    </div>
  );
};
