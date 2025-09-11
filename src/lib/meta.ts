export interface MetaData {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

const defaultMeta: MetaData = {
  title: "Cabana VIP",
  description: "Private creator network. Invite-only access.",
  ogTitle: "Cabana VIP",
  ogDescription: "Private creator network. Invite-only access.",
  ogImage: "https://vip.cabanagrp.com/og/cover.jpg",
  twitterTitle: "Cabana VIP",
  twitterDescription: "Private creator network. Invite-only access.",
  twitterImage: "https://vip.cabanagrp.com/og/cover.jpg",
};

export const routeMeta: Record<string, MetaData> = {
  "/waitlist": {
    title: "VIP Waitlist - Cabana VIP",
    description: "Join the exclusive VIP waitlist for early access to premium creator content.",
    ogTitle: "Join VIP Waitlist - Cabana VIP",
    ogDescription: "Get exclusive early access to premium creator content and special experiences.",
    ogImage: "https://vip.cabanagrp.com/og/waitlist.jpg",
    twitterTitle: "Join VIP Waitlist - Cabana VIP",
    twitterDescription: "Get exclusive early access to premium creator content and special experiences.",
    twitterImage: "https://vip.cabanagrp.com/og/waitlist.jpg",
  },
  "/onboard": {
    title: "Creator Onboarding - Cabana VIP",
    description: "Set up your creator profile and start building your Cabana VIP brand presence.",
    ogTitle: "Creator Onboarding - Cabana VIP",
    ogDescription: "Join the exclusive Cabana VIP creator network and build your brand presence.",
    ogImage: "https://vip.cabanagrp.com/og/onboard.jpg",
    twitterTitle: "Creator Onboarding - Cabana VIP",
    twitterDescription: "Join the exclusive Cabana VIP creator network and build your brand presence.",
    twitterImage: "https://vip.cabanagrp.com/og/onboard.jpg",
  },
};

export const getMetaForRoute = (path: string, username?: string): MetaData => {
  if (path.startsWith("/bio/") && username) {
    return {
      title: `${username} - Cabana VIP Creator`,
      description: `${username}'s exclusive creator profile on Cabana VIP network.`,
      ogTitle: `${username} - Cabana VIP Creator`,
      ogDescription: `Check out ${username}'s exclusive creator content on Cabana VIP.`,
      ogImage: `https://vip.cabanagrp.com/og/creator/${username}.jpg`,
      twitterTitle: `${username} - Cabana VIP Creator`,
      twitterDescription: `Check out ${username}'s exclusive creator content on Cabana VIP.`,
      twitterImage: `https://vip.cabanagrp.com/og/creator/${username}.jpg`,
    };
  }

  return routeMeta[path] || defaultMeta;
};

export const updatePageMeta = (meta: MetaData) => {
  document.title = meta.title;
  
  const updateMetaTag = (selector: string, content: string) => {
    let tag = document.querySelector(selector) as HTMLMetaElement;
    if (tag) {
      tag.content = content;
    }
  };

  updateMetaTag('meta[name="description"]', meta.description);
  updateMetaTag('meta[property="og:title"]', meta.ogTitle || meta.title);
  updateMetaTag('meta[property="og:description"]', meta.ogDescription || meta.description);
  updateMetaTag('meta[property="og:image"]', meta.ogImage || "");
  updateMetaTag('meta[name="twitter:title"]', meta.twitterTitle || meta.title);
  updateMetaTag('meta[name="twitter:description"]', meta.twitterDescription || meta.description);
  updateMetaTag('meta[name="twitter:image"]', meta.twitterImage || meta.ogImage || "");
};