import { supabase } from "./supabaseClient";

export async function supabaseDeleteUser(userId) {
    const { data, error } = await supabase.functions.invoke('deleteUser', {
        body: { id: userId },
    });

    if (error) console.log(error);
    return data;
}