import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Directory = () => {
  const navigate = useNavigate();

  const topRoutes = [
    { path: "/directory", label: "Directory", category: "Core" },
    { path: "/library", label: "Design Library", category: "Core" },
    { path: "/admin", label: "Admin", category: "Core" },
  ];

  const allRoutes = [
    { path: "/", label: "Index (Landing)", category: "Core" },
    { path: "/thedash", label: "The Dash", category: "Core" },
    { path: "/authcard", label: "Auth Card Preview", category: "Core" },

    { path: "/auth", label: "Auth", category: "Auth Routes" },
    { path: "/auth2", label: "Auth 2", category: "Auth Routes" },
    { path: "/auth4", label: "Auth 4", category: "Auth Routes" },
    { path: "/auth8", label: "Auth 8", category: "Auth Routes" },
    { path: "/auth9", label: "Auth 9", category: "Auth Routes" },
    { path: "/auth11", label: "Auth 11", category: "Auth Routes" },
    { path: "/auth12", label: "Auth 12", category: "Auth Routes" },
    { path: "/auth13", label: "Auth 13", category: "Auth Routes" },
    { path: "/auth14", label: "Auth 14", category: "Auth Routes" },
    { path: "/auth15", label: "Auth 15", category: "Auth Routes" },
    { path: "/auth16", label: "Auth 16", category: "Auth Routes" },
    { path: "/auth17", label: "Auth 17", category: "Auth Routes" },
    { path: "/auth18", label: "Auth 18", category: "Auth Routes" },
    { path: "/auth19", label: "Auth 19", category: "Auth Routes" },
    { path: "/auth20", label: "Auth 20", category: "Auth Routes" },
    { path: "/joincabana", label: "Join Cabana", category: "Auth Routes" },

    { path: "/juanita", label: "Juanita", category: "Branded Routes" },
    { path: "/juanita2", label: "Juanita 2", category: "Branded Routes" },
    { path: "/juanita3", label: "Juanita 3", category: "Branded Routes" },
    { path: "/juanita4", label: "Juanita 4", category: "Branded Routes" },
    { path: "/thecabana", label: "The Cabana", category: "Branded Routes" },
    { path: "/cabana", label: "Cabana", category: "Branded Routes" },
    { path: "/lilsex", label: "Lil Sex", category: "Branded Routes" },
    { path: "/starluv", label: "Star Luv", category: "Branded Routes" },
    { path: "/starluv-2", label: "Star Luv 2", category: "Branded Routes" },
    { path: "/starluv-3", label: "Star Luv 3", category: "Branded Routes" },
    { path: "/starluv-4", label: "Star Luv 4", category: "Branded Routes" },
    { path: "/quickprintz", label: "Quick Printz", category: "Branded Routes" },

    { path: "/cabanamgmt", label: "Cabana Management", category: "Management" },
    { path: "/cabanamgmt-2", label: "Cabana Management 2", category: "Management" },
    { path: "/cabanamgmt-4", label: "Cabana Management 4", category: "Management" },
    { path: "/lcg", label: "Legacy Capital Group", category: "Management" },
    { path: "/home-1", label: "Home 1", category: "Management" },

    { path: "/waitlist", label: "VIP Waitlist", category: "App Features" },
    { path: "/shop", label: "Shop", category: "App Features" },
    { path: "/checkout", label: "Checkout", category: "App Features" },
    { path: "/storage", label: "Storage", category: "App Features" },
    { path: "/premade-bag-designs", label: "Premade Bag Designs", category: "App Features" },
    { path: "/brand", label: "Brand", category: "App Features" },
    { path: "/portal", label: "Portal", category: "App Features" },
    { path: "/onboard", label: "Creator Onboarding", category: "App Features" },
    { path: "/bio/demo", label: "Link In Bio (Demo)", category: "App Features" },
    { path: "/project/1", label: "Project Page (Demo)", category: "App Features" },
  ];

  // Filter out top routes from allRoutes to avoid duplication in grouped categories
  const filteredRoutes = allRoutes.filter(route => !topRoutes.some(topRoute => topRoute.path === route.path));

  // Group remaining routes by category
  const categories = Array.from(new Set(filteredRoutes.map(r => r.category)));
  const groupedRoutes = categories.map(category => ({
    category,
    routes: filteredRoutes.filter(r => r.category === category)
  }));

  return (
    <div
      className="min-h-screen p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage: "url('/lovable-uploads/td-studios-black-marble.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <img
              src="/lovable-uploads/td sttone.png"
              alt="TD Studios"
              className="w-full h-full object-cover object-[center_60%]"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8">
          <Card key="top-routes" className="bg-white/10 backdrop-blur-md border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {topRoutes.map(({ path, label }) => (
                  <Button
                    key={path}
                    onClick={() => navigate(path)}
                    variant="outline"
                    className="h-auto py-3 px-4 sm:py-4 sm:px-6 text-left justify-start bg-white/20 hover:bg-white/30 border-white/30 hover:border-white/40 text-white transition-all duration-200 backdrop-blur-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-semibold text-sm sm:text-base">{label}</span>
                      <span className="text-xs text-slate-200">{path}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          {groupedRoutes.map(({ category, routes: categoryRoutes }) => (
            <Card key={category} className="bg-white/10 backdrop-blur-md border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                  {categoryRoutes.map(({ path, label }) => (
                    <Button
                      key={path}
                      onClick={() => navigate(path)}
                      variant="outline"
                      className="h-auto py-3 px-4 sm:py-4 sm:px-6 text-left justify-start bg-white/20 hover:bg-white/30 border-white/30 hover:border-white/40 text-white transition-all duration-200 backdrop-blur-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-semibold text-sm sm:text-base">{label}</span>
                        <span className="text-xs text-slate-200">{path}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Directory;
