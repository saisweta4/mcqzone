"use client";

import { 
  Search, Filter, Download, Plus, Eye, Edit2, MoreVertical, 
  ChevronRight, ChevronLeft, Info, BookOpen, HelpCircle, Trash2, Calendar
} from "lucide-react";

const examsData = [
  { id: "EX-101", name: "Odisha Civil Services (OCS) 2024", subjects: 12, status: "Live", date: "2023-12-15" },
  { id: "EX-102", name: "OSSC Combined Graduate Level", subjects: 8, status: "Draft", date: "2024-01-10", active: true },
  { id: "EX-103", name: "OPSC Assistant Section Officer", subjects: 6, status: "Live", date: "2023-11-28" },
  { id: "EX-104", name: "Odisha Police SI Recruitment", subjects: 5, status: "Completed", date: "2023-09-05" },
  { id: "EX-105", name: "OTET - Primary Level", subjects: 4, status: "Draft", date: "2024-02-01" },
];

export default function ExamsManagement() {
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
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Create New Exam
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
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-medium bg-gray-50 p-1 rounded-md border">
              <button className="px-3 py-1 rounded bg-white shadow-sm text-gray-900">All</button>
              <button className="px-3 py-1 rounded text-gray-500 hover:text-gray-900">Live</button>
              <button className="px-3 py-1 rounded text-gray-500 hover:text-gray-900">Draft</button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 border-b bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="px-6 py-4 font-semibold">Exam Name</th>
                  <th className="px-6 py-4 font-semibold text-center">Subjects</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Created Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {examsData.map((exam, i) => (
                  <tr key={i} className={exam.active ? "bg-blue-50/50 border-l-2 border-l-blue-600" : "hover:bg-gray-50/50"}>
                    <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{exam.name}</p>
                      <p className="text-xs text-gray-500">{exam.id}</p>
                    </td>
                    <td className="px-6 py-4 text-center font-medium">{exam.subjects}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        exam.status === 'Live' ? 'bg-green-50 text-green-700 border-green-200' :
                        exam.status === 'Draft' ? 'bg-gray-100 text-gray-700 border-gray-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          exam.status === 'Live' ? 'bg-green-600' : exam.status === 'Draft' ? 'bg-gray-500' : 'bg-slate-500'
                        }`}></span>
                        {exam.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {exam.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">
                      <div className="flex items-center justify-end gap-3">
                        <button className="hover:text-blue-600 transition-colors"><Eye className="w-4 h-4" /></button>
                        <button className="hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="hover:text-gray-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex justify-between items-center text-sm text-gray-500 bg-gray-50/30">
            <p>Showing <span className="font-medium text-gray-900">1-5</span> of <span className="font-medium text-gray-900">24</span> exams</p>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 flex items-center justify-center border rounded bg-blue-50 text-blue-600 border-blue-200 font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 font-medium">2</button>
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 font-medium">3</button>
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 font-medium">4</button>
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
              <button className="text-gray-400 hover:text-gray-600"><ChevronRight className="w-5 h-5" /></button>
            </div>
            
            <p className="text-xs text-gray-500 mb-4">Instant overview of selected exam record.</p>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border">Draft</span>
              <span className="text-xs text-gray-500 font-medium">ID: EX-102</span>
            </div>
            
            <h2 className="text-lg font-bold text-gray-900 leading-tight mb-1">OSSC Combined Graduate Level</h2>
            <p className="text-xs text-gray-500 mb-6">Updated 2 days ago by Admin</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border rounded-md p-3 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-semibold">Subjects</span>
                </div>
                <p className="text-xl font-bold text-gray-900">8</p>
              </div>
              <div className="border rounded-md p-3 bg-gray-50/50">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-xs font-semibold">Questions</span>
                </div>
                <p className="text-xl font-bold text-gray-900">850</p>
              </div>
            </div>

            {/* Subject Breakdown */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Subject Breakdown</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">General Knowledge</span>
                    <span className="text-gray-500">40%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full w-[40%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">Mathematics</span>
                    <span className="text-gray-500">30%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full w-[30%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">English Literature</span>
                    <span className="text-gray-500">30%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full w-[30%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t">
              <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                View Full Details
              </button>
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
            <p className="text-xs text-blue-800 mt-1 leading-relaxed">Double-click any row to instantly jump to full subject management for that exam.</p>
          </div>
        </div>

      </div>

    </div>
  );
}