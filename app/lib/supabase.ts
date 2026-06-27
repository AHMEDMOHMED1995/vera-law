import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://kvgsciegqnkasocwljtq.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_9xJkkLIpGxzJrEsUKOl6Og_2vxcQF4w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);