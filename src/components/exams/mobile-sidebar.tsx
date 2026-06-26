"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/exams/sidebar"; 
import { type ExamCategory } from "@/types/exam"; 

interface MobileSidebarProps {
  examCategories?: ExamCategory[];
}

export function MobileSidebar({ examCategories = [] }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-1 text-gray-600 hover:text-gray-900 transition-colors shrink-0 lg:hidden"
        aria-label="Open Menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors z-50"
          aria-label="Close Menu"
        >
          <X className="h-5 w-5" />
        </button>

        {/* UPDATED: Container strictly constrained to full height */}
        <div className="flex-1 h-full w-full overflow-hidden">
          <Sidebar examCategories={examCategories} />
        </div>
      </div>
    </>
  );
}