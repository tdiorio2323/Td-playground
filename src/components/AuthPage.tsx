import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Instagram, Twitter, Youtube, Eye, EyeOff, KeyRound } from "lucide-react";

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
    
    // Auto-fill secret code if not provided
    const finalFormData = {
      ...formData,
      secret: formData.secret || "cabana" // Auto-fill secret if empty
    };

    // Only validate username and password
    if (!finalFormData.username.trim()) {
      toast({
        title: "Error",
        description: "Username is required",
        variant: "destructive"
      });
      return;
    }
    if (!finalFormData.password.trim()) {
      toast({
        title: "Error", 
        description: "Password is required",
        variant: "destructive"
      });
      return;
    }

    // Demo credentials - replace with real auth
    const validCredentials = {
      username: "td",
      password: "420",
      secret: "cabana"
    };

    if (finalFormData.username !== validCredentials.username ||
        finalFormData.password !== validCredentials.password) {
      toast({
        title: "Access Denied",
        description: "Invalid username or password",
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
          description: `Signed in as ${formData.username}`,
        });

        // Navigate to portal instead of shop
        navigate('/portal');

        // Call onLogin if provided (for backward compatibility)
        if (onLogin) {
          onLogin('admin');
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
              src="/lovable-uploads/f930301b-774c-429c-97b7-b7f1cb17f432.png"
              alt="Cabana Logo"
              className="h-32 w-auto"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Cabana</h1>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/90 text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm pr-12"
                  required
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-transparent hover:bg-white/10"
                  variant="ghost"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-white/60" /> : <Eye className="w-4 h-4 text-white/60" />}
                </Button>
              </div>
            </div>

            {/* Secret Code Field - Optional */}
            <div className="space-y-2">
              <Label htmlFor="secret" className="text-white/90 text-sm font-medium flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                Secret Access Code 
                <span className="text-white/60 text-xs">(auto-handled)</span>
              </Label>
              <div className="relative">
                <Input
                  id="secret"
                  type={showSecret ? "text" : "password"}
                  placeholder="Auto-granted (leave empty)"
                  value={formData.secret}
                  onChange={(e) => handleInputChange('secret', e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm pr-12"
                />
                <Button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-transparent hover:bg-white/10"
                  variant="ghost"
                >
                  {showSecret ? <EyeOff className="w-4 h-4 text-white/60" /> : <Eye className="w-4 h-4 text-white/60" />}
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-14 relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border border-white/30 backdrop-blur-sm font-semibold text-lg"
              variant="outline"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5" />
                  ACCESS PORTAL
                </div>
              )}
            </Button>
          </form>

          {/* Social Icons */}
          <div className="flex justify-center items-center space-x-8 max-w-xs mx-auto px-4">
            <Facebook className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-colors" />
            <Twitter className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-colors" />
            <Youtube className="w-6 h-6 text-white/70 hover:text-white cursor-pointer transition-colors" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
