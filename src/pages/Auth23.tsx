import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth23() {
  return (
    <AuthCardBase
      name="Verde"
      headline="Digital Artist • Motion"
      avatar="/images/verde-transparent-logo.png"
      accentGradient="from-emerald-400 via-lime-300 to-cyan-400"
      backgroundVariant="cyber-grid"
      buttons={[
        { label: "Portfolio", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Contact", href: "#" },
      ]}
      tags={["3D", "Loops", "Merch"]}
    />
  );
}
