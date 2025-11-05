import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { listBagDesignObjects, buildBagDesignThumbnailPath } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ACCEPTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

const deriveTitle = (index: number) => `Design ${index + 1}`;

const formatSize = (size?: number) => {
  if (!size) return "N/A";
  const megabytes = size / (1024 * 1024);
  if (megabytes < 0.1) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${megabytes.toFixed(1)} MB`;
};

const PremadeBagDesigns = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bag-designs", "public"],
    queryFn: () => listBagDesignObjects("public"),
  });

  const designs = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item) => item && item.name && !item.name.endsWith("/"))
      .filter((item) => {
        const extension = item.name.split(".").pop()?.toLowerCase();
        return extension ? ACCEPTED_EXTENSIONS.includes(extension) : false;
      })
      .map((item, index) => {
        const publicPath = item.name.replace(/^public\//, "");
        return {
          id: item.id ?? `${index}-${publicPath}`,
          title: deriveTitle(index),
          path: publicPath,
          thumbnailUrl: buildBagDesignThumbnailPath(item.name, { width: 420, quality: 35 }),
          size: formatSize(item.metadata?.size ?? item.metadata?.contentLength),
          updatedAt: item.updated_at ?? item.metadata?.lastModified ?? "",
        };
      });
  }, [data]);

  return (
    <div className="bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Premade Bag Designs</h1>
          <p className="text-muted-foreground">
            Preview low-resolution thumbnails of our cannabis bag label collection. Full-resolution
            artwork is delivered after purchase.
          </p>
          <Alert className="border border-primary/30 bg-primary/5">
            <AlertTitle>Watermark &amp; Context Menu Disabled</AlertTitle>
            <AlertDescription>
              These previews are intentionally compressed and protected from right-click save
              actions. The delivered files include print-ready vector exports.
            </AlertDescription>
          </Alert>
        </header>

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Unable to load designs</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : "Unknown error"}
            </AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Card key={idx} className="overflow-hidden">
                <Skeleton className="aspect-[3/4] w-full" />
                <CardHeader>
                  <Skeleton className="h-5 w-32" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {designs.map((design, index) => (
              <Card
                key={design.id}
                className="overflow-hidden border border-border/60 bg-card/80 backdrop-blur"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4] bg-muted" draggable={false}>
                    <img
                      src={design.thumbnailUrl}
                      alt={design.title}
                      loading="lazy"
                      draggable={false}
                      onContextMenu={(event) => event.preventDefault()}
                      className="h-full w-full object-contain select-none pointer-events-none"
                    />
                  </div>
                </CardContent>
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg">{design.title}</CardTitle>
                    <Badge variant="secondary">#{String(index + 1).padStart(3, "0")}</Badge>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                    <span>{design.size}</span>
                    {design.updatedAt && (
                      <span>{new Date(design.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                  {import.meta.env.DEV && (
                    <Button asChild variant="outline" size="sm" className="w-full text-xs">
                      <a href={design.thumbnailUrl} target="_blank" rel="noopener noreferrer">
                        Debug preview link
                      </a>
                    </Button>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && designs.length === 0 && (
          <Alert>
            <AlertTitle>No designs available yet</AlertTitle>
            <AlertDescription>
              Upload artwork to the `bag-designs/public` folder and refresh this page to see
              previews.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default PremadeBagDesigns;
