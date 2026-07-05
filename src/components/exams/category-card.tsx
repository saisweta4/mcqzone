import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export function CategoryCard({
  name,
  slug,
  description,
}: CategoryCardProps) {
  return (
    <Link href={`/exams/${slug}`} className="block group">
      <div className="bg-white rounded-xl border p-5 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
            <FolderOpen className="h-6 w-6 text-blue-600" />
          </div>

          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {description || "Explore all examinations under this category."}
          </p>
        </div>

        <div className="pt-5 mt-6 border-t flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600">
            Explore Exams
          </span>

          <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}