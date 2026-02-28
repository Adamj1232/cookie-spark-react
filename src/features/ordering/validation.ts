import { DELIVERY_ZIP_ALLOWLIST, LEAD_TIME_HOURS } from "@/features/ordering/config";

export const normalizeZip = (value: string) => value.replace(/\D/g, "").slice(0, 5);

export const isDeliveryZipSupported = (value: string) => {
  const zip = normalizeZip(value);
  return zip.length === 5 && DELIVERY_ZIP_ALLOWLIST.includes(zip);
};

export const getMinimumFulfillmentDate = () => {
  const now = new Date();
  const earliest = new Date(now.getTime() + LEAD_TIME_HOURS * 60 * 60 * 1000);
  const year = earliest.getFullYear();
  const month = `${earliest.getMonth() + 1}`.padStart(2, "0");
  const day = `${earliest.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isFulfillmentDateValid = (value: string) => {
  if (!value) {
    return false;
  }

  const min = getMinimumFulfillmentDate();
  return value >= min;
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
