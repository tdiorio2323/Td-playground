import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Grid, Library as LibraryIcon, Search } from "lucide-react";

export function PlaygroundNavbar() {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 sm:px-8">
        <div className="flex items-center gap-2 mr-8 cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="font-bold text-white">TD</span>
          </div>
          <span className="font-bold text-white hidden sm:inline-block">Playground</span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/directory")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Grid className="mr-2 h-4 w-4" />
            Directory
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/library")}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <LibraryIcon className="mr-2 h-4 w-4" />
            Library
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
          >
            <Search className="mr-2 h-4 w-4" />
            Search...
            <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/50 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      </div>
    </div>
  );
}
