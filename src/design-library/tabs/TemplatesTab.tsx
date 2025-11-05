import React, { useMemo, useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Check, Copy } from "lucide-react";

type TemplateMeta = {
  name: string;
  description: string;
  category: string;
  tags: string[];
  importPath: string; // e.g. "@/components/AuthPage"
  namedExport?: string; // e.g. "AuthPage" if no default export
};

import { templates } from "@/design-library/registry/templates"; // ensure this exists

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null);
  if (error) {
    return (
      <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
        Preview error: {error.message}
      </div>
    );
  }
  return (
    <React.Suspense fallback={<div className="text-gray-400 text-sm">Loading preview…</div>}>
      <Boundary onError={setError}>{children}</Boundary>
    </React.Suspense>
  );
}

// Minimal error boundary with render prop
class Boundary extends React.Component<
  { onError: (e: Error) => void; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    this.props.onError(error);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

const templateLoaders: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {};
function getLoader(t: TemplateMeta) {
  if (templateLoaders[t.name]) return templateLoaders[t.name];
  templateLoaders[t.name] = React.lazy(async () => {
    const mod = await import(/* @vite-ignore */ t.importPath);
    const Comp =
      (t.namedExport ? mod[t.namedExport] : mod.default) ?? mod.default ?? Object.values(mod)[0];
    if (!Comp) throw new Error(`No export found for ${t.name}`);
    return { default: Comp };
  });
  return templateLoaders[t.name];
}

export function TemplatesTab() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | "All">("All");
  const [copied, setCopied] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(templates.map((t) => t.category)))],
    [],
  );
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return templates.filter(
      (t) =>
        (cat === "All" || t.category === cat) &&
        (t.name.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q))),
    );
  }, [query, cat]);

  async function handleCopy(name: string) {
    const t = templates.find((x) => x.name === name);
    if (!t) return;
    const importLine = t.namedExport
      ? `import { ${t.namedExport} } from "${t.importPath}";`
      : `import ${t.name.replace(/\s+/g, "")} from "${t.importPath}";`;
    await navigator.clipboard.writeText(importLine);
    setCopied(name);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <input
          className="border rounded px-3 py-2 w-full max-w-sm"
          placeholder="Search templates…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={c === cat ? "default" : "outline"}
              onClick={() => setCat(c as any)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => {
          const Preview = getLoader(t);
          return (
            <Card key={t.name} className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{t.name}</span>
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {t.category}
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-2">{t.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <div className="w-full h-96 overflow-hidden relative">
                    <ErrorBoundary>
                      <div className="scale-[0.25] origin-top-left w-[400%] h-[400%] pointer-events-none">
                        <Preview />
                      </div>
                    </ErrorBoundary>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-white"
                    onClick={() => handleCopy(t.name)}
                  >
                    {copied === t.name ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Import
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No templates found.</p>
        </div>
      )}

      <div className="text-center text-sm text-gray-500">
        Showing {filtered.length} of {templates.length} templates
      </div>
    </div>
  );
}
