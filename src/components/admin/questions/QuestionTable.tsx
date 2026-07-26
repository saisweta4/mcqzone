"use client";

import Link from "next/link";
import { Eye, FileText, Search } from "lucide-react";

type Props = {
  questions: any[];
  activeQuestionId: number | null;
  setActiveQuestionId: (id: number) => void;
};

export default function QuestionTable({
  questions,
  activeQuestionId,
  setActiveQuestionId,
}: Props) {
  
  return (
    <div className="bg-white border rounded-xl shadow-sm flex flex-col flex-1">

      {/* Toolbar */}

      <div className="p-4 border-b flex justify-between items-center bg-gray-50/50 rounded-t-xl">
      </div>

      {/* Table */}

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="text-xs uppercase border-b bg-white text-gray-500">
  <tr>
    <th className="px-4 py-4">Code</th>

    <th className="px-4 py-4">
      Question
    </th>

    <th className="hidden lg:table-cell px-4 py-4">
      Difficulty
    </th>

    <th className="hidden lg:table-cell px-4 py-4">
      Marks
    </th>

    <th className="px-4 py-4 text-center">
      Preview
    </th>
  </tr>
</thead>

          <tbody>

            {questions.map((q) => (

              <tr
  key={q.id}
  onClick={() => setActiveQuestionId(q.id)}
  className={`cursor-pointer border-b hover:bg-gray-50 ${
    activeQuestionId === q.id ? "bg-blue-50" : ""
  }`}
>
  <td className="px-4 py-4 font-medium">
    {q.id}
  </td>

  <td className="px-4 py-4 max-w-xl">
    <div className="font-semibold line-clamp-2">
      {q.questionText}
    </div>
  </td>

  <td className="hidden lg:table-cell px-4 py-4">
    {q.difficulty}
  </td>

  <td className="hidden lg:table-cell px-4 py-4">
    {q.marks}
  </td>

  <td className="px-4 py-4 text-center">
    <Link href={`/admin/questions/${q.id}`}>
      <Eye className="w-5 h-5 text-primary mx-auto" />
    </Link>
  </td>
</tr>

            ))}

          </tbody>

        </table>
      </div>

      <div className="border-t p-4 text-sm text-gray-500">
        Total Questions : {questions.length}
      </div>

    </div>
  );
}