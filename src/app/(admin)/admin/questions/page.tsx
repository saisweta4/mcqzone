"use client";

import { useState } from "react";
import QuestionFilters from "@/components/admin/questions/QuestionFilters";
import QuestionTable from "@/components/admin/questions/QuestionTable";
import QuestionHeader from "@/components/admin/questions/QuestionHeader";
import { useQuestions } from "@/components/admin/questions/hooks/useQuestions";
import { X } from "lucide-react";

export default function QuestionsManagement() {
const {
  questions,
  setQuestions,

  categories,

  exams,
  setExams,

  subjects,
  setSubjects,

  selectedCategory,
  setSelectedCategory,

  selectedExam,
  setSelectedExam,

  selectedSubject,
  setSelectedSubject,

  activeQuestionId,
  setActiveQuestionId,
} = useQuestions();

const [filtersOpen, setFiltersOpen] = useState(false);
  return (
    <div className="max-w-[1400px] mx-auto flex gap-8 pb-10 min-h-[calc(100vh-80px)]">
      
      {/* Left Column: Advanced Filters */}
      <div className="hidden lg:block">
      <QuestionFilters
  categories={categories}
  exams={exams}
  subjects={subjects}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
  setSubjects={setSubjects}
  setQuestions={setQuestions}
  setSelectedSubject={setSelectedSubject}
  setActiveQuestionId={setActiveQuestionId}
/>
</div>

      {/* Right Column: Main Content (Extended to fill space) */}
      <div className="flex-1 flex flex-col space-y-6 min-w-0">
        
        {/* Header & Stats Container */}
        <QuestionHeader
  totalQuestions={questions.length}
  selectedCategory={selectedCategory}
  selectedSubject={selectedSubject}
  onOpenFilters={() => setFiltersOpen(true)}
/>

        {/* Search & Table Card */}
        <QuestionTable
  questions={questions}
  activeQuestionId={activeQuestionId}
  setActiveQuestionId={setActiveQuestionId}
/>
       </div>

       {/* Mobile / Tablet Filters */}
{/* Mobile / Tablet Filters */}

<>
  {/* Overlay */}
  <div
    onClick={() => setFiltersOpen(false)}
    className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 lg:hidden ${
      filtersOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }`}
  />

  {/* Drawer */}
  <div
    className={`fixed left-0 top-0 h-full w-80 max-w-[90vw] bg-white z-50 shadow-2xl overflow-y-auto transition-transform duration-300 lg:hidden ${
      filtersOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="sticky top-0 bg-white z-10 flex items-center justify-between border-b px-6 py-4">
      <h2 className="text-xl font-bold">
        Advanced Filters
      </h2>

      <button
        onClick={() => setFiltersOpen(false)}
        className="p-2 rounded-md hover:bg-gray-100"
      >
        <X className="w-5 h-5" />
      </button>
    </div>

    <div className="p-6">
      <QuestionFilters
        categories={categories}
        exams={exams}
        subjects={subjects}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSubjects={setSubjects}
        setQuestions={setQuestions}
        setSelectedSubject={setSelectedSubject}
        setActiveQuestionId={setActiveQuestionId}
      />
    </div>
  </div>
</>

    </div>
  );
}