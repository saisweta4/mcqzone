import { notFound } from "next/navigation";
import { QuizClient } from "@/components/quiz/quiz-client";
import { getQuizBySubject } from "@/lib/db/repositories/quiz.repository";
import { getExamBySlug } from "@/lib/db/repositories/exam.repository";
import { getSubjectsByExamSlug } from "@/lib/db/repositories/subject.repository";

// This is a Server Component. In the real app, you will fetch questions from your database here based on the params.
export default async function SubjectQuizPage({
  params,
}: {
  params: Promise<{
    categorySlug: string;
    examSlug: string;
    subjectId: string;
  }>;
}) {
const { categorySlug, examSlug, subjectId } = await params;

const exam = await getExamBySlug(examSlug);

if (!exam) {
  notFound();
}

const subjects = await getSubjectsByExamSlug(examSlug);

const subject = subjects.find(
  (s) => s.id === Number(subjectId)
);

if (!subject) {
  notFound();
}

const quiz = await getQuizBySubject(Number(subjectId));

if (!quiz) {
  notFound();
}

  return (
    <main className="min-h-screen bg-white">
      <QuizClient
  questions={quiz.questions}
  examId={exam.id}
  examName={exam.title}
  subjectName={quiz.subject.name}
/>
    </main>
  );
}

