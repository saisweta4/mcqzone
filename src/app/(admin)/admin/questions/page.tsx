"use client";

import { useState,useEffect } from "react";
import QuestionFilters from "@/components/admin/questions/QuestionFilters";
import QuestionTable from "@/components/admin/questions/QuestionTable";
import QuestionHeader from "@/components/admin/questions/QuestionHeader";
import FastTrackCard from "@/components/admin/questions/FastTrackCard";
import { useQuestions } from "@/components/admin/questions/hooks/useQuestions";

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
  return (
    <div className="max-w-[1400px] mx-auto flex gap-8 pb-10 min-h-[calc(100vh-80px)]">
      
      {/* Left Column: Advanced Filters */}
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

      {/* Right Column: Main Content (Extended to fill space) */}
      <div className="flex-1 flex flex-col space-y-6 min-w-0">
        
        {/* Header & Stats Container */}
        <QuestionHeader
  totalQuestions={questions.length}
  selectedCategory={selectedCategory}
  selectedSubject={selectedSubject}
/>

        {/* Search & Table Card */}
        <QuestionTable
  questions={questions}
  activeQuestionId={activeQuestionId}
  setActiveQuestionId={setActiveQuestionId}
/>

        {/* Fast-Track Card (Moved below the table layout) */}
       <FastTrackCard />
       </div>
    </div>
  );
}