export interface Exam {
  id: string;
  title: string;
  category: string;
  questions: number;
  duration: number;
  attempts: number;
  difficulty: "Easy" | "Medium" | "Hard";
}