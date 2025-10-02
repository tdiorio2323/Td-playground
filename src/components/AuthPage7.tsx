import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

interface AuthPage7Props {
  onLogin?: (role: 'customer' | 'brand' | 'admin') => void;
}

export const AuthPage7 = ({ onLogin }: AuthPage7Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
              src="/lovable-uploads/starluv.webp"
              alt="Star Luv Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
            />
          </div>
          <div className="space-y-4 w-full px-8">
            <h1 className="text-6xl text-white text-center" style={{ fontFamily: "'Ballet', cursive", fontOpticalSizing: "auto", fontWeight: 400 }}>Star Luv</h1>
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="button"
                onClick={() => window.open('https://www.instagram.com/xostarluv/', '_blank')}
                className="w-full h-14 bg-gradient-to-b from-white to-white/90 hover:from-white/95 hover:to-white/85 text-black font-bold text-xl tracking-wider relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                INSTAGRAM
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://onlyfans.com/xostarluv', '_blank')}
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

            {/* Additional Buttons */}
            <div className="flex flex-col gap-3 w-full mt-4">
              <Button
                type="button"
                onClick={() => window.open('https://m.twitch.tv/xostarluv/home', '_blank')}
                className="w-full h-14 bg-gradient-to-b from-white to-white/90 hover:from-white/95 hover:to-white/85 text-black font-bold text-xl tracking-wider relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                TWITCH
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://www.chatterly.me/xostarluv', '_blank')}
                className="w-full h-14 bg-gradient-to-b from-white to-white/90 hover:from-white/95 hover:to-white/85 text-black font-bold text-xl tracking-wider relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                CHATTERLY
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://www.youtube.com/@xostarluv?si=hI2jMPSffjtgPaTR&sub_confirmation=1', '_blank')}
                className="w-full h-14 bg-gradient-to-b from-white to-white/90 hover:from-white/95 hover:to-white/85 text-black font-bold text-xl tracking-wider relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                YOUTUBE
              </Button>
              <Button
                type="button"
                onClick={() => window.open('https://www.tiktok.com/@xostarluvvv', '_blank')}
                className="w-full h-14 bg-gradient-to-b from-white to-white/90 hover:from-white/95 hover:to-white/85 text-black font-bold text-xl tracking-wider relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                TIKTOK
              </Button>
            </div>

            {/* Bookings/Contact Link */}
            <div className="text-center mt-3">
              <a
                href="mailto:inquiries@starluv.com"
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
