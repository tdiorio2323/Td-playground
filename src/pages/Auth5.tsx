import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth5() {
  return (
    <AuthCardBase
      name="Cabana MGMT"
      headline="Apply for Management & Bookings"
      avatar="/images/cabana-logo.png"
      accentGradient="from-emerald-400 via-teal-400 to-cyan-400"
      backgroundVariant="cyber-grid"
      buttons={[
        { label: "Apply Now", href: "#" },
        { label: "Instagram", href: "#" },
      ]}
      tags={["Cabana", "Management", "Bookings"]}
    />
  );
}
