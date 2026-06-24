import { CheckSquare } from "lucide-react";

export function AIExplanation() {
  return (
    <div className="bg-white rounded-xl border flex overflow-hidden h-full">
      <div className="p-8 flex-1 bg-ai-gradient flex flex-col justify-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          New: AI Explanation Engine
        </h3>
        <p className="text-sm text-gray-600 mb-6 max-w-md">
          Our new AI powered engine now provides context-aware hints for Odisha Current Affairs.
        </p>
        <div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Learn More about AI Prep
          </button>
        </div>
      </div>
      
      {/* Graphic Side */}
      <div className="w-48 bg-[#f4f7fc] flex items-center justify-center p-6 border-l border-white/50">
         <div className="bg-blue-100/50 p-4 rounded-full">
            <div className="bg-white border text-blue-600 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full">ANSWER</span>
              <CheckSquare className="h-8 w-8 text-blue-400 mt-1" />
            </div>
         </div>
      </div>
    </div>
  );
}