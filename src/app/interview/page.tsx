"use client";
import { useState } from "react";
import InterviewSetup from "@/components/InterviewSetup";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";
import { testUser } from "@/data/TestUser";
import { testPortfolio } from "@/data/TestPortfolio";
import { generateInterviewQuestionsWithGemini } from "@/lib/gemini";

export default function InterviewPage() {
  const [step, setStep] = useState<'setup' | 'session' | 'result'>('setup');
  const [questions, setQuestions] = useState<{ id: number; question: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 面接開始時にGemini APIで質問生成
  const handleStart = async () => {
    setLoading(true);
    setError("");
    try {
      const qs = await generateInterviewQuestionsWithGemini({ user: testUser, portfolio: testPortfolio });
      setQuestions(qs);
      setStep('session');
    } catch (e) {
      setError("質問生成に失敗しました。しばらくしてから再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {step === 'setup' && <div className="w-full max-w-md">
        <InterviewSetup onStart={handleStart} />
        {loading && <div className="text-center text-blue-600 mt-4">質問を生成中...</div>}
        {error && <div className="text-center text-red-600 mt-4">{error}</div>}
      </div>}
      {step === 'session' && <InterviewSession onFinish={() => setStep('result')} questions={questions} />}
      {step === 'result' && <InterviewResults onRestart={() => setStep('setup')} />}
    </div>
  );
} 