import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getExamById, type Subject } from "@/lib/exam-data";
import { 
  ChevronLeft, Search, Bell, History, Globe, 
  Scale, TrendingUp, Brain, Calendar, Info, 
  BookOpen, FileQuestion, Target, Clock, ChevronRight,
  Calculator, Monitor 
} from "lucide-react";

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

// Next.js 15 requires params to be a Promise
export default async function ExamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params to resolve the dynamic ID safely
  const resolvedParams = await params;
  const exam = getExamById(resolvedParams.id);

  if (!exam) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-white">
      
      {/* Contextual Sidebar (Syllabus Overview) */}
      <aside className="w-64 border-r flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold">E</div>
            <span className="font-bold text-gray-900">ExamSarthi</span>
          </div>
          <p className="text-[10px] text-gray-500 tracking-wider font-semibold uppercase">Odisha Gov Prep</p>
        </div>

        <div className="p-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Syllabus Overview</h3>
          <nav className="space-y-1">
            {exam.subjects.map((subject, index) => {
              const IconComponent = iconMapping[subject.iconName] || BookOpen;
              return (
                <SidebarItem 
                  key={subject.id}
                  icon={IconComponent} 
                  label={subject.name} 
                  count={subject.questionCount.toLocaleString()} 
                  active={index === 0} 
                />
              );
            })}
          </nav>
        </div>

        {/* AI Buddy Card */}
        <div className="mt-auto p-4 border-t">
          <div className="bg-[#f4f7fc] p-4 rounded-xl mb-4">
            <h4 className="text-sm font-bold text-gray-900 mb-1">AI Study Buddy</h4>
            <p className="text-xs text-gray-500 mb-3">Get personalized tips based on your performance analysis.</p>
            <button className="w-full bg-blue-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-blue-700">
              Ask AI Coach
            </button>
          </div>
          <div className="flex items-center gap-3 px-2">
            <div className="relative w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
               {/* Replaced standard img with Next.js Image component */}
               <Image 
                 src="/user-avatar.png" 
                 alt="User" 
                 fill
                 className="object-cover" 
               />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Pratyush Dash</p>
              <p className="text-[10px] text-gray-500">OPSC Aspirant</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 px-8 flex items-center justify-between border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-4">
            <Link href="/exams" className="text-gray-500 hover:text-gray-900 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-base font-bold text-gray-900">{exam.shortName}</h1>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <button className="hover:text-gray-900"><Search className="h-5 w-5" /></button>
            <button className="hover:text-gray-900"><Bell className="h-5 w-5" /></button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {/* Hero Banner */}
          <div className="relative rounded-2xl p-8 mb-10 overflow-hidden border bg-gradient-to-br from-[#eef4ff] via-[#f8faff] to-white">
            <div className="flex flex-col lg:flex-row gap-8 justify-between relative z-10">
              
              <div className="max-w-xl">
                <div className="flex gap-2 mb-4">
                  {exam.tags.map(tag => (
                    <span key={tag} className="bg-white/60 border text-gray-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                  <span className="text-blue-600">{exam.highlightTitle}</span> {exam.title}
                </h2>
                
                <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                  {exam.description}
                </p>

                {/* Stat Blocks */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <StatBlock icon={BookOpen} label="Total Subjects" value={exam.stats.totalSubjects} />
                  <StatBlock icon={FileQuestion} label="Total Questions" value={exam.stats.totalQuestions} />
                  <StatBlock icon={Target} label="Mock Tests" value={exam.stats.mockTests} />
                  <StatBlock icon={Clock} label="Est. Study Time" value={exam.stats.studyTime} />
                </div>

                <div className="flex gap-3">
                  <button className="bg-blue-600/10 text-blue-700 font-medium px-6 py-2.5 rounded-lg border border-blue-600/20 hover:bg-blue-600/20 transition-colors">
                    View All Exams
                  </button>
                  <button className="bg-white text-gray-700 font-medium px-6 py-2.5 rounded-lg border hover:bg-gray-50 transition-colors">
                    Dashboard
                  </button>
                </div>
              </div>

              {/* Insights Card */}
              <div className="lg:w-72 shrink-0">
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
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Explore Subjects</h3>
              <p className="text-sm text-gray-500">Select a core subject to start practicing topics and quizzes.</p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button className="bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm">Grid View</button>
              <button className="text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-md hover:text-gray-900">Detailed List</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {exam.subjects.map((subject) => {
               const IconComponent = iconMapping[subject.iconName] || BookOpen;
               return <SubjectCard key={subject.id} subject={subject} icon={IconComponent} />;
             })}
          </div>

        </div>
        
        {/* Footer */}
        <footer className="border-t p-6 flex justify-between items-center text-xs text-gray-500 bg-gray-50/50">
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-900">Help Center</Link>
          </div>
          <div>
            © 2024 Odisha ExamSarthi. All rights reserved.
          </div>
        </footer>

      </main>
    </div>
  );
}

// --- Strictly Typed Helper Components ---

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  count: string | number;
  active?: boolean;
}

function SidebarItem({ icon: Icon, label, count, active = false }: SidebarItemProps) {
  return (
    <button className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium truncate max-w-[120px] text-left">{label}</span>
      </div>
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
        {count}
      </span>
    </button>
  );
}

interface StatBlockProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

function StatBlock({ icon: Icon, label, value }: StatBlockProps) {
  return (
    <div className="bg-white border rounded-xl p-4 flex-1 min-w-[120px] shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-gray-500">
        <Icon className="h-4 w-4" />
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-black text-gray-900">{value}</div>
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
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
            <Icon className="h-5 w-5" />
          </div>
          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md">
            {subject.questionCount.toLocaleString()} Qs
          </span>
        </div>
        <h4 className="text-lg font-bold text-gray-900 mb-2">{subject.name}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">
          {subject.description}
        </p>
      </div>
      <div className="border-t px-5 py-3 bg-gray-50/50 flex justify-between items-center group-hover:bg-blue-50 transition-colors">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-blue-600">Explore Topics</span>
        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
      </div>
    </div>
  );
}