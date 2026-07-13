"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { clsx } from "clsx";
import Image from "next/image";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Exam Categories", href: "/admin/categories", icon: BookOpen },
  { name: "Exams", href: "/admin/exams", icon: BookOpen },
  { name: "Questions", href: "/admin/questions", icon: HelpCircle },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow md:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="shrink-0"
          />

          <span className="ml-2 text-2xl font-bold text-primary">
            MCQ<span className="text-secondary">Zone</span>
          </span>

          <button
            onClick={() => setOpen(false)}
            className="ml-auto md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-4 border-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}