import { supabase } from "./supabaseClient";

export async function supabaseGetUsers() {
    let { data: users, error } = await supabase.from('users').select('*');
    return users;
}

export async function supabaseGetUserById(userId) {
    let { data: user, error } = await supabase.from('users').select("*").eq('id', userId);
    return user;
}

export async function supabaseUpdateUser(user) {
    
    const { id, name, firstname, email, role, candidates_access, interviews_access } = user;

    let { data, error } = await supabase.from('users')
    .update({ name, firstname, email, role, candidates_access, interviews_access })
    .eq('id', id)
    .select();

    if (error) console.error(error);
    return data;
}