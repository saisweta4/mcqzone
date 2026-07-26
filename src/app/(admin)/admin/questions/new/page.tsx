"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import QuestionForm from "@/components/admin/questions/QuestionForm";
import type { QuizQuestion } from "@/components/admin/questions/types";
import toast from "react-hot-toast";
export default function NewQuestionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const searchParams = useSearchParams();

const subjectId = searchParams.get("subjectId");

  const [question, setQuestion] = useState<QuizQuestion>({
  id: "",
  questionText: "",
  difficulty: "Medium",
  marks: 1,
  negativeMarks: 0.25,
  explanation: {
    short: "",
    detailed: "",
    keyConcepts: [],
    tip: "",
  },
  correctOptionId: "1",
  options: [
    { id: "1", letter: "A", text: "" },
    { id: "2", letter: "B", text: "" },
    { id: "3", letter: "C", text: "" },
    { id: "4", letter: "D", text: "" },
  ],
});

 const handleCreate = async () => {
  setSaving(true);

  const toastId = toast.loading("Publishing question...");

  try {
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question_code: `Q${Date.now()}`,
        subject_id: Number(subjectId),
        question_text: question.questionText,
        explanation: question.explanation.detailed,
        difficulty: "Medium",
        marks: 1,
        negative_marks: 0.25,
        options: question.options.map((o) => ({
          text: o.text,
          is_correct: o.id === question.correctOptionId,
        })),
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Question published successfully!", {
        id: toastId,
      });

      router.push(`/admin/questions/${data.data}`);
    } else {
      toast.error(data.message || "Failed to publish question.", {
        id: toastId,
      });
    }
  } catch {
    toast.error("Network error.", {
      id: toastId,
    });
  } finally {
    setSaving(false);
  }
};

  return (
    <QuestionForm
      question={question}
      setQuestion={setQuestion}
      onSubmit={handleCreate}
      saving={saving}
    />
  );
}