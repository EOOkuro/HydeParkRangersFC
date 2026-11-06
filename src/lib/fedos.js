// FedOS registration. Every sign-up goes straight to this site's own league/club in FedOS (by its friendly name),
// where the parent can sign in with the same email to see and change their details.
// Set VITE_FEDOS_URL (your Supabase project URL) and VITE_FEDOS_ANON_KEY (the public anon key) in Vercel.
const URL_ = import.meta.env.VITE_FEDOS_URL || "";
const KEY = import.meta.env.VITE_FEDOS_ANON_KEY || "";

export const fedosReady = Boolean(URL_ && KEY);
export const FEDOS_APP = import.meta.env.VITE_FEDOS_APP || "https://thefedos.com";

export async function registerWithFedos(slug, formData) {
  const res = await fetch(`${URL_}/rest/v1/rpc/submit_registration_by_slug`, {
    method: "POST",
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_slug: slug, form_data: formData }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    // The database words its own errors for people (missing email, invalid date of birth, form closed).
    throw new Error(body.message || "We could not save your registration.");
  }
  return res.json();
}
