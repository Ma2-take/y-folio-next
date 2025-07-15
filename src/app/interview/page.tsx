"use client";
import { useState } from "react";
import InterviewSetup from "@/components/InterviewSetup";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";
import { testUser } from "@/data/TestUser";
import { testPortfolio } from "@/data/TestPortfolio";
import { generateInterviewQuestions } from "@/lib/gemini";

export default function InterviewPage() {
  const [step, setStep] = useState<'setup' | 'session' | 'result'>('setup');
  const [questions, setQuestions] = useState<{ id: number; question: string }[]>([]);

  // 面接開始時にAI質問生成
  const handleStart = async () => {
    const qs = await generateInterviewQuestions({ user: testUser, portfolio: testPortfolio });
    setQuestions(qs);
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