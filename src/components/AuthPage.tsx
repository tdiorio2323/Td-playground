import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, Send, DollarSign, ArrowRight } from "lucide-react";

interface AuthPageProps {
  onLogin?: (role: 'customer' | 'brand' | 'admin') => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleKeypadPress = (digit: string) => {
    if (password.length < 3) {
      setPassword(prev => prev + digit);
    }
  };

  const handleKeypadClear = () => {
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== "420") {
      toast({
        title: "Error",
        description: "Invalid password",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      try {
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });

        // For demo purposes, navigate to shop page
        navigate('/shop');

        // Call onLogin if provided (for backward compatibility)
        if (onLogin) {
          onLogin('customer');
        }

      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };


  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20" />
      
      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-white/10 border-2 shadow-lg relative z-10">
        <CardHeader className="text-center space-y-6">
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <div className="flex flex-col items-center space-y-0">
            <div className="flex items-center justify-center">
              <img
                src="/logo.png"
                alt="TD Studios Logo"
                className="h-auto max-h-60 w-auto"
              />
            </div>
            <p className="text-white text-5xl font-bebas">WELCOME BACK</p>
            <p className="text-white font-inter text-lg">@tdstudiosco</p>
            {/* Chrome Effect Icons */}
            <div className="flex justify-center items-center space-x-8 py-4">
              <Mail className="w-11 h-11 text-gray-300 drop-shadow-lg" />
              <Phone className="w-11 h-11 text-gray-300 drop-shadow-lg" />
              <Send className="w-11 h-11 text-gray-300 drop-shadow-lg" />
              <DollarSign className="w-11 h-11 text-gray-300 drop-shadow-lg" />
            </div>

            {/* New Buttons */}
            <div className="flex flex-col justify-center items-center space-y-4 py-4 mb-8">
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">Menu</Button>
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">Telegram</Button>
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">Instagram</Button>
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">Specials</Button>
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">Contact</Button>
            </div>

            {/* New WWW.TDSTUDIOSNY.COM text */}
            <p className="text-white font-bebas uppercase absolute bottom-[8px] left-1/2 transform -translate-x-1/2 text-2xl">WWW.TDSTUDIOSNY.COM</p>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};