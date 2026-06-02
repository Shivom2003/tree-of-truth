// lib/firebaseAdmin.ts
// Firebase Admin SDK — used in API routes for authenticated Firestore writes.
// Requires FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON in .env.local
//
// To get the service account key:
//   Firebase Console → Project Settings → Service Accounts → Generate new private key
//   Copy the entire JSON and paste it (minified, on one line) as:
//   FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"tree-of-truth-f17e9",...}

import * as admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

function getAdminApp(): admin.app.App {
  if (admin.apps.length) return admin.apps[0]!;

  const raw = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error(
      "FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON is not set in .env.local. " +
      "Download a service account key from Firebase Console → Project Settings → Service Accounts."
    );
  }

  const serviceAccount = JSON.parse(raw) as ServiceAccount;
  return admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

export function getAdminFirestore() {
  getAdminApp();
  return admin.firestore();
}

export async function verifyIdToken(token: string) {
  getAdminApp();
  return admin.auth().verifyIdToken(token);
}
