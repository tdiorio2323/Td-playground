import {
  Lock,
  ShoppingCart,
  LayoutDashboard,
  Palette,
  Sparkles,
  Flame,
  type LucideIcon,
} from "lucide-react";
import type { KeySlug } from "@/lib/roomKeys";

export type RouteCategory =
  | "Authentication"
  | "E-commerce"
  | "Management"
  | "Creator Tools"
  | "Showcases"
  | "Experimental";

export interface RouteMeta {
  requiresKey?: KeySlug;
}

export interface RouteDefinition {
  path: string;
  name: string;
  category: RouteCategory;
  description: string;
  icon?: LucideIcon;
  gradient?: string;
  meta?: RouteMeta;
}

export const routeCategories: Record<
  RouteCategory,
  { icon: LucideIcon; gradient: string; color: string }
> = {
  Authentication: {
    icon: Lock,
    gradient: "from-purple-500 via-pink-500 to-red-500",
    color: "text-purple-400",
  },
  "E-commerce": {
    icon: ShoppingCart,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    color: "text-green-400",
  },
  Management: {
    icon: LayoutDashboard,
    gradient: "from-blue-500 via-cyan-500 to-indigo-500",
    color: "text-blue-400",
  },
  "Creator Tools": {
    icon: Palette,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    color: "text-orange-400",
  },
  Showcases: {
    icon: Sparkles,
    gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    color: "text-violet-400",
  },
  Experimental: {
    icon: Flame,
    gradient: "from-red-500 via-rose-500 to-pink-500",
    color: "text-red-400",
  },
};

export const routes: RouteDefinition[] = [
  // Authentication variants and branded entry points (19 routes)
  { path: "/", name: "Home", category: "Authentication", description: "TD Studios / LCG domain-aware home page", icon: Lock },
  { path: "/auth", name: "Auth Base", category: "Authentication", description: "Base authentication page", icon: Lock },
  { path: "/auth2", name: "Auth v2", category: "Authentication", description: "Authentication variation 2", icon: Lock },
  { path: "/juanita", name: "Juanita Auth", category: "Authentication", description: "Juanita branded authentication", icon: Lock },
  { path: "/thecabana", name: "The Cabana", category: "Authentication", description: "Cabana branded entry", icon: Lock },
  { path: "/juanita2", name: "Juanita v2", category: "Authentication", description: "Juanita authentication v2", icon: Lock },
  { path: "/juanita3", name: "Juanita v3", category: "Authentication", description: "Juanita authentication v3", icon: Lock },
  { path: "/juanita4", name: "Juanita v4", category: "Authentication", description: "Juanita authentication v4", icon: Lock },
  { path: "/cabana", name: "Cabana", category: "Authentication", description: "Cabana authentication portal", icon: Lock },
  { path: "/auth4", name: "Auth v4", category: "Authentication", description: "Authentication variation 4", icon: Lock },
  { path: "/joincabana", name: "Join Cabana", category: "Authentication", description: "Cabana signup flow", icon: Lock },
  { path: "/lilsex", name: "Lil Sex", category: "Authentication", description: "Lil Sex branded auth", icon: Lock },
  { path: "/starluv", name: "Star Luv", category: "Authentication", description: "Star Luv authentication", icon: Lock },
  { path: "/starluv-2", name: "Star Luv v2", category: "Authentication", description: "Star Luv variation 2", icon: Lock },
  { path: "/starluv-3", name: "Star Luv v3", category: "Authentication", description: "Star Luv variation 3", icon: Lock },
  { path: "/starluv-4", name: "Star Luv v4", category: "Authentication", description: "Star Luv variation 4", icon: Lock },
  { path: "/quickprintz", name: "Quick Printz", category: "Authentication", description: "Quick Printz auth portal", icon: Lock },
  { path: "/auth8", name: "Auth v8", category: "Authentication", description: "Authentication variation 8", icon: Lock },
  { path: "/auth9", name: "Auth v9", category: "Authentication", description: "Authentication variation 9", icon: Lock },
  { path: "/auth11", name: "Auth v11", category: "Authentication", description: "Authentication variation 11", icon: Lock },
  { path: "/auth12", name: "Auth v12", category: "Authentication", description: "Authentication variation 12", icon: Lock },
  { path: "/auth13", name: "Auth v13", category: "Authentication", description: "Authentication variation 13", icon: Lock },
  { path: "/auth14", name: "Auth v14", category: "Authentication", description: "Authentication variation 14", icon: Lock },
  { path: "/auth15", name: "Auth v15", category: "Authentication", description: "Authentication variation 15", icon: Lock },
  { path: "/auth16", name: "Auth v16", category: "Authentication", description: "Authentication variation 16", icon: Lock },
  { path: "/auth17", name: "Auth v17", category: "Authentication", description: "Authentication variation 17", icon: Lock },
  { path: "/auth18", name: "Auth v18", category: "Authentication", description: "Authentication variation 18", icon: Lock },
  { path: "/auth19", name: "Auth v19", category: "Authentication", description: "Authentication variation 19", icon: Lock },
  { path: "/auth20", name: "Auth v20", category: "Authentication", description: "Authentication variation 20", icon: Lock },

  // E-commerce interfaces (5 routes)
  { path: "/shop", name: "Shop", category: "E-commerce", description: "E-commerce shop interface", icon: ShoppingCart },
  { path: "/product/:id", name: "Product Details", category: "E-commerce", description: "Product detail page", icon: ShoppingCart },
  { path: "/checkout", name: "Checkout", category: "E-commerce", description: "Checkout flow", icon: ShoppingCart },
  { path: "/storage", name: "Storage", category: "E-commerce", description: "Storage management interface", icon: ShoppingCart },
  { path: "/premade-bag-designs", name: "Premade Bag Designs", category: "E-commerce", description: "Premade product designs", icon: ShoppingCart },

  // Management dashboards (6 routes)
  { path: "/thedash", name: "The Dash", category: "Management", description: "Main dashboard template", icon: LayoutDashboard },
  { path: "/cabanamgmt", name: "Cabana Management", category: "Management", description: "Cabana management portal", icon: LayoutDashboard },
  { path: "/cabanamgmt-2", name: "Cabana Mgmt v2", category: "Management", description: "Cabana management v2", icon: LayoutDashboard },
  { path: "/cabanamgmt-4", name: "Cabana Mgmt v4", category: "Management", description: "Cabana management v4", icon: LayoutDashboard },
  { path: "/admin", name: "Admin", category: "Management", description: "Super admin dashboard", icon: LayoutDashboard },
  { path: "/brand", name: "Brand", category: "Management", description: "Brand dashboard", icon: LayoutDashboard },

  // Creator Tools & Premium Platforms (11 routes)
  { path: "/onboard", name: "Creator Onboarding", category: "Creator Tools", description: "Creator onboarding flow", icon: Palette },
  { path: "/bio/:username", name: "Link in Bio", category: "Creator Tools", description: "Dynamic link-in-bio pages", icon: Palette },
  { path: "/waitlist", name: "VIP Waitlist", category: "Creator Tools", description: "VIP waitlist signup", icon: Palette },
  { path: "/portal", name: "Portal", category: "Creator Tools", description: "User portal interface", icon: Palette },
  { path: "/project/:id", name: "Project Page", category: "Creator Tools", description: "Project detail pages", icon: Palette },
  { path: "/lcg", name: "Locust Growth", category: "Creator Tools", description: "LCG branded portal", icon: Palette },
  { path: "/home-1", name: "Home Alternative", category: "Creator Tools", description: "Alternative home page", icon: Palette },
  { path: "/luna-star", name: "Luna Star", category: "Creator Tools", description: "Premium custom link page for Luna Star", icon: Sparkles },
  { path: "/luna-star/analytics", name: "Luna Star Analytics", category: "Creator Tools", description: "Advanced analytics dashboard for Luna Star", icon: Sparkles },
  { path: "/luna-star/cms", name: "Luna Star CMS", category: "Creator Tools", description: "Content management system for Luna Star", icon: Sparkles },
  { path: "/luna-star/premium", name: "Luna Star Premium", category: "Creator Tools", description: "Premium platform and monetization features", icon: Sparkles },

  // Component showcases (4 routes)
  { path: "/carousel", name: "Route Carousel", category: "Showcases", description: "Interactive carousel slideshow of all routes", icon: Sparkles },
  { path: "/directory", name: "Directory", category: "Showcases", description: "Component showcase directory", icon: Sparkles },
  { path: "/library", name: "Design Library", category: "Showcases", description: "40+ shadcn/ui components", icon: Sparkles },
  { path: "/authcard", name: "AuthCard Preview", category: "Showcases", description: "AuthCard component preview", icon: Sparkles },

  // Experimental features (8 routes)
  { path: "/spooky", name: "Spooky", category: "Experimental", description: "Spooky themed page", icon: Flame },
  { path: "/lexistarshow", name: "Lexi Star Show", category: "Experimental", description: "Lexi Star Show experience", icon: Flame },
  { path: "/soundimageband", name: "Sound Image Band", category: "Experimental", description: "Sound Image Band portal", icon: Flame },
  { path: "/casino-nav", name: "Casino Navigation", category: "Experimental", description: "Slot machine meta-navigation", icon: Flame },
  { path: "/vip", name: "VIP Lounge", category: "Experimental", description: "Invitation-only VIP control room", icon: Sparkles },
  { path: "/backroom", name: "Back Room", category: "Experimental", description: "Behind-the-scenes operations desk", icon: LayoutDashboard, meta: { requiresKey: "backroom" } },
  { path: "/testing-lab", name: "Testing Lab", category: "Experimental", description: "Experimental sandbox reserved for lab members", icon: Flame, meta: { requiresKey: "testing-lab" } },
  { path: "/hub", name: "Navigation Hub", category: "Experimental", description: "Interactive navigation portal", icon: Flame },
];

// Essential helpers for front-end experimental project
export const getRoutesByCategory = (category: RouteCategory): RouteDefinition[] => 
  routes.filter((route) => route.category === category);

export const searchRoutes = (query: string): RouteDefinition[] => {
  const q = query.toLowerCase();
  return routes.filter((route) =>
    route.name.toLowerCase().includes(q) ||
    route.path.toLowerCase().includes(q) ||
    route.description.toLowerCase().includes(q) ||
    route.category.toLowerCase().includes(q)
  );
};

// Development utilities
export const validateRouteExists = (path: string): boolean => 
  routes.some(route => route.path === path);

export const getCategoryStats = () => 
  routes.reduce((stats, route) => {
    stats[route.category] = (stats[route.category] || 0) + 1;
    return stats;
  }, {} as Record<RouteCategory, number>);
