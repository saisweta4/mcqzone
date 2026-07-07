"use client";

import { useState } from "react";
import { Category } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: (category: Category) => void;
   category?: Category;
};

export default function CreateCategoryModal({
  open,
  onClose,
  onSuccess,
  category,
}: Props) {
  const [name, setName] = useState(category?.name ?? "");
const [slug, setSlug] = useState(category?.slug ?? "");
const [description, setDescription] = useState(category?.description ?? "");

  if (!open) return null;

  async function handleSubmit() {
    const res = await fetch("/api/categories", {
  method: category ? "PUT" : "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: category?.id,
    name,
    slug,
    description,
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
        <h2 className="text-lg font-bold">{category ? "Edit Category" : "Create Category"}</h2>

        <input
          className="w-full border rounded p-2"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}