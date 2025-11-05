import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { routes, routeCategories, type RouteCategory } from "@/lib/routes";
import { Clock } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RECENT_ROUTES_KEY = "td-playground-recent-routes";
const MAX_RECENT = 5;

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [recentRoutes, setRecentRoutes] = useState<string[]>([]);

  useEffect(() => {
    // Load recent routes from localStorage
    const stored = localStorage.getItem(RECENT_ROUTES_KEY);
    if (stored) {
      try {
        setRecentRoutes(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse recent routes", e);
      }
    }
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const addToRecent = (path: string) => {
    const updated = [path, ...recentRoutes.filter((r) => r !== path)].slice(0, MAX_RECENT);
    setRecentRoutes(updated);
    localStorage.setItem(RECENT_ROUTES_KEY, JSON.stringify(updated));
  };

  const handleSelect = (path: string) => {
    addToRecent(path);
    onOpenChange(false);
    navigate(path);
  };

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

  const recentRouteObjects = recentRoutes
    .map((path) => routes.find((r) => r.path === path))
    .filter(Boolean);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search routes..." />
      <CommandList>
        <CommandEmpty>No routes found.</CommandEmpty>

        {recentRouteObjects.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recentRouteObjects.map((route) => {
                if (!route) return null;
                const Icon = route.icon || Clock;
                const categoryConfig = routeCategories[route.category];

                return (
                  <CommandItem
                    key={route.path}
                    value={`${route.name} ${route.path} ${route.description}`}
                    onSelect={() => handleSelect(route.path)}
                    className="cursor-pointer"
                  >
                    <Icon className={`mr-2 h-4 w-4 ${categoryConfig.color}`} />
                    <div className="flex flex-col">
                      <span>{route.name}</span>
                      <span className="text-xs text-muted-foreground">{route.path}</span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {(Object.keys(groupedRoutes) as RouteCategory[]).map((category) => {
          const categoryConfig = routeCategories[category];
          const Icon = categoryConfig.icon;
          const categoryRoutes = groupedRoutes[category];

          return (
            <CommandGroup
              key={category}
              heading={
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${categoryConfig.color}`} />
                  <span>{category}</span>
                  <span className="text-xs text-muted-foreground">({categoryRoutes.length})</span>
                </div>
              }
            >
              {categoryRoutes.map((route) => {
                const RouteIcon = route.icon || Icon;

                return (
                  <CommandItem
                    key={route.path}
                    value={`${route.name} ${route.path} ${route.description} ${category}`}
                    onSelect={() => handleSelect(route.path)}
                    className="cursor-pointer"
                  >
                    <RouteIcon className={`mr-2 h-4 w-4 ${categoryConfig.color}`} />
                    <div className="flex flex-col flex-1">
                      <span>{route.name}</span>
                      <span className="text-xs text-muted-foreground">{route.description}</span>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">{route.path}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          );
        })}
      </CommandList>
    </CommandDialog>
  );
};
