import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/integrations/supabase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SharedLayout from "./layouts/SharedLayout";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Brand from "./pages/Brand";
import Portal from "./pages/Portal";
import ProjectPage from "./pages/ProjectPage";
import VipWaitlist from "./pages/VipWaitlist";
import CreatorOnboarding from "./pages/CreatorOnboarding";
import LinkInBio from "./pages/LinkInBio";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Public routes */}
            <Route element={<SharedLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/auth2" element={<Auth />} />
              <Route path="/waitlist" element={<VipWaitlist />} />
              <Route path="/bio/:username" element={<LinkInBio />} />
              <Route path="/*" element={<NotFound />} />
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<SharedLayout />}>
                <Route path="/shop" element={<Shop />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/portal" element={<Portal />} />
                <Route path="/project/:id" element={<ProjectPage />} />
                <Route path="/onboard" element={<CreatorOnboarding />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
