import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { colorTokens, typographyTokens, spacingTokens } from '../registry/tokens';
import { copyToClipboard } from '../utils/copyToClipboard';

export function TokensTab() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyColor = async (variable: string, value: string) => {
    const success = await copyToClipboard(value);
    if (success) {
      setCopiedId(variable);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCopyTypography = async (element: string, css: string) => {
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedId(element);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCopySpacing = async (name: string, value: string) => {
    const success = await copyToClipboard(value);
    if (success) {
      setCopiedId(name);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Get HSL values for display
  const parseHSL = (hslString: string): { h: number; s: number; l: number } => {
    const match = hslString.match(/hsl\((\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\)/);
    if (match) {
      return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
    }
    return { h: 0, s: 0, l: 100 };
  };

  // Group colors by category
  const colorsByCategory = {
    'Base': colorTokens.filter(c => c.category === 'Base'),
    'Semantic': colorTokens.filter(c => c.category === 'Semantic'),
    'Component': colorTokens.filter(c => c.category === 'Component'),
  };

  return (
    <div className="space-y-8">
      {/* Colors Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Colors</h2>
          <span className="text-sm text-gray-500">{colorTokens.length} tokens</span>
        </div>

        {Object.entries(colorsByCategory).map(([category, colors]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{category}</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {colors.map(color => {
                const isCopied = copiedId === color.variable;
                return (
                  <Card key={color.variable} className="bg-white border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: color.value }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">{color.name}</p>
                          <p className="text-xs text-gray-500 font-mono truncate">{color.value}</p>
                          <p className="text-xs text-gray-400 font-mono truncate">var({color.variable})</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyColor(color.variable, color.value)}
                          className="flex-shrink-0"
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Typography Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Typography</h2>
          <span className="text-sm text-gray-500">{typographyTokens.length} styles</span>
        </div>

        <div className="grid gap-4">
          {typographyTokens.map(token => {
            const isCopied = copiedId === token.element + token.fontSize;
            const cssCode = `font-size: ${token.fontSize};\nfont-weight: ${token.fontWeight};\nline-height: ${token.lineHeight};${token.letterSpacing ? `\nletter-spacing: ${token.letterSpacing};` : ''}`;

            return (
              <Card key={token.element + token.fontSize} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-gray-700">{token.name}</span>
                        <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                          {token.element}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: token.fontSize,
                          fontWeight: token.fontWeight,
                          lineHeight: token.lineHeight,
                          letterSpacing: token.letterSpacing
                        }}
                      >
                        The quick brown fox jumps over the lazy dog
                      </div>
                      <div className="mt-3 text-xs text-gray-500 font-mono space-y-1">
                        <div>Size: {token.fontSize} • Weight: {token.fontWeight} • Line: {token.lineHeight}</div>
                        {token.letterSpacing && <div>Spacing: {token.letterSpacing}</div>}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyTypography(token.element + token.fontSize, cssCode)}
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Spacing Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Spacing</h2>
          <span className="text-sm text-gray-500">{spacingTokens.length} values</span>
        </div>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              {spacingTokens.map(token => {
                const isCopied = copiedId === 'spacing-' + token.name;
                return (
                  <div key={token.name} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-mono text-gray-700 font-semibold">
                      {token.name}
                    </div>
                    <div className="flex-1">
                      <div
                        className="bg-blue-500 rounded"
                        style={{ width: token.value, height: '24px' }}
                      />
                    </div>
                    <div className="w-32 text-sm text-gray-600 font-mono">
                      {token.pixels}px / {token.rem}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopySpacing('spacing-' + token.name, token.value)}
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Usage Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm text-blue-900">Tailwind Usage</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-blue-800 space-y-2">
            <p>Use spacing tokens in Tailwind classes:</p>
            <div className="space-y-1 font-mono bg-blue-100 p-2 rounded">
              <p>Padding: p-4, px-6, py-2</p>
              <p>Margin: m-8, mx-auto, my-4</p>
              <p>Gap: gap-3, gap-x-4, gap-y-2</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
