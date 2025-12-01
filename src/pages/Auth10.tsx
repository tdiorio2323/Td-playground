import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth10() {
  return (
    <AuthCardBase
      name="Quick Printz"
      headline="Same-Day Print • Packaging • Apparel"
      avatar="/images/quickprintz-logo.png"
      accentGradient="from-amber-400 via-orange-500 to-red-500"
      backgroundVariant="glass"
      buttons={[
        { label: "Order Prints", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Contact", href: "#" },
      ]}
      tags={["Print", "Packaging", "Local"]}
    />
  );
}
