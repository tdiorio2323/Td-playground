import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Twitter, Instagram } from "lucide-react";

export default function Auth22() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px]" />
      
      <Card className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border-zinc-800 shadow-2xl relative z-10 overflow-hidden group hover:border-zinc-700 transition-all duration-500">
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-70" />

        <CardHeader className="text-center space-y-2 pt-8 pb-2">
          <div className="mx-auto w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center mb-4 shadow-lg relative overflow-hidden">
             <img 
               src="/images/verde-transparent-logo.png" 
               alt="Profile" 
               className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
             />
          </div>
          <CardTitle className="text-2xl font-bold text-white tracking-tight">
            Neon Walker
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Digital Artist & Cyberpunk Enthusiast
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          {/* Social Stats */}
          <div className="flex justify-center gap-6 text-sm text-zinc-500 py-2 border-y border-zinc-800/50">
            <div className="text-center">
              <span className="block text-white font-bold text-lg">12.5k</span>
              <span>Followers</span>
            </div>
            <div className="text-center">
              <span className="block text-white font-bold text-lg">482</span>
              <span>Following</span>
            </div>
            <div className="text-center">
              <span className="block text-white font-bold text-lg">89</span>
              <span>Projects</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full h-12 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:text-white hover:border-purple-500/50 transition-all duration-300 justify-start px-4 group/btn"
            >
              <Instagram className="mr-3 h-5 w-5 text-pink-500 group-hover/btn:text-pink-400" />
              <span className="flex-1 text-left">Instagram</span>
              <span className="text-zinc-600 group-hover/btn:text-zinc-400">↗</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:text-white hover:border-cyan-500/50 transition-all duration-300 justify-start px-4 group/btn"
            >
              <Twitter className="mr-3 h-5 w-5 text-cyan-500 group-hover/btn:text-cyan-400" />
              <span className="flex-1 text-left">Twitter</span>
              <span className="text-zinc-600 group-hover/btn:text-zinc-400">↗</span>
            </Button>

            <Button 
              variant="outline" 
              className="w-full h-12 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:text-white hover:border-white/50 transition-all duration-300 justify-start px-4 group/btn"
            >
              <Github className="mr-3 h-5 w-5 text-white group-hover/btn:text-zinc-300" />
              <span className="flex-1 text-left">Github</span>
              <span className="text-zinc-600 group-hover/btn:text-zinc-400">↗</span>
            </Button>
          </div>

          {/* Newsletter / Sign up */}
          <div className="pt-4 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900/50 px-2 text-zinc-500 backdrop-blur-sm">
                  Join the Newsletter
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-zinc-950/50 border-zinc-800 focus-visible:ring-purple-500/50 text-white placeholder:text-zinc-600"
              />
              <Button className="bg-white text-black hover:bg-zinc-200">
                Join
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
