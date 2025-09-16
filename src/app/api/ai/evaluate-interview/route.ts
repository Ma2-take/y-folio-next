import { NextRequest, NextResponse } from "next/server";
import { evaluateIndustrySpecificAnswers } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { questions, answers, industry, jobType } = await req.json();
    
    if (!questions || !answers || !industry || !jobType) {
      return NextResponse.json(
        { error: "questions、answers、industry、jobTypeが必要です" }, 
        { status: 400 }
      );
    }
    
    const evaluation = await evaluateIndustrySpecificAnswers({
      questions,
      answers,
      industry,
      jobType
    });
    
    return NextResponse.json({ evaluation });
  } catch (e) {
    console.error('評価生成エラー:', e);
    return NextResponse.json(
      { 
        error: "評価生成に失敗しました",
        details: e instanceof Error ? e.message : "不明なエラー"
      }, 
      { status: 500 }
    );
  }
}



