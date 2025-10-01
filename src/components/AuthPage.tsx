import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Twitter, Youtube, Eye, EyeOff, KeyRound, Lock } from "lucide-react";

interface AuthPageProps {
  onLogin?: (role: 'customer' | 'brand' | 'admin') => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
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
              src="/lovable-uploads/cabana-logo.png"
              alt="Cabana"
              className="h-32 w-32 object-contain"
            />
          </div>
          <div className="space-y-4 w-full px-8">
            <h1 className="text-6xl text-white text-center" style={{ fontFamily: "'Ballet', cursive", fontOpticalSizing: "auto", fontWeight: 400 }}>Cabana</h1>
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="button"
                onClick={() => window.open('https://exclusive.com/juanita', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-600 text-black font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_0_20px_rgba(234,179,8,0.4)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:pointer-events-none before:animate-[pulse_3s_ease-in-out_infinite]"
              >
                <Lock className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Exclusive</span>
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://www.instagram.com/juanita_jcv/', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Instagram
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://onlyfans.com/juanitajcv', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                Only Fans 💎
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://www.tiktok.com/@juanita', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                TikTok
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://kick.com/juanita', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                Kick
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://twitter.com/juanita', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://youtube.com/@juanita', '_blank')}
                className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Youtube className="w-5 h-5 mr-2" />
                YouTube
              </Button>
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://wa.me/13474859935?text=Hi%20it's%20%40________%20%2C%20Here%20are%20my%20links%2C%20and%20here%20is%20how%20I%20want%20it%3A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:text-white/80 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Request Custom Link Page
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
