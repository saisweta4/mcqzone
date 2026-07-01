"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Filter, Download, Plus, Eye, Edit2, MoreVertical, 
  ChevronRight, ChevronLeft, Info, BookOpen, HelpCircle, Trash2, Clock, Users
} from "lucide-react";

// --- Types and Mock Data ---
export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  attempts: number;
  difficulty: string;
  category: string;
}

export const exams: Exam[] = [
  { id: "opsc-aso", title: "OPSC ASO Prelims 2025", description: "Preliminary examination for OPSC ASO posts", questions: 100, duration: 120, attempts: 1250, difficulty: "Medium", category: "OPSC" },
  { id: "ossc-cgl", title: "OSSC CGL 2025", description: "Combined Graduate Level examination for OSSC posts", questions: 150, duration: 180, attempts: 2100, difficulty: "Hard", category: "OSSC" },
  { id: "ri-mock-01", title: "RI Mock Test 01", description: "Mock test for RI posts", questions: 100, duration: 90, attempts: 980, difficulty: "Easy", category: "OPSC" },
  { id: "gk-mega-test", title: "Odisha GK Mega Test", description: "Comprehensive general knowledge test for Odisha state exams", questions: 120, duration: 120, attempts: 3200, difficulty: "Medium", category: "GK" },
];

export default function ExamsManagement() {
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0].id);
  const selectedExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      
      {/* Left Column: Table & Management */}
      <div className="flex-1 space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Exams Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage categories, subjects, and statuses for all platform exams.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" /> Create New Exam
            </button>
          </div>
        </div>

        {/* Filters and Table Container */}
        <div className="bg-white rounded-lg border flex flex-col">
          
          {/* Toolbar */}
          <div className="p-4 border-b flex justify-between items-center gap-4">
            <div className="flex flex-1 gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search exam name or ID..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 border-b bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="px-6 py-4 font-semibold">Exam Name</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold text-center">Questions</th>
                  <th className="px-6 py-4 font-semibold">Difficulty</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {exams.map((exam) => {
                  const isActive = exam.id === selectedExamId;
                  return (
                    <tr 
                      key={exam.id} 
                      onClick={() => setSelectedExamId(exam.id)}
                      className={`cursor-pointer ${isActive ? "bg-blue-50/50 border-l-2 border-l-blue-600" : "hover:bg-gray-50/50"}`}
                    >
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/exams/${exam.id}`} className="hover:text-blue-600 transition-colors">
                          <p className="font-semibold text-gray-900">{exam.title}</p>
                          <p className="text-xs text-gray-500">{exam.id}</p>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold border">
                          {exam.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-medium">{exam.questions}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          exam.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                          exam.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {exam.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400">
                        <div className="flex items-center justify-end gap-3">
                          <Link href={`/admin/exams/${exam.id}`} className="hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button className="hover:text-gray-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex justify-between items-center text-sm text-gray-500 bg-gray-50/30">
            <p>Showing <span className="font-medium text-gray-900">1-{exams.length}</span> of <span className="font-medium text-gray-900">{exams.length}</span> exams</p>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 flex items-center justify-center border rounded bg-blue-50 text-blue-600 border-blue-200 font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Quick Preview */}
      <div className="w-80 flex flex-col gap-4 mt-[3.7rem]">
        
        {/* Preview Card */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
          <div className="h-1 w-full bg-blue-600"></div>
          <div className="p-5 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Quick Preview</h3>
              <Link href={`/admin/exams/${selectedExam.id}`} className="text-gray-400 hover:text-gray-600">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="text-xs text-gray-500 mb-4">Instant overview of selected exam record.</p>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border">{selectedExam.category}</span>
              <span className="text-xs text-gray-500 font-medium">ID: {selectedExam.id}</span>
            </div>
            
            <h2 className="text-lg font-bold text-gray-900 leading-tight mb-1">{selectedExam.title}</h2>
            <p className="text-xs text-gray-500 mb-6">{selectedExam.description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border rounded-md p-3 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">Questions</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{selectedExam.questions}</p>
              </div>
              <div className="border rounded-md p-3 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-semibold">Duration</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{selectedExam.duration}m</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t">
              <Link href={`/admin/exams/${selectedExam.id}`} className="w-full flex justify-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                View Full Details
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center justify-center gap-2 py-2 border border-red-200 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Pro Tip */}
        <div className="bg-blue-50 rounded-lg p-4 flex gap-3 items-start border border-blue-100">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-900">Pro Tip</h4>
            <p className="text-xs text-blue-800 mt-1 leading-relaxed">Click 'View Full Details' to manage subjects, questions, and curriculum for this exam.</p>
          </div>
        </div>

      </div>
    </div>
  );
}