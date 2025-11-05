import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Instagram } from "lucide-react";

interface AuthPage2Props {
  onLogin?: (role: "customer" | "brand" | "admin") => void;
}

export const AuthPage2 = ({ onLogin }: AuthPage2Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Placeholder images for slideshow - you can replace these with actual image paths
  const images = [
    "/lovable-uploads/juanita.jpg",
    "/lovable-uploads/juanita.jpg",
    "/lovable-uploads/juanita.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // 1.5 seconds per image

    return () => clearInterval(interval);
  }, [images.length]);

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
              src="/lovable-uploads/juanita.jpg"
              alt="Juanita Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
            />
          </div>
          <div className="space-y-4 w-full px-8">
            <h1 className="text-3xl font-bold text-white text-center">JUANITA 💫</h1>
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="button"
                onClick={() => window.open("https://www.instagram.com/juanita_jcv/", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Instagram
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://onlyfans.com/juanitajcv", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                Only Fans 💎
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {/* Image Slideshow */}
          <div className="w-full h-96 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
              key={currentImageIndex}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
