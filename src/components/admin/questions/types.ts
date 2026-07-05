export interface QuizQuestion {
  id: string;
  questionText: string;
  difficulty: string;
  marks: number;
  negativeMarks: number;
  options: {
    id: string;
    letter: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: {
    short: string;
    detailed: string;
    keyConcepts: string[];
    tip: string;
  };
}