import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { backgrounds } from '../registry/backgrounds';
import { copyToClipboard } from '../utils/copyToClipboard';

type CopyType = 'tailwind' | 'css';

export function BackgroundsTab() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(backgrounds.map(b => b.category)))];

  const filteredBackgrounds = backgrounds.filter(bg =>
    selectedCategory === 'All' || bg.category === selectedCategory
  );

  const handleCopy = async (bgName: string, type: CopyType, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(`${bgName}-${type}`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-white"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Background Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredBackgrounds.map(bg => {
          const tailwindCopied = copiedId === `${bg.name}-tailwind`;
          const cssCopied = copiedId === `${bg.name}-css`;

          return (
            <Card key={bg.name} className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{bg.name}</span>
                  <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {bg.category}
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600">{bg.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Preview */}
                <div
                  className={`rounded-lg h-32 ${bg.tailwindClass}`}
                  style={{
                    // Add fallback for image backgrounds
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />

                {/* Tailwind Class */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">Tailwind Classes</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white"
                      onClick={() => handleCopy(bg.name, 'tailwind', bg.tailwindClass)}
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
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs overflow-x-auto whitespace-pre-wrap break-all">
                    {bg.tailwindClass}
                  </pre>
                </div>

                {/* CSS Code */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-700">CSS Code</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white"
                      onClick={() => handleCopy(bg.name, 'css', bg.cssCode)}
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
                    {bg.cssCode}
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
