"use client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Firebase Auth
import { auth } from "@/lib/firebase.client";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // FirebaseユーザーをPrismaに同期
  const syncUserToPrisma = async (user: any) => {
    await fetch("/api/auth/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          uid: user.uid,        // ← Firebase Authの一意ID
          email: user.email,
          name: user.displayName,
        },
      }),
    });
  };

  // メール + パスワード ログイン
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Firebaseでログイン
      const userCredential = await signInWithEmailAndPassword(
        auth(),
        email,
        password
      );
      const user = userCredential.user;

      console.log("Email login success:", user);
      await syncUserToPrisma(user);

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("メールアドレスまたはパスワードが正しくありません");
    } finally {
      setIsLoading(false);
    }
  };

  // Google ログイン
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth(), provider);

      const user = result.user;
      console.log("Google Login Success:", user);
      await syncUserToPrisma(user);

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Googleログインに失敗しました");
    }
  };

  // GitHub ログイン
  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth(), provider);

      const user = result.user;
      console.log("GitHub Login Success:", user);
      await syncUserToPrisma(user);

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("GitHubログインに失敗しました");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
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

        {/* メール＋パスワードログインフォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="email">
              メールアドレス
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="example@university.ac.jp"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="password">
              パスワード
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="パスワード"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-2 hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <a href="#" className="text-indigo-600 hover:underline">
            パスワードをお忘れですか？
          </a>
          <a href="/signup" className="text-indigo-600 hover:underline">
            新規登録はこちら
          </a>
        </div>

        {/* 区切り線 */}
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-3 text-gray-400">または</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Google / GitHub ログインボタン */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <FcGoogle className="mr-2 w-5 h-5" />
            Googleでログイン
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
          >
            <FaGithub className="mr-2 w-5 h-5" />
            GitHubでログイン
          </button>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/recruiter/login"
            className="text-sm text-gray-500 hover:text-indigo-600"
          >
            採用担当者の方はこちら
          </a>
        </div>
      </div>
    </div>
  );
}