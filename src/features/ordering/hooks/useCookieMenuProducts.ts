import { useQuery } from "@tanstack/react-query";
import { fetchCookieMenuProducts } from "@/features/ordering/api/queries";

export const useCookieMenuProducts = () =>
  useQuery({
    queryKey: ["cookie-menu-products"],
    queryFn: fetchCookieMenuProducts,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
