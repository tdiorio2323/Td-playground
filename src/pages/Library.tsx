import { useState } from "react";
import DesignLibrary from "@/design-library";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/integrations/supabase/auth";
import { grantKey, ROOM_KEYS_UPDATED_EVENT } from "@/lib/roomKeys";
import { useToast } from "@/hooks/use-toast";
import { KeyRound } from "lucide-react";

const Library = () => {
  const { supabase, user } = useSupabase();
  const { toast } = useToast();
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    if (!user?.id) {
      toast({
        title: "Sign in required",
        description: "Authenticate to claim keys and unlock hidden rooms.",
      });
      return;
    }

    setClaiming(true);
    try {
      await grantKey(supabase, user.id, "vip");
      toast({ title: "VIP key added", description: "/vip is now unlocked." });
      window.dispatchEvent(new CustomEvent(ROOM_KEYS_UPDATED_EVENT));
    } catch (error) {
      console.error("Failed to grant VIP key", error);
      toast({
        title: "Unable to grant key",
        description: "Check Supabase logs or try again shortly.",
        variant: "destructive",
      });
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5 text-white">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <KeyRound className="h-5 w-5" />
            Room Keys Access
          </CardTitle>
          <p className="text-sm text-white/70">
            Grab your complimentary VIP key to explore hidden navigation routes.
          </p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Button onClick={handleClaim} disabled={claiming} className="bg-white text-black">
            {claiming ? "Claiming..." : "Claim VIP Key"}
          </Button>
          {!user?.id && (
            <p className="text-xs text-white/60">
              You will need to authenticate before keys can be stored in Supabase.
            </p>
          )}
        </CardContent>
      </Card>

      <DesignLibrary />
    </div>
  );
};

export default Library;
