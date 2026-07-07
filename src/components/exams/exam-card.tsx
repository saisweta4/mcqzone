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
      <div className="bg-white rounded-xl border p-4 sm:p-5 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
        
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="bg-blue-50 text-primary text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-md">
              {difficulty}
            </span>
          </div>

          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 group-hover:text-primary transition-colors">{title}</h3>
          
          <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}