import { ReactNode, useEffect, useState, useCallback } from "react";
import { useSupabase } from "@/integrations/supabase/auth";
import { hasKey, type KeySlug } from "@/lib/roomKeys";
import KeyGate from "./KeyGate";

interface RequireKeyProps {
  keySlug: KeySlug;
  children: ReactNode;
}

const RequireKey = ({ keySlug, children }: RequireKeyProps) => {
  const { supabase, user } = useSupabase();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkKey = useCallback(async () => {
    if (!user?.id) {
      setAllowed(false);
      setLoading(false);
      return;
    }

    try {
      const hasRoomKey = await hasKey(supabase, user.id, keySlug);
      setAllowed(hasRoomKey);
    } catch (error) {
      console.error("Failed to check room key", error);
      setAllowed(false);
    } finally {
      setLoading(false);
    }
  }, [keySlug, supabase, user?.id]);

  useEffect(() => {
    setLoading(true);
    checkKey();
  }, [checkKey]);

  if (loading) {
    return null;
  }

  if (!allowed) {
    return <KeyGate reason={`You need the "${keySlug}" key to access this room.`} />;
  }

  return <>{children}</>;
};

export default RequireKey;
