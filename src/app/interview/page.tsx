"use client";
import { useState } from "react";
import InterviewSetup from "@/components/InterviewSetup";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";
import { testUser } from "@/data/TestUser";
import { testPortfolio } from "@/data/TestPortfolio";

// // カテゴリごとのダミー質問（10問ずつ）
// const dummyQuestions = { ... };

export default function InterviewPage() {
  const [step, setStep] = useState<'setup' | 'session' | 'result'>('setup');
  const [questions, setQuestions] = useState<{ id: number; question: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [industry, setIndustry] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [evaluation, setEvaluation] = useState<any>(null);

  // 面接開始時にAPI Route経由でGemini APIから質問を取得
  const handleStart = async (type: string, selectedIndustry?: string, selectedJobType?: string) => {
    setLoading(true);
    setError("");
    setIndustry(selectedIndustry || "");
    setJobType(selectedJobType || "");
    
    try {
      const res = await fetch("/api/ai/job-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          user: testUser, 
          portfolio: testPortfolio,
          industry: selectedIndustry,
          jobType: selectedJobType
        }),
      });
      if (!res.ok) throw new Error("APIリクエストに失敗しました");
      const data = await res.json();
      setQuestions(data.questions);
      setStep('session');
    } catch (e) {
      setError("AIによる質問生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = (evaluationResult?: any) => {
    setEvaluation(evaluationResult);
    setStep('result');
  };

  const handleRestart = () => {
    setStep('setup');
    setEvaluation(null);
    setIndustry("");
    setJobType("");
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {loading && <div className="text-lg">AIが質問を生成中です。しばらくお待ちください...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && step === 'setup' && <InterviewSetup onStart={handleStart} />}
      {!loading && !error && step === 'session' && (
        <InterviewSession 
          onFinish={handleFinish} 
          questions={questions}
        />
      )}
      {!loading && !error && step === 'result' && (
        <InterviewResults 
          onRestart={handleRestart} 
          evaluation={evaluation}
        />
      )}
    </div>
  );
} 