export const dynamic = "force-dynamic";
import { Sidebar } from "@/components/exams/sidebar";
import { ExamsGrid } from "@/components/exams/exams-grid";
import { ExamsHero } from "@/components/exams/exams-hero";
import { AIExplanation } from "@/components/exams/ai-explanation";
import { MobileSidebar } from "@/components/exams/mobile-sidebar"; 
import { getAllCategories } from "@/lib/db/repositories/category.repository";


export default async function ExamsPage() {

  const categories = await getAllCategories();

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      {/* UPDATED: Added h-screen sticky top-0 here to isolate desktop layout logic */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0">
        <Sidebar examCategories={categories} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 w-full">
        
        <header className="px-4 md:px-8 py-3 md:py-0 md:h-[72px] flex flex-wrap md:flex-nowrap items-center justify-between border-b bg-white gap-3 md:gap-4 sticky top-0 z-20">
          
          <div className="flex items-center gap-3">
            <MobileSidebar examCategories={categories} />
            <h1 className="text-lg md:text-xl font-bold text-gray-900">EXAM CATEGORIES</h1>
            <span className="bg-blue-50 text-primary text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 rounded-full whitespace-nowrap">
              {categories.length} Available
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 overflow-y-auto">
          <ExamsHero />
          <ExamsGrid
  type="category"
  items={categories}
/>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIExplanation />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}