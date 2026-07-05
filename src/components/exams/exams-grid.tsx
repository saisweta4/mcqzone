import { Button } from "../ui/button";
import { ExamCard } from "./exam-card";
import { CategoryCard } from "./category-card";

interface ExamsGridProps {
  type: "category" | "exam";
  items: any[];
}

export function ExamsGrid({ type, items }: ExamsGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          {type === "category" ? "Exam Categories" : "Exam Catalog"}
        </h2>

        <Button variant="ghost">View All</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {type === "category"
          ? items.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                slug={category.slug}
                description={category.description}
                icon={category.icon}
              />
            ))
          : items.map((exam) => (
              <ExamCard
                key={exam.id}
                id={exam.slug}
                categorySlug={exam.category_slug}
                title={exam.title}
                description={exam.description}
                questions={exam.total_questions}
                duration={exam.duration}
                difficulty={exam.difficulty}
              />
            ))}
      </div>
    </div>
  );
}