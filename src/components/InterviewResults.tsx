"use client";

export default function InterviewResults({ onRestart }: { onRestart: () => void }) {
  return (
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
} 