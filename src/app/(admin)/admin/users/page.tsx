"use client";

import { 
  Search, Download, Plus, Filter, Shield, ChevronDown, 
  MoreHorizontal, BookOpen, ChevronLeft, ChevronRight
} from "lucide-react";

const usersData = [
  { id: 1, name: "Aarav Mohapatra", role: "Student", date: "Oct 12, 2023", exams: 24, status: "active", img: "https://ui-avatars.com/api/?name=Aarav+Mohapatra&background=0D8ABC&color=fff" },
  { id: 2, name: "Ishani Dash", role: "Student", date: "Nov 08, 2023", exams: 12, status: "active", img: "https://ui-avatars.com/api/?name=Ishani+Dash&background=4F46E5&color=fff" },
  { id: 3, name: "Siddharth Patnaik", role: "Mentor", date: "Jan 20, 2023", exams: 0, status: "active", img: "https://ui-avatars.com/api/?name=Siddharth+Patnaik&background=0f172a&color=fff" },
  { id: 4, name: "Priyanka Rout", role: "Student", date: "Dec 15, 2023", exams: 5, status: "banned", img: "https://ui-avatars.com/api/?name=Priyanka+Rout&background=be123c&color=fff" },
  { id: 5, name: "Rohan Biswal", role: "Student", date: "Feb 22, 2024", exams: 38, status: "active", img: "https://ui-avatars.com/api/?name=Rohan+Biswal&background=0D8ABC&color=fff" },
];

export default function UserManagement() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all students and members on the Odisha Government Exam Preparation Platform.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add New User
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-lg border shadow-sm flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or location..." 
              className="w-full pl-9 pr-4 py-2 text-sm border rounded-md outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50/50"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-400" />
              Filter Role
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Shield className="w-4 h-4 text-gray-400" />
              Status
            </button>
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Bulk Actions
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-white border-b font-semibold">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">User Information</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-center">Role</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Registration Date</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Exams Taken</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full border shadow-sm" />
                      <span className="font-semibold text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[11px] font-medium border border-gray-200">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {user.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{user.exams}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.status === 'active' ? (
                      <span className="bg-green-50 text-green-600 border border-green-200 px-2.5 py-1 rounded-full text-[11px] font-medium">
                        active
                      </span>
                    ) : (
                      <span className="bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-full text-[11px] font-medium">
                        banned
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t flex justify-between items-center text-sm text-gray-500 bg-white">
          <p>Showing 1-5 of 1,240 users</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-50 font-medium">Previous</button>
            <div className="flex gap-1 mx-2">
              <button className="w-8 h-8 flex items-center justify-center border rounded bg-blue-50 text-primary border-blue-200 font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 font-medium text-gray-700">2</button>
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50 font-medium text-gray-700">3</button>
              <span className="flex items-center justify-center w-8 text-gray-400">...</span>
            </div>
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-50 font-medium">Next</button>
          </div>
        </div>
      </div>

      {/* Stats Cards Bottom */}
      <div className="grid grid-cols-3 gap-6 pt-2">
        <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-100 flex flex-col justify-center">
          <p className="text-sm text-primary font-semibold mb-2">New Users Today</p>
          <h3 className="text-3xl font-bold text-gray-900">124</h3>
        </div>
        <div className="bg-white p-6 rounded-lg border flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-semibold mb-2">Active Subscriptions</p>
          <h3 className="text-3xl font-bold text-gray-900">892</h3>
        </div>
        <div className="bg-white p-6 rounded-lg border flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-semibold mb-2">Flagged Activities</p>
          <h3 className="text-3xl font-bold text-gray-900">12</h3>
        </div>
      </div>

    </div>
  );
}