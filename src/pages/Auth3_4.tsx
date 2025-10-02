import React, { useEffect } from "react";
import { AuthPage4 } from "@/components/AuthPage4";

const Auth = () => {
  useEffect(() => {
    document.title = "CABANA";

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

    updateMetaTag('og:title', 'CABANA');
    updateMetaTag('og:image', `${window.location.origin}/lovable-uploads/cabana-logo.png`);
    updateMetaName('twitter:title', 'CABANA');
    updateMetaName('twitter:image', `${window.location.origin}/lovable-uploads/cabana-logo.png`);
    updateMetaName('twitter:card', 'summary_large_image');
  }, []);

  return <AuthPage4 />;
};

export default Auth;
