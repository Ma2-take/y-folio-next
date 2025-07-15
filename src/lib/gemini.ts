import { User } from "@/types/User";
import { Portfolio } from "@/types/Portforio";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini APIキーが設定されていません。.env.localを確認してください。");
}

export const genAI = new GoogleGenerativeAI(apiKey);

// Gemini APIを使った面接質問生成（本実装）
export async function generateInterviewQuestionsWithGemini({ user, portfolio }: { user: User; portfolio: Portfolio }) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
あなたは面接官です。以下の応募者情報をもとに、面接で使う質問を5つ日本語で作成してください。

【応募者情報】
氏名: ${user.name}
大学: ${user.university}
学科: ${user.department}
自己紹介: ${user.selfIntroduction}
スキル: ${(portfolio.skills || []).join(", ")}
インターン: ${portfolio.internship || ""}
課外活動: ${portfolio.extracurricular || ""}
受賞歴: ${portfolio.awards || ""}
経験: ${portfolio.experience || ""}

【出力形式】
- 質問のみを1行ずつ5つ出力してください。
`;

  const result = await model.generateContent(prompt);
  const lines = result.response.text().split("\n").filter(Boolean);
  return lines.map((q, i) => ({ id: i + 1, question: q.replace(/^[0-9.\-\s]+/, "") }));
} 