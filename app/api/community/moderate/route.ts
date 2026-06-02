// app/api/community/moderate/route.ts
// Admin-only moderation endpoint using Firebase Admin SDK + role verification.

import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore, verifyIdToken } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    // Verify admin identity via Firebase ID token + role check
    const header = req.headers.get("authorization") ?? "";
    const token  = header.replace("Bearer ", "").trim();
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const db = getAdminFirestore();
    let uid: string;
    try {
      const decoded = await verifyIdToken(token);
      uid = decoded.uid;
    } catch {
      return NextResponse.json({ error: "Invalid token." }, { status: 401 });
    }

    // Check role in Firestore
    const userSnap = await db.collection("users").doc(uid).get();
    const role     = userSnap.data()?.role ?? "member";
    if (!["moderator", "admin"].includes(role)) {
      return NextResponse.json({ error: "Insufficient permissions." }, { status: 403 });
    }

    const { action, targetType, targetId, questionId } = await req.json();

    let targetRef: FirebaseFirestore.DocumentReference;
    if (targetType === "question") {
      targetRef = db.collection("questions").doc(targetId);
    } else {
      targetRef = db.collection("questions").doc(questionId).collection("replies").doc(targetId);
    }

    const newStatus = action === "approve"
      ? (targetType === "question" ? "open" : "visible")
      : "removed";

    await targetRef.update({
      status:      newStatus,
      moderatedAt: FieldValue.serverTimestamp(),
      moderatedBy: uid,
      flagCount:   0,
    });

    return NextResponse.json({ success: true, newStatus });
  } catch (err) {
    console.error("[community/moderate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
