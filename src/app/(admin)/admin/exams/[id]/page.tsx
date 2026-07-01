"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ChevronRight, Edit, Trash2, Plus, LayoutGrid, List as ListIcon, 
  Filter, GripVertical, FileText, Target, Clock, User, 
  Info, CheckCircle2, ChevronRight as ChevronRightIcon,
  History, Globe, Flag, Calculator, Monitor, Calendar, BookOpen
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Types and Mock Database ---
export interface Subject {
  id: string;
  name: string;
  questionCount: number;
  iconName: string;
  description: string;
}

export interface ExamDetail {
  id: string;
  title: string;
  highlightTitle: string;
  shortName: string;
  description: string;
  tags: string[];
  stats: {
    totalSubjects: number;
    totalQuestions: string;
    mockTests: number;
    studyTime: string;
  };
  insights: string;
  subjects: Subject[];
}

export const mockExamsDatabase: ExamDetail[] = [
  {
    id: "opsc-aso",
    title: "OPSC ASO Prelims 2025",
    highlightTitle: "OPSC",
    shortName: "OPSC ASO",
    description: "Preliminary examination for OPSC ASO posts. Test your preparation level with these curated questions.",
    tags: ["New", "Mock Test"],
    stats: { totalSubjects: 3, totalQuestions: "100", mockTests: 1, studyTime: "2h" },
    insights: "Speed and accuracy in arithmetic will decide your rank here.",
    subjects: [
      { id: "history-opsc", name: "History", questionCount: 40, iconName: "History", description: "Ancient Kalinga to modern state formation." },
      { id: "geography-opsc", name: "Geography", questionCount: 40, iconName: "Globe", description: "Current events, History, and Geography." },
      { id: "political-opsc", name: "Political Science", questionCount: 20, iconName: "Flag", description: "Indian Politics, Constitution, and Governance." }
    ]
  },
  {
    id: "ri-mock-01",
    title: "Revenue Inspector Mock Test 01",
    highlightTitle: "OPSC",
    shortName: "RI Mock 01",
    description: "Full-length mock test for the Revenue Inspector examination. Test your preparation level with these curated questions.",
    tags: ["New", "Mock Test"],
    stats: { totalSubjects: 3, totalQuestions: "100", mockTests: 1, studyTime: "2h" },
    insights: "Speed and accuracy in arithmetic will decide your rank here.",
    subjects: [
      { id: "math-ri", name: "Mathematics", questionCount: 40, iconName: "Calculator", description: "Arithmetic, Mensuration, and basic Algebra." },
      { id: "gk-ri", name: "General Knowledge", questionCount: 40, iconName: "Globe", description: "Current events, History, and Geography." },
      { id: "comp-ri", name: "Computer Test", questionCount: 20, iconName: "Monitor", description: "Basic IT and MS Office practical knowledge." }
    ]
  },
  {
    id: "gk-mega-test",
    title: "Odisha GK Mega Test",
    highlightTitle: "State Exams",
    shortName: "GK Mega",
    description: "Comprehensive general knowledge test focusing specifically on Odisha state history, geography, and current affairs.",
    tags: ["Trending", "High Yield"],
    stats: { totalSubjects: 3, totalQuestions: "120", mockTests: 5, studyTime: "4h" },
    insights: "Focus heavily on recent state government schemes and tribal history.",
    subjects: [
      { id: "hist-od", name: "Odisha History", questionCount: 50, iconName: "History", description: "Ancient Kalinga to modern state formation." },
      { id: "geo-od", name: "Odisha Geography", questionCount: 40, iconName: "Globe", description: "Rivers, climate, and topography of the region." },
      { id: "ca-od", name: "Current Events", questionCount: 30, iconName: "Calendar", description: "State-specific current affairs from the last 6 months." }
    ]
  }
];

export function getExamById(id: string): ExamDetail | undefined {
  return mockExamsDatabase.find((exam) => exam.id === id);
}

// Icon Mapping Helper
const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    History: History,
    Globe: Globe,
    Flag: Flag,
    Calculator: Calculator,
    Monitor: Monitor,
    Calendar: Calendar,
  };
  const Icon = icons[iconName] || BookOpen;
  return <Icon className="w-5 h-5 text-gray-700" />;
};

export default function ExamDetails() {
  const params = useParams();
  const examId = params.id as string;
  const exam = getExamById(examId);

  // Fallback state if exam not found
  if (!exam) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Not Found</h2>
        <p className="text-gray-500 mb-4">We couldn't find an exam with ID: {examId}</p>
        <Link href="/admin/exams" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Back to Exams
        </Link>
      </div>
    );
  }

  // Generate some dummy toggle state for UI interactivity based on the fetched subjects
  const [activeSubjects, setActiveSubjects] = useState<Record<string, boolean>>(
    exam.subjects.reduce((acc, sub) => ({ ...acc, [sub.id]: true }), {})
  );

  const toggleStatus = (id: string) => {
    setActiveSubjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto flex gap-6 pb-10">
      
      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* Breadcrumbs & Header */}
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Link href="/admin/exams" className="hover:text-blue-600 transition-colors">Exams</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-medium text-gray-900">{exam.shortName}</span>
          </div>

          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{exam.title}</h1>
                <span className="bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide">
                  {exam.highlightTitle}
                </span>
                {exam.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 max-w-2xl">{exam.description}</p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Edit className="w-4 h-4" /> Edit Exam
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-md text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm">
                <Plus className="w-4 h-4" /> Create Subject
              </button>
            </div>
          </div>
        </div>

        {/* Subjects Grid Section */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-gray-900">Exam Subjects</h2>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">{exam.subjects.length} Found</span>
            </div>
            <div className="flex items-center gap-4 text-gray-500">
              <div className="flex items-center bg-gray-50 border rounded-md p-0.5">
                <button className="p-1.5 bg-white shadow-sm rounded text-gray-900"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-1.5 hover:text-gray-900"><ListIcon className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {exam.subjects.map((sub) => {
              const isActive = activeSubjects[sub.id];
              return (
                <div key={sub.id} className="border rounded-lg p-5 hover:shadow-md transition-shadow bg-white flex flex-col group relative">
                  <button className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 bg-gray-50 rounded-md border">
                      {getIconComponent(sub.iconName)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-tight pr-6">{sub.name}</h3>
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{sub.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6 mt-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{sub.questionCount} Questions Added</span>
                  </div>

                  <div className="mt-auto space-y-4">
                    <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded-md border border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                          {isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                        <button 
                          onClick={() => toggleStatus(sub.id)}
                          className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                          <div className={`bg-white w-3.5 h-3.5 rounded-full shadow-sm transform transition-transform ${isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    </div>
                    
                    <button className="w-full flex items-center justify-between px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                      Manage Questions
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Add New Subject Card */}
            <button className="border-2 border-dashed border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600 transition-colors min-h-[220px]">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-blue-50">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-semibold">Add New Subject</span>
              <span className="text-xs mt-1 text-gray-400">Expand the exam curriculum</span>
            </button>
          </div>
        </div>

        {/* Bottom Publish Banner */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-md shadow-sm border">
              <CheckCircle2 className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Ready to publish changes?</h4>
              <p className="text-xs text-gray-500 mt-0.5">All draft subjects must be set to 'Active' before students can view them.</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white border shadow-sm rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Review Exam Page
          </button>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="w-80 flex flex-col gap-6 mt-[4.5rem]">
        
        {/* Exam Snapshot */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Exam Snapshot</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-none">{exam.stats.totalSubjects}</p>
                <p className="text-xs text-gray-500 mt-1">Total Subjects</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-none">{exam.stats.totalQuestions}</p>
                <p className="text-xs text-gray-500 mt-1">Total Questions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-none">{exam.stats.studyTime}</p>
                <p className="text-xs text-gray-500 mt-1">Study Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-5">
          <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">Platform Insights</h3>
          <p className="text-sm text-blue-900 leading-relaxed">{exam.insights}</p>
        </div>

        {/* Activity & Details */}
        <div className="bg-white rounded-lg border shadow-sm p-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Activity & Details</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-900 mb-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" /> Last Updated
              </div>
              <p className="text-sm text-gray-600 pl-5.5">Today at 14:30 PM</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-900 mb-1">
                <User className="w-3.5 h-3.5 text-gray-500" /> Managed By
              </div>
              <p className="text-sm text-gray-600 pl-5.5">System Admin</p>
            </div>
          </div>

          <button className="w-full mt-5 py-2 border rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Visibility History
          </button>
        </div>

      </div>
    </div>
  );
}