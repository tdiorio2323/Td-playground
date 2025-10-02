import React, { useEffect } from "react";
import { AuthPage7 } from "@/components/AuthPage7";

const Auth = () => {
  useEffect(() => {
    document.title = "STAR LUV ⭐";

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

    updateMetaTag('og:title', 'STAR LUV ⭐');
    updateMetaTag('og:image', `${window.location.origin}/lovable-uploads/starluv.webp`);
    updateMetaName('twitter:title', 'STAR LUV ⭐');
    updateMetaName('twitter:image', `${window.location.origin}/lovable-uploads/starluv.webp`);
    updateMetaName('twitter:card', 'summary_large_image');
  }, []);

  return <AuthPage7 />;
};

export default Auth;
