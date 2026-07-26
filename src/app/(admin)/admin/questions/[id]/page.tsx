"use client";
import router from "next/router";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import QuestionForm from "@/components/admin/questions/QuestionForm";
import type { QuizQuestion } from "@/components/admin/questions/types";
import toast from "react-hot-toast";


export default function EditQuestion() {
  const router = useRouter();
  const params = useParams();
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
  async function loadQuestion() {
    try {
      const res = await fetch(`/api/questions/${params.id}`);

      const data = await res.json();

      if (data.success) {
        setQuestion(data.data);
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : String(err));
    }
  }

  loadQuestion();
}, [params.id]);

  const handleSave = async () => {
  if (!question) return;

  setSaving(true);

  const toastId = toast.loading("Updating question...");

  try {
    const res = await fetch(`/api/questions/${question.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionText: question.questionText,
        explanation: question.explanation.detailed,
        difficulty: question.difficulty,
        marks: question.marks,
        negativeMarks: question.negativeMarks,
        correctOptionId: Number(question.correctOptionId),
        options: question.options.map((o) => ({
          id: Number(o.id),
          text: o.text,
        })),
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Question updated successfully!", {
        id: toastId,
      });
    } else {
      toast.error(data.message || "Failed to update question.", {
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

const handleDelete = async () => {
  const ok = confirm("Are you sure you want to delete this question?");

  if (!ok) return;

  const toastId = toast.loading("Deleting question...");

  try {
    const res = await fetch(`/api/questions/${question.id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Question deleted successfully!", {
        id: toastId,
      });

      router.push("/admin/questions");
    } else {
      toast.error(data.message || "Failed to delete question.", {
        id: toastId,
      });
    }
  } catch {
    toast.error("Network error.", {
      id: toastId,
    });
  }
};

return (
  <QuestionForm
    question={question}
    setQuestion={setQuestion}
    onSubmit={handleSave}
    onDelete={handleDelete}
    saving={saving}
  />
);
}