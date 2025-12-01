import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AuthCardButton = {
  label: string;
  href: string;
};

type AuthCardBaseProps = {
  name: string;
  headline?: string;
  avatar?: string;
  accentGradient?: string; // tailwind gradient classes
  backgroundVariant?: "glass" | "cyber-grid" | "night-club";
  buttons?: AuthCardButton[];
  tags?: string[];
  className?: string;
};

export function AuthCardBase({
  name,
  headline,
  avatar,
  accentGradient = "from-purple-500 via-pink-500 to-orange-400",
  backgroundVariant = "glass",
  buttons = [],
  tags = [],
  className,
}: AuthCardBaseProps) {
  const bgClass = getBackgroundClass(backgroundVariant);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div
        className={cn(
          "relative w-full max-w-md rounded-3xl p-[1px] overflow-hidden",
          "bg-gradient-to-br",
          accentGradient,
          className
        )}
      >
        {/* Inner glass card */}
        <div
          className={cn(
            "relative z-10 rounded-3xl p-6 sm:p-8",
            "backdrop-blur-2xl bg-black/70 border border-white/5",
            bgClass
          )}
        >
          {/* Avatar */}
          <div className="flex flex-col items-center text-center space-y-4">
            {avatar && (
              <div className="relative">
                <div
                  className={cn(
                    "absolute inset-0 blur-3xl opacity-50",
                    "bg-gradient-to-tr",
                    accentGradient
                  )}
                />
                <div className="relative h-24 w-24 rounded-full overflow-hidden border border-white/10 shadow-xl">
                  <img
                    src={avatar}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                {name}
              </h1>
              {headline && (
                <p className="text-sm sm:text-base text-white/60">
                  {headline}
                </p>
              )}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white/80 text-[11px] uppercase tracking-wide"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          {buttons.length > 0 && (
            <div className="mt-6 space-y-3">
              {buttons.map((btn) => (
                <a key={btn.label} href={btn.href} target="_blank" rel="noreferrer">
                  <Button
                    className={cn(
                      "w-full justify-between rounded-2xl px-4 py-5 text-sm sm:text-base",
                      "bg-white/5 hover:bg-white/10 border border-white/10",
                      "transition-all duration-200"
                    )}
                    variant="outline"
                  >
                    <span>{btn.label}</span>
                    <span className="text-xs text-white/60">Open</span>
                  </Button>
                </a>
              ))}
            </div>
          )}

          {/* Footer hint */}
          <div className="mt-5 text-center text-[11px] uppercase tracking-[0.2em] text-white/35">
            TD STUDIOS PLAYGROUND
          </div>
        </div>
      </div>
    </div>
  );
}

function getBackgroundClass(variant: AuthCardBaseProps["backgroundVariant"]) {
  switch (variant) {
    case "cyber-grid":
      return "bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%),_linear-gradient(to_bottom,_rgba(15,23,42,0.95),_rgba(0,0,0,1))]";
    case "night-club":
      return "bg-[radial-gradient(circle_at_10%_0%,_rgba(236,72,153,0.22),_transparent_55%),_radial-gradient(circle_at_90%_100%,_rgba(56,189,248,0.25),_transparent_60%),_#020617]";
    case "glass":
    default:
      return "bg-slate-950/80";
  }
}
