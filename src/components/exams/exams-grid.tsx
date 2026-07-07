"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ExamCard } from "./exam-card";
import { CategoryCard } from "./category-card";

interface ExamsGridProps {
  type: "category" | "exam";
  items: any[];
}

export function ExamsGrid({ type, items }: ExamsGridProps) {
  const [showAll, setShowAll] = useState(false);

const displayedItems = showAll ? items : items.slice(0, 4);
  return (
    <div className="space-y-4">
      <div className=" flex justify-between items-center">
        <Button className="primary-button-gradient text-white primary-button-gradient:hover" variant="ghost" onClick={() => setShowAll(!showAll)}>
  {showAll ? "Show Less" : "View All"}
</Button>
      </div>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {type === "category"
    ? displayedItems.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          slug={category.slug}
          description={category.description}
          icon={category.icon}
        />
      ))
    : displayedItems.map((exam) => (
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