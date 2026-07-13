import { Users, BookOpen, Layers, HelpCircle, Plus, Calendar, ArrowUpRight, ArrowDownRight, MoreHorizontal, CheckCircle2, AlertCircle, UserPlus, MailCheck } from "lucide-react";
import DashboardChart from "@/components/admin/DashboardChart";
import { getDashboardStats } from "@/lib/db/repositories/dashboard.repository";
import { title } from "process";

export default async function Dashboard() {
  const stats = await getDashboardStats();

  console.log(stats);
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Ranjit. Here's what's happening on your platform today.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>
      </div>

      {/* Stats Cards */}
<div className="grid grid-cols-4 gap-4">
  {[
    {
      title: "TOTAL USERS",
      value: stats.users.toLocaleString(),
      trend: "+12.5%",
      isUp: true,
      icon: Users,
      color: "text-primary",
      bg: "bg-blue-50",
    },
    {
      title: "TOTAL EXAMS",
      value: stats.exams.toLocaleString(),
      trend: "+4.2%",
      isUp: true,
      icon: BookOpen,
      color: "text-primary",
      bg: "bg-blue-50",
    },
    {
      title: "TOTAL SUBJECTS",
      value: stats.subjects.toLocaleString(),
      trend: "+2.1%",
      isUp: true,
      icon: Layers,
      color: "text-primary",
      bg: "bg-blue-50",
    },
    {
      title: "TOTAL QUESTIONS",
      value: stats.questions.toLocaleString(),
      trend: "-0.5%",
      isUp: false,
      icon: HelpCircle,
      color: "text-primary",
      bg: "bg-blue-50",
    },
  ].map((stat, i) => (
    <div
      key={i}
      className="bg-white p-5 rounded-lg border flex flex-col justify-between h-32"
    >
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-md ${stat.bg}`}>
          <stat.icon className={`w-5 h-5 ${stat.color}`} />
        </div>

        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            stat.isUp
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {stat.isUp ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {stat.trend}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 font-semibold mb-1">
          {stat.title}
        </p>

        <h3 className="text-2xl font-bold text-gray-900">
          {stat.value}
        </h3>
      </div>
    </div>
  ))}
</div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="col-span-2 bg-white rounded-lg border p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-base font-bold text-gray-900">Most Attempted Exam: OSSC CGL 2024</h2>
              <p className="text-xs text-gray-500 mt-1">Historical attempt trends and participation growth</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          
          <DashboardChart />

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t text-center">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Average Score</p>
              <p className="text-xl font-bold text-gray-900 mt-1">72.4%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Active Candidates</p>
              <p className="text-xl font-bold text-gray-900 mt-1">4,120</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">Completion Rate</p>
              <p className="text-xl font-bold text-gray-900 mt-1">89%</p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="col-span-1 bg-white rounded-lg border p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Live</span>
          </div>

          <div className="space-y-6 flex-1">
            {[
              { name: "Amitav Das", action: "Registered for a new account from Bhubaneswar.", time: "Just now", icon: UserPlus, color: "text-blue-500", img: "https://ui-avatars.com/api/?name=Amitav+Das" },
              { name: "Priyanka Mohanty", action: 'Completed "Odisha History Full Mock Test" with 88% score.', time: "12 mins ago", icon: CheckCircle2, color: "text-green-500", img: "https://ui-avatars.com/api/?name=Priyanka+Mohanty" },
              { name: "Suresh Kumar", action: 'Flagged Question Q-9201 for "Incorrect Answer Option".', time: "1 hour ago", icon: AlertCircle, color: "text-red-500", img: "https://ui-avatars.com/api/?name=Suresh+Kumar" },
              { name: "Lipika Sahoo", action: "Verified their email address and joined the OPSC group.", time: "4 hours ago", icon: MailCheck, color: "text-blue-500", img: "https://ui-avatars.com/api/?name=Lipika+Sahoo" }
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <img src={activity.img} alt={activity.name} className="w-8 h-8 rounded-full border" />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <activity.icon className={`w-3 h-3 ${activity.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{activity.action}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full text-center text-sm font-medium text-primary hover:text-blue-700 mt-4 pt-4 border-t">
            View Full Audit Log &rarr;
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recently Added Questions</h2>
            <p className="text-xs text-gray-500 mt-1">High-priority content review pending approval</p>
          </div>
          <button className="text-sm font-medium text-gray-700 bg-white border px-3 py-1.5 rounded hover:bg-gray-50 flex items-center gap-2">
            Manage All Questions <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-gray-50/50 border-b uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Question Snippet</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Exam Category</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4 text-right">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {[
                { id: "Q-9821", q: "Which river is known as the Life Line of Odisha?", sub: "Odisha Geography", exam: "OSSC CGL", diff: "Easy", time: "2 mins ago" },
                { id: "Q-9820", q: "Who was the first Chief Minister of Odisha?", sub: "Odisha History", exam: "OPSC OAS", diff: "Medium", time: "15 mins ago" },
                { id: "Q-9819", q: "The Konark Sun Temple was built by which king?", sub: "Art & Culture", exam: "OSSSC PEO", diff: "Easy", time: "1 hr ago" },
                { id: "Q-9818", q: "In which year Odisha became a separate province?", sub: "General Knowledge", exam: "OSSC Junior Clerk", diff: "Medium", time: "3 hrs ago" },
                { id: "Q-9817", q: "What is the state animal of Odisha?", sub: "General Knowledge", exam: "OSSC CGL", diff: "Easy", time: "5 hrs ago" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-primary cursor-pointer">{row.id}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{row.q}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-[11px] font-medium border border-gray-200">
                      {row.sub}
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.exam}</td>
                  <td className="px-6 py-4">{row.diff}</td>
                  <td className="px-6 py-4 text-right text-gray-500 text-xs">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}