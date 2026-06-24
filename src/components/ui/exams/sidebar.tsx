"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, Trophy, Users, Bell, ChevronUp } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, active: false },
  { name: "Explore Exams", href: "/exams", icon: FileText, active: true },
  { name: "My Performance", href: "/performance", icon: Trophy, active: false },
  { name: "Mock Interviews", href: "/interviews", icon: Users, active: false },
  { name: "Exam Alerts", href: "/alerts", icon: Bell, active: false },
];

export function Sidebar() {
  return (
    <aside className="w-[260px] bg-white border-r flex flex-col h-screen sticky top-0">
      <div className="h-[72px] px-6 flex items-center">
        <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">M</div>
          MCQZone
        </h1>
      </div>

      <div className="px-4 py-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Main Menu
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Card */}
      <div className="p-4 mt-auto border-t">
        <div className="bg-user-gradient text-white rounded-xl p-3 flex items-center gap-3 shadow-md">
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
            <img src="/user-avatar.png" alt="User" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Niharika Kalia</div>
            <div className="text-xs text-white/80">OPSC Aspirant</div>
          </div>
          <ChevronUp className="h-4 w-4 text-white/80" />
        </div>
      </div>
    </aside>
  );
}