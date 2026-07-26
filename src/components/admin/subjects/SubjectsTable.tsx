"use client";

import type { Subject } from "./types";
import { Edit2, Trash2 } from "lucide-react";

type Props = {
  subjects: Subject[];
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
};

export default function SubjectsTable({
  subjects,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-lg border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4 text-left">Subject</th>
            <th className="p-4 text-left">Questions</th>
            <th className="hidden md:table-cell p-4 text-left">
              Display Order
            </th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id} className="border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="font-medium">{subject.name}</div>
                <div className="text-xs text-gray-500">
                  {subject.description}
                </div>
              </td>

              <td className="p-4">{subject.question_count}</td>

              <td className="hidden md:table-cell p-4">
                {subject.display_order}
              </td>

              <td className="p-4">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => onEdit(subject)}
                    className="hover:text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-primary" />
                  </button>

                  <button
                    onClick={() => onDelete(subject)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}