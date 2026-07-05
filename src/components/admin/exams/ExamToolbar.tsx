import { Download, Plus } from "lucide-react";

type ExamToolbarProps = {
  onCreate?: () => void;
};

export default function ExamToolbar({ onCreate }: ExamToolbarProps) {
  return (
    <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Exams Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage categories, subjects, and statuses for all platform exams.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button onClick={onCreate} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Create New Exam
            </button>
          </div>
        </div>
  );
}