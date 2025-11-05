import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Ghost, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const Spooky = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingGhosts, setFloatingGhosts] = useState<Array<{ id: number; x: number; y: number }>>(
    [],
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow data - two images per slide
  const slides = [
    {
      left: {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        alt: "Placeholder 1",
      },
      right: {
        src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        alt: "Placeholder 2",
      },
    },
    {
      left: {
        src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        alt: "Placeholder 3",
      },
      right: {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        alt: "Placeholder 4",
      },
    },
    {
      left: {
        src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        alt: "Placeholder 5",
      },
      right: {
        src: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
        alt: "Placeholder 6",
      },
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate floating ghosts
    const ghosts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setFloatingGhosts(ghosts);

    // Auto-advance slideshow
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [nextSlide]);

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative">
      {/* Fixed background image - Halloween Mansion */}
      <div className="fixed inset-0 z-0">
        <img
          src="/lovable-uploads/td-halloween-mansion.jpg"
          alt="Halloween Mansion Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Animated fog overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-transparent to-purple-900/20 animate-pulse opacity-40" />
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Floating ghosts */}
        {floatingGhosts.map((ghost) => (
          <div
            key={ghost.id}
            className="absolute animate-float opacity-20"
            style={{
              left: `${ghost.x}%`,
              top: `${ghost.y}%`,
              animationDelay: `${ghost.id * 0.5}s`,
              animationDuration: `${3 + ghost.id * 0.5}s`,
            }}
          >
            <Ghost className="w-12 h-12 text-white/30" />
          </div>
        ))}

        {/* Moon with glow */}
        <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-orange-100 shadow-[0_0_80px_20px_rgba(251,191,36,0.3)] animate-pulse" />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4">
          {/* Parallax cursor effect */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 pointer-events-none"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Main heading with chromatic shimmer */}
            <div className="text-center mb-12">
              <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                <span
                  className="bg-gradient-to-r from-orange-600 via-orange-400 via-orange-300 via-yellow-400 to-orange-600 bg-clip-text text-transparent"
                  style={{
                    backgroundSize: "200% auto",
                    animation: "shimmer 3s ease-in-out infinite",
                    textShadow:
                      "0 0 40px rgba(251, 146, 60, 0.5), 0 0 80px rgba(251, 146, 60, 0.3)",
                  }}
                >
                  TD STUDIOS
                </span>
              </h1>
              <p className="text-xl md:text-3xl text-orange-200/80 font-light max-w-3xl mx-auto leading-relaxed">
                Where creativity meets{" "}
                <span className="text-orange-400 font-semibold italic">the supernatural</span>
              </p>
            </div>

            {/* Cybertruck Hero Image */}
            <div className="relative mb-16 group">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative rounded-3xl overflow-hidden border border-orange-500/20 shadow-2xl shadow-orange-500/20">
                <img
                  src="/lovable-uploads/td-cybertruck-scooby.png"
                  alt="TD Studios Halloween Mystery Machine Cybertruck"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 border border-orange-400/30"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Enter The Experience
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-500/50 text-orange-300 hover:bg-orange-500/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                <Ghost className="w-5 h-5 mr-2" />
                View Our Work
              </Button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="relative py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                  Haunted Events & Experiences
                </span>
              </h2>
              <p className="text-lg text-orange-200/70 max-w-2xl mx-auto">
                Transforming ordinary spaces into extraordinary Halloween spectacles
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  src: "/lovable-uploads/td-halloween-rooftop.jpg",
                  title: "Website Design & Development",
                },
                {
                  src: "/lovable-uploads/td-halloween-pool.jpg",
                  title: "Graphic Design & Branding",
                },
                { src: "/lovable-uploads/td-halloween-mansion.jpg", title: "Development" },
                { src: "/lovable-uploads/td-halloween-house.jpg", title: "Social Media Marketing" },
              ].map((image, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden border border-orange-500/20 shadow-xl hover:shadow-orange-500/30 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                    <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dual Photo Slideshow Gallery */}
        <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                  Our Work
                </span>
              </h2>
            </div>

            {/* Slideshow Container */}
            <div className="relative">
              {/* Main slideshow */}
              <div className="overflow-hidden rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-orange-500/20 group">
                    <img
                      src={slides[currentSlide].left.src}
                      alt={slides[currentSlide].left.alt}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Right Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-orange-500/20 group">
                    <img
                      src={slides[currentSlide].right.src}
                      alt={slides[currentSlide].right.alt}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/50 backdrop-blur-sm hover:bg-orange-500/40 transition-all duration-300 flex items-center justify-center group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-orange-300 group-hover:text-orange-100" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/50 backdrop-blur-sm hover:bg-orange-500/40 transition-all duration-300 flex items-center justify-center group"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-orange-300 group-hover:text-orange-100" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-orange-500 w-8"
                        : "bg-orange-500/30 hover:bg-orange-500/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
                Ready to Create Magic?
              </span>
            </h2>
            <p className="text-xl text-orange-200/70 mb-12 max-w-2xl mx-auto">
              Let's conjure up something extraordinary together this Halloween season
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white px-12 py-8 text-xl rounded-full shadow-2xl shadow-orange-500/50 transform hover:scale-105 transition-all duration-300 border-2 border-orange-400/30"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Book Your Spooky Experience
            </Button>
          </div>
        </section>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
            filter: brightness(1) saturate(1.2);
          }
          25% {
            background-position: 50% 50%;
            filter: brightness(1.2) saturate(1.5);
          }
          50% {
            background-position: 100% 50%;
            filter: brightness(1.3) saturate(1.8);
          }
          75% {
            background-position: 50% 50%;
            filter: brightness(1.2) saturate(1.5);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Spooky;
