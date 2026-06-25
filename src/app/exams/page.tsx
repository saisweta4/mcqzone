import { Sidebar } from "@/components/exams/sidebar";
import { ExamsGrid } from "@/components/exams/exams-grid";
import { ExamsHero } from "@/components/exams/exams-hero";
import { TrendingNow } from "@/components/exams/trending-now";
import { AIExplanation } from "@/components/exams/ai-explanation";
import { Search, Filter, MapPin } from "lucide-react";

export default function ExamsPage() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-[72px] px-8 flex items-center justify-between border-b bg-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">All Exams</h1>
            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
              8 Exams Available
            </span>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for OPSC, OSSC, Maths, or medical relation..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 border px-4 py-2 rounded-lg bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filters
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <MapPin className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
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
          
          {/* Simple Footer */}
          <footer className="pt-8 mt-8 border-t flex justify-between items-center text-xs text-gray-400">
            <div className="flex items-center gap-2">
               <span className="font-bold text-gray-900">ExamSarthi</span>
               <span>© 2024 ExamSarthi Inc. All rights reserved.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600">Terms of Service</a>
              <a href="#" className="hover:text-gray-600">Help Center</a>
              <a href="#" className="hover:text-gray-600">Contact Us</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}