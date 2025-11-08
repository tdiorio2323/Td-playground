import React, { useEffect } from "react";
import { AuthPage6 } from "@/components/AuthPage6";

const Auth = () => {
  useEffect(() => {
    document.title = "LUNA STAR";

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

    updateMetaTag("og:title", "LUNA STAR");
    updateMetaTag("og:image", "https://scontent-lga3-1.cdninstagram.com/v/t51.82787-15/573712726_18546859585019621_7682565735013399542_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzc1OTQzMzM2MTU1MTU5MDY5Mw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=N2veLy_0KdoQ7kNvwETtvQc&_nc_oc=Adl-MoRRWe0jkuV3Ue7aLssYRUbECjbOHRJrJLk-9eVTwCcND_PnyoCVlDexfD9cY7Y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_gid=2LwCX1dYcSNRgf_SZMn1pA&oh=00_AfjZ-p7QtunTrWrT0YTu0hq5Qnm9oBSvLSNhnYAsSVIpFQ&oe=69149871");
    updateMetaName("twitter:title", "LUNA STAR");
    updateMetaName("twitter:image", "https://scontent-lga3-1.cdninstagram.com/v/t51.82787-15/573712726_18546859585019621_7682565735013399542_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzc1OTQzMzM2MTU1MTU5MDY5Mw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=N2veLy_0KdoQ7kNvwETtvQc&_nc_oc=Adl-MoRRWe0jkuV3Ue7aLssYRUbECjbOHRJrJLk-9eVTwCcND_PnyoCVlDexfD9cY7Y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_gid=2LwCX1dYcSNRgf_SZMn1pA&oh=00_AfjZ-p7QtunTrWrT0YTu0hq5Qnm9oBSvLSNhnYAsSVIpFQ&oe=69149871");
    updateMetaName("twitter:card", "summary_large_image");
  }, []);

  return <AuthPage6 />;
};

export default Auth;
