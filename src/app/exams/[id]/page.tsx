// indivisual exam details page
// http://localhost:3000/exams/id

import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamById, type Subject } from "@/lib/exam-data";
import { 
  ChevronLeft, Search, Bell, History, Globe, 
  Scale, TrendingUp, Brain, Calendar, Info, 
  BookOpen, FileQuestion, Target, Clock, ChevronRight,
  Calculator, Monitor
} from "lucide-react";

// Import your new global sidebars
import { Sidebar } from "@/components/exams/sidebar";
import { MobileSidebar } from "@/components/exams/mobile-sidebar";

// Map string icon names from the DB to actual Lucide components
const iconMapping: Record<string, React.ElementType> = {
  History,
  Globe,
  Scale,
  TrendingUp,
  Brain,
  Calendar,
  Calculator,
  Monitor,
  BookOpen,
};

// Mock function to fetch the global sidebar navigation data
// Replace this with your actual database call or layout data fetcher
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

// Next.js 15 requires params to be a Promise
export default async function ExamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params to resolve the dynamic ID safely
  const resolvedParams = await params;
  const exam = getExamById(resolvedParams.id);
  
  // Fetch global sidebar data
  const dynamicExams = await getExamsFromDatabase();

  if (!exam) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      
      {/* GLOBAL DESKTOP SIDEBAR */}
      <div className="hidden lg:block shrink-0 h-screen sticky top-0 z-30 shadow-sm border-r border-gray-200">
        <Sidebar examCategories={dynamicExams} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 w-full bg-white">
        
        {/* Top Header */}
        <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b sticky top-0 bg-white z-20">
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* MOBILE SIDEBAR (Hamburger menu trigger) */}
            <MobileSidebar examCategories={dynamicExams} />
            
            <Link href="/exams" className="hidden sm:block text-gray-500 hover:text-gray-900 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-sm md:text-base font-bold text-gray-900 truncate max-w-[150px] sm:max-w-xs">{exam.shortName}</h1>
          </div>
          <div className="flex items-center gap-3 md:gap-4 text-gray-500">
            <button className="hover:text-gray-900"><Search className="h-5 w-5" /></button>
            <button className="hover:text-gray-900"><Bell className="h-5 w-5" /></button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          
          {/* Hero Banner */}
          <div className="relative rounded-2xl p-5 md:p-8 mb-8 md:mb-10 overflow-hidden border bg-gradient-to-br from-[#eef4ff] via-[#f8faff] to-white">
            <div className="flex flex-col lg:flex-row gap-8 justify-between relative z-10">
              
              <div className="max-w-xl w-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  {exam.tags.map(tag => (
                    <span key={tag} className="bg-white/60 border text-gray-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                  <span className="text-blue-600 block sm:inline">{exam.highlightTitle}</span> {exam.title}
                </h2>
                
                <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed">
                  {exam.description}
                </p>

                {/* Stat Blocks - Responsive Grid */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 md:gap-4 mb-8">
                  <StatBlock icon={BookOpen} label="Total Subjects" value={exam.stats.totalSubjects} />
                  <StatBlock icon={FileQuestion} label="Total Questions" value={exam.stats.totalQuestions} />
                  <StatBlock icon={Target} label="Mock Tests" value={exam.stats.mockTests} />
                  <StatBlock icon={Clock} label="Est. Time" value={exam.stats.studyTime} />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="w-full sm:w-auto text-center bg-blue-600/10 text-blue-700 font-medium px-6 py-2.5 rounded-lg border border-blue-600/20 hover:bg-blue-600/20 transition-colors">
                    View All Exams
                  </button>
                  <button className="w-full sm:w-auto text-center bg-white text-gray-700 font-medium px-6 py-2.5 rounded-lg border hover:bg-gray-50 transition-colors">
                    Dashboard
                  </button>
                </div>
              </div>

              {/* Insights Card */}
              <div className="w-full lg:w-72 shrink-0">
                <div className="bg-white p-6 rounded-xl shadow-sm border h-full flex flex-col justify-center text-center">
                  <div className="mx-auto bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-4 border">
                    <Info className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Exam Insights</h3>
                  <p className="text-xs text-gray-500 mb-6">
                    {exam.insights}
                  </p>
                  <div className="pt-4 border-t text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Registration Ends: TBA
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Subject Grid Section */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Explore Subjects</h3>
              <p className="text-sm text-gray-500">Select a core subject to start practicing topics.</p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
              <button className="flex-1 sm:flex-none bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm">Grid</button>
              <button className="flex-1 sm:flex-none text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-md hover:text-gray-900">List</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
             {exam.subjects.map((subject) => {
               const IconComponent = iconMapping[subject.iconName] || BookOpen;
               return <SubjectCard key={subject.id} subject={subject} icon={IconComponent} />;
             })}
          </div>

        </div>
        
        {/* Footer */}
        <footer className="border-t p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 bg-gray-50/50 text-center sm:text-left mt-auto">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900">Help Center</Link>
          </div>
          <div>
            © 2026 Odisha ExamSarthi.
          </div>
        </footer>

      </main>
    </div>
  );
}

// --- Strictly Typed Helper Components ---

interface StatBlockProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

function StatBlock({ icon: Icon, label, value }: StatBlockProps) {
  return (
    <div className="bg-white border rounded-xl p-3 md:p-4 flex-1 min-w-[140px] shadow-sm flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-1 md:mb-2 text-gray-500">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider truncate">{label}</span>
      </div>
      <div className="text-lg md:text-xl font-black text-gray-900 truncate">{value}</div>
    </div>
  );
}

interface SubjectCardProps {
  subject: Subject;
  icon: React.ElementType;
}

function SubjectCard({ subject, icon: Icon }: SubjectCardProps) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer flex flex-col h-full">
      <div className="p-4 md:p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0">
            <Icon className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap">
            {subject.questionCount.toLocaleString()} Qs
          </span>
        </div>
        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2">{subject.name}</h4>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {subject.description}
        </p>
      </div>
      <div className="border-t px-4 md:px-5 py-3 bg-gray-50/50 flex justify-between items-center group-hover:bg-blue-50 transition-colors mt-auto">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-blue-600">Explore Topics</span>
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
      </div>
    </div>
  );
}