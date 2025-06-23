"use client";
import { Building2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React from "react";

export default function RecruiterLoginPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Building2 className="w-10 h-10 text-indigo-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Y-folio</h1>
          <span className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded-full">採用担当者専用</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">ログイン</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="email">メールアドレス</label>
            <input id="email" type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="example@company.co.jp" disabled />
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="password">パスワード</label>
            <input id="password" type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="パスワード" disabled />
          </div>
          <button type="button" className="w-full bg-indigo-400 text-white py-2 rounded-lg font-semibold mt-2 cursor-not-allowed" disabled>ログイン</button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <a href="#" className="text-indigo-600 hover:underline">パスワードをお忘れですか？</a>
          <a href="#" className="text-indigo-600 hover:underline">新規登録はこちら</a>
        </div>
        <div className="my-6 flex items-center">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-3 text-gray-400">または</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 bg-gray-100 text-gray-500 cursor-not-allowed" disabled>
            <FcGoogle className="mr-2 w-5 h-5" />Googleでログイン
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 bg-gray-100 text-gray-500 cursor-not-allowed" disabled>
            <FaGithub className="mr-2 w-5 h-5" />GitHubでログイン
          </button>
        </div>
      </div>
    </div>
  );
} 