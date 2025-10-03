import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SharedLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

    // Exclude pages that manage their own metadata
    const excludedExact = new Set([
      '/quickprintz',
      '/starluv',
      '/starluv-2',
      '/starluv-3',
      '/starluv-4',
      '/lilsex',
      '/juanita',
      '/juanita2',
      '/juanita3',
      '/juanita4',
      '/cabana',
      '/thecabana',
    ]);
    const isExcludedPrefix = pathname.startsWith('/auth');
    if (excludedExact.has(pathname) || isExcludedPrefix) return;

    // Default CABANA metadata
    const title = 'CABANA';
    const image = `${window.location.origin}/lovable-uploads/cabana-logo.png`;
    document.title = title;

    const ensureMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const ensureMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    ensureMetaProperty('og:title', title);
    ensureMetaProperty('og:image', image);
    ensureMetaName('twitter:title', title);
    ensureMetaName('twitter:image', image);
    ensureMetaName('twitter:card', 'summary_large_image');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};

export default SharedLayout;
