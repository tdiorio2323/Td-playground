import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { fonts } from '../registry/fonts';
import { copyToClipboard } from '../utils/copyToClipboard';

type CopyType = 'import' | 'tailwind' | 'css';

export function FontsTab() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (fontName: string, type: CopyType, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(`${fontName}-${type}`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {fonts.map(font => {
          const importCopied = copiedId === `${font.name}-import`;
          const tailwindCopied = copiedId === `${font.name}-tailwind`;
          const cssCopied = copiedId === `${font.name}-css`;

          return (
            <Card key={font.name} className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{font.name}</span>
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {font.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Font Preview */}
                <div className="space-y-3 border-b pb-6">
                  <p className="text-sm font-semibold text-gray-700">Preview</p>
                  {font.weights.map(weight => (
                    <p
                      key={weight}
                      style={{
                        fontFamily: font.family,
                        fontWeight: weight
                      }}
                      className="text-2xl"
                    >
                      The quick brown fox jumps over the lazy dog
                      <span className="ml-3 text-sm text-gray-500">({weight})</span>
                    </p>
                  ))}
                </div>

                {/* Google Fonts Import */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">Google Fonts Import</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(font.name, 'import', font.googleFontsImport)}
                    >
                      {importCopied ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-x-auto">
                    {font.googleFontsImport}
                  </pre>
                </div>

                {/* Tailwind Config */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">Tailwind Config</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(font.name, 'tailwind', font.tailwindConfig)}
                    >
                      {tailwindCopied ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-x-auto">
                    {font.tailwindConfig}
                  </pre>
                </div>

                {/* CSS Declaration */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">CSS Declaration</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(font.name, 'css', font.cssDeclaration)}
                    >
                      {cssCopied ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-x-auto">
                    {font.cssDeclaration}
                  </pre>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
