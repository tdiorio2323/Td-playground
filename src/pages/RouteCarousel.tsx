import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink, Grid } from "lucide-react";
import { routes, routeCategories, type RouteDefinition } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const RouteCarousel = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay functionality
  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi, autoplay]);

  const handleVisitRoute = (route: RouteDefinition) => {
    // Replace :id and :username with example values
    let path = route.path;
    if (path.includes(":id")) {
      path = path.replace(":id", "1");
    }
    if (path.includes(":username")) {
      path = path.replace(":username", "demo");
    }
    navigate(path);
  };

  const currentRoute = routes[selectedIndex];
  const categoryInfo = routeCategories[currentRoute.category];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Route Showcase
            </h1>
            <p className="text-slate-400 mt-2">
              Explore all {routes.length} routes in TD Playground
            </p>
          </div>
          <Button
            onClick={() => navigate("/directory")}
            variant="outline"
            className="gap-2"
          >
            <Grid className="w-4 h-4" />
            Grid View
          </Button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            onClick={scrollPrev}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400">
              {selectedIndex + 1} / {routes.length}
            </span>
            <Button
              onClick={() => setAutoplay(!autoplay)}
              variant={autoplay ? "default" : "outline"}
              size="sm"
            >
              {autoplay ? "Pause" : "Autoplay"}
            </Button>
          </div>

          <Button
            onClick={scrollNext}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {routes.map((route, index) => {
            const catInfo = routeCategories[route.category];
            const Icon = route.icon || catInfo.icon;

            return (
              <div
                key={route.path}
                className="flex-[0_0_100%] min-w-0 px-4"
              >
                <Card className="mx-auto max-w-4xl bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
                  <div className="aspect-video relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                          backgroundSize: "40px 40px",
                        }}
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${route.gradient || catInfo.gradient} opacity-20`} />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                      <div className="mb-6">
                        <Icon className="w-20 h-20 mx-auto opacity-80" />
                      </div>

                      <Badge
                        variant="outline"
                        className={`mb-4 ${catInfo.color} border-current`}
                      >
                        {route.category}
                      </Badge>

                      <h2 className="text-4xl font-bold mb-3">
                        {route.name}
                      </h2>

                      <p className="text-lg text-slate-300 mb-2 max-w-2xl">
                        {route.description}
                      </p>

                      <code className="text-sm text-slate-500 font-mono">
                        {route.path}
                      </code>

                      {route.meta?.requiresKey && (
                        <Badge variant="secondary" className="mt-4">
                          🔒 Requires Key: {route.meta.requiresKey}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Icon className="w-4 h-4" />
                      <span>{route.category}</span>
                    </div>

                    <Button
                      onClick={() => handleVisitRoute(route)}
                      className="gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Page
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
          {routes.map((route, index) => {
            const catInfo = routeCategories[route.category];
            return (
              <button
                key={route.path}
                onClick={() => scrollTo(index)}
                className={`transition-all ${
                  index === selectedIndex
                    ? "w-8 h-2 bg-gradient-to-r " + catInfo.gradient
                    : "w-2 h-2 bg-slate-600 hover:bg-slate-500"
                } rounded-full`}
                title={route.name}
              />
            );
          })}
        </div>

        {/* Category Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {Object.entries(routeCategories).map(([category, info]) => {
            const count = routes.filter((r) => r.category === category).length;
            const Icon = info.icon;
            return (
              <Card
                key={category}
                className="bg-slate-900/50 border-slate-800 p-4 text-center"
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${info.color}`} />
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-xs text-slate-400">{category}</div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RouteCarousel;
