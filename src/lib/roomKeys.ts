import type { SupabaseClient } from "@supabase/supabase-js";

export type KeySlug = "vip" | "backroom" | "testing-lab";

const TABLE_NAME = "room_keys";
export const ROOM_KEYS_UPDATED_EVENT = "td-room-keys-updated";

const ensureUser = (userId?: string | null) => {
  if (!userId) {
    throw new Error("room key actions require a valid user id");
  }
  return userId;
};

export const hasKey = async (supabase: SupabaseClient, userId: string, key: KeySlug) => {
  const { count, error } = await supabase
    .from(TABLE_NAME)
    .select("id", { count: "exact", head: true })
    .eq("user_id", ensureUser(userId))
    .eq("key_slug", key);

  if (error) {
    throw error;
  }

  return Boolean(count && count > 0);
};

export const grantKey = async (supabase: SupabaseClient, userId: string, key: KeySlug) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({ user_id: ensureUser(userId), key_slug: key })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const listKeys = async (supabase: SupabaseClient, userId: string): Promise<KeySlug[]> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("key_slug")
    .eq("user_id", ensureUser(userId));

  if (error) {
    throw error;
  }

  return (data ?? []).map((record) => record.key_slug as KeySlug);
};
