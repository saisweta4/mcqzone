"use client";

import type { Exam } from "./types";
import Link from "next/link";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type ExamsTableProps = {
  exams: Exam[];
  selectedExamId: number;
  onSelectExam: (id: number) => void;
  onEdit?: (exam: Exam) => void;
  onDelete?: (id: number) => void;
};

export default function ExamsTable({
  exams,
  selectedExamId,
  onEdit,
  onDelete,
}: ExamsTableProps) {
  return (
    <div className="bg-white rounded-lg border flex flex-col">
      {/* Toolbar */}
      <div className="p-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 border-b bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Exam Name</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="hidden md:table-cell px-6 py-4 font-semibold text-center">
                Questions
              </th>
              <th className="hidden md:table-cell px-6 py-4 font-semibold">
                Difficulty
              </th>
              <th className="px-6 py-4 font-semibold text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y text-gray-700">
            {exams.map((exam) => {
              const isActive = exam.id === selectedExamId;

              return (
                <tr
                  key={exam.id}
                  className={
                    isActive
                      ? "bg-blue-50/50 border-l-2 border-l-primary"
                      : "hover:bg-gray-50/50"
                  }
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/exams/${exam.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      <p className="font-semibold text-gray-900">
                        {exam.title}
                      </p>
                      <p className="text-xs text-gray-500">{exam.id}</p>
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold border">
                      {exam.category_name}
                    </span>
                  </td>

                  <td className="hidden md:table-cell px-6 py-4 text-center font-medium">
                    {exam.total_questions}
                  </td>

                  <td className="hidden md:table-cell px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        exam.difficulty === "Easy"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : exam.difficulty === "Medium"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {exam.difficulty}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-3">
                      <button
                        onClick={() => onEdit?.(exam)}
                        className="hover:text-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDelete?.(exam.id)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center text-sm text-gray-500 bg-gray-50/30">
        <p>
          Showing{" "}
          <span className="font-medium text-gray-900">
            1-{exams.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900">
            {exams.length}
          </span>{" "}
          exams
        </p>

        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button className="w-8 h-8 flex items-center justify-center border rounded bg-blue-50 text-primary border-blue-200 font-medium">
            1
          </button>

          <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}