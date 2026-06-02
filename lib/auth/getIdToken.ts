// lib/auth/getIdToken.ts
// Client-side helper to get the current user's Firebase ID token.
// Used in fetch calls to API routes that require authentication.

import { auth } from "@/lib/firebase";

/**
 * Returns the current user's fresh ID token, or null if not signed in.
 * Pass this as the Authorization header: `Bearer <token>`
 */
export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}
