"use client";

import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import { 
  ChevronLeft, HelpCircle, Bookmark, AlertTriangle, 
  CheckCircle2, BookOpen, Sparkles, ChevronRight, XCircle
} from "lucide-react";
import toast from "react-hot-toast";

interface QuizOption {
  id: number;
  text: string;
  letter: string;
}

interface QuizQuestion {
  id: number;
  question_code: string;
  question_text: string;
  explanation: {
    short: string;
    detailed: string;
    keyConcepts: string[];
    tip: string;
  };
  correctOptionId: number;
  options: QuizOption[];
}

interface QuizClientProps {
  questions: QuizQuestion[];
  examId: number;
  examName: string;
  subjectName: string;
}

export function QuizClient({ questions,examId, examName, subjectName }: QuizClientProps) {
  // --- STATE ---
  const router=useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [visitedIndices, setVisitedIndices] = useState<Set<number>>(new Set([0]));
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(true);
  
  // Track visited questions automatically when index changes
  useEffect(() => {
    setVisitedIndices((prev) => {
      const newSet = new Set(prev);
      newSet.add(currentIndex);
      return newSet;
    });
  }, [currentIndex]);
  useEffect(() => {
  async function createQuizAttempt() {
    try {
      const response = await fetch("/api/attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setAttemptId(result.data.id);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to create quiz attempt.");
    }
  }

  createQuizAttempt();
}, [examId]);

  // Derived variables for the current question
  const question = questions[currentIndex];
  const selectedOptionId = selectedOptions[question.id];
  const hasAnsweredCurrent = !!selectedOptionId;
  const isCorrect = selectedOptionId === question.correctOptionId;

  // --- HANDLERS ---
  const handleSelectOption = (optionId: number) => {
    if (!hasAnsweredCurrent) {
      setSelectedOptions(prev => ({ ...prev, [question.id]: optionId }));
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const jumpToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] overflow-hidden">
      
      {/* 1. TOP HEADER */}
      <header className="h-14 sm:h-16 px-4 sm:px-6 bg-white border-b flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div onClick={() => router.back()} className="text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </div>
          <h1 className="text-base font-bold text-gray-900">
              {subjectName} Questions
          </h1>
        </div>
      </header>

      {/* 2. THREE-PANE LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* PANE 1: LEFT SIDEBAR (Question Palette) */}
        <aside className="hidden md:flex flex-col w-72 bg-white border-r shrink-0">
          <div className="p-4 border-b bg-gray-50/50">
            <h3 className="font-bold text-gray-900 text-sm mb-3">Question Palette</h3>
            <div className="flex gap-3 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary"></div> Current</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-500"></div> Answered</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gray-200 border"></div> Visited</div>
            </div>
          </div>
          
          <div className="p-4 grid grid-cols-5 gap-2 overflow-y-auto">
            {questions.map((q, idx) => {
              const isCurrent = currentIndex === idx;
              const isAnswered = !!selectedOptions[q.id];
              const isVisited = visitedIndices.has(idx);

              // Determine button styling based on its state
              let btnStyle = "border-gray-200 text-gray-500 bg-white hover:border-gray-400"; // Unvisited default
              
              if (isCurrent) {
                btnStyle = "border-primary bg-primary text-white font-bold shadow-md"; // Active question
              } else if (isAnswered) {
                btnStyle = "border-green-500 bg-green-500 text-white font-bold"; // Answered
              } else if (isVisited) {
                btnStyle = "border-gray-300 bg-gray-100 text-gray-700 font-medium"; // Visited but not answered
              }

              return (
                <button 
                  key={q.id}
                  onClick={() => jumpToQuestion(idx)}
                  className={`h-10 w-full rounded-lg border text-sm flex items-center justify-center transition-all ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </aside>

        {/* PANE 2: CENTER (Main Question Area) */}
        <main className="flex-1 flex flex-col overflow-y-auto relative">
          <div className="max-w-3xl w-full mx-auto p-4 sm:p-6 md:p-8 lg:p-10 flex-1 flex flex-col">
            
            {/* Metadata Bar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
              {question.question_text}
            </h2>

            {/* Options List */}
            <div className="space-y-4 mb-8">
              {question.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrectOption = option.id === question.correctOptionId;
                
                let cardStyle = "border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer bg-white text-gray-700";
                let letterStyle = "bg-gray-100 text-gray-600 font-bold";
                
                if (hasAnsweredCurrent) {
                  if (isSelected && isCorrectOption) {
                    cardStyle = "border-green-500 bg-green-50/30 text-green-800";
                    letterStyle = "bg-green-500 text-white font-bold";
                  } else if (isSelected && !isCorrectOption) {
                    cardStyle = "border-red-500 bg-red-50/30 text-red-800";
                    letterStyle = "bg-red-500 text-white font-bold";
                  } else if (isCorrectOption) {
                    cardStyle = "border-green-500 bg-white text-green-800"; 
                    letterStyle = "bg-green-100 text-green-700 font-bold";
                  } else {
                    cardStyle = "border-gray-200 opacity-50 bg-white cursor-default text-gray-400";
                    letterStyle = "bg-gray-100 text-gray-300 font-bold";
                  }
                }

                return (
                  <div 
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`flex items-center gap-4 p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all ${cardStyle} ${!hasAnsweredCurrent && 'hover:shadow-sm'}`}
                  >
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm shrink-0 transition-colors ${letterStyle}`}>
                      {option.letter}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{option.text}</span>
                  </div>
                );
              })}
            </div>

            {hasAnsweredCurrent && !showExplanation && (
  <button
    onClick={() => setShowExplanation(true)}
    className="primary-button-gradient right-6 lg:hidden bg-primary text-white px-4 py-3 rounded-full shadow-lg"
  >
   AI Explanation✨
  </button>
)}

            {/* Bottom Action Bar (Replaces the Footer) */}
            <div className="mt-auto pt-6 flex items-center justify-between gap-4">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center hover:cursor-pointer gap-2 px-4 sm:px-6 py-3 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>

              <button 
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="primary-button-gradient flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg text-white text-sm font-semibolddisabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Next Question <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </main>

        {/* PANE 3: RIGHT SIDEBAR (AI Explanation) */}
        {/* Only appears after the user clicks an option */}
        {hasAnsweredCurrent && showExplanation && (
          <aside className="bg-[#EEF6FF]
fixed inset-x-0 bottom-0 h-[75vh] z-50 border-t rounded-t-2xl shadow-2xl
lg:relative lg:inset-auto lg:h-auto
lg:w-[400px]
lg:border-l lg:border-t-0 lg:rounded-none
flex flex-col shrink-0 
">
   <button
    onClick={() => setShowExplanation(false)}
    className="p-1 text-red-500 rounded-full hover:bg-gray-200"
  >
    <XCircle className="h-5 w-5" />
  </button>
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* Correct/Incorrect Header */}
              <div className="flex items-start gap-3 mb-6">
                {isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-gray-900 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isCorrect ? "Correct Answer:" : "Incorrect. Correct is"} Option {question.options.find(o => o.id === question.correctOptionId)?.letter}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {question.explanation.short}
                  </p>
                </div>
              </div>

              {/* Detailed Explanation */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 text-gray-900">
                  <BookOpen className="h-4 w-4" />
                  <h4 className="font-bold text-sm">Detailed Explanation</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {question.explanation.detailed}
                </p>
              </div>

              {/* Key Concepts */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 text-gray-900">
                  <Sparkles className="h-4 w-4" />
                  <h4 className="font-bold text-sm">Key Concepts</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {question.explanation.keyConcepts.map((concept, idx) => (
                    <span key={idx} className="bg-white border text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tip Box */}
              <div className="bg-primary text-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xs">💡</span>
                  </div>
                  <h4 className="font-bold text-xs tracking-wider uppercase text-blue-50">Tip for Exam</h4>
                </div>
                <p className="text-sm text-blue-50 leading-relaxed">
                  {question.explanation.tip}
                </p>
              </div>

            </div>
            
            {/* Ask AI Follow-up Button at bottom */}
            <div className="p-6 border-t bg-white shrink-0">
              <button onClick={() => router.push("/chatbot")} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                <Sparkles className="h-4 w-4 text-gray-400" /> Ask AI a Follow-up
              </button>
            </div>
          </aside>
        )}
        
      </div>
    </div>
  );
}