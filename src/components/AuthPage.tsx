import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

interface AuthPageProps {}

export const AuthPage = ({}: AuthPageProps) => {
  const navigate = useNavigate();


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
                src="/TD STUDIOS CHROME LOGO.png"
                alt="TD Studios Logo"
                className="h-auto max-h-40 w-auto"
              />
            </div>
            <p className="text-white text-5xl font-bebas">WELCOME BACK</p>
            <p className="text-white font-inter text-2xl">@tdstudiosco</p>
            

            {/* New Buttons */}
            <div className="flex flex-col justify-center items-center space-y-4 py-4 mb-8">
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">TELEGRAM</Button>
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">EMAIL</Button>
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">SHOP</Button>
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">DESIGN</Button>
              <Button className="w-64 h-11 text-white bg-white/20 backdrop-blur-sm font-bebas text-2xl">INQUIRE</Button>
            </div>

            {/* New WWW.TDSTUDIOSNY.COM text */}
            <p className="text-white font-bebas uppercase absolute bottom-[8px] left-1/2 transform -translate-x-1/2 text-2xl">WWW.TDSTUDIOSNY.COM</p>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};