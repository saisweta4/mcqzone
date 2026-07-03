import { notFound } from "next/navigation";
import { QuizClient } from "@/components/quiz/quiz-client";
import { dummyQuestions } from "@/lib/mock/dummy-quiz-data";

// This is a Server Component. In the real app, you will fetch questions from your database here based on the params.
export default async function SubjectQuizPage({ 
  params 
}: { 
  params: Promise<{ id: string, subjectId: string }> 
}) {
  const resolvedParams = await params;
  
  // Example validation - in reality you'd check your DB to ensure the exam and subject exist
  if (!resolvedParams.id || !resolvedParams.subjectId) {
    notFound();
  }

  // Simulate passing dynamic names down based on the URL (You can replace this with DB data)
  const examName = "OPSC ASO";
  const subjectName = "History";

  return (
    <main className="min-h-screen bg-white">
      <QuizClient 
        questions={dummyQuestions} 
        examName={examName}
        subjectName={subjectName}
      />
    </main>
  );
}