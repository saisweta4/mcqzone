import { CheckSquare } from "lucide-react";
import Link from "next/link";

export function AIExplanation() {
  return (
    <div className="bg-white rounded-xl border flex overflow-hidden h-full shadow-xl">
  <div className="p-6 sm:p-8 flex-1 bg-ai-gradient flex flex-col justify-center">
    <h3 className="text-xl font-bold text-gray-900 mb-2">
      New: AI Doubt Solver
    </h3>

    {/* Hide paragraph on mobile */}
    <p className="hidden sm:block text-sm text-gray-600 mb-6 max-w-md">
      Get instant answers to your exam-related doubts with clear, AI-powered explanations tailored for Odisha Government exam preparation.
    </p>

    <div>
      <Link href="/chatbot">
        <button className="primary-button-gradient text-white px-5 py-2.5 rounded-lg text-sm font-medium primary-button-gradient:hover transition-colors">
          Ask AI Now
        </button>
      </Link>
    </div>
  </div>

  {/* Hide graphic on mobile */}
  <div className="hidden sm:flex w-48 bg-[#f4f7fc] items-center justify-center p-6 border-l border-white/50">
    <div className="bg-blue-100/50 p-4 rounded-full">
      <div className="bg-white border text-primary p-4 rounded-2xl shadow-sm flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold tracking-wider bg-primary text-white px-2 py-0.5 rounded-full">
          ANSWER
        </span>
        <CheckSquare className="h-8 w-8 text-blue-400 mt-1" />
      </div>
    </div>
  </div>
</div>
  );
}