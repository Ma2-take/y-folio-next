import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/gemini
export async function POST(req: NextRequest) {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return;


    // Google GenAI を生成
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    // プロンプト内容
    const { question } = await req.json();
    const prompt = `以下の質問に、就職面接で役立つ実践的なアドバイスを日本語でください。\n\n質問: ${question}`;
    const contents = [
        {
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];
    console.log('API_KEY:', API_KEY);
    console.log('Prompt:', prompt);

    // GeminiAPIにリクエスト
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        config: { responseMimeType: 'text/plain' },
        contents,
    });
    // レスポンスからテキストを取得
    const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    console.log('response text:', responseText);
    // レスポンスをJSON形式で返す
    const data = { reply: responseText };
    return NextResponse.json(data);
}