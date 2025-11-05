import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Instagram,
  Twitter,
  Youtube,
  Lock,
  Mail,
} from "lucide-react";

interface AuthPageProps {
  onLogin?: (role: "customer" | "brand" | "admin") => void;
}

export const AuthPage = ({ onLogin }: AuthPageProps) => {

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
            <img src="/lovable-uploads/td-mtv.png" alt="TD MTV" className="w-full object-contain" />
          </div>
          <div className="space-y-4 w-full px-8">
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="button"
                onClick={() => window.open("https://letslink.tdstudiosny.com/cabana", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-600 text-black font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_0_20px_rgba(234,179,8,0.4)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/30 before:to-transparent before:pointer-events-none before:animate-[pulse_3s_ease-in-out_infinite]"
              >
                <Lock className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Exclusive</span>
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://www.instagram.com", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Instagram
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://onlyfans.com", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                Only Fans 💎
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://www.tiktok.com", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                TikTok
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://kick.com", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                Kick
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://twitter.com", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://youtube.com", "_blank")}
                className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg relative overflow-hidden backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
              >
                <Youtube className="w-5 h-5 mr-2" />
                YouTube
              </Button>
            </div>
            <div className="mt-4 text-center space-y-3">
              <div
                className="text-white text-sm underline"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Request Custom Link Page
              </div>
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://www.instagram.com/tdstudiosco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/13474859935?text=Hi%20it's%20%40________%20%2C%20Here%20are%20my%20links%2C%20and%20here%20is%20how%20I%20want%20it%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a
                  href="mailto:Tyler@tdstudiosny.com?subject=Custom%20Link%20Page"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8"></CardContent>
      </Card>
    </div>
  );
};
