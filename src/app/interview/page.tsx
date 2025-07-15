"use client";
import { useState } from "react";
import InterviewSetup from "@/components/InterviewSetup";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";

export default function InterviewPage() {
  const [step, setStep] = useState<'setup' | 'session' | 'result'>('setup');
  const [questions, setQuestions] = useState<{ id: number; question: string }[]>([]);

  // ダミーの質問リスト
  const dummyQuestions = [
    { id: 1, question: "自己紹介をお願いします。" },
    { id: 2, question: "ポートフォリオで最も力を入れた経験について教えてください。" },
    { id: 3, question: "今後どのようなキャリアを目指していますか？" },
  ];

  // 面接開始時にダミー質問をセット
  const handleStart = async () => {
    setQuestions(dummyQuestions);
    setStep('session');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {step === 'setup' && <InterviewSetup onStart={handleStart} />}
      {step === 'session' && <InterviewSession onFinish={() => setStep('result')} questions={questions} />}
      {step === 'result' && <InterviewResults onRestart={() => setStep('setup')} />}
    </div>
  );
} 