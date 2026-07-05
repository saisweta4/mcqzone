export interface Exam {
  id: number;
  category_name: string;

  title: string;
  slug: string;
  description: string;

  duration: number;
  total_questions: number;

  difficulty: string;
}