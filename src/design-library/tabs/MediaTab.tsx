import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy, Download, Search, Image as ImageIcon } from 'lucide-react';
import { useMediaFiles } from '../utils/useMediaFiles';
import { copyToClipboard } from '../utils/copyToClipboard';

export function MediaTab() {
  const mediaFiles = useMediaFiles();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredMedia = mediaFiles.filter(media =>
    media.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyPath = async (filename: string, path: string) => {
    const success = await copyToClipboard(path);
    if (success) {
      setCopiedId(filename);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDownload = (path: string, filename: string) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = filename;
    link.click();
  };

  const getFileTypeColor = (ext: string): string => {
    switch (ext.toLowerCase()) {
      case 'png':
        return 'bg-blue-100 text-blue-700';
      case 'jpg':
      case 'jpeg':
        return 'bg-green-100 text-green-700';
      case 'webp':
        return 'bg-purple-100 text-purple-700';
      case 'avif':
        return 'bg-orange-100 text-orange-700';
      case 'svg':
        return 'bg-pink-100 text-pink-700';
      case 'gif':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-gray-600">
        <div>
          <span className="font-semibold">{filteredMedia.length}</span> images
        </div>
        <div>
          <span className="font-semibold">
            {new Set(filteredMedia.map(m => m.extension)).size}
          </span>{' '}
          formats
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredMedia.map(media => {
          const isCopied = copiedId === media.filename;

          return (
            <Card key={media.filename} className="bg-white border-gray-200 overflow-hidden group">
              <div className="aspect-square bg-gray-50 relative overflow-hidden">
                <img
                  src={media.path}
                  alt={media.filename}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                    const fallback = document.createElement('div');
                    fallback.className = 'text-gray-400';
                    fallback.innerHTML = `
                      <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    `;
                    target.parentElement?.appendChild(fallback);
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopyPath(media.filename, media.path)}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(media.path, media.filename)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="space-y-2">
                  <p className="text-xs font-mono truncate" title={media.filename}>
                    {media.filename}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${getFileTypeColor(media.extension)}`}
                    >
                      {media.extension.toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No images found matching your search.</p>
        </div>
      )}
    </div>
  );
}
