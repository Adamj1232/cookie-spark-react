import cookieIcon from "@/assets/cookie-icon.png";
import type { CookieMenuItem } from "@/features/ordering/types";

export const HOMEPAGE_COLLECTION_HANDLE = "homepage-cookies";
export const SHOPIFY_CART_STORAGE_KEY = "little-cookie-co-shopify-cart-id";

export const CORE_COOKIE_HANDLES = [
  "chocolate-chip",
  "chocolate-chocolate",
  "peanut-butter",
  "oatmeal",
] as const;

export const SEASONAL_COOKIE_HANDLES = ["sugar-cookie", "salted-caramel"] as const;

export const MENU_HANDLES = [...CORE_COOKIE_HANDLES, ...SEASONAL_COOKIE_HANDLES];

export const DELIVERY_ZIP_ALLOWLIST = [
  "80002",
  "80003",
  "80004",
  "80005",
  "80007",
  "80030",
  "80031",
  "80033",
  "80212",
  "80214",
  "80215",
  "80221",
  "80226",
];

export const LEAD_TIME_HOURS = 24;
export const BUSINESS_TIME_ZONE = "America/Denver";

export const ALLERGEN_TAG_PREFIX = "allergen:";

export const ALLERGEN_LABELS: Record<string, string> = {
  dairy: "Contains dairy",
  wheat: "Contains wheat",
  egg: "Contains egg",
  peanut: "Contains peanuts",
  nuts: "May contain tree nuts",
  soy: "Contains soy",
};

export const DEFAULT_ALLERGENS = ["Contains dairy", "Contains wheat", "Contains egg"];

export const FALLBACK_MENU_ITEMS: CookieMenuItem[] = [
  {
    id: "fallback-choc-chip",
    handle: "chocolate-chip",
    title: "Chocolate Chip",
    description: "Classic chewy cookie with brown sugar depth and melty chocolate chips.",
    image: cookieIcon,
    allergens: ["Contains dairy", "Contains wheat", "Contains egg", "Contains soy"],
    isSeasonal: false,
    variants: [
      { id: "fallback-choc-chip-6", label: "6-pack", price: 21, availableForSale: false },
      { id: "fallback-choc-chip-12", label: "12-pack", price: 39, availableForSale: false },
    ],
  },
  {
    id: "fallback-choc-choc",
    handle: "chocolate-chocolate",
    title: "Chocolate Chocolate",
    description: "Rich cocoa dough finished with dark chocolate chunks and a soft center.",
    image: cookieIcon,
    allergens: ["Contains dairy", "Contains wheat", "Contains egg", "Contains soy"],
    isSeasonal: false,
    variants: [
      { id: "fallback-choc-choc-6", label: "6-pack", price: 22, availableForSale: false },
      { id: "fallback-choc-choc-12", label: "12-pack", price: 40, availableForSale: false },
    ],
  },
  {
    id: "fallback-pb",
    handle: "peanut-butter",
    title: "Peanut Butter",
    description: "Soft, nutty, and balanced with sea salt for a classic bakery finish.",
    image: cookieIcon,
    allergens: ["Contains peanuts", "Contains dairy", "Contains wheat", "Contains egg"],
    isSeasonal: false,
    variants: [
      { id: "fallback-pb-6", label: "6-pack", price: 22, availableForSale: false },
      { id: "fallback-pb-12", label: "12-pack", price: 40, availableForSale: false },
    ],
  },
  {
    id: "fallback-oatmeal",
    handle: "oatmeal",
    title: "Oatmeal",
    description: "Toasty oats and warm spice in a hearty, bakery-style cookie.",
    image: cookieIcon,
    allergens: ["Contains dairy", "Contains wheat", "Contains egg"],
    isSeasonal: false,
    variants: [
      { id: "fallback-oatmeal-6", label: "6-pack", price: 20, availableForSale: false },
      { id: "fallback-oatmeal-12", label: "12-pack", price: 38, availableForSale: false },
    ],
  },
  {
    id: "fallback-sugar",
    handle: "sugar-cookie",
    title: "Sugar Cookie",
    description: "Seasonal classic with buttery crumb and vanilla notes.",
    image: cookieIcon,
    allergens: ["Contains dairy", "Contains wheat", "Contains egg"],
    isSeasonal: true,
    variants: [
      { id: "fallback-sugar-6", label: "6-pack", price: 20, availableForSale: false },
      { id: "fallback-sugar-12", label: "12-pack", price: 38, availableForSale: false },
    ],
  },
  {
    id: "fallback-caramel",
    handle: "salted-caramel",
    title: "Salted Caramel",
    description: "Seasonal fan favorite layered with caramel chips and flaked salt.",
    image: cookieIcon,
    allergens: ["Contains dairy", "Contains wheat", "Contains egg", "Contains soy"],
    isSeasonal: true,
    variants: [
      { id: "fallback-caramel-6", label: "6-pack", price: 23, availableForSale: false },
      { id: "fallback-caramel-12", label: "12-pack", price: 41, availableForSale: false },
    ],
  },
];

export const BUSINESS_PROFILE = {
  name: "Little Cookie Co.",
  city: "Arvada",
  state: "CO",
  postalCode: "80002",
  phone: "(303) 555-0105",
  email: "orders@littlecookieco.com",
  serviceArea: ["Arvada", "Denver"],
};
