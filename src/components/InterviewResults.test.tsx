import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InterviewResults from './InterviewResults';

// モック関数
const mockOnRestart = jest.fn();

// サンプル評価データ
const mockEvaluation = {
  totalScore: 85,
  categoryScores: {
    technical: 22,
    communication: 20,
    leadership: 18,
    industryKnowledge: 25
  },
  evaluations: [
    {
      questionId: 1,
      score: 20,
      feedback: "技術的な理解が深く、具体的な経験を説明できています",
      strengths: ["技術的深さ", "具体例の提示"],
      improvements: ["より詳細な説明"]
    },
    {
      questionId: 2,
      score: 18,
      feedback: "コミュニケーション能力が高く、分かりやすく説明できています",
      strengths: ["説明の分かりやすさ", "質問への対応"],
      improvements: ["技術用語の説明"]
    }
  ],
  overallFeedback: "全体的にIT業界の理解が深く、エンジニア職種に適した回答でした。",
  industrySpecificAdvice: "IT業界で重視されるプログラミング、システム設計のスキルをさらに深めることをお勧めします。"
};

describe('InterviewResults', () => {
  beforeEach(() => {
    mockOnRestart.mockClear();
  });

  test('評価データがない場合はフォールバック表示', () => {
    render(<InterviewResults onRestart={mockOnRestart} evaluation={null} />);
    
    expect(screen.getByText('80/100')).toBeInTheDocument();
    expect(screen.getByText('よくできました！回答の具体性が高く、経験がしっかり伝わっています。')).toBeInTheDocument();
  });

  test('評価データがある場合は詳細表示', () => {
    render(<InterviewResults onRestart={mockOnRestart} evaluation={mockEvaluation} />);
    
    // 総合スコア
    expect(screen.getByText('85/100')).toBeInTheDocument();
    expect(screen.getByText('全体的にIT業界の理解が深く、エンジニア職種に適した回答でした。')).toBeInTheDocument();
    
    // カテゴリ別スコア
    expect(screen.getByText('22/25')).toBeInTheDocument(); // 技術
    expect(screen.getByText('20/25')).toBeInTheDocument(); // コミュニケーション
    expect(screen.getByText('18/25')).toBeInTheDocument(); // リーダーシップ
    expect(screen.getByText('25/25')).toBeInTheDocument(); // 業界知識
  });

  test('質問別評価が表示される', () => {
    render(<InterviewResults onRestart={mockOnRestart} evaluation={mockEvaluation} />);
    
    // 質問別評価
    expect(screen.getByText('質問 1')).toBeInTheDocument();
    expect(screen.getByText('質問 2')).toBeInTheDocument();
    expect(screen.getByText('技術的な理解が深く、具体的な経験を説明できています')).toBeInTheDocument();
    expect(screen.getByText('コミュニケーション能力が高く、分かりやすく説明できています')).toBeInTheDocument();
  });

  test('良い点と改善点が表示される', () => {
    render(<InterviewResults onRestart={mockOnRestart} evaluation={mockEvaluation} />);
    
    // 良い点
    expect(screen.getByText('技術的深さ')).toBeInTheDocument();
    expect(screen.getByText('具体例の提示')).toBeInTheDocument();
    expect(screen.getByText('説明の分かりやすさ')).toBeInTheDocument();
    
    // 改善点
    expect(screen.getByText('より詳細な説明')).toBeInTheDocument();
    expect(screen.getByText('技術用語の説明')).toBeInTheDocument();
  });

  test('業界特化アドバイスが表示される', () => {
    render(<InterviewResults onRestart={mockOnRestart} evaluation={mockEvaluation} />);
    
    expect(screen.getByText('業界特化アドバイス')).toBeInTheDocument();
    expect(screen.getByText('IT業界で重視されるプログラミング、システム設計のスキルをさらに深めることをお勧めします。')).toBeInTheDocument();
  });

  test('新しい面接を開始ボタンが動作する', () => {
    render(<InterviewResults onRestart={mockOnRestart} evaluation={mockEvaluation} />);
    
    const restartButton = screen.getByText('新しい面接を開始');
    fireEvent.click(restartButton);
    
    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });

  test('結果を印刷ボタンが表示される', () => {
    render(<InterviewResults onRestart={mockOnRestart} evaluation={mockEvaluation} />);
    
    expect(screen.getByText('結果を印刷')).toBeInTheDocument();
  });

  test('スコアに応じた色が適用される', () => {
    render(<InterviewResults onRestart={mockOnRestart} evaluation={mockEvaluation} />);
    
    // 85点は緑色（高スコア）
    const totalScore = screen.getByText('85/100');
    expect(totalScore).toHaveClass('text-green-600');
  });
});
