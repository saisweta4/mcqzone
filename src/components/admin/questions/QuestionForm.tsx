"use client";

import { 
  ArrowLeft, Copy, X, Bold, Italic, Underline, Link2, 
  AlignLeft, Shuffle, ChevronDown, Image as ImageIcon, Upload
} from "lucide-react";
import { QuizQuestion } from "./types";
import router from "next/router";

type Props = {
  question: QuizQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<QuizQuestion>>;
  onSubmit: () => void;
   onDelete?: () => void;
  saving: boolean;
};

export default function QuestionForm({
  question,
  setQuestion,
  onSubmit,
  onDelete,
  saving,
}: Props) {
    function handleSave(event: React.MouseEvent<HTMLButtonElement>): void {
      event.preventDefault();
      if (!saving) {
        onSubmit();
      }
    }

    return (
    <div className="flex flex-col relative h-[calc(100vh-80px)] overflow-hidden bg-gray-50/30">
      
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6 shrink-0 bg-white border-b shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Questions Database
          </button>
          <div className="h-5 w-px bg-gray-300"></div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            Edit Question 
            <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full border border-blue-200 tracking-wide">
              ID: {question.id}
            </span>
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
            <Copy className="w-4 h-4 text-gray-500" /> Duplicate
          </button>
          <button
  onClick={onDelete}
  className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-md text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 shadow-sm transition-colors"
>
  <X className="w-4 h-4" /> Delete Question
</button>
        </div>
      </div>

      {/* Main Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 pt-8">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Question Context */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">Question Context</h2>
              <p className="text-sm text-gray-500 mt-1">Draft the main text and add any necessary multimedia.</p>
            </div>
            
            <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <div className="p-3.5 border-b border-gray-100 bg-gray-50/80 flex justify-between items-center">
                <div className="flex gap-5 text-gray-500">
                  <button className="hover:text-gray-900 transition-colors"><Bold className="w-4 h-4" /></button>
                  <button className="hover:text-gray-900 transition-colors"><Italic className="w-4 h-4" /></button>
                  <button className="hover:text-gray-900 transition-colors"><Underline className="w-4 h-4" /></button>
                  <div className="w-px h-5 bg-gray-300 mx-1"></div>
                  <button className="hover:text-gray-900 transition-colors"><Link2 className="w-4 h-4" /></button>
                  <button className="hover:text-gray-900 transition-colors"><ImageIcon className="w-4 h-4" /></button>
                  <button className="hover:text-gray-900 transition-colors"><AlignLeft className="w-4 h-4" /></button>
                </div>
                <span className="text-xs font-medium text-gray-400">Markdown & LaTeX supported</span>
              </div>
              <textarea 
                className="w-full h-40 p-5 text-base text-gray-900 outline-none resize-none leading-relaxed"
                value={question.questionText}
onChange={(e) =>
  setQuestion({
    ...question,
    questionText: e.target.value,
  })
}
                placeholder="Enter your question text here..."
              ></textarea>
            </div>
          </section>

          {/* Answer Options */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Answer Options</h2>
                <p className="text-sm text-gray-500 mt-1">Provide four choices and select the correct one.</p>
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 px-4 py-2 rounded-lg bg-white shadow-sm transition-colors">
                <Shuffle className="w-4 h-4" /> Shuffle Options
              </button>
            </div>

            <div className="space-y-4">
              {question.options.map((opt) => {
                const isCorrect = opt.id === question.correctOptionId;
                return (
                  <div 
                    key={opt.id} 
                    className={`flex items-center gap-4 p-5 border rounded-xl bg-white transition-all ${
                      isCorrect 
                        ? 'border-blue-500 shadow-sm ring-1 ring-blue-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="correct_answer" 
                      checked={isCorrect}
onChange={() =>
  setQuestion({
    ...question,
    correctOptionId: opt.id,
  })
}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer" 
                    />
                    <input 
                      type="text" 
                     value={opt.text}
onChange={(e) =>
  setQuestion({
    ...question,
    options: question.options.map((o) =>
      o.id === opt.id
        ? { ...o, text: e.target.value }
        : o
    ),
  })
}
                      className="flex-1 text-base outline-none bg-transparent font-medium text-gray-900 placeholder:text-gray-400"
                      placeholder={`Option ${opt.letter}`}
                    />
                    {isCorrect && (
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md uppercase tracking-wider border border-blue-100">
                        Correct Answer
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Explanation & Feedback */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">Explanation & Feedback</h2>
              <p className="text-sm text-gray-500 mt-1">Help students understand the logic behind the correct answer.</p>
            </div>
            
            <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-6">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                Solution Explanation
              </label>
              <textarea 
                className="w-full h-32 p-4 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none bg-gray-50/50 leading-relaxed"
                value={question.explanation.detailed}
onChange={(e) =>
  setQuestion({
    ...question,
    explanation: {
      ...question.explanation,
      detailed: e.target.value,
      short: e.target.value,
    },
  })
}
                placeholder="Explain why the correct answer is right and why other options might be wrong..."
              ></textarea>
            </div>
          </section>

          {/* Categorization */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">Categorization</h2>
              <p className="text-sm text-gray-500 mt-1">Metadata for search and filtering.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                  Subject Category
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 py-3 pl-4 pr-10 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-medium">
                    <option>History of Odisha</option>
                    <option>Odisha General Knowledge</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                  Difficulty Level
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 py-3 pl-4 pr-10 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-medium">
                    <option>Medium</option>
                    <option>Hard</option>
                    <option>Easy</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.05)] z-20">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</span>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              <span className="text-xs font-bold text-blue-700">Published to Platform</span>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Last Modified</span>
            <span className="text-sm font-medium text-gray-900">Today at 2:03 PM by Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            Cancel
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
            Save Draft
          </button>
  <button
  onClick={handleSave}
  disabled={saving}
  className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md disabled:opacity-50"
>
  <Upload className="w-4 h-4" />
  {saving ? "Saving..." : "Publish Question"}
</button>
        </div>
      </div>

    </div>
  );
}