"use client";

import Link from "next/link";
import { Plus, FileUp, LayoutList, Filter, CheckSquare } from "lucide-react";


type Props = {
  totalQuestions: number;
  selectedCategory: string;
  selectedSubject: string;
  onOpenFilters: () => void;
};

export default function QuestionHeader({
  totalQuestions,
  selectedCategory,
  selectedSubject,
   onOpenFilters,
}: Props) {
  const canCreateQuestion =
  selectedCategory !== "" &&
  selectedSubject !== "";
  return(
    <div>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Questions Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage questions for every exam and subject.
          </p>
        </div>



        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button
  onClick={onOpenFilters}
  className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-50 text-sm font-semibold"
>
  <Filter className="w-4 h-4" />
  Filters
</button>

          {canCreateQuestion ? (
            
  <Link
    href={`/admin/questions/ai-import?subjectId=${selectedSubject}`}
    className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-semibold bg-white hover:bg-gray-50"
  >
    <FileUp className="w-4 h-4" />
    Bulk Import
  </Link>
) : (
  <button
    disabled
   className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
  >
    <FileUp className="w-4 h-4" />
    Bulk Import
  </button>
)}

          {canCreateQuestion ? (
  <Link
    href={`/admin/questions/new?subjectId=${selectedSubject}`}
    className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white bg-primary hover:bg-blue-700"
  >
    <Plus className="w-4 h-4" />
    Create Question
  </Link>
) : (
  <button
    type="button"
    disabled
    className="w-full sm:w-auto justify-center flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white bg-gray-400 cursor-not-allowed"
  >
    <Plus className="w-4 h-4" />
    Create Question
  </button>
)}
        </div>
      </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="p-4 md:p-5 border rounded-xl bg-white shadow-sm flex gap-4 items-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <LayoutList className="w-6 h-6 text-primary" />
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">
              Total Questions
            </p>

            <p className="text-2xl font-bold">
              {totalQuestions}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}