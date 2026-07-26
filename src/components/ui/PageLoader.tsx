"use client";

import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />

      <p className="mt-4 text-gray-500 font-medium">
        Loading...
      </p>
    </div>
  );
}