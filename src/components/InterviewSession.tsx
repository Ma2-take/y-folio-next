"use client";
import { useState, useRef, useEffect } from "react";

interface Question {
  id: number;
  question: string;
}

type HistoryItem = { type: 'question' | 'answer'; text: string };

interface InterviewSessionProps {
  onFinish: (evaluation?: any) => void;
  questions: Question[];
  industry?: string;
  jobType?: string;
}

export default function InterviewSession({ onFinish, questions }: InterviewSessionProps) {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>(
    questions[0] ? [{ type: 'question', text: questions[0].question }] : []
  );
  // 回答履歴のref配列
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 面接終了時の処理（一時的に簡素化）
  const handleFinish = () => {
    onFinish(null);
  };

  // 回答送信
  const handleSend = () => {
    if (!answer.trim()) return;
    const newHistory: HistoryItem[] = [...history, { type: 'answer', text: answer }];
    if (current < questions.length - 1) {
      newHistory.push({ type: 'question', text: questions[current + 1].question });
      setCurrent(current + 1);
      setAnswer("");
      setHistory(newHistory);
    } else {
      setHistory([...newHistory, { type: 'question', text: "面接は終了です。お疲れさまでした！" }]);
      setAnswer("");
      setTimeout(handleFinish, 2000);
    }
  };

  // 履歴クリックで該当回答にスクロール
  const handleHistoryClick = (idx: number) => {
    answerRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // チャット本体の幅を調整し、履歴サイドバーを追加
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-16 mt-10 flex flex-row h-[80vh]">
      {/* 履歴サイドバー */}
      <div className="w-64 pr-8 border-r flex flex-col">
        <h3 className="text-lg font-bold mb-4 text-blue-700">回答履歴</h3>
        <div className="flex-1 overflow-y-auto space-y-2">
          {history
            .map((item, idx) => ({ ...item, idx }))
            .filter(item => item.type === 'answer')
            .map((item, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded hover:bg-blue-50 border border-transparent hover:border-blue-300 text-gray-800 truncate"
                onClick={() => handleHistoryClick(item.idx)}
              >
                {item.text}
              </button>
            ))}
        </div>
      </div>
      {/* チャット本体 */}
      <div className="flex-1 flex flex-col h-full pl-8">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {history.map((item, idx) => (
            <div
              key={idx}
              ref={el => {
                if (item.type === 'answer') answerRefs.current[idx] = el;
              }}
              className={`flex ${item.type === 'question' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`px-4 py-2 rounded-lg ${item.type === 'question' ? 'bg-blue-100 text-blue-900' : 'bg-gray-200 text-gray-800'}`}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
        {current < questions.length && (
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-lg p-2"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="回答を入力してください"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={handleSend}
              disabled={!answer.trim()}
            >
              送信
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 