//"use client";
import {useState} from "react";
import { 
  ArrowLeft,X, Bold, Italic, Underline, Link2, 
  AlignLeft, Shuffle, Image as ImageIcon,
  Upload,
} from "lucide-react";
import { QuizQuestion } from "./types";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";



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

    const router = useRouter();
    const [generatingExplanation, setGeneratingExplanation] = useState(false);

    async function handleGenerateExplanation() {
  if (!question.questionText.trim()) {
    toast.error("Please enter the question first.");
    return;
  }

  if (question.options.some((option) => !option.text.trim())) {
    toast.error("Please fill all options first.");
    return;
  }

  if (!question.correctOptionId) {
    toast.error("Please select the correct answer first.");
    return;
  }

  try {
    setGeneratingExplanation(true);

const toastId = toast.loading("Generating AI explanation...");

    const correctAnswer =
  question.options.find(
    (option) => Number(option.id) === Number(question.correctOptionId)
  )?.text || "";

    const response = await fetch("/api/ai/explanation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question.questionText,
        options: question.options.map((option) => option.text),
        correctAnswer,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate explanation.");
    }

    setQuestion((prev) => ({
      ...prev,
      explanation: data.explanation,
    }));

    toast.success("AI explanation generated!", {
  id: toastId,
});
  } catch (error) {
   toast.error("Unable to save question.");
    toast.error("Failed to generate AI explanation.");
  } finally {
    setGeneratingExplanation(false);
  }
}

    return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-gray-50/30">
      
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
       <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-900 flex items-center gap-2 text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Questions Database
          </button>
          <div className="h-5 w-px bg-gray-300"></div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex flex-wrap items-center gap-2">
            Edit Question 
            <span className="bg-blue-50 text-primary text-xs px-2.5 py-1 rounded-full border border-blue-200 tracking-wide">
              ID: {question.id}
            </span>
          </h1>
        </div>
        <div className="flex w-full lg:w-auto">
          <button
  onClick={onDelete}
  className="w-full lg:w-auto flex justify-center items-center gap-2 px-4 py-2 border border-red-200 rounded-md text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
  <X className="w-4 h-4" /> Delete Question
</button>
        </div>
      </div>

      {/* Main Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
       <div className="w-full max-w-5xl mx-auto space-y-8">
          
          {/* Question Context */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900">Question Context</h2>
              <p className="text-sm text-gray-500 mt-1">Draft the main text and add any necessary multimedia.</p>
            </div>
            
            <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <div className="p-3 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap gap-4 text-gray-500">
                  <button className="hover:text-gray-900 transition-colors"><Bold className="w-4 h-4" /></button>
                  <button className="hover:text-gray-900 transition-colors"><Italic className="w-4 h-4" /></button>
                  <button className="hover:text-gray-900 transition-colors"><Underline className="w-4 h-4" /></button>
                  <div className="w-px h-5 bg-gray-300 mx-1"></div>
                  <button className="hover:text-gray-900 transition-colors"><Link2 className="w-4 h-4" /></button>
                  <button className="hover:text-gray-900 transition-colors"><ImageIcon className="w-4 h-4" /></button>
                  <button className="hover:text-gray-900 transition-colors"><AlignLeft className="w-4 h-4" /></button>
                </div>
                <span className="text-xs text-gray-400">Markdown & LaTeX supported</span>
              </div>
              <textarea 
                className="w-full min-h-[180px] sm:min-h-[220px] p-5 text-base outline-none resize-y leading-relaxed"
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
           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Answer Options</h2>
                <p className="text-sm text-gray-500 mt-1">Provide four choices and select the correct one.</p>
              </div>
              <button className="w-full sm:w-auto flex justify-center items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 px-4 py-2 rounded-lg bg-white">
                <Shuffle className="w-4 h-4" /> Shuffle Options
              </button>
            </div>

            <div className="space-y-4">
              {question.options.map((opt) => {
                const isCorrect = opt.id === question.correctOptionId;
                return (
                  <div 
                    key={opt.id} 
                    className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 border rounded-xl bg-white transition-all ${
  isCorrect
    ? "border-blue-500 shadow-sm ring-1 ring-blue-500"
    : "border-gray-200 hover:border-gray-300"
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
                      className="w-5 h-5 text-primary border-gray-300 focus:ring-blue-500 cursor-pointer" 
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
                     className="w-full flex-1 text-base outline-none bg-transparent font-medium"
                      placeholder={`Option ${opt.letter}`}
                    />
                    {isCorrect && (
                      <span className="self-start sm:self-auto text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100">
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
              <div className="flex justify-stretch sm:justify-end mb-3">
  <button
    type="button"
    onClick={handleGenerateExplanation}
    disabled={generatingExplanation}
    className="w-full sm:w-auto px-4 py-2 rounded-md bg-primary text-white hover:bg-blue-700 disabled:opacity-50"
  >
    {generatingExplanation
      ? "Generating..."
      : "✨ Generate AI Explanation"}
  </button>
</div>
              <textarea 
                className="w-full min-h-[128px] p-4 border border-gray-200 rounded-lg text-sm text-gray-900 outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-y bg-gray-50/50 leading-relaxed"
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


        </div>
      </div>

       {/* Fixed Bottom Action Bar */}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.05)] z-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

      {/* Status */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="hidden sm:block text-xs font-bold uppercase tracking-wider text-gray-500">
          Status
        </span>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-md px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />

          <span className="text-xs sm:text-sm font-semibold text-blue-700">
            Published to Platform
          </span>
        </div>
      </div>

      {/* Publish Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
      >
        <Upload className="w-4 h-4" />

        {saving ? "Saving..." : "Publish Question"}
      </button>

    </div>
  </div>
</div>

    </div>
  );
}