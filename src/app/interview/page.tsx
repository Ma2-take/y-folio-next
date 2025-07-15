"use client";
import { useState } from "react";
import InterviewSetup from "@/components/InterviewSetup";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";

export default function InterviewPage() {
  const [step, setStep] = useState<'setup' | 'session' | 'result'>('setup');
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {step === 'setup' && <InterviewSetup onStart={() => setStep('session')} />}
      {step === 'session' && <InterviewSession onFinish={() => setStep('result')} />}
      {step === 'result' && <InterviewResults onRestart={() => setStep('setup')} />}
    </div>
  );
} 