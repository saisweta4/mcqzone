import ExamsClient from "./ExamsClient"

async function getExams() {
  const res = await fetch("http://localhost:3000/api/exams", {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data;
}

export default async function ExamsPage() {
  const exams = await getExams();

  return <ExamsClient initialExams={exams} />;
}