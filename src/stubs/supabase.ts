type Row = Record<string, unknown>;
export const supabase = {
  from: (_table: string) => ({
    select: async (_q?: string) => ({ data: [] as Row[], error: null }),
    insert: async (_v: Row | Row[]) => ({ data: null, error: null }),
    update: async (_v: Row) => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
  }),
} as const;
