import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth() {
  return (
    <AuthCardBase
      name="Template Alpha"
      headline="Clean Minimal Card Template"
      avatar="/images/default-avatar.png"
      accentGradient="from-slate-300 via-slate-500 to-slate-900"
      backgroundVariant="glass"
      buttons={[
        { label: "Primary Link", href: "#" },
        { label: "Secondary Link", href: "#" },
      ]}
      tags={["Template", "TD Studios"]}
    />
  );
}
