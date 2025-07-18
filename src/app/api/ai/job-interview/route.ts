import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { generateInterviewQuestionsWithGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    const { user, portfolio } = await req.json();
    if (!user || !portfolio) {
        return NextResponse.json({ error: "userとportfolioが必要です" }, { status: 400 });
    }
    try {
        const questions = await generateInterviewQuestionsWithGemini({ user, portfolio });
        return NextResponse.json({ questions });
    } catch (e) {
        return NextResponse.json({ error: "Gemini APIによる質問生成に失敗しました。" }, { status: 500 });
    }
}