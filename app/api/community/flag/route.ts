// app/api/community/flag/route.ts
// Records a flag/report using Admin SDK. Auto-hides content at threshold.

import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore, verifyIdToken } from "@/lib/firebaseAdmin";

const AUTO_HIDE_THRESHOLD = 3;

export async function POST(req: NextRequest) {
  try {
    // Verify auth
    const header = req.headers.get("authorization") ?? "";
    const token  = header.replace("Bearer ", "").trim();
    if (!token) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

    let uid: string;
    try {
      const decoded = await verifyIdToken(token);
      uid = decoded.uid;
    } catch {
      return NextResponse.json({ error: "Invalid token." }, { status: 401 });
    }

    const { targetType, targetId, reason } = await req.json();
    if (!targetType || !targetId || !reason) {
      return NextResponse.json({ error: "targetType, targetId, and reason are required." }, { status: 400 });
    }

    const db  = getAdminFirestore();
    const now = FieldValue.serverTimestamp();

    // Record the report
    await db.collection("reports").add({
      targetType, targetId, reason,
      reportedBy: uid,
      createdAt:  now,
      resolved:   false,
    });

    // Get target ref
    let targetRef: FirebaseFirestore.DocumentReference;
    if (targetType === "question") {
      targetRef = db.collection("questions").doc(targetId);
    } else {
      const [qId, rId] = targetId.split("/");
      targetRef = db.collection("questions").doc(qId).collection("replies").doc(rId);
    }

    const snap = await targetRef.get();
    if (!snap.exists) return NextResponse.json({ error: "Content not found." }, { status: 404 });

    const newFlagCount = (snap.data()?.flagCount ?? 0) + 1;
    await targetRef.update({
      flagCount: FieldValue.increment(1),
      ...(newFlagCount >= AUTO_HIDE_THRESHOLD && { status: "held" }),
    });

    return NextResponse.json({ success: true, autoHidden: newFlagCount >= AUTO_HIDE_THRESHOLD });
  } catch (err) {
    console.error("[community/flag]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
