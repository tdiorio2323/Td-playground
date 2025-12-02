import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { mockAuthenticateUser } from "@/lib/mockAuth";

export const AuthPageMgmt2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    vipCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await mockAuthenticateUser(formData);

      if (result.success) {
        toast({
          title: "Access Granted",
          description: "Welcome to Cabana Management",
        });
        navigate("/admin");
      } else {
        toast({
          title: "Access Denied",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/cabana-background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-2 border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative z-10">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="flex items-center justify-center">
            <img
              src="/lovable-uploads/cabana-logo.png"
              alt="Cabana"
              className="h-32 w-32 object-contain"
            />
          </div>
          <h1 className="text-6xl text-white text-center leading-tight tracking-wider font-ballet font-normal">
            Cabana
          </h1>
          <p className="text-xl text-white/90 text-center tracking-[0.3em] uppercase font-cinzel font-light">
            Management Group
          </p>
        </CardHeader>

        <CardContent className="pb-8 px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-white font-bold text-sm font-inter">
                Username
              </label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full h-12 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 focus:border-white/60"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-white font-bold text-sm font-inter">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full h-12 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 focus:border-white/60 pr-10"
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

            {/* Chrome Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_1px_2px_rgba(255,255,255,0.8),0_-1px_2px_rgba(0,0,0,0.5)] relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-gray-300/80 to-white/90" />
                </div>
              </div>
            </div>

            {/* VIP/Admin Code Input */}
            <div className="space-y-2">
              <label className="text-white font-bold text-sm font-inter">
                Admin/VIP Access Code
              </label>
              <Input
                type="text"
                value={formData.vipCode}
                onChange={(e) => handleInputChange("vipCode", e.target.value)}
                className="w-full h-12 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 focus:border-white/60"
              />
            </div>

            {/* Glossy Enter Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 mt-6 relative overflow-hidden bg-gradient-to-b from-white via-white to-gray-200 hover:from-white hover:to-gray-100 text-black border-none font-semibold text-lg shadow-[inset_0_2px_8px_rgba(255,255,255,1),inset_0_-4px_8px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/90 before:to-transparent before:pointer-events-none transition-all duration-200 hover:shadow-[inset_0_2px_10px_rgba(255,255,255,1),inset_0_-4px_10px_rgba(0,0,0,0.25),0_10px_20px_rgba(0,0,0,0.4)]"
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

            {/* Request Access Link */}
            <div className="text-center mt-4">
              <a
                href="mailto:admin@cabanagrp.com?subject=New%20Onboard%20Request"
                className="text-white underline text-sm hover:text-white/80 transition-colors font-inter"
              >
                Request Access
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
