"use client";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Firebase Auth
import { auth } from "@/lib/firebase.client";
import { useAuth } from "@/hooks/useAuth";
import type { UserCredential } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoadingSpinner = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
    <p className="text-sm text-gray-600">{message}</p>
  </div>
);

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <LoadingSpinner message="読み込み中です…" />
  </div>
);

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      router.replace("/dashboard");
      return;
    }

    setInitializing(false);
  }, [authLoading, user, router]);

  if (authLoading || initializing) {
    return <LoadingScreen />;
  }

  // FirebaseユーザーをPrismaに同期
  const syncUserToPrisma = async (firebaseUser: { uid: string; email: string | null; displayName: string | null }) => {
    await fetch("/api/auth/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
            uid: firebaseUser.uid,        // ← Firebase Authの一意ID
            email: firebaseUser.email,
            name: firebaseUser.displayName,
        },
      }),
    });
  };

  // Google ログイン
  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth(), provider);

      const user = result.user;
      console.log("Google Login Success:", user);
      await syncUserToPrisma(user);

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Googleログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* ヘッダー */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Y-folio</h1>
          <span className="text-sm text-gray-500">
            学生向けポートフォリオサービス
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          ログイン
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Google ログインボタン */}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex w-full max-w-xs items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <FcGoogle className="mr-2 w-5 h-5" />
            Googleでログイン
          </button>
        </div>


      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <LoadingSpinner message="ログイン処理中です…" />
        </div>
      )}
    </div>
  );
}