import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PremadeBagDesigns from './PremadeBagDesigns';
import * as storage from '@/lib/storage';

// Mock the storage module
vi.mock('@/lib/storage', () => ({
  listBagDesignObjects: vi.fn(),
  buildBagDesignThumbnailPath: (path: string) => `https://mocked.url/${path}`,
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('PremadeBagDesigns', () => {
  it('shows a loading state', () => {
    vi.spyOn(storage, 'listBagDesignObjects').mockResolvedValueOnce([]);
    const { container } = renderWithClient(<PremadeBagDesigns />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows an error state', async () => {
    const errorMessage = 'Failed to fetch designs';
    vi.spyOn(storage, 'listBagDesignObjects').mockRejectedValueOnce(new Error(errorMessage));
    renderWithClient(<PremadeBagDesigns />);
    expect(await screen.findByText('Unable to load designs')).toBeInTheDocument();
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('shows a list of designs', async () => {
    const mockData = [
      {
        name: 'public/design1.jpg',
        id: '1',
        updated_at: new Date().toISOString(),
        metadata: { size: 123456 },
      },
    ];
    vi.spyOn(storage, 'listBagDesignObjects').mockResolvedValueOnce(mockData);
    renderWithClient(<PremadeBagDesigns />);
    expect(await screen.findByText('Design 1')).toBeInTheDocument();
    expect(screen.getByAltText('Design 1')).toBeInTheDocument();
  });
});