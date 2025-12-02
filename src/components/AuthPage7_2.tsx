import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Instagram } from "lucide-react";

interface AuthPage7_2Props {
  onLogin?: (role: "customer" | "brand" | "admin") => void;
}

const images = [
  "/lovable-uploads/starluv.webp",
  "/lovable-uploads/starluv.webp",
  "/lovable-uploads/starluv.webp",
];

export const AuthPage7_2 = ({ onLogin }: AuthPage7_2Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // 1.5 seconds per image

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/cabana-builder-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
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
            <h1 className="text-3xl font-bold text-white text-center">STAR LUV ⭐</h1>
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="button"
                onClick={() => window.open("https://www.instagram.com/xostarluv/", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Instagram
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://onlyfans.com/xostarluv", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                Only Fans 💎
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {/* Exclusive Text */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white tracking-widest animate-glitter font-bebas">
              EXCLUSIVE
            </h2>
          </div>

          {/* Image Slideshow */}
          <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg relative">
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500 blur-xl"
              key={images[currentImageIndex]}
            />

            {/* Lock Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/lovable-uploads/star-lock.webp"
                alt="Locked Content"
                className="w-32 h-32 animate-pulse-slow"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
