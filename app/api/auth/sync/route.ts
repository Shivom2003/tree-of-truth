// app/api/auth/sync/route.ts
// Secure server-side user profile synchronization and admin role escalation.
// Handles auto-escalating roles for predefined admin emails.

import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore, verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const header = req.headers.get("authorization") ?? "";
    const token  = header.replace("Bearer ", "").trim();
    if (!token) {
      return NextResponse.json({ error: "Authorization required" }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = await verifyIdToken(token);
    } catch (err) {
      console.error("[api/auth/sync] Token verification failed:", err);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const displayName = decodedToken.name ?? email?.split("@")[0] ?? "Seeker";
    const photoURL = decodedToken.picture ?? null;

    const db = getAdminFirestore();
    const userRef = db.collection("users").doc(uid);
    const snap = await userRef.get();

    // Check if the user's email is in the admin whitelist
    const adminEmailsStr = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
    const adminEmails = adminEmailsStr.split(",").map(e => e.trim().toLowerCase());
    const isAdminEmail = email && adminEmails.includes(email.toLowerCase());

    let role = isAdminEmail ? "admin" : "member";

    if (!snap.exists) {
      // Create a brand new profile
      const newProfile = {
        displayName,
        email: email ?? null,
        photoURL,
        bio: "",
        joinedAt: FieldValue.serverTimestamp(),
        communities: [],
        role,
        isBanned: false,
      };
      await userRef.set(newProfile);
      return NextResponse.json({
        uid,
        email,
        displayName,
        photoURL,
        role,
      });
    } else {
      const data = snap.data() || {};
      const currentRole = data.role ?? "member";
      const updates: Record<string, any> = {};

      // If email matches admin list, promote if they are not already admin
      if (isAdminEmail && currentRole !== "admin") {
        updates.role = "admin";
        role = "admin";
      } else {
        role = currentRole;
      }

      // Sync display properties from google auth provider if missing in DB
      if (!data.displayName && displayName) updates.displayName = displayName;
      if (!data.photoURL && photoURL) updates.photoURL = photoURL;
      if (!data.email && email) updates.email = email;

      if (Object.keys(updates).length > 0) {
        await userRef.update(updates);
      }

      return NextResponse.json({
        uid,
        email: data.email ?? email,
        displayName: updates.displayName ?? data.displayName ?? displayName,
        photoURL: updates.photoURL ?? data.photoURL ?? photoURL,
        role,
      });
    }
  } catch (err: unknown) {
    console.error("[api/auth/sync]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
