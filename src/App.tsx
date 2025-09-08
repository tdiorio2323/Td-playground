import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Brand from "./pages/Brand";
import Portal from "./pages/Portal";
import ProjectPage from "./pages/ProjectPage";
import VipWaitlist from "./pages/VipWaitlist";
import CreatorOnboarding from "./pages/CreatorOnboarding";
import LinkInBio from "./pages/LinkInBio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth2" element={<Auth />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/waitlist" element={<VipWaitlist />} />
          <Route path="/onboard" element={<CreatorOnboarding />} />
          <Route path="/bio/:username" element={<LinkInBio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "/*" ROUTE */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
