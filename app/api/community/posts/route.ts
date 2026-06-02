// app/api/community/posts/route.ts
// Handles question posts and replies with:
// - Firebase Admin SDK (server-side Firestore writes)
// - ID token verification (real user identity)
// - Perspective API toxicity check
// - Cloudinary media upload
// - Notification generation on reply

import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore, verifyIdToken } from "@/lib/firebaseAdmin";
import { SEED_COMMUNITIES } from "@/lib/data/communities";

const PERSPECTIVE_API_KEY   = process.env.PERSPECTIVE_API_KEY;
const TOXICITY_THRESHOLD    = 0.80;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_PRESET     = process.env.CLOUDINARY_UPLOAD_PRESET;

// ── Auth helper ──────────────────────────────────────────────────────────────
async function getAuthUser(req: NextRequest) {
  const header = req.headers.get("authorization") ?? "";
  const token  = header.replace("Bearer ", "").trim();
  if (!token) return null;
  try {
    return await verifyIdToken(token);
  } catch {
    return null;
  }
}

// ── Cloudinary upload ─────────────────────────────────────────────────────────
async function uploadToCloudinary(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", CLOUDINARY_PRESET ?? "");
  form.append("folder", "seeker-circle");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? "Cloudinary upload failed");
  }
  const data = await res.json();
  return data.secure_url as string;
}

// ── Perspective API ───────────────────────────────────────────────────────────
async function checkToxicity(text: string): Promise<number> {
  if (!PERSPECTIVE_API_KEY || !text.trim()) return 0;
  try {
    const res = await fetch(
      `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${PERSPECTIVE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: { text },
          languages: ["en"],
          requestedAttributes: { TOXICITY: {} },
        }),
      }
    );
    const data = await res.json();
    return data?.attributeScores?.TOXICITY?.summaryScore?.value ?? 0;
  } catch {
    return 0;
  }
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // ── Verify user identity ──────────────────────────────────
    const decodedToken = await getAuthUser(req);
    if (!decodedToken) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const uid        = decodedToken.uid;
    const authorName = decodedToken.name ?? decodedToken.email?.split("@")[0] ?? "Seeker";
    const authorPhoto = decodedToken.picture ?? null;

    // ── Parse request body ────────────────────────────────────
    let type = "reply";
    let questionId: string | undefined;
    let title        = "";
    let body         = "";
    let communityIds: string[] = [];
    let linkUrl      = "";
    let mediaFile: File | null = null;

    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const form  = await req.formData();
      type        = (form.get("type") as string) ?? "reply";
      questionId  = form.get("questionId") as string;
      body        = (form.get("body") as string) ?? "";
      linkUrl     = (form.get("linkUrl") as string) ?? "";
      mediaFile   = form.get("media") as File | null;
    } else {
      const json   = await req.json();
      type         = json.type ?? "reply";
      questionId   = json.questionId;
      title        = json.title ?? "";
      body         = json.body ?? "";
      communityIds = json.communityIds ?? [];
    }

    // ── Toxicity check ────────────────────────────────────────
    const textToCheck   = [title, body].filter(Boolean).join(" ");
    const toxicityScore = await checkToxicity(textToCheck);
    const isFlagged     = toxicityScore >= TOXICITY_THRESHOLD;

    // ── Cloudinary upload ─────────────────────────────────────
    const mediaUrls: string[] = [];
    if (mediaFile && mediaFile.size > 0 && CLOUDINARY_CLOUD_NAME) {
      const url = await uploadToCloudinary(mediaFile);
      mediaUrls.push(url);
    }

    const db = getAdminFirestore();
    const now = FieldValue.serverTimestamp();

    // ── Question post ─────────────────────────────────────────
    if (type === "question") {
      if (!title.trim() || communityIds.length === 0) {
        return NextResponse.json(
          { error: "Title and at least one community are required." },
          { status: 400 }
        );
      }

      const docRef = await db.collection("questions").add({
        title:        title.trim(),
        body:         body.trim(),
        communityIds,
        authorId:     uid,
        authorName,
        authorPhoto,
        createdAt:    now,
        updatedAt:    now,
        upvotes:      0,
        upvotedBy:    [],
        replyCount:   0,
        flagCount:    0,
        status:       isFlagged ? "held" : "open",
        toxicityScore,
      });

      const primaryCommunity = SEED_COMMUNITIES.find((c) => c.id === communityIds[0]);
      return NextResponse.json({
        id:            docRef.id,
        communitySlug: primaryCommunity?.slug ?? communityIds[0],
        held:          isFlagged,
      });
    }

    // ── Reply ─────────────────────────────────────────────────
    if (!questionId) {
      return NextResponse.json({ error: "questionId is required for replies." }, { status: 400 });
    }

    const questionRef  = db.collection("questions").doc(questionId);
    const questionSnap = await questionRef.get();
    if (!questionSnap.exists) {
      return NextResponse.json({ error: "Question not found." }, { status: 404 });
    }

    const questionData = questionSnap.data()!;

    // Write reply
    await questionRef.collection("replies").add({
      body:         body.trim(),
      mediaUrls,
      linkUrl:      linkUrl.trim() || null,
      authorId:     uid,
      authorName,
      authorPhoto,
      createdAt:    now,
      upvotes:      0,
      upvotedBy:    [],
      flagCount:    0,
      status:       isFlagged ? "held" : "visible",
      toxicityScore,
    });

    // Increment reply count
    await questionRef.update({ replyCount: FieldValue.increment(1) });

    // ── Generate notification for question author ─────────────
    if (questionData.authorId && questionData.authorId !== uid) {
      await db
        .collection("users")
        .doc(questionData.authorId)
        .collection("notifications")
        .add({
          type:       "new_reply",
          fromUid:    uid,
          fromName:   authorName,
          fromPhoto:  authorPhoto,
          questionId,
          questionTitle: questionData.title ?? "",
          message:    `${authorName} replied to your question`,
          read:       false,
          createdAt:  now,
        });
    }

    return NextResponse.json({ success: true, held: isFlagged });

  } catch (err: unknown) {
    console.error("[community/posts]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── DELETE handler ────────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    // Verify user identity
    const decodedToken = await getAuthUser(req);
    if (!decodedToken) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const uid = decodedToken.uid;
    const db = getAdminFirestore();

    // Verify role in Firestore is admin
    const userSnap = await db.collection("users").doc(uid).get();
    const role = userSnap.data()?.role ?? "member";
    if (role !== "admin") {
      return NextResponse.json({ error: "Insufficient permissions." }, { status: 403 });
    }

    const url = new URL(req.url);
    const targetType = url.searchParams.get("targetType"); // "question" or "reply"
    const targetId = url.searchParams.get("targetId");
    const questionId = url.searchParams.get("questionId"); // required for reply

    if (!targetType || !targetId) {
      return NextResponse.json({ error: "targetType and targetId are required." }, { status: 400 });
    }

    if (targetType === "question") {
      const questionRef = db.collection("questions").doc(targetId);
      
      // Delete replies subcollection first
      const repliesSnap = await questionRef.collection("replies").get();
      const batch = db.batch();
      repliesSnap.docs.forEach((d) => {
        batch.delete(d.ref);
      });
      batch.delete(questionRef);
      await batch.commit();

      return NextResponse.json({ success: true, message: "Question and all replies deleted from database." });
    } else if (targetType === "reply") {
      if (!questionId) {
        return NextResponse.json({ error: "questionId is required for deleting a reply." }, { status: 400 });
      }

      const questionRef = db.collection("questions").doc(questionId);
      const replyRef = questionRef.collection("replies").doc(targetId);

      const batch = db.batch();
      batch.delete(replyRef);
      batch.update(questionRef, { replyCount: FieldValue.increment(-1) });
      await batch.commit();

      return NextResponse.json({ success: true, message: "Reply deleted from database." });
    }

    return NextResponse.json({ error: "Invalid targetType." }, { status: 400 });

  } catch (err: unknown) {
    console.error("[community/posts/DELETE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
