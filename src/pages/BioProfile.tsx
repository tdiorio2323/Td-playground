// src/pages/BioProfile.tsx
import * as React from "react";
import { useParams } from "react-router-dom";
import { AuthCardBase } from "@/components/auth/AuthCardBase";

type AuthCardButton = {
  label: string;
  href: string;
};

type AuthCardProfile = {
  name: string;
  headline?: string;
  avatar?: string;
  accentGradient?: string;
  backgroundVariant?: "glass" | "cyber-grid" | "night-club";
  buttons?: AuthCardButton[];
  tags?: string[];
};

const profiles: Record<string, AuthCardProfile> = {
  juanita: {
    name: "Juanita",
    headline: "Premium Content • Exclusive Access",
    avatar: "/images/juanita-main.png",
    accentGradient: "from-fuchsia-500 via-rose-400 to-amber-300",
    backgroundVariant: "night-club",
    buttons: [
      { label: "OnlyFans", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "VIP Chat", href: "#" },
    ],
    tags: ["VIP", "Exclusive", "Creator"],
  },
  starluv: {
    name: "StarLuv",
    headline: "Creator • Nightlife Muse",
    avatar: "/images/starluv-main.png",
    accentGradient: "from-purple-500 via-indigo-500 to-sky-400",
    backgroundVariant: "night-club",
    buttons: [
      { label: "OnlyFans", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "VIP Chat", href: "#" },
    ],
    tags: ["Nightlife", "VIP", "Creator"],
  },
  quickprintz: {
    name: "Quick Printz",
    headline: "Same-Day Print • Packaging • Apparel",
    avatar: "/images/quickprintz-logo.png",
    accentGradient: "from-amber-400 via-orange-500 to-red-500",
    backgroundVariant: "glass",
    buttons: [
      { label: "Order Prints", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Contact", href: "#" },
    ],
    tags: ["Print", "Packaging", "Local"],
  },
  verde: {
    name: "Verde",
    headline: "Digital Artist • 3D Loops • Motion",
    avatar: "/images/verde-transparent-logo.png",
    accentGradient: "from-emerald-400 via-lime-300 to-cyan-400",
    backgroundVariant: "cyber-grid",
    buttons: [
      { label: "Portfolio", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Contact", href: "#" },
    ],
    tags: ["3D Art", "Loops", "Merch"],
  },
};

export default function BioProfile() {
  const { username } = useParams<{ username: string }>();

  const key = (username ?? "").toLowerCase().trim();

  const profile: AuthCardProfile =
    profiles[key] ?? {
      name: username ?? "Creator",
      headline: "Creator Profile",
      avatar: "/images/default-avatar.png",
      accentGradient: "from-slate-300 via-slate-500 to-slate-900",
      backgroundVariant: "glass",
      buttons: [
        { label: "Main Link", href: "#" },
        { label: "Instagram", href: "#" },
      ],
      tags: ["Link in bio"],
    };

  return (
    <AuthCardBase
      name={profile.name}
      headline={profile.headline}
      avatar={profile.avatar}
      accentGradient={profile.accentGradient}
      backgroundVariant={profile.backgroundVariant}
      buttons={profile.buttons}
      tags={profile.tags}
    />
  );
}
