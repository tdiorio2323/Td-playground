import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export const AuthPageLCG = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    adminLogin: "",
    adminPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // No real authentication - just redirect to external site
    setTimeout(() => {
      window.location.href = "https://lcg.tdstudiosny.com";
    }, 400);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/lovable-uploads/td-studios-black-marble.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <Card className="w-full max-w-md relative z-10 overflow-hidden border border-[#d4af37]/40 bg-black/75 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.28),transparent_55%)]" />
        <div className="absolute inset-[1px] bg-[rgba(15,15,15,0.75)] border border-[#f8d57e]/10 rounded-[inherit]" />

        <CardHeader className="text-center space-y-4 pb-4 relative z-20">
          <div className="flex items-center justify-center">
            <img
              src="/lcglogo.avif"
              alt="Legacy Capital Group"
              className="h-28 w-28 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.9)]"
            />
          </div>
        </CardHeader>

        <CardContent className="pb-8 px-8 relative z-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-2">
              <label
                className="font-bold text-sm bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Username
              </label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Email Address"
                className="w-full h-12 bg-white/8 border-white/25 text-white placeholder:text-white/55 focus:border-[#f0d283] focus:ring-0 focus:ring-offset-0"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                className="font-bold text-sm bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 bg-white/8 border-white/25 text-white placeholder:text-white/55 focus:border-[#f0d283] focus:ring-0 focus:ring-offset-0 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Gold Chrome Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent shadow-[0_1px_2px_rgba(255,215,0,0.8),0_-1px_2px_rgba(0,0,0,0.5)] relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/90 via-yellow-600/80 to-yellow-400/90" />
                </div>
              </div>
            </div>

            {/* Admin Login */}
            <div className="space-y-3">
              <label
                className="font-bold text-sm bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Admin Log-In
              </label>
              <Input
                type="text"
                value={formData.adminLogin}
                onChange={(e) => handleInputChange("adminLogin", e.target.value)}
                placeholder="ADMIN ID"
                className="w-full h-12 bg-white/8 border-white/25 text-white placeholder:text-white/50 focus:border-[#f0d283] focus:ring-0 focus:ring-offset-0"
              />
              <label
                className="font-bold text-sm bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Password
              </label>
              <Input
                type="password"
                value={formData.adminPassword}
                onChange={(e) => handleInputChange("adminPassword", e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 bg-white/8 border-white/25 text-white placeholder:text-white/50 focus:border-[#f0d283] focus:ring-0 focus:ring-offset-0"
              />
            </div>

            {/* Chromatic Shimmer Gold Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 mt-6 relative overflow-hidden bg-gradient-to-br from-[#d9b24a] via-[#b58b32] to-[#6a4d1f] text-white border border-[#f2d68e]/40 font-semibold text-lg tracking-[0.2em] shadow-[inset_0_3px_10px_rgba(255,255,255,0.45),inset_0_-6px_16px_rgba(0,0,0,0.55),0_15px_28px_rgba(0,0,0,0.7),0_0_35px_rgba(212,175,55,0.35)] before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.35)_45%,rgba(255,255,255,0.65)_50%,rgba(255,255,255,0.35)_55%,transparent_90%)] before:translate-x-[-20%] before:pointer-events-none before:animate-[shimmer_2.4s_infinite] transition-all duration-200 hover:shadow-[inset_0_3px_12px_rgba(255,255,255,0.55),inset_0_-6px_18px_rgba(0,0,0,0.6),0_18px_32px_rgba(0,0,0,0.75),0_0_40px_rgba(212,175,55,0.45)]"
              style={{
                backgroundSize: "220% 120%",
              }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2 relative z-10">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <span className="relative z-10">ENTER</span>
              )}
            </Button>

            {/* Footer Link */}
            <div className="text-center mt-6">
              <a
                href="https://www.legacycapny.com"
                className="text-white/80 underline text-xs tracking-[0.28em] hover:text-white transition-colors font-semibold"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                WWW.LEGACYCAPNY.COM
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
