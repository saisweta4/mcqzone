import Link from "next/link";
import { Bookmark } from "lucide-react";

export interface ExamCardProps {
  id: string;
  categorySlug: string;
  title: string;
  description?: string;
  questions?: number | string;
  duration?: number;
  attempts?: number;
  difficulty?: string;
}

export function ExamCard({ 
  id, 
  categorySlug,
  title, 
  description = "Odisha Public Service Foundation AI verified for flow.",
  questions = 0, 
  duration, 
  attempts = 0, 
  difficulty = "Foundation" 
}: ExamCardProps) {
  return (
   <Link href={`/exams/${categorySlug}/${id}`} className="block group">
      <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
        
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-md">
              {difficulty}
            </span>
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              <Bookmark className="h-5 w-5 fill-current" />
            </button>
          </div>

          <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
          
          <p className="text-sm text-gray-500 mb-6 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="pt-4 border-t flex items-center text-sm gap-8 mt-auto">
          <div className="flex items-center gap-2">
             <span className="text-blue-600">↗</span>
             <div className="flex flex-col">
               <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Attempts</span>
               <span className="font-bold text-gray-900">{attempts}</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-blue-600">↳</span>
             <div className="flex flex-col">
               <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Questions</span>
               <span className="font-bold text-gray-900">{questions}</span>
             </div>
          </div>
          
          {/* Optional: Render duration if it's provided */}
          {duration && (
             <div className="flex items-center gap-2 ml-auto">
               <div className="flex flex-col text-right">
                 <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Mins</span>
                 <span className="font-bold text-gray-900">{duration}</span>
               </div>
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}