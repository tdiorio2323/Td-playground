import React, { useEffect } from "react";
import { AuthPage6 } from "@/components/AuthPage6";

const Auth = () => {
  useEffect(() => {
    document.title = "LIL SEX";

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updateMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag("og:title", "LIL SEX");
    updateMetaTag("og:image", `${window.location.origin}/lovable-uploads/lil sex.png`);
    updateMetaName("twitter:title", "LIL SEX");
    updateMetaName("twitter:image", `${window.location.origin}/lovable-uploads/lil sex.png`);
    updateMetaName("twitter:card", "summary_large_image");
  }, []);

  return <AuthPage6 />;
};

export default Auth;
