import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AuthPage6Props {
  onLogin?: (role: "customer" | "brand" | "admin") => void;
}

export const AuthPage6 = ({ onLogin }: AuthPage6Props) => {

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/tdsparklesblack.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-full max-w-md bg-black/10 backdrop-blur-sm border-2 border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.3)] relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <img
              src="https://scontent-lga3-1.cdninstagram.com/v/t51.82787-15/573712726_18546859585019621_7682565735013399542_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzc1OTQzMzM2MTU1MTU5MDY5Mw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=N2veLy_0KdoQ7kNvwETtvQc&_nc_oc=Adl-MoRRWe0jkuV3Ue7aLssYRUbECjbOHRJrJLk-9eVTwCcND_PnyoCVlDexfD9cY7Y&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_gid=2LwCX1dYcSNRgf_SZMn1pA&oh=00_AfjZ-p7QtunTrWrT0YTu0hq5Qnm9oBSvLSNhnYAsSVIpFQ&oe=69149871"
              alt="Luna Star Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
            />
          </div>
          <div className="space-y-4 w-full px-8">
            <h1
              className="text-6xl text-white text-center"
              style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
            >
              Luna Star
            </h1>
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="button"
                onClick={() => window.open("https://www.instagram.com/luna5star/", "_blank")}
                className="w-full h-14 bg-gradient-to-b from-white to-white/90 hover:from-white/95 hover:to-white/85 text-black font-bold text-xl tracking-wider relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:to-transparent before:pointer-events-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                INSTAGRAM
              </Button>
              <Button
                type="button"
                onClick={() => window.open("https://onlyfans.com/lunastar", "_blank")}
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
              <h2
                className="text-2xl font-bold text-white animate-shimmer bg-gradient-to-r from-white via-gray-200 to-white bg-[length:200%_100%] bg-clip-text text-transparent"
                style={{ width: "90%", margin: "0 auto" }}
              >
                EXCLUSIVE
              </h2>
            </div>

            {/* Frosted Image Box with LS Overlay */}
            <div
              className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg mt-2 cursor-pointer hover:border-white/40 transition-all"
              onClick={() => window.open("https://linktr.ee/luna5star?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnWvZfqwz0N7BUsxkfxoU_r--oKiVm4OlsZqAyRwvCfog6gTk0nax_rqjYFV0_aem_GIdcEgVb7SzC0961GZNviA", "_blank")}
            >
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

            {/* Bookings/Contact Link */}
            <div className="text-center mt-3">
              <a
                href="mailto:inquiries@lilsex.com"
                className="text-white/80 text-sm hover:text-white transition-colors underline"
                style={{ fontFamily: "'Inter', sans-serif", width: "90%", display: "inline-block" }}
              >
                BOOKINGS/CONTACT
              </a>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8"></CardContent>
      </Card>
    </div>
  );
};
