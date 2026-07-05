import Link from "next/link";
import { 
  Edit2, 
  ChevronRight, Info, BookOpen, HelpCircle, Trash2, Clock, Users
} from "lucide-react";import { Exam } from "./types";

type Props = {
  exam: Exam;
};
export default function ExamPreview({ exam }: Props) {
    return(
      <div className="w-80 flex flex-col gap-4 mt-[3.7rem]">
        
        {/* Preview Card */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
          <div className="h-1 w-full bg-blue-600"></div>
          <div className="p-5 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Quick Preview</h3>
              <Link href={`/admin/exams/${exam.slug}`} className="text-gray-400 hover:text-gray-600">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="text-xs text-gray-500 mb-4">Instant overview of selected exam record.</p>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border">{exam.category_name}</span>
              <span className="text-xs text-gray-500 font-medium">ID: {exam.id}</span>
            </div>
            
            <h2 className="text-lg font-bold text-gray-900 leading-tight mb-1">{exam.title}</h2>
            <p className="text-xs text-gray-500 mb-6">{exam.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border rounded-md p-3 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">Questions</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{exam.total_questions}</p>
              </div>
              <div className="border rounded-md p-3 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-semibold">Duration</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{exam.duration}m</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t">
              <Link href={`/admin/exams/${exam.slug}`} className="w-full flex justify-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                View Full Details
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <button  className="flex items-center justify-center gap-2 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center justify-center gap-2 py-2 border border-red-200 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-blue-50 rounded-lg p-4 flex gap-3 items-start border border-blue-100">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-900">Pro Tip</h4>
            <p className="text-xs text-blue-800 mt-1 leading-relaxed">Click 'View Full Details' to manage subjects, questions, and curriculum for this exam.</p>
          </div>
        </div>

      </div>
    );
}