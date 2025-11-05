import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Search } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { icons } from "../registry/icons";
import { copyToClipboard } from "../utils/copyToClipboard";

export function IconsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(icons.map((i) => i.category)))];

  const filteredIcons = icons.filter((icon) => {
    const matchesSearch =
      icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || icon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (iconName: string, importName: string) => {
    const code = `import { ${importName} } from 'lucide-react';\n\n<${importName} className="h-4 w-4" />`;
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedId(iconName);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search icons..."
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

      {/* Icon Grid */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredIcons.map((icon) => {
          const isCopied = copiedId === icon.name;
          // Dynamically get the icon component
          const IconComponent = (LucideIcons as any)[icon.importName];

          return (
            <Card
              key={icon.name}
              className="bg-white border-gray-200 hover:border-gray-300 transition-colors group"
            >
              <CardContent className="p-4 flex flex-col items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center text-gray-700">
                  {IconComponent ? (
                    <IconComponent className="h-8 w-8" />
                  ) : (
                    <div className="text-xs">N/A</div>
                  )}
                </div>
                <div className="text-center space-y-1 w-full">
                  <p className="text-xs font-medium text-gray-900 truncate" title={icon.name}>
                    {icon.name}
                  </p>
                  <p
                    className="text-xs text-gray-500 line-clamp-2 min-h-[2rem]"
                    title={icon.description}
                  >
                    {icon.description}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900 border-gray-300"
                  onClick={() => handleCopy(icon.name, icon.importName)}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredIcons.length} of {icons.length} icons
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No icons found matching your search.</p>
        </div>
      )}

      {/* Usage Info */}
      <Card className="bg-blue-50 border-blue-200 mt-8">
        <CardHeader>
          <CardTitle className="text-sm text-blue-900">Usage</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-blue-800 space-y-2">
          <p>
            All icons are from <code className="bg-blue-100 px-1 py-0.5 rounded">lucide-react</code>
          </p>
          <p>Click "Copy" to get import + JSX code</p>
          <p className="font-mono text-xs bg-blue-100 p-2 rounded">
            import &#123; IconName &#125; from 'lucide-react';
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
