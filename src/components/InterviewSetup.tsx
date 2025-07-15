"use client";
import { useState } from "react";

const typeDescriptions: Record<string, string> = {
  general: "総合面接：人物像や志望動機、学生時代の経験など幅広く質問されます。",
  technical: "技術面接：プログラミングや開発経験、技術的な知識・思考力を問う質問が中心です。",
  behavioral: "行動面接：過去の行動や考え方、チームでの役割、リーダーシップなどを深掘りします。",
};

const typeLabels: Record<string, string> = {
  general: "総合面接",
  technical: "技術面接",
  behavioral: "行動面接",
};

export default function InterviewSetup({ onStart }: { onStart: (type: string) => void }) {
  const [type, setType] = useState<'general' | 'technical' | 'behavioral'>('general');

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">AI面接シミュレーション</h2>
      <div className="mb-6">
        <label className="block mb-4 font-semibold">面接タイプを選択</label>
        <div className="flex flex-col gap-4">
          {(['general', 'technical', 'behavioral'] as const).map((t) => (
            <button
              key={t}
              type="button"
              className={`w-full text-left px-6 py-4 rounded-lg border transition font-semibold shadow-sm focus:outline-none
                ${type === t ? 'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-300' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-50'}`}
              onClick={() => setType(t)}
            >
              {typeLabels[t]}
            </button>
          ))}
        </div>
        <div className="mt-6 min-h-[2.5rem] text-blue-700 text-sm">
          {typeDescriptions[type]}
        </div>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
        onClick={() => onStart(type)}
      >
        面接を開始
      </button>
    </div>
  );
} 