import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MobileCompactLinks from "@/components/MobileCompactLinks";

export default function LexiStarShow() {

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
          <div className="flex items-center justify-center px-8">
            <img
              src="/lovable-uploads/lexi-star-show.png"
              alt="The Lexi Star Show Logo"
              className="w-1/2 object-contain"
            />
          </div>

          <h1
            className="text-3xl text-white text-center"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400 }}
          >
            WATCH NOW!
          </h1>

          {/* Mobile Compact Links */}
          <MobileCompactLinks />

          {/* YouTube Video */}
          <div className="relative w-full mt-4 overflow-hidden rounded-lg px-8">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/bIWtpkXZ34A?si=uvUxEDN9OZfiu6hC"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8" />
      </Card>
    </div>
  );
}
