import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SubjectCardProps {
  categorySlug: string;
  examSlug: string;
  subject: {
    id: number;
    name: string;
    description: string | null;
    question_count: number;
  };
  icon: React.ElementType;
}

export function SubjectCard({
  categorySlug,
  examSlug,
  subject,
  icon: Icon,
}: SubjectCardProps) {
  return (
    <Link
      href={`/exams/${categorySlug}/${examSlug}/${subject.id}`}
      className="block"
    >
      <div className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full">
        <div className="p-4 md:p-5 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0">
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </div>

            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap">
              {Number(subject.question_count).toLocaleString()} Qs
            </span>
          </div>

          <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {subject.name}
          </h4>

          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
            {subject.description || "No description available."}
          </p>
        </div>

        <div className="border-t px-4 md:px-5 py-3 bg-gray-50/50 flex justify-between items-center group-hover:bg-blue-50 transition-colors mt-auto">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-blue-600">
            Explore Topics
          </span>

          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
        </div>
      </div>
    </Link>
  );
}