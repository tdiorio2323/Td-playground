import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TokensTab() {
  const colorTokens = [
    { name: "--primary", value: "142 76% 36%", description: "Primary brand color" },
    { name: "--secondary", value: "140 10% 15%", description: "Secondary color" },
    { name: "--background", value: "0 0% 0%", description: "Background color" },
    { name: "--foreground", value: "0 0% 100%", description: "Foreground text color" },
  ];

  const spacingTokens = [{ name: "--radius", value: "0.75rem", description: "Border radius" }];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Design Tokens</h2>
        <p className="text-gray-300 mb-8">
          Core design tokens used throughout the application. These CSS variables provide consistent
          styling.
        </p>
      </div>

      {/* Color Tokens */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Color Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {colorTokens.map((token) => (
              <div
                key={token.name}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div>
                  <code className="text-sm font-mono text-blue-300">{token.name}</code>
                  <p className="text-xs text-gray-400 mt-1">{token.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <code className="text-sm text-gray-300">{token.value}</code>
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-white/20"
                    style={{ backgroundColor: `hsl(${token.value})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spacing Tokens */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Spacing Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spacingTokens.map((token) => (
              <div
                key={token.name}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div>
                  <code className="text-sm font-mono text-blue-300">{token.name}</code>
                  <p className="text-xs text-gray-400 mt-1">{token.description}</p>
                </div>
                <code className="text-sm text-gray-300">{token.value}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
