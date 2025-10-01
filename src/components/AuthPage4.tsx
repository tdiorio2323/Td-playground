import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, KeyRound } from "lucide-react";

interface AuthPage4Props {
  onLogin?: (role: 'customer' | 'brand' | 'admin') => void;
}

export const AuthPage4 = ({ onLogin }: AuthPage4Props) => {
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
    window.open('https://www.instagram.com/tdstudiosco/', '_blank');
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/td studios black marble.png')",
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
                onClick={() => navigate('/juanita')}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                ADMIN PORTAL
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/juanita2')}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                Link Page/Slide
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/juanita3')}
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                EXCLUSIVE PAGE
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {/* Image Box */}
          <div className="w-full rounded-lg overflow-hidden border-2 border-white/20 shadow-lg" style={{ height: 'calc(3 * 3.5rem + 2 * 0.75rem)' }}>
            <img
              src="/lovable-uploads/TD STUDIOS BLACK HERO IMAGE.jpg"
              alt="TD Studios"
              className="w-full h-full object-cover"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 relative overflow-hidden bg-gradient-to-b from-white to-white/95 hover:from-white hover:to-white/90 text-black border-2 border-white/60 backdrop-blur-xl font-semibold text-lg shadow-[inset_0_3px_8px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-tr after:from-transparent after:via-white/20 after:to-white/40 after:pointer-events-none"
              variant="outline"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5" />
                  Let's Link
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
