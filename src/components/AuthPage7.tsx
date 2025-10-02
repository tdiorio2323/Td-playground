import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock } from "lucide-react";

export const AuthPage7 = () => {
  const exclusiveRef = useRef<HTMLDivElement>(null);

  const goExclusive = () => {
    if (exclusiveRef.current) exclusiveRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/td studios black marble.png')",
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

          <h1
            className="text-6xl text-white text-center"
            style={{ fontFamily: "'Ballet', cursive", fontOpticalSizing: "auto", fontWeight: 400 }}
          >
            Star Luv
          </h1>

          {/* Buttons (template-styled order) */}
          <div className="flex flex-col gap-3 w-full px-8">
            {/* EXCLUSIVE - scroll to paywall */}
            <Button
              type="button"
              onClick={goExclusive}
              className="w-full h-14 text-black font-bold text-xl tracking-wider"
              style={{
                backgroundImage: "linear-gradient(to bottom, #FFD54F, #FFC107)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              EXCLUSIVE
            </Button>

            {/* Instagram */}
            <Button
              type="button"
              onClick={() => window.open("https://www.instagram.com/xostarluv/", "_blank")}
              className="w-full h-14 text-white font-bold text-xl tracking-wider"
              style={{
                backgroundImage: "linear-gradient(180deg, #D62976, #962FBF, #4F5BD5)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              INSTAGRAM
            </Button>

            {/* OnlyFans */}
            <Button
              type="button"
              onClick={() => window.open("https://onlyfans.com/xostarluv", "_blank")}
              className="w-full h-14 text-white font-bold text-xl tracking-wider"
              style={{
                backgroundImage: "linear-gradient(180deg, #00BFFF, #0097C7)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              ONLY FANS
            </Button>

            {/* Twitch */}
            <Button
              type="button"
              onClick={() => window.open("https://m.twitch.tv/xostarluv/home", "_blank")}
              className="w-full h-14 text-white font-bold text-xl tracking-wider"
              style={{
                backgroundImage: "linear-gradient(180deg, #9146FF, #6C2EFF)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              TWITCH
            </Button>

            {/* Chatterly */}
            <Button
              type="button"
              onClick={() => window.open("https://www.chatterly.me/xostarluv", "_blank")}
              className="w-full h-14 text-white font-bold text-xl tracking-wider"
              style={{
                backgroundImage: "linear-gradient(180deg, #FF6CAB, #FF3E7F)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              CHATTERLY
            </Button>

            {/* YouTube */}
            <Button
              type="button"
              onClick={() => window.open("https://www.youtube.com/@xostarluv?si=hI2jMPSffjtgPaTR&sub_confirmation=1", "_blank")}
              className="w-full h-14 text-white font-bold text-xl tracking-wider"
              style={{
                backgroundImage: "linear-gradient(180deg, #FF4D4D, #CC0000)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              YOUTUBE
            </Button>

            {/* TikTok */}
            <Button
              type="button"
              onClick={() => window.open("https://www.tiktok.com/@xostarluvvv", "_blank")}
              className="w-full h-14 text-white font-bold text-xl tracking-wider"
              style={{
                backgroundImage: "linear-gradient(180deg, #60F5A1, #28D57A)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              TIKTOK
            </Button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 backdrop-blur-sm mt-4" />

          {/* Paywall block */}
          <div id="exclusive" ref={exclusiveRef} className="text-center mt-4">
            <h2
              className="text-2xl font-bold text-white animate-shimmer bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent"
              style={{ width: "90%", margin: "0 auto" }}
            >
              EXCLUSIVE
            </h2>
          </div>

          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg mt-2">
            <div className="absolute inset-0 backdrop-blur-3xl bg-white/20" />
            <div className="absolute inset-0 backdrop-blur-2xl" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <img src="/lovable-uploads/LS.png" alt="Exclusive Content" className="w-32 h-32 object-contain" />
            </div>
          </div>

          {/* Bookings/Contact */}
          <div className="text-center mt-3">
            <a
              href="mailto:inquiries@starluv.com"
              className="text-white/80 text-sm hover:text-white transition-colors underline inline-block"
              style={{ fontFamily: "'Inter', sans-serif", width: "90%" }}
            >
              BOOKINGS/CONTACT
            </a>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8" />
      </Card>
    </div>
  );
};
