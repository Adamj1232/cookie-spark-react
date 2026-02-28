import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import SiteFooter from "./components/SiteFooter";
import { OrderingProvider } from "@/features/ordering/context/OrderingProvider";
import { CartDrawer } from "@/features/ordering/components/CartDrawer";
import { MobileCartBar } from "@/features/ordering/components/MobileCartBar";
import Index from "./pages/Index";

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllergenPolicy = lazy(() => import("./pages/AllergenPolicy"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Refunds = lazy(() => import("./pages/Refunds"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OrderingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<div className="px-4 py-10 text-center text-sm text-foreground/70">Loading...</div>}>
            <Routes>
              <Route element={<Index />} path="/" />
              <Route element={<About />} path="/about" />
              <Route element={<Contact />} path="/contact" />
              <Route element={<AllergenPolicy />} path="/allergen-policy" />
              <Route element={<Privacy />} path="/privacy" />
              <Route element={<Terms />} path="/terms" />
              <Route element={<Refunds />} path="/refunds" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </Suspense>
          <CartDrawer />
          <MobileCartBar />
          <SiteFooter />
        </BrowserRouter>
      </TooltipProvider>
    </OrderingProvider>
  </QueryClientProvider>
);

export default App;
