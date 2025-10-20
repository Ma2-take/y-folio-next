import { User } from "@/types/User";
import { Portfolio } from "@/types/Portforio";
import { GoogleGenAI } from "@google/genai";
// import { getIndustryProfile, getJobTypeProfile } from "@/data/IndustryData";
import { simpleIndustries, simpleJobTypes } from "@/data/SimpleIndustryData";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Gemini APIキーが設定されていません。.env.localを確認してください。");
}

export const genAI = new GoogleGenAI({ apiKey });

// Google Gemini API(@google/genai)を使った面接質問生成
export async function generateInterviewQuestionsWithGemini({ user, portfolio }: { user: User; portfolio: Portfolio }) {
  const prompt = `
あなたは面接官です。以下の応募者情報をもとに、総合面接で使う質問を5つ日本語で作成してください。

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

【質問作成ルール】
1. 質問は対話形式で120文字以内にしてください。
2. 志望動機、人物像（価値観・強み）、学生時代に力を入れた経験をバランス良く取り上げてください。
3. 学科に関する質問では、その学部で何を学んだかを簡潔に確認してください。
4. スキルについては1つを選び、深掘りする質問にしてください。
5. 経験については、その経験を通して何を学んだかを尋ねてください。
6. 応募者の回答を引き出すために、自然な会話調で質問を始めてください。
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

// シンプルな業界・職種特化面接質問生成
export async function generateIndustrySpecificQuestions({
  user,
  portfolio,
  industry,
  jobType
}: {
  user: User;
  portfolio: Portfolio;
  industry: string;
  jobType: string;
}) {
  const industryData = simpleIndustries.find(i => i.id === industry);
  const jobTypeData = simpleJobTypes[industry]?.find(j => j.id === jobType);
  
  if (!industryData || !jobTypeData) {
    throw new Error('無効な業界・職種です');
  }

  const prompt = `
あなたは${industryData.name}業界の${jobTypeData.name}職種の面接官です。
以下の応募者情報をもとに、${jobTypeData.name}職種に特化した面接質問を5つ日本語で作成してください。

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

【業界・職種情報】
業界: ${industryData.name}
業界説明: ${industryData.description}
職種: ${jobTypeData.name}
職種説明: ${jobTypeData.description}

【質問作成指針】
1. ${industryData.name}業界の特性を反映した質問
2. ${jobTypeData.name}職種に必要なスキルを問う質問
3. 応募者の経験と業界・職種の関連性を探る質問
4. 業界の課題やトレンドに関する質問
5. 職種特有の業務内容に関する質問

【出力形式】
- 質問は対話形式、120文字以内で出力してください
- 業界特有の専門用語を含めてください
- 職種に必要なスキルを評価できる質問にしてください
- 応募者の経験を活かした具体的な質問にしてください
`;

  const contents = [
    {
      parts: [{ text: prompt }],
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

// 業界特化面接回答評価（一時的に無効化）
export async function evaluateIndustrySpecificAnswers(
  _params: {
    questions: { id: number; question: string }[];
    answers: string[];
    industry: string;
    jobType: string;
  }
) {
  void _params;
  // 一時的に無効化
  throw new Error('評価機能は現在開発中です');
} 