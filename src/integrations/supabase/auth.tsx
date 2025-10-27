import { createContext, useContext, ReactNode, useEffect, useMemo, useState } from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

interface SupabaseContextType {
  supabase: SupabaseClient;
  user: User | null;
  loading: boolean;
}

const SupabaseContext = createContext<SupabaseContextType>({
  supabase,
  user: null,
  loading: true
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!isMounted) return;
        setUser(data?.user ?? null);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription?.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ supabase, user, loading }), [user, loading]);

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => useContext(SupabaseContext);

export const useAuth = () => {
  const { user, loading } = useSupabase();
  return { user, loading };
};
