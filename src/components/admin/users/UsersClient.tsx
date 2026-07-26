
"use client";

import Image from "next/image";

import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

import {
  BookOpen,
MoreVertical
} from "lucide-react";



import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type Props = {
  initialUsers: any[];
};

export default function UsersClient({
  initialUsers,
}: Props) {

    const { user: clerkUser } = useUser();

  const [users, setUsers] = useState(initialUsers);
const [loadingId, setLoadingId] = useState<number | null>(null);

async function handleRoleChange(
  id: number,
  role: "ADMIN" | "USER"
) {
  setLoadingId(id);

  const toastId = toast.loading("Updating role...");

  try {
    const res = await fetch("/api/users/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        role,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message, {
        id: toastId,
      });
      return;
    }

    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              role,
            }
          : u
      )
    );

    toast.success("Role updated successfully.", {
      id: toastId,
    });
  } catch {
    toast.error("Something went wrong.", {
      id: toastId,
    });
  } finally {
    setLoadingId(null);
  }
}

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
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg border shadow-sm flex flex-col">

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-white border-b font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="hidden md:table-cell px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="hidden md:table-cell px-6 py-4">Registered</th>
                <th className="hidden md:table-cell px-6 py-4">Exams</th>
                <th className="hidden md:table-cell px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((user) => (
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
                  <td className="hidden md:table-cell px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </td>

                  {/* Registration */}
                  <td className="hidden md:table-cell px-6 py-4 text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>

                  {/* Exams */}
                  <td className="hidden md:table-cellpx-6 py-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span>0</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="hidden md:table-cell px-6 py-4 text-center">
                    <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 md:px-6 py-4 text-right">
  {/* Desktop */}
  <div className="hidden md:block">
    {user.clerk_id === clerkUser?.id ? (
      <span className="text-xs text-gray-400 italic">
        Current User
      </span>
    ) : user.role === "USER" ? (
      <button
        onClick={() => handleRoleChange(user.id, "ADMIN")}
        disabled={loadingId === user.id}
        className="px-3 py-1 rounded-md bg-green-600 text-white text-xs hover:bg-green-700"
      >
        {loadingId === user.id
          ? "Updating..."
          : "Make Admin"}
      </button>
    ) : (
      <button
        onClick={() => handleRoleChange(user.id, "USER")}
        disabled={loadingId === user.id}
        className="px-3 py-1 rounded-md bg-red-600 text-white text-xs hover:bg-red-700"
      >
        {loadingId === user.id
          ? "Updating..."
          : "Remove Admin"}
      </button>
    )}
  </div>

  {/* Mobile */}
  <div className="md:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md hover:bg-gray-100">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {user.clerk_id === clerkUser?.id ? (
          <DropdownMenuItem disabled>
            Current User
          </DropdownMenuItem>
        ) : user.role === "USER" ? (
          <DropdownMenuItem
            onClick={() =>
              handleRoleChange(user.id, "ADMIN")
            }
          >
            👑 Make Admin
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() =>
              handleRoleChange(user.id, "USER")
            }
          >
            🛡 Remove Admin
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</td>
                </tr>
              ))}

              {users.length === 0 && (
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
            Showing <strong>{users.length}</strong> users
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
            {users.length}
          </h3>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500 font-semibold">
            Admins
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {users.filter((u) => u.role === "ADMIN").length}
          </h3>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <p className="text-sm text-gray-500 font-semibold">
            Students
          </p>

          <h3 className="text-3xl font-bold mt-2">
            {users.filter((u) => u.role === "USER").length}
          </h3>
        </div>
      </div>
    </div>
  );
}