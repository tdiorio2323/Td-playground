import React, { useEffect } from "react";
import { AuthPageMgmt2 } from "@/components/AuthPageMgmt2";

const CabanaMgmt2 = () => {
  useEffect(() => {
    document.title = "CABANA Management";

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

    updateMetaTag('og:title', 'CABANA Management');
    updateMetaTag('og:image', `${window.location.origin}/lovable-uploads/cabana-logo.png`);
    updateMetaName('twitter:title', 'CABANA Management');
    updateMetaName('twitter:image', `${window.location.origin}/lovable-uploads/cabana-logo.png`);
    updateMetaName('twitter:card', 'summary_large_image');
  }, []);

  return <AuthPageMgmt2 />;
};

export default CabanaMgmt2;
