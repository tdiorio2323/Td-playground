import { env } from '../env';

const projectUrl = env.VITE_SUPABASE_URL;
const anonKey = env.VITE_SUPABASE_ANON_KEY;

if (!projectUrl || !anonKey) {
  console.warn('Supabase environment variables are missing. Storage calls will fail.');
}

interface StorageListResponseItem {
  id?: string;
  name: string;
  updated_at?: string;
  created_at?: string;
  metadata?: {
    eTag?: string;
    size?: number;
    mimetype?: string;
    lastModified?: string;
    cacheControl?: string;
    contentLength?: number;
  };
}

export async function listBagDesignObjects(prefix = 'public'): Promise<StorageListResponseItem[]> {
  if (!projectUrl || !anonKey) {
    throw new Error('Supabase storage environment variables are not configured.');
  }

  const response = await fetch(
    `${projectUrl}/storage/v1/object/list/bag-designs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        prefix,
        limit: 1000,
        sortBy: { column: 'name', order: 'asc' as const },
      }),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to list storage objects: ${response.status} ${message}`);
  }

  const data = (await response.json()) as StorageListResponseItem[];
  return data?.map((item) => ({
    ...item,
    name: prefix ? `${prefix.replace(/\/?$/, '')}/${item.name}` : item.name,
  })) ?? [];
}

export function buildBagDesignThumbnailPath(path: string, { width = 600, quality = 40 } = {}) {
  if (!projectUrl) return '';
  const encoded = path
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/');

  const params = new URLSearchParams({
    width: String(width),
    quality: String(quality),
    resize: 'contain',
  });

  return `${projectUrl}/storage/v1/render/image/public/bag-designs/${encoded}?${params.toString()}`;
}
