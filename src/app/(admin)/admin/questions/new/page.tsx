"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuestionForm from "@/components/admin/questions/QuestionForm";
import type { QuizQuestion } from "@/components/admin/questions/types";

export default function NewQuestionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

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

    const res = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  question_code: `Q${Date.now()}`,
  subject_id: 1, // change this later when subject dropdown is added
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

    setSaving(false);

    if (data.success) {
      router.push(`/admin/questions/${data.data}`);
    } else {
      alert(data.message);
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