import { Sidebar } from "@/components/exams/sidebar";
import { ExamsGrid } from "@/components/exams/exams-grid";
import { ExamsHero } from "@/components/exams/exams-hero";
import { TrendingNow } from "@/components/exams/trending-now";
import { AIExplanation } from "@/components/exams/ai-explanation";
import { Search, Filter, MapPin } from "lucide-react";
import { MobileSidebar } from "@/components/exams/mobile-sidebar"; 

async function getExamsFromDatabase() {
  return [
    {
      id: "opsc-aso-1",
      name: "OPSC ASO",
      subjects: [
        { id: "sub-1", name: "General Awareness" },
        { id: "sub-2", name: "Reasoning & Mental Ability" },
        { id: "sub-3", name: "Mathematics" },
        { id: "sub-4", name: "English" }
      ]
    },
    {
      id: "ossc-cgl-2",
      name: "OSSC CGL",
      subjects: [
        { id: "sub-5", name: "Data Interpretation" },
        { id: "sub-6", name: "Logical Reasoning" },
        { id: "sub-7", name: "Current Events" }
      ]
    },
    {
      id: "police-3",
      name: "Police Exams",
      subjects: [
        { id: "sub-8", name: "General English" },
        { id: "sub-9", name: "Odia Language" },
        { id: "sub-10", name: "General Studies" }
      ]
    }
  ];
}

export default async function ExamsPage() {
  const dynamicExams = await getExamsFromDatabase();

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      {/* UPDATED: Added h-screen sticky top-0 here to isolate desktop layout logic */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0">
        <Sidebar examCategories={dynamicExams} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 w-full">
        
        <header className="px-4 md:px-8 py-3 md:py-0 md:h-[72px] flex flex-wrap md:flex-nowrap items-center justify-between border-b bg-white gap-3 md:gap-4 sticky top-0 z-20">
          
          <div className="flex items-center gap-3">
            <MobileSidebar examCategories={dynamicExams} />
            <h1 className="text-lg md:text-xl font-bold text-gray-900">All Exams</h1>
            <span className="bg-blue-50 text-blue-600 text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 rounded-full whitespace-nowrap">
              {dynamicExams.length} Available
            </span>
          </div>

          <div className="w-full order-3 md:order-none md:flex-1 md:max-w-2xl md:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for OPSC, OSSC, Maths..."
                className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium text-gray-600 border px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors">
              <Filter className="h-3.5 w-3.5 md:h-4 md:w-4" /> 
              <span className="hidden sm:inline">Filters</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 p-1 md:p-0 transition-colors">
              <MapPin className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8 overflow-y-auto">
          <ExamsHero />
          <ExamsGrid />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TrendingNow />
            </div>
            <div className="lg:col-span-2">
              <AIExplanation />
            </div>
          </div>
          
          <footer className="pt-6 md:pt-8 mt-6 md:mt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
               <span className="font-bold text-gray-900 text-sm md:text-xs">ExamSarthi</span>
               <span>© 2026 ExamSarthi Inc. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Help Center</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Contact Us</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}