import { getAllExams } from "@/lib/db/repositories/exam.repository";
import ExamsClient from "./ExamsClient";

export default async function ExamsPage() {
  const exams = await getAllExams();


  return (
    <ExamsClient
      initialExams={exams}
    />
  );
}