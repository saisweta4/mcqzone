"use client";

import { Lock } from "lucide-react";

export default function SecurityCard() {
  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-6">
        Security
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-medium">Password</p>
          <p className="text-gray-500 text-sm">
            **************
          </p>
        </div>

        <a
  href="/user-profile"
  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:opacity-90 w-full sm:w-auto"
>
  <Lock className="w-4 h-4" />
  Manage Account
</a>
      </div>
    </div>
  );
}