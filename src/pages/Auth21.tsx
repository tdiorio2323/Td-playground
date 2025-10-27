import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Auth21() {

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/td-studios-black-marble.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-2 border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.3)] relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center px-8">
            <img
              src="/lovable-uploads/sound-image-band-logo.png"
              alt="Sound Image Band Logo"
              className="w-full object-contain"
            />
          </div>

          <h1
            className="text-3xl text-white text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400 }}
          >
            SOUND IMAGE BAND
          </h1>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full px-8">
            {/* Instagram */}
            <Button
              type="button"
              onClick={() => window.open("https://www.instagram.com/soundimageband/", "_blank")}
              className="w-full h-14 text-gray-800 font-bold text-xl tracking-wider relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              <span className="relative z-10">INSTAGRAM</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" style={{ height: "50%" }} />
            </Button>

            {/* YouTube */}
            <Button
              type="button"
              onClick={() => window.open("https://www.youtube.com/@soundimageband", "_blank")}
              className="w-full h-14 text-gray-800 font-bold text-xl tracking-wider relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              <span className="relative z-10">YOUTUBE</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" style={{ height: "50%" }} />
            </Button>

            {/* Facebook */}
            <Button
              type="button"
              onClick={() => window.open("https://www.facebook.com/soundimageband", "_blank")}
              className="w-full h-14 text-gray-800 font-bold text-xl tracking-wider relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #ffffff 0%, #e8e8e8 100%)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
                fontFamily: "'Bebas Neue', sans-serif",
              }}
            >
              <span className="relative z-10">FACEBOOK</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" style={{ height: "50%" }} />
            </Button>
          </div>

          {/* YouTube Logo */}
          <div className="flex items-center justify-center mt-6 px-12">
            <img
              src="/lovable-uploads/yt-logo-white_.png"
              alt="YouTube Logo"
              className="w-full object-contain"
            />
          </div>

          {/* YouTube Video */}
          <div className="relative w-full mt-4 overflow-hidden rounded-lg px-8">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/s5hViyNk5-I?si=iZE6Dd0KCTaHR_0G&autoplay=1&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-4 text-center space-y-3">
            <a
              href="https://www.soundimageband.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg font-semibold underline hover:text-white/80 transition-colors inline-block tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Visit Our Website
            </a>
            <div className="text-white text-sm uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
              www.soundimageband.com
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8" />
      </Card>
    </div>
  );
}
