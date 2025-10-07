import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import Breakout from "@/components/Breakout";

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
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <img
              src="/lovable-uploads/cabana-logo.png"
              alt="Cabana"
              className="h-32 w-32 object-contain"
            />
          </div>
          <h1 className="text-6xl text-white text-center" style={{ fontFamily: "'Ballet', cursive", fontOpticalSizing: "auto", fontWeight: 400 }}>Cabana</h1>
        </CardHeader>

        <CardContent className="pb-8">
          <div className="flex flex-col gap-4 w-full px-8">
            <Button
              type="button"
              onClick={() => navigate('/directory')}
              className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
            >
              ENTER
            </Button>

            <div className="mt-4 w-full flex justify-center">
              <Breakout w={300} h={320} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
