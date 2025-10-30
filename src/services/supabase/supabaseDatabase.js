import { supabase } from "./supabaseClient";

export async function supabaseGetUsers() {
    let { data: users, error } = await supabase.from('users').select('*');
    return users;
}

export async function supabaseGetUserById(userId) {
    let { data: user, error } = await supabase.from('users').select("*").eq('id', userId);
    return user;
}