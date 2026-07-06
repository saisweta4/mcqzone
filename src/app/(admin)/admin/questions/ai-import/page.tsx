"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type AIQuestion = {
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};



export default function AIBulkImportPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subjectId = searchParams.get("subjectId");

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
 const [formattedQuestions, setFormattedQuestions] = useState<AIQuestion[]>([]);
 const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

 const handleGenerateExplanation = async (index: number) => {
  const q = formattedQuestions[index];

  try {
    setGeneratingIndex(index);

    const response = await fetch("/api/ai/explanation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: q.questionText,
        options: q.options,
        correctAnswer: q.options[q.correctAnswer],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed");
    }

    updateQuestion(index, "explanation", data.explanation.detailed);
  } catch (error) {
    alert("Failed to generate explanation.");
  } finally {
    setGeneratingIndex(null);
  }
};

  const handleFormat = async () => {
  if (
  formattedQuestions.length > 0 &&
  !confirm(
    "Formatting again will replace the current preview. Continue?"
  )
) {
  return;
}
  if (!input.trim()) return;

  setLoading(true);

  const res = await fetch("/api/ai/ai-import", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  

  const data = await res.json();

  setLoading(false);



  if (data.success) {
    setFormattedQuestions(data.data);
    
  } else {
    alert(data.message);
  }
};

const handleImport = async () => {
  const res = await fetch("/api/questions/import", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subjectId: Number(subjectId),
      questions: formattedQuestions,
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Questions imported successfully.");
    router.push("/admin/questions");
  } else {
    alert(data.message);
  }
};

const updateQuestion = (
  index: number,
  field: keyof AIQuestion,
  value: any
) => {
  const updated = [...formattedQuestions];
  updated[index] = {
    ...updated[index],
    [field]: value,
  };

  setFormattedQuestions(updated);
};

const updateOption = (
  questionIndex: number,
  optionIndex: number,
  value: string
) => {
  const updated = [...formattedQuestions];

  updated[questionIndex].options[optionIndex] = value;

  setFormattedQuestions(updated);
};

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <button
        onClick={() => router.back()}
        className="text-sm font-semibold text-gray-500 hover:text-black"
      >
        ← Back to Questions
      </button>

      <div>
        <h1 className="text-3xl font-bold">AI Bulk Question Formatter</h1>
        <p className="text-gray-500 mt-1">
          Subject ID: {subjectId}
        </p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste questions here..."
        className="w-full h-80 border rounded-lg p-4"
      />
<button
  onClick={handleFormat}
  disabled={loading}
  className="px-5 py-2 bg-blue-600 text-white rounded-lg"
>
  {loading ? "Formatting..." : "✨ Format with AI"}
</button>

{/*Preview of formatted questions*/}
{formattedQuestions.length > 0 && (
  <div className="space-y-6">
    {formattedQuestions.map((q, index) => (
      <div
        key={index}
        className="border rounded-lg p-5 bg-white space-y-4"
      >
        <div>
          <label className="text-sm font-semibold">
            Question
          </label>

          <textarea
            value={q.questionText}
            onChange={(e) =>
              updateQuestion(index, "questionText", e.target.value)
            }
            className="w-full mt-1 border rounded-md p-2"
            rows={3}
          />
        </div>

        {q.options.map((option, optionIndex) => (
          <div key={optionIndex}>
            <label className="text-sm font-semibold">
              Option {String.fromCharCode(65 + optionIndex)}
            </label>

            <input
              value={option}
              onChange={(e) =>
                updateOption(index, optionIndex, e.target.value)
              }
              className="w-full mt-1 border rounded-md p-2"
            />
          </div>
        ))}

        <div>
          <label className="text-sm font-semibold">
            Correct Answer
          </label>

          <select
            value={q.correctAnswer}
            onChange={(e) =>
              updateQuestion(
                index,
                "correctAnswer",
                Number(e.target.value)
              )
            }
            className="w-full mt-1 border rounded-md p-2"
          >
            <option value={0}>A</option>
            <option value={1}>B</option>
            <option value={2}>C</option>
            <option value={3}>D</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">
            Explanation
          </label>

          <button
  type="button"
  onClick={() => handleGenerateExplanation(index)}
  disabled={generatingIndex === index}
  className="ml-5 px-2 py-1 rounded-md bg-gray-200 text-blue-600 hover:bg-gray-300 disabled:opacity-50 font-semibold"
>
  {generatingIndex === index
    ? "Generating..."
    : "Generate AI Explanation🌟"}
</button>

          <textarea
            value={q.explanation}
            onChange={(e) =>
              updateQuestion(index, "explanation", e.target.value)
            }
            className="w-full mt-1 border rounded-md p-2"
            rows={3}
          />
        </div>
      </div>
    ))}
  </div>
)}
<button
  onClick={handleImport}
  disabled={formattedQuestions.length === 0}
  className={`ml-5 px-5 py-2 rounded-lg text-white ${
    formattedQuestions.length === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  Import Questions
</button>

    </div>
  );
}