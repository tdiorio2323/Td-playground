import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Folder, UploadCloud, RefreshCcw } from 'lucide-react';

interface StorageItem {
  id: string;
  bucket: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'other';
  size: string;
  updatedAt: string;
  path: string;
}

const placeholderItems: StorageItem[] = [
  {
    id: '1',
    bucket: 'creative-assets',
    name: 'hero-banner.png',
    type: 'image',
    size: '1.2 MB',
    updatedAt: '2024-08-04 09:21',
    path: 'marketing/hero-banner.png',
  },
  {
    id: '2',
    bucket: 'creative-assets',
    name: 'promo-reel.mp4',
    type: 'video',
    size: '42 MB',
    updatedAt: '2024-08-02 16:03',
    path: 'campaigns/promo-reel.mp4',
  },
  {
    id: '3',
    bucket: 'sales-collateral',
    name: 'vip-one-pager.pdf',
    type: 'document',
    size: '380 KB',
    updatedAt: '2024-07-28 12:47',
    path: 'vip/vip-one-pager.pdf',
  },
];

const bucketSummary = [
  {
    name: 'creative-assets',
    description: 'Brand visuals, hero shots, and marketing collateral',
    groups: ['marketing', 'design'],
    items: 124,
  },
  {
    name: 'sales-collateral',
    description: 'Pitch decks, PDFs, and downloadable resources',
    groups: ['sales', 'partnerships'],
    items: 46,
  },
  {
    name: 'raw-uploads',
    description: 'Incoming creator uploads pending review',
    groups: ['community', 'ops'],
    items: 18,
  },
];

const storageTypes: Record<StorageItem['type'], { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive'; }> = {
  image: { label: 'Image', variant: 'default' },
  video: { label: 'Video', variant: 'secondary' },
  document: { label: 'Document', variant: 'outline' },
  other: { label: 'Other', variant: 'destructive' },
};

const Storage = () => {
  const recentItems = useMemo(() => placeholderItems.slice(0, 10), []);

  return (
    <div className="bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Storage Hub</h1>
            <p className="text-muted-foreground">
              Review bucket contents, prep transfers, and keep marketing assets organized.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Sync from Supabase
            </Button>
            <Button className="gap-2">
              <UploadCloud className="h-4 w-4" />
              Upload Asset
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Folder className="h-5 w-5" /> Buckets
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              Define target buckets before migrating from the legacy project.
            </span>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {bucketSummary.map((bucket) => (
              <div key={bucket.name} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium">{bucket.name}</h3>
                  <Badge variant="secondary">{bucket.items} items</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{bucket.description}</p>
                <Separator className="my-3" />
                <div className="flex flex-wrap gap-2">
                  {bucket.groups.map((group) => (
                    <Badge key={group} variant="outline">{group}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Assets</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Bucket</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Path</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentItems.map((item) => {
                  const { label, variant } = storageTypes[item.type];
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.bucket}</TableCell>
                      <TableCell>
                        <Badge variant={variant}>{label}</Badge>
                      </TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>{item.updatedAt}</TableCell>
                      <TableCell className="font-mono text-xs">{item.path}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              1. Provide the Supabase project URL and service role credentials (store privately) so we can
              script migrations with the Supabase CLI.
            </p>
            <p>
              2. Configure target buckets (above) to mirror the legacy project structure.
            </p>
            <p>
              3. Once credentials are ready, we can wire the action buttons to list objects via
              <code className="ml-1 font-mono">supabase.storage.from(bucket).list()</code>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Storage;
