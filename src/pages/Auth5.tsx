import React, { useEffect } from "react";
import { AuthPage } from "@/components/AuthPage";

const Auth = () => {
  useEffect(() => {
    document.title = 'Cabana | Join';

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    const setProp = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };

    const desc = 'Join Cabana. Private access, premium creators, secure checkout.';
    setMeta('description', desc);
    setProp('og:title', 'Cabana | Join');
    setProp('og:description', desc);
    setProp('og:type', 'website');
    setProp('og:url', window.location.origin + '/joincabana');
  }, []);

  return <AuthPage />;
};

export default Auth;
