import { supabase } from "./supabaseClient"

// Mettre à jour 
export async function updateUserAdmin({ userId, email, password }) {
  const session = await supabase.auth.getSession()

  const res = await fetch("https://gjpaydokzdgjyvtpvwku.supabase.co/functions/v1/updateUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.data.session.access_token}`,
    },
    body: JSON.stringify({ userId, email, password })
    });
    return await res.json()
}