"use client";
import { Mail, Lock, Eye, EyeOff, User, GraduationCap } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    grade: "",
    birthDate: "",
    selfIntroduction: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // パスワード確認
    if (formData.password !== formData.confirmPassword) {
      setError("パスワードが一致しません");
      setIsLoading(false);
      return;
    }

    // パスワード強度チェック
    if (formData.password.length < 8) {
      setError("パスワードは8文字以上で入力してください");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          university: formData.university,
          grade: formData.grade,
          birthDate: formData.birthDate,
          selfIntroduction: formData.selfIntroduction
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 新規登録成功
        alert("アカウントが正常に作成されました。ログインページに移動します。");
        router.push("/login");
      } else {
        setError(data.error || "新規登録に失敗しました");
      }
    } catch (error) {
      setError("ネットワークエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-2">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Y-folio</h1>
          <span className="text-sm text-gray-500">学生向けポートフォリオサービス</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">新規登録</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="name">お名前 *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="田中 太郎"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="email">メールアドレス *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="example@university.ac.jp"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="password">パスワード *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="8文字以上で入力"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="confirmPassword">パスワード確認 *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="パスワードを再入力"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="university">大学・学部</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="university"
                name="university"
                type="text"
                value={formData.university}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="東京大学 工学部"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="grade">学年</label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="">選択してください</option>
              <option value="1年生">1年生</option>
              <option value="2年生">2年生</option>
              <option value="3年生">3年生</option>
              <option value="4年生">4年生</option>
              <option value="修士1年">修士1年</option>
              <option value="修士2年">修士2年</option>
              <option value="博士課程">博士課程</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="birthDate">生年月日</label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="selfIntroduction">自己紹介</label>
            <textarea
              id="selfIntroduction"
              name="selfIntroduction"
              value={formData.selfIntroduction}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="あなたの強みや興味のある分野について教えてください"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-2 hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "登録中..." : "新規登録"}
          </button>
        </form>
        
        <div className="flex justify-end mt-4 text-sm">
          <a href="/login" className="text-indigo-600 hover:underline">ログインはこちら</a>
        </div>
        
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-3 text-gray-400">または</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
            <FcGoogle className="mr-2 w-5 h-5" />Googleで登録
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
            <FaGithub className="mr-2 w-5 h-5" />GitHubで登録
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <a href="/recruiter/signup" className="text-sm text-gray-500 hover:text-indigo-600">
            採用担当者の方はこちら
          </a>
        </div>
      </div>
    </div>
  );
} 