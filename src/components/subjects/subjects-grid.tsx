import { BookOpen } from "lucide-react";
import { SubjectCard } from "./subject-card";

interface SubjectsGridProps {
  categorySlug: string;
  examSlug: string;
  subjects: any[];
}

export function SubjectsGrid({
  categorySlug,
  examSlug,
  subjects,
}: SubjectsGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          Subjects
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((subject) => (
          <SubjectCard
  key={subject.id}
  categorySlug={categorySlug}
  examSlug={examSlug}
  subject={subject}
  icon={BookOpen}
/>
        ))}
      </div>
    </div>
  );
}