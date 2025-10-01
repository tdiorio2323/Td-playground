import React, { useEffect } from "react";
import { AuthPage } from "@/components/AuthPage";

const Auth = () => {
  useEffect(() => {
    document.title = "JUANITA 💫";

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

    updateMetaTag('og:title', 'JUANITA 💫');
    updateMetaTag('og:image', `${window.location.origin}/lovable-uploads/juanita.jpg`);
    updateMetaName('twitter:title', 'JUANITA 💫');
    updateMetaName('twitter:image', `${window.location.origin}/lovable-uploads/juanita.jpg`);
    updateMetaName('twitter:card', 'summary_large_image');
  }, []);

  return <AuthPage />;
};

export default Auth;
