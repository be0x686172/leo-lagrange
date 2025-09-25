import { supabase } from "./supabaseClient";

// Récupérer un utilisateur par id
export async function getUserById(id) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

// Mettre à jour un utilisateur
export async function updateUser(id, payload) {
    const { data, error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}