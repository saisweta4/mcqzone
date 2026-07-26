import { Download, Plus } from "lucide-react";

type ExamToolbarProps = {
  onCreate?: () => void;
};

export default function ExamToolbar({ onCreate }: ExamToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Exams Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage categories, subjects, and statuses for all platform exams.</p>
          </div>
         <div className="flex w-full md:w-auto">
            <button onClick={onCreate} className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Create New Exam
            </button>
          </div>
        </div>
  );
}