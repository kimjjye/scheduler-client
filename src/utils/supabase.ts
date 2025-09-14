import { createClient } from "@supabase/supabase-js";

type SupabaseConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};

const supabaseConfig: SupabaseConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "",
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
};

const supabase = createClient(
  supabaseConfig.supabaseUrl,
  supabaseConfig.supabaseKey
);

export default supabase;
