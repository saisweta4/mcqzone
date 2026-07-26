"use client";

import { ChevronDown, Filter } from "lucide-react";

type Props = {
  categories: any[];
  exams: any[];
  subjects: any[];

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  setSubjects: (subjects: any[]) => void;

  setQuestions: (questions: any[]) => void;

  setSelectedSubject: (value: string) => void;

  setActiveQuestionId: (id: number | null) => void;
};

export default function QuestionFilters({
  categories,
  exams,
  subjects,
  selectedCategory,
  setSelectedCategory,
  setSubjects,
  setQuestions,
  setSelectedSubject,
  setActiveQuestionId,
}: Props) {
  return (
    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
      

      <div className="space-y-6">

        {/* Category */}

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Target Category
          </label>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 py-2.5 pl-3 pr-8 rounded-md text-sm"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Exam */}

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Target Exam
          </label>

          <div className="relative">
            <select
              className="w-full appearance-none bg-white border border-gray-200 py-2.5 pl-3 pr-8 rounded-md text-sm"
              onChange={async (e) => {
                const slug = e.target.value;

                if (!slug) {
                  setSubjects([]);
                  return;
                }

                const res = await fetch(`/api/exams/${slug}/subjects`);
                const data = await res.json();

                setSubjects(data.data);
              }}
            >
              <option value="">Select Exam</option>

              {exams.map((exam) => (
                <option key={exam.id} value={exam.slug}>
                  {exam.title}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Subject */}

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Subject
          </label>

          <div className="relative">
            <select
              className="w-full appearance-none bg-white border border-gray-200 py-2.5 pl-3 pr-8 rounded-md text-sm"
              onChange={async (e) => {
                const subjectId = e.target.value;

                setSelectedSubject(subjectId);

                if (!subjectId) {
                  setQuestions([]);
                  return;
                }

                const res = await fetch(
                  `/api/subjects/${subjectId}/questions`
                );

                const data = await res.json();

                setQuestions(data.data);

                if (data.data.length > 0) {
                  setActiveQuestionId(data.data[0].id);
                }
              }}
            >
              <option value="">Select Subject</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}