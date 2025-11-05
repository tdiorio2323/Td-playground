import React from "react";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FloatingNavButtonProps {
  onClick: () => void;
}

export const FloatingNavButton: React.FC<FloatingNavButtonProps> = ({ onClick }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          size="lg"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl bg-white/10 backdrop-blur-lg border-2 border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 z-50 group"
        >
          <Command className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-black/90 text-white border-white/20">
        <p className="flex items-center gap-2">
          <kbd className="px-2 py-1 text-xs bg-white/20 rounded">⌘K</kbd>
          <span>Quick Navigation</span>
        </p>
      </TooltipContent>
    </Tooltip>
  );
};
