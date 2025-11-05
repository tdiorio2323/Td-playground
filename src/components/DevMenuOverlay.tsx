import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes, routeCategories, type RouteCategory } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Copy, ExternalLink, Code, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export const DevMenuOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [shiftPresses, setShiftPresses] = useState(0);
  const [lastShiftTime, setLastShiftTime] = useState(0);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }

      // Konami code detection
      if (e.key === KONAMI_CODE[konamiIndex]) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);

        if (newIndex === KONAMI_CODE.length) {
          setIsOpen(true);
          setKonamiIndex(0);
          toast({
            title: "Developer Menu Unlocked!",
            description: "Konami code activated 🎮",
          });
        }
      } else if (konamiIndex > 0) {
        setKonamiIndex(0);
      }

      // Shift+Shift detection (double tap within 500ms)
      if (e.key === "Shift") {
        const now = Date.now();
        if (now - lastShiftTime < 500) {
          setShiftPresses((prev) => prev + 1);
          if (shiftPresses >= 1) {
            setIsOpen(true);
            setShiftPresses(0);
            toast({
              title: "Developer Menu",
              description: "Shift+Shift activated 🚀",
            });
          }
        } else {
          setShiftPresses(1);
        }
        setLastShiftTime(now);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex, shiftPresses, lastShiftTime, isOpen, toast]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} copied to clipboard`,
    });
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  if (!isOpen) return null;

  const groupedRoutes = routes.reduce(
    (acc, route) => {
      if (!acc[route.category]) {
        acc[route.category] = [];
      }
      acc[route.category].push(route);
      return acc;
    },
    {} as Record<RouteCategory, typeof routes>,
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-gray-900 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
        <CardHeader className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border-b border-cyan-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code className="h-8 w-8 text-cyan-400" />
              <CardTitle className="text-3xl font-mono text-white">
                Developer Route Matrix
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <p className="text-cyan-300/70 font-mono text-sm mt-2">
            {routes.length} routes across {Object.keys(groupedRoutes).length} categories • Hover to
            preview mobile viewport
          </p>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
          <div className="space-y-8">
            {(Object.keys(groupedRoutes) as RouteCategory[]).map((category) => {
              const categoryConfig = routeCategories[category];
              const Icon = categoryConfig.icon;
              const categoryRoutes = groupedRoutes[category];

              return (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-3 sticky top-0 bg-gray-900 py-2 z-10">
                    <Icon className={`h-6 w-6 ${categoryConfig.color}`} />
                    <h3 className="text-xl font-bold text-white">{category}</h3>
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                      {categoryRoutes.length}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryRoutes.map((route) => {
                      const isHovered = hoveredRoute === route.path;
                      const cleanPath = route.path
                        .replace(":id", "1")
                        .replace(":username", "preview");

                      return (
                        <div
                          key={route.path}
                          className="relative bg-gray-800/50 border border-gray-700 rounded-lg p-3 hover:bg-gray-700/50 hover:border-cyan-500/50 transition-all duration-200 group"
                          onMouseEnter={() => setHoveredRoute(route.path)}
                          onMouseLeave={() => setHoveredRoute(null)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                              {route.name}
                            </h4>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => copyToClipboard(route.path)}
                              >
                                <Copy className="h-3 w-3 text-cyan-400" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleNavigate(route.path)}
                              >
                                <ExternalLink className="h-3 w-3 text-cyan-400" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{route.description}</p>
                          <code className="text-xs text-cyan-400 bg-black/30 px-2 py-1 rounded font-mono block truncate">
                            {route.path}
                          </code>

                          {/* Mobile Preview on Hover */}
                          {isHovered && (
                            <div className="absolute left-full ml-4 top-0 z-50 animate-in fade-in-0 slide-in-from-left-2 duration-200">
                              <div className="bg-gray-900 border-2 border-cyan-500/50 rounded-lg shadow-2xl overflow-hidden">
                                <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 px-3 py-2 flex items-center gap-2 border-b border-cyan-500/30">
                                  <Smartphone className="h-4 w-4 text-cyan-400" />
                                  <span className="text-xs font-mono text-white">
                                    Mobile Preview
                                  </span>
                                </div>
                                <div className="bg-black p-2">
                                  <div className="relative w-[375px] h-[667px] bg-white rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                      src={cleanPath}
                                      className="w-full h-full border-0"
                                      title={`Preview of ${route.name}`}
                                      sandbox="allow-same-origin allow-scripts"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.7);
        }
      `}</style>
    </div>
  );
};
