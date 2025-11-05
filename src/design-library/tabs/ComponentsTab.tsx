import { useState, lazy } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Code2, Search } from "lucide-react";
import { components } from "../registry/components";
import { copyToClipboard } from "../utils/copyToClipboard";
import { SafePreview } from "../utils/SafePreview";
import { useNavigate } from "react-router-dom";

// Lazy load components for previews - handle both default and named exports
type PreviewComponent = React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>;

const componentLoaders: Record<string, PreviewComponent> = {
  AuthPage: lazy(() =>
    import("@/components/AuthPage").then((m) => ({ default: m.default ?? m.AuthPage })),
  ),
  AuthPage2: lazy(() =>
    import("@/components/AuthPage2").then((m) => ({ default: m.default ?? m.AuthPage2 })),
  ),
  AuthPage3: lazy(() =>
    import("@/components/AuthPage3").then((m) => ({ default: m.default ?? m.AuthPage3 })),
  ),
  AuthPage4: lazy(() =>
    import("@/components/AuthPage4").then((m) => ({ default: m.default ?? m.AuthPage4 })),
  ),
  AuthPage6: lazy(() =>
    import("@/components/AuthPage6").then((m) => ({ default: m.default ?? m.AuthPage6 })),
  ),
  AuthPage7: lazy(() =>
    import("@/components/AuthPage7").then((m) => ({ default: m.default ?? m.AuthPage7 })),
  ),
  AuthPage7_2: lazy(() =>
    import("@/components/AuthPage7_2").then((m) => ({ default: m.default ?? m.AuthPage7_2 })),
  ),
  AuthPage10: lazy(() =>
    import("@/components/AuthPage10").then((m) => ({ default: m.default ?? m.AuthPage10 })),
  ),
  AuthPageLCG: lazy(() =>
    import("@/components/AuthPageLCG").then((m) => ({ default: m.default ?? m.AuthPageLCG })),
  ),
  AuthPageMgmt: lazy(() =>
    import("@/components/AuthPageMgmt").then((m) => ({ default: m.default ?? m.AuthPageMgmt })),
  ),
  AuthPageMgmt2: lazy(() =>
    import("@/components/AuthPageMgmt2").then((m) => ({ default: m.default ?? m.AuthPageMgmt2 })),
  ),
  BrandDashboard: lazy(() =>
    import("@/components/BrandDashboard").then((m) => ({ default: m.default ?? m.BrandDashboard })),
  ),
  SuperAdminDashboard: lazy(() =>
    import("@/components/SuperAdminDashboard").then((m) => ({
      default: m.default ?? m.SuperAdminDashboard,
    })),
  ),
  CustomerApp: lazy(() =>
    import("@/components/CustomerApp").then((m) => ({ default: m.default ?? m.CustomerApp })),
  ),
  CheckoutFlow: lazy(() =>
    import("@/components/CheckoutFlow").then((m) => ({ default: m.default ?? m.CheckoutFlow })),
  ),
  DashboardLayout: lazy(() =>
    import("@/components/DashboardLayout").then((m) => ({
      default: m.default ?? m.DashboardLayout,
    })),
  ),
  AuthCard: lazy(() =>
    import("@/components/AuthCard").then((m) => ({ default: m.default ?? m.AuthCard })),
  ),
};

// Safe preview props for components that need them
const componentProps: Record<string, Record<string, unknown>> = {
  CheckoutFlow: {
    items: [{ id: 1, name: "Sample Item", price: 10, quantity: 1 }],
    steps: ["cart", "shipping", "payment", "confirmation"],
    onSubmit: () => {},
  },
  DashboardLayout: { children: null },
  AuthCard: { mode: "login" as const, onSubmit: () => {}, onToggle: () => {} },
};

const componentSourceModules = import.meta.glob("/src/components/**/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const backendImportPatterns = [
  /@\/integrations\/supabase/i,
  /@\/lib\/supabaseClient/i,
  /@\/lib\/roomKeys/i,
  /supabase/i,
];

const sanitizeComponentCode = (code: string) => {
  const lines = code.split("\n");
  const sanitizedLines: string[] = [];
  let needsStub = false;

  for (const line of lines) {
    if (
      backendImportPatterns.some(
        (pattern) => pattern.test(line.trim()) && line.trim().startsWith("import"),
      )
    ) {
      needsStub = true;
      continue;
    }
    sanitizedLines.push(line);
  }

  const firstNonImportIndex = sanitizedLines.findIndex((line) => {
    const trimmed = line.trim();
    return trimmed.length > 0 && !trimmed.startsWith("import");
  });

  if (needsStub) {
    const stub = [
      "",
      "// Backend placeholders keep this UI self-contained when copied.",
      "const createBackendStub = () =>",
      "  new Proxy(() => {}, {",
      "    get: () => createBackendStub(),",
      "    apply: () => undefined",
      "  });",
      "const supabase = createBackendStub();",
      "const useSupabase = () => ({ supabase, user: null });",
      "",
    ];
    const insertionIndex = firstNonImportIndex === -1 ? sanitizedLines.length : firstNonImportIndex;
    sanitizedLines.splice(insertionIndex, 0, ...stub);
  }

  sanitizedLines.unshift(
    "// Copied from TD Playground Design Library — wire imports/backends to your project.",
  );
  return sanitizedLines.join("\n");
};

const getComponentCode = (path: string): string => {
  const normalizedPath = path.replace(/^\/+/, "");
  const matchedKey =
    componentSourceModules[path] !== undefined
      ? path
      : Object.keys(componentSourceModules).find((key) =>
          key.replace(/^\/+/, "").endsWith(normalizedPath),
        );
  const rawCode = matchedKey ? componentSourceModules[matchedKey] : undefined;
  if (!rawCode) {
    return `// Component code from ${path} is unavailable.`;
  }
  return sanitizeComponentCode(rawCode);
};

export function ComponentsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories = ["All", ...Array.from(new Set(components.map((c) => c.category)))];

  const filteredComponents = components.filter((comp) => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || comp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (componentName: string, code: string) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedId(componentName);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handlePreviewNavigation = (route?: string) => {
    if (!route) return;
    navigate(route);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-white"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Component Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredComponents.map((component) => {
          const isExpanded = expandedCode === component.name;
          const isCopied = copiedId === component.name;
          const code = getComponentCode(component.path);
          const ComponentPreview = componentLoaders[component.name];

          return (
            <Card key={component.name} className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{component.name}</span>
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {component.category}
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">{component.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handlePreviewNavigation(component.demoRoute)}
                    disabled={!component.demoRoute}
                    className="w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 disabled:cursor-not-allowed"
                    aria-label={
                      component.demoRoute
                        ? `Open ${component.name} route at ${component.demoRoute}`
                        : `Preview of ${component.name}`
                    }
                  >
                    <div className="w-full h-96 overflow-hidden relative">
                      {ComponentPreview ? (
                        <SafePreview>
                          <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none">
                            <ComponentPreview {...(componentProps[component.name] || {})} />
                          </div>
                        </SafePreview>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center text-gray-400 text-sm">
                            <Code2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Preview unavailable</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        {component.demoRoute ? (
                          <span className="inline-flex items-center rounded-full bg-black/80 text-white text-xs px-3 py-1">
                            {component.demoRoute}
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-400/60 text-white text-xs px-3 py-1">
                            No route mapped
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-white"
                    onClick={() => setExpandedCode(isExpanded ? null : component.name)}
                  >
                    <Code2 className="h-4 w-4 mr-2" />
                    {isExpanded ? "Hide Code" : "View Code"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-white"
                    onClick={() => handleCopy(component.name, code)}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>

                {isExpanded && (
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-xs overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{code}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredComponents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No components found matching your search.</p>
        </div>
      )}
    </div>
  );
}
