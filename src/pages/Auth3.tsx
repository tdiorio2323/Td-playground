import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth3() {
  return (
    <AuthCardBase
      name="Juanita"
      headline="Premium Content • Exclusive Access"
      avatar="/images/juanita-main.png"
      accentGradient="from-fuchsia-500 via-rose-400 to-amber-300"
      backgroundVariant="night-club"
      buttons={[
        { label: "OnlyFans", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "VIP Chat", href: "#" },
      ]}
      tags={["VIP", "Exclusive", "Creator"]}
    />
  );
}
