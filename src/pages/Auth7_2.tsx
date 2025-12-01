import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth7_2() {
  return (
    <AuthCardBase
      name="StarLuv"
      headline="OnlyFans • Premium Content"
      avatar="/images/starluv-2.png"
      accentGradient="from-pink-500 via-purple-500 to-blue-500"
      backgroundVariant="night-club"
      buttons={[
        { label: "OnlyFans", href: "#" },
        { label: "VIP Bundle", href: "#" },
      ]}
      tags={["OnlyFans", "Premium"]}
    />
  );
}
