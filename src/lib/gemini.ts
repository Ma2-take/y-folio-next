import { User } from "@/types/User";
import { Portfolio } from "@/types/Portforio";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Gemini APIキーが設定されていません。.env.localを確認してください。");
}

export const genAI = new GoogleGenAI({ apiKey });

// Google Gemini API(@google/genai)を使った面接質問生成
export async function generateInterviewQuestionsWithGemini({ user, portfolio }: { user: User; portfolio: Portfolio }) {
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
- 質問は対話形式、120文字以内で出力してください。
- 学科に関する質問は、その学部で何を学んできたか簡単に質問してください。
- スキルに関する質問は、1つを深く掘り下げて質問してください。
- 経験については、その経験を通して何を学んだか簡単に質問してください。
`;

  const contents = [
    {
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash",
    config: { responseMimeType: "text/plain" },
    contents,
  });
  const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const lines = responseText.split("\n").filter(Boolean);
  return lines.map((q, i) => ({ id: i + 1, question: q.replace(/^[0-9.\-\s]+/, "") }));
} 