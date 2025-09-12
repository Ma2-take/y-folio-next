"use client";
import { useState } from "react";
import SimpleIndustrySelector from "./SimpleIndustrySelector";

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

interface InterviewSetupProps {
  onStart: (type: string, industry?: string, jobType?: string) => void;
}

export default function InterviewSetup({ onStart }: InterviewSetupProps) {
  const [mode, setMode] = useState<'general' | 'industry'>('general');
  const [type, setType] = useState<'general' | 'technical' | 'behavioral'>('general');

  // 業界特化モードの場合
  if (mode === 'industry') {
    return (
      <div>
        <div className="text-center mb-6">
          <button
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center justify-center mx-auto"
            onClick={() => setMode('general')}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            通常面接に戻る
          </button>
        </div>
        <SimpleIndustrySelector 
          onSelect={(industry, jobType) => {
            onStart('industry', industry, jobType);
          }}
        />
      </div>
    );
  }

  // 通常面接モード
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">AI面接シミュレーション</h2>
      
      {/* モード選択 */}
      <div className="mb-6">
        <label className="block mb-4 font-semibold">面接モードを選択</label>
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-lg border transition font-semibold
              ${mode === 'general' 
                ? 'bg-blue-600 text-white border-blue-700' 
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-50'
              }`}
            onClick={() => setMode('general')}
          >
            通常面接
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-lg border transition font-semibold
              ${mode === 'industry' 
                ? 'bg-blue-600 text-white border-blue-700' 
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-50'
              }`}
            onClick={() => setMode('industry')}
          >
            業界特化面接
          </button>
        </div>
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            業界特化面接では、特定の業界・職種に特化した質問で面接練習ができます
          </p>
        </div>
      </div>

      {/* 面接タイプ選択 */}
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