import Image from "next/image";
import { getAllUsers } from "@/lib/db/repositories/user.repository";

import {
  Search,
  Download,
  Plus,
  Filter,
  Shield,
  ChevronDown,
  MoreHorizontal,
  BookOpen,
} from "lucide-react";

export default async function UserManagement() {
  const usersData = await getAllUsers();

  console.log(usersData);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            User Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage all students and members on the Odisha Government Exam
            Preparation Platform.
          </p>
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

      {/* Table Card */}
      <div className="bg-white rounded-lg border shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search by name, email..."
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

            <div className="h-6 w-px bg-gray-200"></div>

            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Bulk Actions
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-white border-b font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4">Registered</th>
                <th className="px-6 py-4">Exams</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {usersData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* User */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          user.image_url ??
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            `${user.first_name ?? ""} ${
                              user.last_name ?? ""
                            }`
                          )}`
                        }
                        alt={`${user.first_name ?? ""} ${
                          user.last_name ?? ""
                        }`}
                        width={36}
                        height={36}
                        className="rounded-full border"
                      />

                      <div>
                        <p className="font-semibold text-gray-900">
                          {`${user.first_name ?? ""} ${
                            user.last_name ?? ""
                          }`.trim()}
                        </p>

                        <p className="text-xs text-gray-500">
                          ID #{user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </td>

                  {/* Registration */}
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  {/* Exams */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>0</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}

              {usersData.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t p-4 text-sm text-gray-500">
          <p>
            Showing <strong>{usersData.length}</strong> users
          </p>

          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Previous
            </button>

            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <p className="text-sm text-primary font-semibold">
            Total Users
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {usersData.length}
          </h3>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500 font-semibold">
            Admins
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {usersData.filter((u) => u.role === "ADMIN").length}
          </h3>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500 font-semibold">
            Students
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {usersData.filter((u) => u.role === "USER").length}
          </h3>
        </div>
      </div>
    </div>
  );
}