"use client";
import { useState } from "react";

export default function InterviewSetup({ onStart }: { onStart: (type: string) => void }) {
  const [type, setType] = useState("general");
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">AI面接シミュレーション</h2>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">面接タイプを選択</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" value="general" checked={type === "general"} onChange={() => setType("general")} />
            総合面接
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="technical" checked={type === "technical"} onChange={() => setType("technical")} />
            技術面接
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="behavioral" checked={type === "behavioral"} onChange={() => setType("behavioral")} />
            行動面接
          </label>
        </div>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        onClick={() => onStart(type)}
      >
        面接を開始
      </button>
    </div>
  );
} 