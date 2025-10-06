export interface InterviewEvaluation {
  score?: number;
  summary?: string;
  strengths?: string[];
  improvements?: string[];
  [key: string]: unknown;
}
