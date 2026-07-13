"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutGrid, 
  GraduationCap, 
  History, 
  Bell, 
  Compass, 
  ChevronDown, 
  ChevronUp
} from "lucide-react";

import { type ExamCategory } from "@/types/exam";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

interface SidebarProps {
  examCategories: ExamCategory[];
}

export function Sidebar({ examCategories = [] }: SidebarProps) {
  const [isExamsOpen, setIsExamsOpen] = useState(true);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
const [categoryExams, setCategoryExams] = useState<Record<number, any[]>>({});

  const toggleCategory = async (categoryId: number) => {
  if (openCategoryId === categoryId) {
    setOpenCategoryId(null);
    return;
  }

  setOpenCategoryId(categoryId);

  if (!categoryExams[categoryId]) {
    const res = await fetch(`/api/categories/${categoryId}/exams`);
    const data = await res.json();

    setCategoryExams((prev) => ({
      ...prev,
      [categoryId]: data.data,
    }));
  }
};

  return (
    // UPDATED: Removed h-screen, sticky, and top-0 so it fits seamlessly into both desktop and mobile wrappers
    <aside className="w-[280px] bg-white flex flex-col h-full border-r">
      
      {/* Header / Logo Section */}
      <div className="shrink-0">
       <Image
              src="/images/logo_name.png"
              alt="Logo"
              width={200}
              height={200}
            />
        </div>

      {/* Navigation Links - Scrollable Area */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pb-4">
        
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <LayoutGrid className="h-5 w-5" />
          Dashboard
        </Link>
        <Link href="/chatbot" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <History className="h-5 w-5" />
          AI Chatbot
        </Link>
        <Link href="/study-plan" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <Bell className="h-5 w-5" />
          Study Planner
        </Link>

        {/* Interactive Dropdown: Explore Exams */}
        <div className="pt-2">
          <button 
            onClick={() => setIsExamsOpen(!isExamsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#f5f5ff] text-indigo-600 rounded-xl text-sm font-semibold transition-colors"
          >
            <div className="flex items-center gap-3">
              <Compass className="h-5 w-5" />
              Explore Exams
            </div>
            {isExamsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {/* Dynamic Subexams Section */}
          {isExamsOpen && (
            <div className="ml-6 mt-3 border-l-[1.5px] border-gray-100 pl-4 space-y-4 pb-2">
              <p className="text-[10px] font-bold text-gray-500 tracking-wider">SUBEXAMS</p>
              
              {examCategories.map((exam) => {
                const categoryId = Number(exam.id);
                const isOpen = openCategoryId === categoryId;

                return (
                  <div key={exam.id}>
                    <button 
                      onClick={() => toggleCategory(categoryId)}
                      className={`w-full flex items-center justify-between text-sm transition-colors ${
                        isOpen ? "font-semibold text-indigo-600" : "font-medium text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {exam.name}
                      {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    
                    {isOpen && (
                      <div className="mt-4 space-y-3 pl-2">
                        <p className="text-[10px] font-bold text-gray-400 tracking-wider">EXAMS</p>
                        <ul className="space-y-3">
  {(categoryExams[categoryId] || []).map((subexam) => (
    <li key={subexam.id}>
      <Link
        href={`/exams/${subexam.slug}`}
        className="flex items-center gap-3 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <div className="h-1.5 w-1.5 rounded-full border-[1.5px] border-gray-400 shrink-0"></div>
        <span className="truncate">{subexam.title}</span>
      </Link>
    </li>
  ))}
</ul>
                      </div>
                    )}
                  </div>
                );
              })}

              {examCategories.length === 0 && (
                <p className="text-xs text-gray-400 italic">No exams available.</p>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* User Profile Card - Fixed at bottom */}
      <div className="p-4 shrink-0 border-t">
  <div className="bg-primary text-white rounded-xl p-3 flex items-center justify-between shadow-sm">
    <div>
      <div className="text-sm font-bold">My Account</div>
      <div className="text-[10px] text-indigo-100 uppercase tracking-wider">
        Manage Profile
      </div>
    </div>

    <UserButton  />
  </div>
</div>

    </aside>
  );
}