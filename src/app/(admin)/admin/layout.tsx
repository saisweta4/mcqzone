import { redirect } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";

import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getCurrentUser();

  // Not logged in
  if (!user) {
   redirect("/sign-in?redirect_url=/admin");
  }

  // Logged in but not an admin
  if (user.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-xl bg-white p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-600">
            Access Denied
          </h1>

          <p className="mt-3 text-gray-600">
            You don't have permission to access the Admin Panel.
          </p>
        </div>
      </div>
    );
  }

  // Admin
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}