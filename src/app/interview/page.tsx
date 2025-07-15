"use client";
import { useState } from "react";
import InterviewSetup from "@/components/InterviewSetup";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";

// カテゴリごとのダミー質問（10問ずつ）
const dummyQuestions = {
  general: [
    { id: 1, question: "自己紹介をお願いします。" },
    { id: 2, question: "学生時代に最も力を入れたことは何ですか？" },
    { id: 3, question: "今後どのようなキャリアを目指していますか？" },
    { id: 4, question: "あなたの強み・弱みを教えてください。" },
    { id: 5, question: "チームで協力した経験について教えてください。" },
    { id: 6, question: "失敗から学んだことを教えてください。" },
    { id: 7, question: "趣味や特技について教えてください。" },
    { id: 8, question: "最近挑戦したことは何ですか？" },
    { id: 9, question: "自分を一言で表すと？" },
    { id: 10, question: "尊敬する人物とその理由は？" },
  ],
  technical: [
    { id: 1, question: "最近学んだ技術について説明してください。" },
    { id: 2, question: "ポートフォリオで最も技術的に難しかった点は何ですか？" },
    { id: 3, question: "バグやエラーに直面したとき、どのように解決しますか？" },
    { id: 4, question: "得意なプログラミング言語とその理由を教えてください。" },
    { id: 5, question: "Gitやバージョン管理の経験について教えてください。" },
    { id: 6, question: "チーム開発で意識している技術的なポイントは？" },
    { id: 7, question: "アルゴリズムやデータ構造で得意なものは？" },
    { id: 8, question: "最近読んだ技術書や記事について教えてください。" },
    { id: 9, question: "テストや品質保証で心がけていることは？" },
    { id: 10, question: "今後学びたい技術や分野は？" },
  ],
  behavioral: [
    { id: 1, question: "困難な状況をどう乗り越えたか、具体例を教えてください。" },
    { id: 2, question: "リーダーシップを発揮した経験はありますか？" },
    { id: 3, question: "周囲と意見が合わなかったとき、どう対応しますか？" },
    { id: 4, question: "目標達成のために工夫したことは？" },
    { id: 5, question: "失敗や挫折をどう受け止め、次に活かしましたか？" },
    { id: 6, question: "自分の成長を感じたエピソードを教えてください。" },
    { id: 7, question: "時間管理や優先順位付けで意識していることは？" },
    { id: 8, question: "ストレスを感じたときの対処法は？" },
    { id: 9, question: "他者をサポートした経験について教えてください。" },
    { id: 10, question: "新しい環境に適応した経験は？" },
  ],
};

export default function InterviewPage() {
  const [step, setStep] = useState<'setup' | 'session' | 'result'>('setup');
  const [questions, setQuestions] = useState<{ id: number; question: string }[]>([]);

  // 面接開始時にカテゴリごとの質問から3〜6問をランダムで出題
  const handleStart = async (type: string) => {
    const all = dummyQuestions[type as keyof typeof dummyQuestions] || dummyQuestions.general;
    // シャッフル
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    // 3〜6問のランダムな数
    const min = 5, max = 10;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    setQuestions(shuffled.slice(0, num));
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