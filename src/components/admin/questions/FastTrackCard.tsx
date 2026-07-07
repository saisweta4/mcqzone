"use client";

import { Database } from "lucide-react";

export default function FastTrackCard() {
  return (
    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 flex items-center justify-between shadow-sm mt-4">
      <div className="flex items-center gap-5">
        <div className="p-3 bg-white rounded-lg shadow-sm border border-blue-100">
          <Database className="w-6 h-6 text-primary" />
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-900">
            Fast-Track Your Database
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            Import thousands of questions instantly using our Excel/CSV
            template.
          </p>
        </div>
      </div>

      <button className="bg-white border border-gray-200 text-primary text-sm font-bold py-2.5 px-6 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
        Download Template →
      </button>
    </div>
  );
}