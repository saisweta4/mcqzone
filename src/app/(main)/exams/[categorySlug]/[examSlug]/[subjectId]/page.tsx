import { notFound } from "next/navigation";
import { QuizClient } from "@/components/quiz/quiz-client";
import Link from "next/link";
import { getQuizBySubject } from "@/lib/db/repositories/quiz.repository";
import { getExamBySlug } from "@/lib/db/repositories/exam.repository";
import { getSubjectsByExamSlug } from "@/lib/db/repositories/subject.repository";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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

const { userId } = await auth();

if (!userId) {
  redirect(
    `/sign-in?redirect_url=${encodeURIComponent(
      `exams/${categorySlug}/${examSlug}/${subjectId}`
    )}`
  );
}

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
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          No Questions Available
        </h2>

        <p className="mt-2 text-gray-500">
          Questions for this subject have not been uploaded yet.
        </p>

        <Link
  href={`/exams/${categorySlug}/${examSlug}`}
  className="inline-block mt-6 px-5 py-2 rounded-lg bg-primary text-white hover:bg-secondary hover:cursor-pointer transition-colors duration-300"
>
  Go Back
</Link>
      </div>
    </main>
  );
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

