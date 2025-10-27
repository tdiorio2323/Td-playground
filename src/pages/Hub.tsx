import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeCategories, getRoutesByCategory, getCategoryStats, type RouteCategory } from "@/lib/routes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft } from "lucide-react";

const Hub = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<RouteCategory | null>(null);
  const stats = getCategoryStats();

  const handleCategoryClick = (category: RouteCategory) => {
    setSelectedCategory(category);
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  if (selectedCategory) {
    const routes = getRoutesByCategory(selectedCategory);
    const categoryConfig = routeCategories[selectedCategory];
    const Icon = categoryConfig.icon;

    return (
      <div
        className="min-h-screen p-8"
        style={{
          backgroundImage: "url('/lovable-uploads/td-studios-black-marble.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Icon className={`h-8 w-8 ${categoryConfig.color}`} />
              <h1 className="text-4xl font-bold text-white">{selectedCategory}</h1>
            </div>
            <p className="text-white/70">{routes.length} routes available</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => {
              const RouteIcon = route.icon || Icon;
              return (
                <Card
                  key={route.path}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleRouteClick(route.path)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <RouteIcon className={`h-6 w-6 ${categoryConfig.color}`} />
                      <ChevronRight className="h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-white text-xl mt-4">{route.name}</CardTitle>
                    <CardDescription className="text-white/70">{route.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <code className="text-xs text-white/50 bg-black/30 px-2 py-1 rounded">
                      {route.path}
                    </code>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundImage: "url('/lovable-uploads/td-studios-black-marble.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Navigation Hub</h1>
          <p className="text-xl text-white/70">Explore {Object.values(stats).reduce((a, b) => a + b, 0)} routes across 6 categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(Object.keys(routeCategories) as RouteCategory[]).map((category) => {
            const config = routeCategories[category];
            const Icon = config.icon;
            const count = stats[category];

            return (
              <Card
                key={category}
                className="relative overflow-hidden border-2 border-white/20 hover:border-white/40 cursor-pointer group transition-all duration-500 hover:scale-105"
                onClick={() => handleCategoryClick(category)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-12 w-12 ${config.color} group-hover:scale-110 transition-transform duration-300`} />
                    <ChevronRight className="h-8 w-8 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-2">{category}</CardTitle>
                  <CardDescription className="text-white/70 text-lg">
                    {count} {count === 1 ? 'route' : 'routes'} available
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 flex-1 rounded-full bg-gradient-to-r ${config.gradient} opacity-50`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm">
            Press{" "}
            <kbd className="px-2 py-1 text-xs bg-white/20 rounded">⌘K</kbd>
            {" "}to open quick navigation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hub;
