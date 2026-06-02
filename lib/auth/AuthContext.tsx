"use client";

// lib/auth/AuthContext.tsx
// Global authentication context — provides user, loading state, and auth actions

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "member" | "moderator" | "admin";
}

interface AuthContextType {
  user: AuthUser | null;
  firebaseUser: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  openAuthModal: (mode?: "login" | "signup") => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const googleProvider = new GoogleAuthProvider();

async function ensureUserProfile(user: User): Promise<AuthUser> {
  const token = await user.getIdToken();
  const res = await fetch("/api/auth/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to sync user profile with server");
  }
  const updatedData = await res.json();

  return {
    uid: user.uid,
    email: user.email,
    displayName: updatedData.displayName ?? "Seeker",
    photoURL: updatedData.photoURL ?? null,
    role: (updatedData.role as AuthUser["role"]) ?? "member",
  };
}

// Global modal trigger — stored outside React so non-component code can call it
let _openAuthModal: ((mode?: "login" | "signup") => void) | null = null;
export function triggerAuthModal(mode: "login" | "signup" = "login") {
  _openAuthModal?.(mode);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  const openAuthModal = (mode: "login" | "signup" = "login") => {
    setModalMode(mode);
    setModalOpen(true);
  };

  useEffect(() => {
    _openAuthModal = openAuthModal;
    return () => { _openAuthModal = null; };
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        const profile = await ensureUserProfile(fbUser);
        setUser(profile);
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, firebaseUser, loading, signIn, signUp, signInWithGoogle, signOut, openAuthModal }}
    >
      {children}
      {/* Lazy-import the modal to keep the bundle small */}
      {modalOpen && (
        <AuthModalLazy
          mode={modalMode}
          onClose={() => setModalOpen(false)}
          onModeChange={setModalMode}
        />
      )}
    </AuthContext.Provider>
  );
}

// Lazy wrapper to avoid circular imports
function AuthModalLazy({
  mode,
  onClose,
  onModeChange,
}: {
  mode: "login" | "signup";
  onClose: () => void;
  onModeChange: (m: "login" | "signup") => void;
}) {
  // Dynamic import resolved at call-site since we're already client-side
  const [Comp, setComp] = useState<React.ComponentType<{
    mode: "login" | "signup";
    onClose: () => void;
    onModeChange: (m: "login" | "signup") => void;
  }> | null>(null);

  useEffect(() => {
    import("@/components/auth/AuthModal").then((m) => setComp(() => m.default));
  }, []);

  if (!Comp) return null;
  return <Comp mode={mode} onClose={onClose} onModeChange={onModeChange} />;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
