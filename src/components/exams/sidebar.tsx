"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutGrid, 
  History, 
  Bell, 
  Compass, 
  ChevronDown, 
  ChevronUp
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

import { type Category } from "@/components/admin/categories/types"; // or wherever this interface is

interface SidebarProps {
  examCategories: Category[];
}

export function Sidebar({ examCategories = [] }: SidebarProps) {
  const [isExamsOpen, setIsExamsOpen] = useState(true);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
const [categoryExams, setCategoryExams] = useState<Record<number, any[]>>({});


const { isSignedIn, user } = useUser();


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
<div className="pt-8 pb-6 px-6 shrink-0">
  <Link
    href="/"
    className="flex items-center gap-3 hover:opacity-90 transition-opacity"
  >
    <Image
      src="/images/logo_name.png"
      alt="MCQZone"
      width={180}
      height={180}
      priority
      className="object-contain"
    />
  </Link>

  <p className="text-[10px] font-bold text-gray-400 tracking-wider mt-2 ml-1">
    MAIN MENU
  </p>
</div>

      {/* Navigation Links - Scrollable Area */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto pb-4">
        
        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <LayoutGrid className="h-5 w-5" />
          Profile
        </Link>
        <Link href="/chatbot" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <History className="h-5 w-5" />
          AI Chatbot
        </Link>
        <Link href="/study-planner" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <Bell className="h-5 w-5" />
          Study Planner
        </Link>

        {/* Interactive Dropdown: Explore Exams */}
        <div className="pt-2">
          <button 
            onClick={() => setIsExamsOpen(!isExamsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#f5f5ff] text-primary rounded-xl text-sm font-semibold transition-colors"
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
                        isOpen ? "font-semibold text-primary" : "font-medium text-gray-600 hover:text-gray-900"
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
       href={`/exams/${exam.slug}/${subexam.slug}`}
        className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary transition-colors"
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
  {isSignedIn ? (
    <div className="bg-primary text-white rounded-xl p-3 flex items-center gap-3">
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-10 w-10",
          },
        }}
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">
          {user?.fullName}
        </p>
        <p className="text-xs text-indigo-100 truncate">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>
    </div>
  ) : (
    <Link
      href="/sign-in"
      className="block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
    >
      Sign In
    </Link>
  )}
</div>

    </aside>
  );
}