import { Download, Plus } from "lucide-react";

type CategoryToolbarProps = {
  onCreate?: () => void;
};

export default function CategoryToolbar({ onCreate }: CategoryToolbarProps) {
  return (
    <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage categories for all platform exams.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onCreate} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Create New Category
            </button>
          </div>
        </div>
  );
}