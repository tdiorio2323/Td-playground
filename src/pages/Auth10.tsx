import React, { useEffect } from "react";
import { AuthPage10 } from "@/components/AuthPage10";

const Auth = () => {
  useEffect(() => {
    document.title = "QUICK PRINTZ";

    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Social share tags for Quick Printz
    const shareImage = `${window.location.origin}/lovable-uploads/qp.png`;
    updateMetaTag('og:title', 'QUICK PRINTZ');
    updateMetaTag('og:image', shareImage);
    updateMetaName('twitter:title', 'QUICK PRINTZ');
    updateMetaName('twitter:image', shareImage);
    updateMetaName('twitter:card', 'summary_large_image');
    // Update meta tags for Quick Printz social share


    // Favicon: switch to Quick Printz logo while on this page
    const defaultFavicon = '/favicon.ico';
    const qpFavicon = shareImage;
    const ensureFavicon = (href: string) => {
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/png';
      link.href = href;
    };
    const prevFavicon = (document.querySelector('link[rel="icon"]') as HTMLLinkElement)?.href;
    ensureFavicon(qpFavicon);

    return () => {
      // Restore default favicon on unmount
      ensureFavicon(prevFavicon || defaultFavicon);
    };
  }, []);
  return <AuthPage10 />;
};

export default Auth;
