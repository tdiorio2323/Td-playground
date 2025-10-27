import type { SupabaseClient } from "@supabase/supabase-js";

const DAILY_SPIN_TABLE = "daily_spin_log";
const RESULT_SEPARATOR = "|";

export interface DailySpinLog {
  id: string;
  user_id: string;
  spun_at: string;
  result: string;
  win: boolean;
  route: string | null;
}

const getUtcDayBounds = () => {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return start.toISOString();
};

export const msUntilUtcMidnight = () => {
  const now = new Date();
  const nextMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return nextMidnight - now.getTime();
};

export const formatSpinResult = (tokens: string[]) => tokens.join(RESULT_SEPARATOR);

export const parseSpinResult = (result: string) => {
  if (!result) return [];
  return result
    .split(RESULT_SEPARATOR)
    .map(token => token.trim())
    .filter(token => token.length > 0);
};

export const getTodaySpin = async (
  client: SupabaseClient,
  userId: string
): Promise<DailySpinLog | null> => {
  const { data, error } = await client
    .from<DailySpinLog>(DAILY_SPIN_TABLE)
    .select("*")
    .eq("user_id", userId)
    .gte("spun_at", getUtcDayBounds())
    .order("spun_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return data ?? null;
};

export const logSpin = async (
  client: SupabaseClient,
  userId: string,
  result: string,
  win: boolean,
  route?: string
) => {
  const payload = {
    user_id: userId,
    result,
    win,
    route: route ?? null
  };

  const { error } = await client.from(DAILY_SPIN_TABLE).insert(payload);
  if (error) {
    throw error;
  }
};
