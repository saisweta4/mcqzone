import { Bookmark } from "lucide-react";

interface ExamCardProps {
  title: string;
  questions?: number;
  duration?: number;
  attempts?: number;
  difficulty?: string;
}

export function ExamCard({ title }: ExamCardProps) {
  return (
    <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-md">
          Foundation
        </span>
        <button className="text-blue-600 hover:text-blue-800">
          <Bookmark className="h-5 w-5 fill-current" />
        </button>
      </div>

      <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">
        Odisha Public Service...<br/>
        Foundation AI verified for flow.
      </p>

      <div className="pt-4 border-t flex items-center text-sm gap-8">
        <div className="flex items-center gap-2">
           <span className="text-blue-600">↗</span>
           <div className="flex flex-col">
             <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Attempts</span>
             <span className="font-bold text-gray-900">0</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-blue-600">↳</span>
           <div className="flex flex-col">
             <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Questions</span>
             <span className="font-bold text-gray-900">10/1000+</span>
           </div>
        </div>
      </div>
    </div>
  );
}