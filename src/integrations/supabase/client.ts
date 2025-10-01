// Frontend-only mock client - no real database connections
import type { Database } from './types';
import { createMockSupabaseClient } from './mockClient';

// This project uses mock data only - no real API connections
// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

const mockClient = createMockSupabaseClient();

export const supabase = mockClient as any;