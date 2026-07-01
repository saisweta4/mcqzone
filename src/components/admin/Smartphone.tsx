"use client";

import { ArrowLeft, CheckSquare, Eye, CheckCircle, CheckCircle2 } from "lucide-react";

// You can move this interface to a central types file (e.g., types/question.ts)
export interface QuizQuestion {
  id: string;
  questionText: string;
  options: { id: string; letter: string; text: string }[];
  correctOptionId: string;
  explanation: {
    short: string;
    detailed: string;
    keyConcepts: string[];
    tip: string;
  };
}

interface SmartphoneProps {
  question: QuizQuestion;
  variant: "management" | "editor";
  className?: string;
}

export default function Smartphone({ question, variant, className = "" }: SmartphoneProps) {
  const isManagement = variant === "management";

  return (
    <div className={`border-8 border-gray-900 rounded-[2.5rem] bg-gray-50 overflow-hidden shadow-xl relative flex flex-col ${className}`}>
      
      {/* Phone Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span className={`font-bold tracking-wide ${isManagement ? 'text-sm' : 'text-[11px] uppercase'}`}>
            {isManagement ? "EXAM LIVE" : "Odisha CGL - Mock 4"}
          </span>
        </div>
        {isManagement && <div className="w-16 h-1.5 bg-white/30 rounded-full"></div>}
      </div>

      {/* Phone Content Scroll */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        
        {/* Top Stats Bar */}
        <div className="flex justify-between items-center mb-4">
          {isManagement ? (
            <>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Q: 12 of 100</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <CheckSquare className="w-3 h-3" /> +1 / -0.5
              </span>
            </>
          ) : (
            <>
              <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">Question 14</span>
              <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">00:23:45</span>
            </>
          )}
        </div>

        {/* Question Text */}
        <p className="text-sm font-bold text-gray-900 mb-5 leading-relaxed">
          {question.questionText}
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((opt) => {
            const isCorrect = !isManagement && opt.id === question.correctOptionId;
            return (
              <div 
                key={opt.id} 
                className={`flex items-center p-3 border bg-white ${
                  isManagement ? 'rounded-lg border-gray-200' : `rounded-xl ${isCorrect ? 'border-green-500 bg-green-50/30' : 'border-gray-200'}`
                }`}
              >
                <div 
                  className={`w-5 h-5 border flex items-center justify-center mr-3 shrink-0 ${
                    isManagement 
                      ? 'rounded-full border-gray-300' 
                      : `rounded-full ${isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`
                  }`}
                >
                  {isCorrect && <CheckCircle className="w-3 h-3" />}
                </div>
                <span className={`text-sm ${isCorrect ? 'font-semibold text-green-900' : 'text-gray-700'}`}>
                  {opt.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer Actions & Explanations */}
        <div className="mt-auto pt-4">
          {isManagement ? (
            <>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                <h4 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Eye className="w-3 h-3" /> Admin Explanation
                </h4>
                <p className="text-xs text-blue-900 line-clamp-2">{question.explanation.short}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500 cursor-pointer">Previous</span>
                <button className="bg-blue-600 text-white text-sm font-bold py-2 px-6 rounded-md hover:bg-blue-700">Save & Next</button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
                <h4 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Explanation
                </h4>
                <p className="text-[11px] text-blue-900 leading-relaxed line-clamp-3">{question.explanation.detailed}</p>
              </div>
              <button className="w-full bg-blue-600 text-white text-sm font-bold py-3.5 rounded-xl shadow-md hover:bg-blue-700">
                Next Question
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}