import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth3_2() {
  return (
    <AuthCardBase
      name="Juanita"
      headline="Behind-the-Scenes • Daily Story Access"
      avatar="/images/juanita-2.png"
      accentGradient="from-orange-400 via-rose-400 to-pink-500"
      backgroundVariant="night-club"
      buttons={[
        { label: "Stories Feed", href: "#" },
        { label: "Instagram", href: "#" },
      ]}
      tags={["Stories", "Daily", "Uncut"]}
    />
  );
}
