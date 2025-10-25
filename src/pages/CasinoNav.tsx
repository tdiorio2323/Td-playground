import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes, routeCategories, type RouteCategory } from "@/lib/routes";
import { ArrowRight, RotateCw, Sparkles } from "lucide-react";

const CATEGORIES = Object.keys(routeCategories) as RouteCategory[];
const SPIN_DURATION = 2000;

interface Reel {
  category: RouteCategory;
  spinning: boolean;
}

const CasinoNav = () => {
  const navigate = useNavigate();
  const [reels, setReels] = useState<Reel[]>([
    { category: "Authentication", spinning: false },
    { category: "E-commerce", spinning: false },
    { category: "Management", spinning: false },
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedRouteName, setSelectedRouteName] = useState<string | null>(null);
  const [message, setMessage] = useState("Pull the handle to discover a route!");
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([null, null, null]);

  const getRandomCategory = () => CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  const getRouteFromCategories = (categories: RouteCategory[]) => {
    // Get routes that match any of the selected categories
    const matchingRoutes = routes.filter(r => categories.includes(r.category));

    if (matchingRoutes.length === 0) {
      return routes[Math.floor(Math.random() * routes.length)];
    }

    // If we have matching categories, prefer routes from the most frequent category
    const categoryCount: Record<string, number> = {};
    categories.forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    const mostFrequent = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0] as RouteCategory;
    const preferredRoutes = matchingRoutes.filter(r => r.category === mostFrequent);

    const selectedRoutes = preferredRoutes.length > 0 ? preferredRoutes : matchingRoutes;
    return selectedRoutes[Math.floor(Math.random() * selectedRoutes.length)];
  };

  const pullHandle = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedRoute(null);
    setSelectedRouteName(null);
    setMessage("Spinning...");

    // Start all reels spinning
    const newReels = reels.map(reel => ({ ...reel, spinning: true }));
    setReels(newReels);

    // Animate each reel while spinning
    intervalRefs.current.forEach((_, index) => {
      intervalRefs.current[index] = setInterval(() => {
        setReels(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], category: getRandomCategory() };
          return updated;
        });
      }, 100);
    });

    // Stop reels one by one with delays
    const delays = [1500, 2000, 2500];
    const finalCategories: RouteCategory[] = [];

    delays.forEach((delay, index) => {
      setTimeout(() => {
        if (intervalRefs.current[index]) {
          clearInterval(intervalRefs.current[index]!);
          intervalRefs.current[index] = null;
        }

        const finalCategory = getRandomCategory();
        finalCategories.push(finalCategory);

        setReels(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], category: finalCategory, spinning: false };
          return updated;
        });

        // After last reel stops, select a route
        if (index === delays.length - 1) {
          setTimeout(() => {
            const route = getRouteFromCategories(finalCategories);
            setSelectedRoute(route.path);
            setSelectedRouteName(route.name);

            // Check if all three categories match
            if (finalCategories[0] === finalCategories[1] && finalCategories[1] === finalCategories[2]) {
              setMessage(`JACKPOT! Triple ${finalCategories[0]}!`);
            } else {
              setMessage("Your destination awaits...");
            }

            setIsSpinning(false);
          }, 300);
        }
      }, delay);
    });
  };

  const handleEnter = () => {
    if (selectedRoute) {
      navigate(selectedRoute);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/lovable-uploads/td studios black marble.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card className="w-full max-w-4xl bg-black/20 backdrop-blur-md border-2 border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-yellow-400" />
            Casino Navigation
            <Sparkles className="h-8 w-8 text-yellow-400" />
          </CardTitle>
          <p className="text-white/70 text-lg">{message}</p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Slot Machine Reels */}
          <div className="flex justify-center gap-4">
            {reels.map((reel, index) => {
              const Icon = routeCategories[reel.category].icon;
              const color = routeCategories[reel.category].color;

              return (
                <div
                  key={index}
                  className={`relative w-40 h-48 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg border-4 border-yellow-600/50 shadow-2xl overflow-hidden ${
                    reel.spinning ? 'animate-pulse' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />

                  <div className={`flex flex-col items-center justify-center h-full transition-transform duration-300 ${
                    reel.spinning ? 'scale-95' : 'scale-100'
                  }`}>
                    <Icon className={`h-16 w-16 ${color} ${reel.spinning ? 'animate-spin' : ''}`} />
                    <p className="text-white text-xs mt-4 px-2 text-center font-bold">
                      {reel.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pull Handle Button */}
          <div className="flex justify-center">
            <Button
              onClick={pullHandle}
              disabled={isSpinning}
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCw className={`mr-2 h-6 w-6 ${isSpinning ? 'animate-spin' : ''}`} />
              {isSpinning ? 'Spinning...' : 'SPIN'}
            </Button>
          </div>

          {/* Result Display */}
          {selectedRoute && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border-2 border-white/20 animate-in fade-in-50 slide-in-from-bottom-4">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Destination: {selectedRouteName}
                </h3>
                <code className="block text-lg text-white/70 bg-black/30 px-4 py-2 rounded">
                  {selectedRoute}
                </code>
                <Button
                  onClick={handleEnter}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-xl px-8 py-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  ENTER
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-center text-white/50 text-sm space-y-1">
            <p>Spin the reels to discover a random route!</p>
            <p>Match all three categories for a JACKPOT destination!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CasinoNav;
