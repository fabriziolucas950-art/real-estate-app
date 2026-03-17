import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yjtljilaxvdescadkzqk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Ik5EOjfzdK1wVYanYITuuw_bObZw1ak';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
