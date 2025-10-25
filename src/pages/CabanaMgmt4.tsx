import React, { useEffect } from "react";
import { AuthPageMgmt } from "@/components/AuthPageMgmt";

const CabanaMgmt4 = () => {
  useEffect(() => {
    document.title = "TD STUDIOS Management";

    // Update or create meta tags
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

    updateMetaTag('og:title', 'TD STUDIOS Management');
    updateMetaTag('og:image', `${window.location.origin}/lovable-uploads/td-mtv.png`);
    updateMetaName('twitter:title', 'TD STUDIOS Management');
    updateMetaName('twitter:image', `${window.location.origin}/lovable-uploads/td-mtv.png`);
    updateMetaName('twitter:card', 'summary_large_image');
  }, []);

  return <AuthPageMgmt />;
};

export default CabanaMgmt4;
