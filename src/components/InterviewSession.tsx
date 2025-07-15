"use client";
import { useState } from "react";
import { Mic, MicOff, ArrowLeft, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
}

export default function InterviewSession({ onFinish, questions }: { onFinish: () => void; questions: Question[] }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="text-center text-gray-500">質問がありません</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 mt-10">
      <h3 className="text-lg font-semibold mb-4 text-blue-700">質問 {index + 1} / {questions.length}</h3>
      <p className="mb-6 text-gray-800">{questions[index].question}</p>
      <textarea
        className="w-full p-3 border rounded-lg mb-4 focus:outline-blue-400"
        rows={4}
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="回答を入力してください"
      />
      <div className="flex gap-2 mb-4">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isRecording ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          onClick={() => setIsRecording(r => !r)}
        >
          {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isRecording ? '録音停止' : '録音開始'}
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />前の質問
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
          onClick={() => {
            if (index < questions.length - 1) {
              setIndex(i => i + 1);
              setAnswer("");
            } else {
              onFinish();
            }
          }}
        >
          {index < questions.length - 1 ? <>次の質問<ArrowRight className="w-4 h-4 ml-1" /></> : '面接を終了'}
        </button>
      </div>
    </div>
  );
} 