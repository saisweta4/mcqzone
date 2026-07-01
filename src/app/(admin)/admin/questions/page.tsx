"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Filter, ChevronDown, Plus, Search, Eye, FileText, 
  LayoutList, CheckSquare, FileUp, Database
} from "lucide-react";

// --- Types and Mock Data ---
export interface QuizQuestion {
  id: string;
  questionText: string;
  options: { id: string; letter: string; text: string }[];
  correctOptionId: string;
  explanation: {
    short: string;
    detailed: string;
    keyConcepts: string[];
    tip: string;
  };
}

export const dummyQuestions: QuizQuestion[] = [
  {
    id: "Q-9821",
    questionText: "Which ruler of the Ganga dynasty built the famous Sun Temple at Konark?",
    options: [
      { id: "opt-a", letter: "A", text: "Anantavarman Chodaganga" },
      { id: "opt-b", letter: "B", text: "Narasimhadeva I" },
      { id: "opt-c", letter: "C", text: "Kapilendra Deva" },
      { id: "opt-d", letter: "D", text: "Anangabhima Deva III" }
    ],
    correctOptionId: "opt-b",
    explanation: {
      short: "Narasimhadeva I built the Konark Sun Temple in the 13th century.",
      detailed: "King Narasimhadeva I of the Eastern Ganga Dynasty built the Konark Sun Temple in 1250 CE to commemorate his victories...",
      keyConcepts: ["Narasimhadeva I", "Eastern Ganga Dynasty", "13th Century"],
      tip: "Remember Narasimhadeva I for Konark and Anantavarman for Jagannath Temple."
    }
  },
  {
    id: "Q-9822",
    questionText: "What is the standard GST rate for educational services in India?",
    options: [
      { id: "opt-a", letter: "A", text: "0%" },
      { id: "opt-b", letter: "B", text: "5%" },
      { id: "opt-c", letter: "C", text: "12%" },
      { id: "opt-d", letter: "D", text: "18%" }
    ],
    correctOptionId: "opt-a",
    explanation: {
      short: "Educational services provided by an educational institution are exempt from GST (0%).",
      detailed: "Services provided by an educational institution to its students, faculty and staff are exempt from GST...",
      keyConcepts: ["GST Exemption", "Educational Services"],
      tip: "Core educational services are generally exempt."
    }
  },
  {
    id: "Q-9823",
    questionText: "Identify the primary mountain range passing through Odisha.",
    options: [
      { id: "opt-a", letter: "A", text: "Western Ghats" },
      { id: "opt-b", letter: "B", text: "Eastern Ghats" },
      { id: "opt-c", letter: "C", text: "Vindhya Range" },
      { id: "opt-d", letter: "D", text: "Satpura Range" }
    ],
    correctOptionId: "opt-b",
    explanation: {
      short: "The Eastern Ghats run through the state of Odisha.",
      detailed: "The Eastern Ghats are a discontinuous range of mountains along India's eastern coast, passing significantly through Odisha...",
      keyConcepts: ["Eastern Ghats", "Geography of Odisha"],
      tip: "Odisha's major peaks like Deomali are part of the Eastern Ghats."
    }
  }
];

export default function QuestionsManagement() {
  const [activeQuestionId, setActiveQuestionId] = useState<string>(dummyQuestions[0].id);

  return (
    <div className="max-w-[1400px] mx-auto flex gap-8 pb-10 min-h-[calc(100vh-80px)]">
      
      {/* Left Column: Advanced Filters */}
      <div className="w-64 shrink-0 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-gray-900 font-bold mb-2">
          <Filter className="w-4 h-4" /> Advanced Filters
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Target Exam</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-3 pr-8 rounded-md text-sm outline-none focus:border-blue-500 shadow-sm">
                <option>All Exams</option>
                <option>OPSC ASO</option>
                <option>OSSC CGL</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Subject</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-3 pr-8 rounded-md text-sm outline-none focus:border-blue-500 shadow-sm">
                <option>All Subjects</option>
                <option>History of Odisha</option>
                <option>Geography</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Difficulty</label>
            <div className="space-y-3">
              {['Easy', 'Medium', 'Hard'].map((diff) => (
                <label key={diff} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-700">{diff}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Status</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-3 pr-8 rounded-md text-sm outline-none focus:border-blue-500 shadow-sm">
                <option>Any Status</option>
                <option>Published</option>
                <option>Draft</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-50 shadow-sm mt-2 transition-colors">
            Reset Filters
          </button>
        </div>
      </div>

      {/* Right Column: Main Content (Extended to fill space) */}
      <div className="flex-1 flex flex-col space-y-6 min-w-0">
        
        {/* Header & Stats Container */}
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Questions Management</h1>
              <p className="text-sm text-gray-500 mt-2 max-w-md">Manage, filter, and review MCQ database for upcoming state exams.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
                <FileUp className="w-4 h-4" /> Bulk Import
              </button>
              <Link href="/admin/questions/new" className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
                <Plus className="w-4 h-4" /> Create Question
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div className="p-5 border rounded-xl bg-white shadow-sm flex gap-4 items-center">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                <LayoutList className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Questions (Exam)</p>
                <p className="text-2xl font-bold text-gray-900">1,248</p>
                <p className="text-[11px] text-gray-500 mt-1">OPSC OAS 2024 Category</p>
              </div>
            </div>
            
            <div className="p-5 border rounded-xl bg-white shadow-sm flex gap-4 items-center">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                <Filter className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Filtered Result</p>
                <p className="text-2xl font-bold text-gray-900">452</p>
                <p className="text-[11px] text-gray-500 mt-1">History of Odisha Subject</p>
              </div>
            </div>
            
            <div className="p-5 border rounded-xl bg-white shadow-sm flex gap-4 items-center">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Review Required</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-[11px] text-gray-500 mt-1">Questions in Draft state</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Table Card */}
        <div className="bg-white border rounded-xl shadow-sm flex flex-col flex-1">
          
          {/* Table Toolbar */}
          <div className="p-4 border-b flex justify-between items-center bg-gray-50/50 rounded-t-xl">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search question" 
                className="w-full pl-9 pr-4 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-blue-500 bg-white" 
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
              <span className="text-sm font-medium text-gray-700">Enable Bulk Actions</span>
            </label>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 bg-white border-b uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4 w-20 text-center">Preview</th>
                  <th className="px-6 py-4">Question Snippet</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {dummyQuestions.map((q) => (
                  <tr 
                    key={q.id} 
                    onClick={() => setActiveQuestionId(q.id)}
                    className={`cursor-pointer group transition-colors ${activeQuestionId === q.id ? 'bg-blue-50/30 border-l-2 border-l-blue-600' : 'hover:bg-gray-50/50 border-l-2 border-l-transparent'}`}
                  >
                    <td className="px-6 py-5 text-center">
                      <button className={`p-2 rounded-md transition-colors ${activeQuestionId === q.id ? 'text-blue-600 bg-blue-100' : 'text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50'}`}>
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <Link href={`/admin/questions/${q.id}`} className="block">
                        <p className="font-semibold text-gray-900 mb-2 text-base line-clamp-1 pr-10">{q.questionText}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-medium border border-gray-200">
                            {q.id}
                          </span>
                          <span className="flex items-center gap-1.5 font-medium">
                            <FileText className="w-3.5 h-3.5 text-gray-400" /> 
                            2023-11-12
                          </span>
                        </div>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex justify-between items-center text-sm text-gray-500 bg-gray-50/50 rounded-b-xl">
            <p>Showing <span className="font-semibold text-gray-900">3</span> of <span className="font-semibold text-gray-900">452</span> questions</p>
            <div className="flex items-center gap-1.5">
              <button className="px-4 py-1.5 border rounded bg-white hover:bg-gray-50 font-medium shadow-sm transition-colors">Previous</button>
              <button className="w-9 h-9 flex items-center justify-center border rounded bg-blue-50 text-blue-600 border-blue-200 font-bold shadow-sm">1</button>
              <button className="w-9 h-9 flex items-center justify-center border rounded bg-white hover:bg-gray-50 font-medium shadow-sm transition-colors">2</button>
              <button className="w-9 h-9 flex items-center justify-center border rounded bg-white hover:bg-gray-50 font-medium shadow-sm transition-colors">3</button>
              <span className="w-9 text-center text-gray-400">...</span>
              <button className="w-9 h-9 flex items-center justify-center border rounded bg-white hover:bg-gray-50 font-medium shadow-sm transition-colors">61</button>
              <button className="px-4 py-1.5 border rounded bg-white hover:bg-gray-50 font-medium shadow-sm transition-colors">Next</button>
            </div>
          </div>
        </div>

        {/* Fast-Track Card (Moved below the table layout) */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 flex items-center justify-between shadow-sm mt-4">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-white rounded-lg shadow-sm border border-blue-100">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Fast-Track Your Database</h3>
              <p className="text-sm text-gray-600 mt-1">Import thousands of questions instantly using our Excel/CSV template.</p>
            </div>
          </div>
          <button className="bg-white border border-gray-200 text-blue-600 text-sm font-bold py-2.5 px-6 rounded-md shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
            Download Template &rarr;
          </button>
        </div>

      </div>
    </div>
  );
}