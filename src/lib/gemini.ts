import { User } from "@/types/User";
import { Portfolio } from "@/types/Portforio";

// Gemini API連携用（ダミー実装）
// 実際のAPI連携時は @google/generative-ai を利用

export async function generateInterviewQuestions({ user, portfolio }: { user: User; portfolio: Portfolio }) {
  // 実際はGemini APIにリクエストして質問を生成
  // ここではダミーの質問リストを返す
  return [
    { id: 1, question: `${user.name}さんの自己紹介をお願いします。` },
    { id: 2, question: `ポートフォリオで最も力を入れた経験について教えてください。` },
    { id: 3, question: `今後どのようなキャリアを目指していますか？` },
  ];
} 