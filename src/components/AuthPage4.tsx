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
        backgroundImage: "url('/lovable-uploads/td-studios-black-marble.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >


      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-2 border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.3)] relative z-10">
        <CardHeader className="text-center space-y-6">
          <div className="flex items-center justify-center w-full px-8">
            <div className="w-full aspect-square rounded-[25px] overflow-hidden">
              <img
                src="/lovable-uploads/td-mtv.png"
                alt="TD Studios NYC"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <div className="flex flex-col gap-4 w-full px-8">
            <Button
              type="button"
              onClick={() => navigate('/directory')}
              className="w-full h-14 bg-[#00C8FF] hover:bg-[#00B0E0] text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
            >
              ENTER
            </Button>

            {/* Pink Button - Cabana Group */}
            <Button
              type="button"
              onClick={() => window.open('https://www.cabanagrp.com', '_blank')}
              className="w-full h-14 bg-[#FF1493] hover:bg-[#E0127B] text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
            >
              CABANA GROUP
            </Button>

            {/* Green Button - Verde */}
            <Button
              type="button"
              onClick={() => window.open('https://Verde.tdstudiosny.com/designs', '_blank')}
              className="w-full h-14 bg-[#00FF7F] hover:bg-[#00E070] text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
            >
              VERDE
            </Button>

            {/* Red Button - Jackpot */}
            <Button
              type="button"
              onClick={() => window.open('https://jackpot.tdstudiosny.com', '_blank')}
              className="w-full h-14 bg-[#FF0000] hover:bg-[#E00000] text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
            >
              JACKPOT
            </Button>

            <Button
              type="button"
              onClick={() => navigate('/vip')}
              className="w-full h-14 bg-gradient-to-r from-[#7F5FFF] via-[#9257FF] to-[#B54CFF] hover:from-[#6D4AE6] hover:via-[#8241E6] hover:to-[#A03BE6] text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
            >
              VIP PAGE
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
