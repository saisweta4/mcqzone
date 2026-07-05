import Link from "next/link";
import { 
  ChevronLeft, Search, Bell, History, Globe, 
  Scale, TrendingUp, Brain, Calendar, Info, 
  BookOpen, FileQuestion, Target, Clock, ChevronRight,
  Calculator, Monitor
} from "lucide-react";
import {
  getAllCategories,
  getCategoryBySlug,
} from "@/lib/db/repositories/category.repository";

import {
  getExamsByCategorySlug,
} from "@/lib/db/repositories/exam.repository";
// Import your new global sidebars
import { Sidebar } from "@/components/exams/sidebar";
import { MobileSidebar } from "@/components/exams/mobile-sidebar";
import { ExamsHero } from "@/components/exams/exams-hero";
import { ExamsGrid } from "@/components/exams/exams-grid";

// Map string icon names from the DB to actual Lucide components
const iconMapping: Record<string, React.ElementType> = {
  History,
  Globe,
  Scale,
  TrendingUp,
  Brain,
  Calendar,
  Calculator,
  Monitor,
  BookOpen,
};

export default async function ExamsPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

   const categories = await getAllCategories();

const category = await getCategoryBySlug(categorySlug);
const exams = await getExamsByCategorySlug(categorySlug);
  

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      {/* GLOBAL DESKTOP SIDEBAR */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0 z-30 shadow-sm border-r border-gray-200">
       <Sidebar examCategories={categories} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 w-full bg-white">
        
        {/* Top Header */}
        <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b sticky top-0 bg-white z-20">
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* MOBILE SIDEBAR (Hamburger menu trigger) */}
            <MobileSidebar examCategories={categories} />
            
            <Link href="/exams" className="hidden sm:block text-gray-500 hover:text-gray-900 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-sm md:text-base font-bold text-gray-900 truncate max-w-[150px] sm:max-w-xs">{category.name}</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-4 text-gray-500">
            <button className="hover:text-gray-900"><Search className="h-5 w-5" /></button>
            <button className="hover:text-gray-900"><Bell className="h-5 w-5" /></button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          
          {/* Hero Banner */}
          <ExamsHero />

<ExamsGrid
  type="exam"
  items={exams}
/>
</div>

          {/* Subject Grid Section */}
          
        
        {/* Footer */}
        <footer className="border-t p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 bg-gray-50/50 text-center sm:text-left mt-auto">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900">Help Center</Link>
          </div>
          <div>
            © 2026 Odisha MCQZone.
          </div>
        </footer>

      </main>
    </div>
  );
}


