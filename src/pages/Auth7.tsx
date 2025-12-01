import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth7() {
  return (
    <AuthCardBase
      name="StarLuv"
      headline="Creator • Nightlife Muse"
      avatar="/images/starluv-main.png"
      accentGradient="from-purple-500 via-indigo-500 to-sky-400"
      backgroundVariant="night-club"
      buttons={[
        { label: "OnlyFans", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "VIP Chat", href: "#" },
      ]}
      tags={["Nightlife", "VIP", "Creator"]}
    />
  );
}
