import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import TheDash from "./pages/TheDash";
import NotFound from "./pages/NotFound";
import SharedLayout from "./SharedLayout";
import Auth from "./pages/Auth";
import Auth3 from "./pages/Auth3";
import Auth3_2 from "./pages/Auth3_2";
import Auth3_3 from "./pages/Auth3_3";
import Auth3_4 from "./pages/Auth3_4";
import Auth4 from "./pages/Auth4";
import Auth5 from "./pages/Auth5";
import Auth6 from "./pages/Auth6";
import Auth7 from "./pages/Auth7";
import Auth7_2 from "./pages/Auth7_2";
import Auth8 from "./pages/Auth8";
import Auth9 from "./pages/Auth9";
import Auth10 from "./pages/Auth10";
import Auth11 from "./pages/Auth11";
import Auth12 from "./pages/Auth12";
import Auth13 from "./pages/Auth13";
import Auth14 from "./pages/Auth14";
import Auth15 from "./pages/Auth15";
import Auth16 from "./pages/Auth16";
import Auth17 from "./pages/Auth17";
import Auth18 from "./pages/Auth18";
import Auth19 from "./pages/Auth19";
import Auth20 from "./pages/Auth20";
import Auth21 from "./pages/Auth21";
import LexiStarShow from "./pages/LexiStarShow";
import Admin from "./pages/Admin";
import Brand from "./pages/Brand";
import Portal from "./pages/Portal";
import ProjectPage from "./pages/ProjectPage";
import VipWaitlist from "./pages/VipWaitlist";
import CreatorOnboarding from "./pages/CreatorOnboarding";
import LinkInBio from "./pages/LinkInBio";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import Storage from "./pages/Storage";
import PremadeBagDesigns from "./pages/PremadeBagDesigns";
import CabanaMgmt from "./pages/CabanaMgmt";
import CabanaMgmt2 from "./pages/CabanaMgmt2";
import CabanaMgmt4 from "./pages/CabanaMgmt4";
import LCG from "./pages/LCG";
import Home1 from "./pages/Home1";
import Directory from "./pages/Directory";
import Library from "./pages/Library";
import AuthCardPreview from "./pages/AuthCardPreview";
import ProductDetail from "./pages/ProductDetail";
import Spooky from "./pages/Spooky";
import Hub from "./pages/Hub";
import CasinoNav from "./pages/CasinoNav";
import Vip from "./pages/Vip";
import Backroom from "./pages/Backroom";
import TestingLab from "./pages/TestingLab";
import RequireKey from "./components/RequireKey";
import { CommandPalette } from "./components/CommandPalette";
import { FloatingNavButton } from "./components/FloatingNavButton";
import { DevMenuOverlay } from "./components/DevMenuOverlay";

const queryClient = new QueryClient();

const App = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* All routes - no auth required */}
            <Route element={<SharedLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/library" element={<Library />} />
                <Route path="/spooky" element={<Spooky />} />
                <Route path="/thedash" element={<TheDash />} />
                <Route path="/authcard" element={<AuthCardPreview />} />
                <Route path="/hub" element={<Hub />} />
                <Route path="/casino-nav" element={<CasinoNav />} />
                <Route path="/vip" element={<Vip />} />
                <Route
                  path="/backroom"
                  element={
                    <RequireKey keySlug="backroom">
                      <Backroom />
                    </RequireKey>
                  }
                />
                <Route
                  path="/testing-lab"
                  element={
                    <RequireKey keySlug="testing-lab">
                      <TestingLab />
                    </RequireKey>
                  }
                />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth2" element={<Auth />} />
                <Route path="/juanita" element={<Auth3 />} />
                <Route path="/thecabana" element={<Auth3 />} />
                <Route path="/juanita2" element={<Auth3_2 />} />
                <Route path="/juanita3" element={<Auth3_3 />} />
                <Route path="/juanita4" element={<Auth3_4 />} />
                <Route path="/cabana" element={<Auth3_4 />} />
                <Route path="/cabanamgmt" element={<CabanaMgmt />} />
                <Route path="/cabanamgmt-2" element={<CabanaMgmt2 />} />
                <Route path="/cabanamgmt-4" element={<CabanaMgmt4 />} />
                <Route path="/lcg" element={<LCG />} />
                <Route path="/home-1" element={<Home1 />} />
                <Route path="/auth4" element={<Auth4 />} />
                <Route path="/joincabana" element={<Auth5 />} />
                <Route path="/lilsex" element={<Auth6 />} />
                <Route path="/starluv" element={<Auth7 />} />
                <Route path="/starluv-2" element={<Auth7_2 />} />
                <Route path="/starluv-3" element={<Auth7 />} />
                <Route path="/starluv-4" element={<Auth7 />} />
                <Route path="/auth8" element={<Auth8 />} />
                <Route path="/auth9" element={<Auth9 />} />
                <Route path="/quickprintz" element={<Auth10 />} />
                <Route path="/auth11" element={<Auth11 />} />
                <Route path="/auth12" element={<Auth12 />} />
                <Route path="/auth13" element={<Auth13 />} />
                <Route path="/auth14" element={<Auth14 />} />
                <Route path="/auth15" element={<Auth15 />} />
                <Route path="/auth16" element={<Auth16 />} />
                <Route path="/auth17" element={<Auth17 />} />
                <Route path="/auth18" element={<Auth18 />} />
                <Route path="/auth19" element={<Auth19 />} />
                <Route path="/auth20" element={<Auth20 />} />
                <Route path="/soundimageband" element={<Auth21 />} />
                <Route path="/lexistarshow" element={<LexiStarShow />} />
                <Route path="/waitlist" element={<VipWaitlist />} />
                <Route path="/bio/:username" element={<LinkInBio />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/storage" element={<Storage />} />
                <Route path="/premade-bag-designs" element={<PremadeBagDesigns />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/portal" element={<Portal />} />
                <Route path="/project/:id" element={<ProjectPage />} />
                <Route path="/onboard" element={<CreatorOnboarding />} />
                <Route path="/*" element={<NotFound />} />
              </Route>
            </Routes>

            {/* Global Navigation Components */}
            <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
            <FloatingNavButton onClick={() => setCommandPaletteOpen(true)} />
            <DevMenuOverlay />
          </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
