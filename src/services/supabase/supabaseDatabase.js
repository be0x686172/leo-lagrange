import { supabase } from "./supabaseClient";

export async function supabaseGetUsers() {
    let { data: users, error } = await supabase.from('users').select('*');
    return users;
}