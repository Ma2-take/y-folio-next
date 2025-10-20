"use client";
interface InterviewSetupProps {
  onStart: () => void | Promise<void>;
}

export default function InterviewSetup({ onStart }: InterviewSetupProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">AI面接シミュレーション</h2>
      <div className="mb-6 text-sm text-gray-700">
        <p className="leading-relaxed">
          総合面接では志望動機や学生時代の経験、自己PRなど幅広いテーマから質問されます。
          想定質問に落ち着いて回答し、回答後にはAIがフィードバックを提示します。
        </p>
      </div>
      
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4"
        onClick={() => onStart()}
      >
        面接を開始
      </button>
    </div>
  );
} 