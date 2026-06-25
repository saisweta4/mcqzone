import { exams } from "@/lib/mock-exams";
import { ExamCard } from "./exam-card";
import { Button } from "../ui/button";

export function ExamsGrid() {
  return (
    <div className="space-y-4">
    <div className="flex justify-between items-center">
  <h2 className="font-semibold">
    Exam Catalog
  </h2>

  <Button variant="ghost">
    View All
  </Button>
</div>
    <div
      className="
      grid
      gap-4
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      "
    >

      {exams.map((exam) => (
        <ExamCard
          key={exam.id}
          title={exam.title}
          questions={exam.questions}
          duration={exam.duration}
          attempts={exam.attempts}
          difficulty={exam.difficulty}
        />
      ))}
    </div>
    </div>
  );
}