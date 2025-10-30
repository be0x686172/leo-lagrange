import { supabase } from "./supabaseClient";

export async function supabaseDeleteUserAuth(userId) {
    const { data, error } = await supabase.functions.invoke('deleteUser', {
        body: { id: userId },
    });

    if (error) console.log(error);
    return data;
}

export async function supabaseUpdateUserAuth(user) {
    const {id, email, password} = user;
    
    const { data, error } = await supabase.functions.invoke('updateUser', {
        body: { id: id, email: email, password: password },
    });

    if (error) console.log(error);

    return data;
}