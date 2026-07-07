"use client";

import { useState,useEffect } from "react";
import type {Category} from "../categories/types";
import { Exam } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (exam: Exam) => void;
   exam?: Exam;
};

export default function CreateExamModal({
  open,
  onClose,
  onSuccess,
  exam,
}: Props) {
 const [categoryId, setCategoryId] = useState(exam?.category_id ?? 0);
 const [categories, setCategories] = useState<Category[]>([]);
const [title, setTitle] = useState(exam?.title ?? "");
const [slug, setSlug] = useState(exam?.slug ?? "");
const [description, setDescription] = useState(exam?.description ?? "");
const [duration, setDuration] = useState(exam?.duration ?? 0);
const [totalQuestions, setTotalQuestions] = useState(exam?.total_questions ?? 0);
const [difficulty, setDifficulty] = useState(exam?.difficulty ?? "Easy");

useEffect(() => {
  fetch("/api/categories")
    .then((res) => res.json())
    .then((json) => setCategories(json.data));
}, []);

useEffect(() => {
  if (!exam) {
    setCategoryId(0);
    setTitle("");
    setSlug("");
    setDescription("");
    setDuration(0);
    setTotalQuestions(0);
    setDifficulty("Easy");
    return;
  }

  setCategoryId(exam.category_id);
  setTitle(exam.title);
  setSlug(exam.slug);
  setDescription(exam.description);
  setDuration(exam.duration);
  setTotalQuestions(exam.total_questions);
  setDifficulty(exam.difficulty);
}, [exam]);

  if (!open) return null;

  async function handleSubmit() {
    const res = await fetch("/api/exams", {
  method: exam ? "PUT" : "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id:exam?.id,
    categoryId,
    title,
    slug,
    description,
    duration,
    totalQuestions,
    difficulty,
  }),
});


    const json = await res.json();

if (res.ok) {
  onSuccess(json.data);
  onClose();
}
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[450px] space-y-4">
        <h2 className="text-lg font-bold">{exam ? "Edit Exam" : "Create Exam"}</h2>

        <select
  className="w-full border rounded p-2"
  value={categoryId}
  onChange={(e) => setCategoryId(Number(e.target.value))}
>
  <option value={0}>Select Category</option>

  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>

        <input
          className="w-full border rounded p-2"
          placeholder="Exam Name"
          value={title}
onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded p-2"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <textarea
          className="w-full border rounded p-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
  type="number"
  className="w-full border rounded p-2"
  placeholder="Duration (minutes)"
  value={duration}
  onChange={(e) => setDuration(Number(e.target.value))}
/>

<input
  type="number"
  className="w-full border rounded p-2"
  placeholder="Total Questions"
  value={totalQuestions}
  onChange={(e) => setTotalQuestions(Number(e.target.value))}
/>

<select
  className="w-full border rounded p-2"
  value={difficulty}
  onChange={(e) => setDifficulty(e.target.value)}
>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</select>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            {exam ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}