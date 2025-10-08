import React from "react";
import {
  ExternalLink,
  Globe,
  UserPlus,
  User,
  Link2,
  Podcast,
} from "lucide-react";

interface PlatformLink {
  label: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

const primaryLinks: PlatformLink[] = [
  {
    label: "Watch Now",
    url: "https://beacons.ai/lexisstarshow/",
    icon: <ExternalLink className="w-6 h-6" />,
    ariaLabel: "Watch Now on Beacons",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/channel/UCWV222tGzK3bTh_2s22222g",
    icon: <img src="/lovable-uploads/youtube-logo.webp" alt="" className="w-8 h-8 object-contain" />,
    ariaLabel: "Visit YouTube Channel",
  },
  {
    label: "OFTV",
    url: "https://www.oftv.co/lexis-star-show",
    icon: <img src="/lovable-uploads/oftv-logo.webp" alt="" className="w-8 h-8 object-contain" />,
    ariaLabel: "Watch on OFTV",
  },
  {
    label: "Spotify",
    url: "https://open.spotify.com/show/0w222p2w222h2F2222S2Q2",
    icon: <img src="/lovable-uploads/spotify-logo.webp" alt="" className="w-8 h-8 object-contain" />,
    ariaLabel: "Listen on Spotify",
  },
  {
    label: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/the-lexis-star-show/id1522222222",
    icon: <Podcast className="w-6 h-6" />,
    ariaLabel: "Listen on Apple Podcasts",
  },
  {
    label: "Amazon Music",
    url: "https://music.amazon.com/podcasts/222b2c22-2222-22f2-b2c2-c22f22b22f22/The-Lexis-Star-Show",
    icon: <img src="/lovable-uploads/amazon-music-logo.webp" alt="" className="w-8 h-8 object-contain" />,
    ariaLabel: "Listen on Amazon Music",
  },
  {
    label: "Website",
    url: "https://www.lexisstarshow.com/",
    icon: <Globe className="w-6 h-6" />,
    ariaLabel: "Visit Official Website",
  },
  {
    label: "Be a Guest/Sponsor",
    url: "https://form.jotform.com/2222222222222222222",
    icon: <UserPlus className="w-6 h-6" />,
    ariaLabel: "Be a Guest or Sponsor",
  },
];

const secondaryLinks: PlatformLink[] = [
  {
    label: "Meet the Host",
    url: "https://www.lexisstar.com/",
    icon: <User className="w-6 h-6" />,
    ariaLabel: "Meet the Host - Lexis Star",
  },
  {
    label: "Lexis Star's Links",
    url: "https://beacons.ai/lexisstar",
    icon: <Link2 className="w-6 h-6" />,
    ariaLabel: "View all Lexis Star Links",
  },
];

export default function MobileCompactLinks() {
  return (
    <div className="w-full px-8 space-y-3">
      {/* Primary Links Grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {primaryLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel}
            title={link.label}
            className="flex flex-col items-center justify-center min-h-[56px] min-w-[56px] p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105 active:scale-95"
          >
            <div className="text-white">{link.icon}</div>
            <span className="hidden sm:block text-white text-xs mt-1 text-center leading-tight">
              {link.label}
            </span>
          </a>
        ))}
      </div>

      {/* More Section (Collapsible) */}
      <details className="group">
        <summary className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 cursor-pointer transition-colors">
          <span className="text-white text-sm font-medium">More Links</span>
          <svg
            className="w-4 h-4 text-white transition-transform group-open:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-3">
          {secondaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              title={link.label}
              className="flex flex-col items-center justify-center min-h-[56px] p-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              <div className="text-white">{link.icon}</div>
              <span className="text-white text-xs mt-1 text-center leading-tight">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </details>
    </div>
  );
}
