import { notFound } from "next/navigation";
import { getExamBySlug } from "@/lib/db/repositories/exam.repository";
import { getSubjectsByExamSlug } from "@/lib/db/repositories/subject.repository";
import ExamDetailsClient from "./ExamDetailsClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ExamDetailsPage({ params }: Props) {
  const { slug } = await params;

  const exam = await getExamBySlug(slug);

  if (!exam) {
    notFound();
  }

  const subjects = await getSubjectsByExamSlug(slug);

  return (
    <ExamDetailsClient
      exam={exam}
      initialSubjects={subjects}
    />
  );
}