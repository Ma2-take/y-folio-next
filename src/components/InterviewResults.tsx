"use client";
// import { IndustryEvaluationResult } from "@/types/Industry";

interface InterviewResultsProps {
  onRestart: () => void;
  evaluation?: any;
}

// フォールバック用の固定結果コンポーネント
const FallbackResults = ({ onRestart }: { onRestart: () => void }) => (
  <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 mt-10 text-center">
    <h2 className="text-2xl font-bold mb-6 text-blue-700">面接結果</h2>
    <div className="bg-blue-50 p-6 rounded-lg shadow mb-6">
      <div className="text-3xl font-bold text-blue-600 mb-2">80/100</div>
      <div className="text-gray-700 mb-4">よくできました！回答の具体性が高く、経験がしっかり伝わっています。</div>
      <ul className="text-left list-disc list-inside text-gray-800">
        <li>技術面の深掘りがあるとさらに良い</li>
        <li>エピソードに数字を入れると説得力UP</li>
      </ul>
    </div>
    <button
      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      onClick={onRestart}
    >
      新しい面接を開始
    </button>
  </div>
);

// 一時的にコメントアウト
// const getScoreColor = (score: number) => {
//   if (score >= 80) return "text-green-600";
//   if (score >= 60) return "text-blue-600";
//   if (score >= 40) return "text-yellow-600";
//   return "text-red-600";
// };

// const getScoreBgColor = (score: number) => {
//   if (score >= 80) return "from-green-50 to-emerald-50";
//   if (score >= 60) return "from-blue-50 to-indigo-50";
//   if (score >= 40) return "from-yellow-50 to-orange-50";
//   return "from-red-50 to-pink-50";
// };

export default function InterviewResults({ onRestart, evaluation }: InterviewResultsProps) {
  // 一時的にフォールバック表示のみ
  return <FallbackResults onRestart={onRestart} />;
} 