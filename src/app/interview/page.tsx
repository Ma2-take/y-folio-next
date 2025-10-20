"use client";
import { useEffect, useMemo, useState } from "react";
import InterviewSetup from "@/components/InterviewSetup";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";
import { fetchPortfolioPdfData } from "@/lib/api/portfolio";
import { fetchUser } from "@/lib/api/user";
import type { PortfolioPdfData } from "@/types/PortfolioPdf";
import type { InterviewEvaluation } from "@/types/Interview";
import { useAuth } from "@/hooks/useAuth";

// // カテゴリごとのダミー質問（10問ずつ）
// const dummyQuestions = { ... };

export default function InterviewPage() {
  const [step, setStep] = useState<'setup' | 'session' | 'result'>('setup');
  const [questions, setQuestions] = useState<{ id: number; question: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
  const [interviewType, setInterviewType] = useState<'general' | 'technical' | 'behavioral'>('general');
  const [portfolioData, setPortfolioData] = useState<PortfolioPdfData | null>(null);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [portfolioError, setPortfolioError] = useState("");
  const { user, loading: authLoading } = useAuth();
  const providerUid = user?.uid ?? null;

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const loadPortfolio = async () => {
      if (!providerUid) {
        setPortfolioData(null);
        setPortfolioError("ログインが必要です。");
        setPortfolioLoading(false);
        return;
      }

      try {
        setPortfolioError("");
        setPortfolioLoading(true);
        setPortfolioData(null);
        const fetchedUser = await fetchUser(providerUid);
        if (!mounted) return;

        if (!fetchedUser?.id) {
          setPortfolioError("ユーザー情報が見つかりませんでした。");
          return;
        }

        const data = await fetchPortfolioPdfData(fetchedUser.id, { signal: controller.signal });
        if (!mounted) return;
        if (!data.user && !data.portfolio) {
          setPortfolioError("保存済みのポートフォリオが見つかりません。");
          return;
        }
        setPortfolioData(data);
      } catch (error) {
        if (!mounted) return;
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
  console.error("Failed to load portfolio for interview:", error);
        setPortfolioError("ポートフォリオの取得に失敗しました。");
      } finally {
        if (mounted) setPortfolioLoading(false);
      }
    };

    if (!authLoading) {
      loadPortfolio();
    }

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [authLoading, providerUid]);

  const resolvedUser = useMemo(() => portfolioData?.user ?? null, [portfolioData]);
  const resolvedPortfolio = useMemo(() => portfolioData?.portfolio ?? null, [portfolioData]);

  const handleStart = async () => {
    const type = 'general' as const;
    if (!resolvedUser && !resolvedPortfolio) {
      setError("ポートフォリオ情報が読み込めていません。");
      return;
    }

    setLoading(true);
    setError("");
    setInterviewType(type);
    const industry = "";
    const jobType = "";
    
    try {
      const res = await fetch("/api/ai/job-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: resolvedUser,
          portfolio: resolvedPortfolio,
          type,
          industry,
          jobType,
        }),
      });
      if (!res.ok) throw new Error("APIリクエストに失敗しました");
      const data = await res.json();
      setQuestions(data.questions);
      setStep('session');
    } catch (err) {
      console.error("AI質問生成に失敗しました:", err);
      setError("AIによる質問生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async (answers: { questionId: number; answer: string }[]) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/evaluate-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: resolvedUser,
          portfolio: resolvedPortfolio,
          type: interviewType,
          industry: "",
          jobType: "",
          questions,
          answers,
        }),
      });
      if (!res.ok) throw new Error("評価APIリクエストに失敗しました");
      const data = await res.json() as { evaluation: InterviewEvaluation };
      setEvaluation(data.evaluation ?? null);
      setStep('result');
    } catch (err) {
      console.error("AI評価に失敗しました:", err);
      setError("AIによる評価に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep('setup');
    setEvaluation(null);
    setInterviewType('general');
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {(authLoading || portfolioLoading || loading) && <div className="text-lg">読み込み中です。しばらくお待ちください...</div>}
      {!authLoading && !portfolioLoading && (portfolioError || error) && (
        <div className="text-red-500">{portfolioError || error}</div>
      )}
      {!authLoading && !portfolioLoading && !portfolioError && !loading && !error && step === 'setup' && (
    <InterviewSetup onStart={handleStart} />
      )}
      {!authLoading && !portfolioLoading && !portfolioError && !loading && !error && step === 'session' && (
        <InterviewSession onFinish={handleFinish} questions={questions} />
      )}
      {!authLoading && !portfolioLoading && !portfolioError && !loading && !error && step === 'result' && (
        <InterviewResults onRestart={handleRestart} evaluation={evaluation} />
      )}
    </div>
  );
}