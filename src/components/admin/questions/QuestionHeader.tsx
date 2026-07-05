"use client";

import Link from "next/link";
import { Plus, FileUp, LayoutList, Filter, CheckSquare } from "lucide-react";

type Props = {
  totalQuestions: number;
};

export default function QuestionHeader({ totalQuestions }: Props) {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Questions Management
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage questions for every exam and subject.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-semibold bg-white hover:bg-gray-50">
            <FileUp className="w-4 h-4" />
            Bulk Import
          </button>

          <Link
            href="/admin/questions/new"
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Question
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="p-5 border rounded-xl bg-white shadow-sm flex gap-4 items-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <LayoutList className="w-6 h-6 text-blue-600" />
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

        <div className="p-5 border rounded-xl bg-white shadow-sm flex gap-4 items-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Filter className="w-6 h-6 text-blue-600" />
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">
              Current Filter
            </p>

            <p className="text-lg font-semibold">
              Subject Questions
            </p>
          </div>
        </div>

        <div className="p-5 border rounded-xl bg-white shadow-sm flex gap-4 items-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <CheckSquare className="w-6 h-6 text-blue-600" />
          </div>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">
              Selected
            </p>

            <p className="text-lg font-semibold">
              Ready to Manage
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}