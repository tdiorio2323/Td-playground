import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Twitter, Youtube, Eye, EyeOff, KeyRound, Lock, Mail } from "lucide-react";

interface AuthPage6Props {
  onLogin?: (role: 'customer' | 'brand' | 'admin') => void;
}

export const AuthPage6 = ({ onLogin }: AuthPage6Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    secret: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend demo - no actual authentication
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Demo Mode",
        description: "This is a frontend component playground - no authentication required",
      });
      setIsLoading(false);
    }, 1000);
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/cabana-builder-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >


      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-2 border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.3)] relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <img
              src="/lovable-uploads/lil sex.png"
              alt="Lil Sex Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
            />
          </div>
          <div className="space-y-4 w-full px-8">
            <h1 className="text-3xl font-bold text-white text-center">LIL SEX 💫</h1>
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="button"
                onClick={() => window.open('https://www.instagram.com/lilsex_/', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Instagram
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://onlyfans.com', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                Only Fans 💎
              </Button>
            </div>

            {/* Frosted Image Box with Lock Overlay */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg mt-3">
              <div className="absolute inset-0 backdrop-blur-xl bg-white/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/lovable-uploads/lil sex.png"
                  alt="Exclusive Content"
                  className="w-24 h-24 object-contain opacity-30"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
        </CardContent>
      </Card>
    </div>
  );
};
