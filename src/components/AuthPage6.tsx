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
        backgroundImage: "url('/lovable-uploads/tdsparklesblack.jpg')",
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
            <h1 className="text-6xl text-white text-center" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>Lil Sex 💫</h1>
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="button"
                onClick={() => window.open('https://www.instagram.com/lilsex_/', '_blank')}
                className="w-full h-14 bg-gradient-to-b from-white to-white/90 hover:from-white/95 hover:to-white/85 text-black font-bold text-xl tracking-wider relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                INSTAGRAM
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://onlyfans.com', '_blank')}
                className="w-full h-14 bg-gradient-to-b from-white to-white/90 hover:from-white/95 hover:to-white/85 text-black font-bold text-xl tracking-wider relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                ONLY FANS
              </Button>
            </div>

            {/* Frosted Divider */}
            <div className="w-full h-px bg-white/20 backdrop-blur-sm mt-4"></div>

            {/* Exclusive Text */}
            <div className="text-center mt-4">
              <h2 className="text-2xl font-bold text-white animate-shimmer bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent" style={{ width: '90%', margin: '0 auto' }}>
                EXCLUSIVE
              </h2>
            </div>

            {/* Frosted Image Box with LS Overlay */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg mt-2">
              <div className="absolute inset-0 backdrop-blur-3xl bg-white/20"></div>
              <div className="absolute inset-0 backdrop-blur-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <img
                  src="/lovable-uploads/LS.png"
                  alt="Exclusive Content"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>

            {/* Bookings/Contact Link */}
            <div className="text-center mt-3">
              <a
                href="mailto:inquiries@lilsex.com"
                className="text-white/80 text-sm hover:text-white transition-colors underline"
                style={{ fontFamily: "'Inter', sans-serif", width: '90%', display: 'inline-block' }}
              >
                BOOKINGS/CONTACT
              </a>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
        </CardContent>
      </Card>
    </div>
  );
};
