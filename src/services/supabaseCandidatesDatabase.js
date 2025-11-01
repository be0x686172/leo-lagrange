import { supabase } from "./supabaseClient";

export async function supabaseGetCandidates() {
    let { data: users, error } = await supabase.from('users').select('*');
    return users;
}

export async function supabaseGetCandidateById(candidateId) {
    let { data: user, error } = await supabase.from('candidates').select("*").eq('id', candidateId);
    return user;
}

export async function supabaseUpdateCandidate(candidat) {
    let { data, error } = await supabase.from('users')
    .update({ ...candidat })
    .eq('id', candidat.id)
    .select();

    if (error) console.error(error);
    return data;
}