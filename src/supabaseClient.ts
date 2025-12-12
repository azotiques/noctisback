import {createClient} from "@supabase/supabase-js";

const Url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(Url, key);