import React, { useEffect, useMemo } from "react";
import { AuthPage4 } from "@/components/AuthPage4";
import { AuthPageLCG } from "@/components/AuthPageLCG";

const Index = () => {
  const isLCGDomain = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.location.hostname === "lcg.tdstudiosny.com";
  }, []);

  useEffect(() => {
    if (isLCGDomain) {
      document.title = "Locust Growth";
    } else {
      document.title = "TD STUDIOS";
    }

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

    if (isLCGDomain) {
      updateMetaTag("og:title", "Locust Growth");
      updateMetaTag("og:image", `${window.location.origin}/lcglogo.avif`);
      updateMetaName("twitter:title", "Locust Growth");
      updateMetaName("twitter:image", `${window.location.origin}/lcglogo.avif`);
    } else {
      updateMetaTag("og:title", "TD STUDIOS");
      updateMetaTag("og:image", `${window.location.origin}/lovable-uploads/cabana-logo.png`);
      updateMetaName("twitter:title", "TD STUDIOS");
      updateMetaName("twitter:image", `${window.location.origin}/lovable-uploads/cabana-logo.png`);
    }
    updateMetaName("twitter:card", "summary_large_image");
  }, [isLCGDomain]);

  if (isLCGDomain) {
    return <AuthPageLCG />;
  }

  return <AuthPage4 />;
};

export default Index;
