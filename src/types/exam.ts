export interface Exam {
  id: string;
  title: string;
  description?: string;
  category: string;
  questions: number;
  duration: number;
  attempts: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Subject {
  id: string;
  name: string;
}

export interface ExamCategory {
  id: string;
  name: string;
  subjects: Subject[];
}