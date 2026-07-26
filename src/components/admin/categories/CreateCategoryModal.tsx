"use client";

import { useState } from "react";
import { Category } from "./types";
import LoadingButton from "@/components/ui/LoadingButton";
import { toast } from "react-hot-toast";

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
const [loading, setLoading] = useState(false);

  if (!open) return null;

 async function handleSubmit() {
  setLoading(true);

  const toastId = toast.loading(
    category ? "Updating category..." : "Creating category..."
  );

  try {
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
      toast.success(
        category
          ? "Category updated successfully!"
          : "Category created successfully!",
        { id: toastId }
      );

      onSuccess(json.data);
      onClose();
    } else {
      toast.error(json.message || "Something went wrong.", {
        id: toastId,
      });
    }
  } catch {
    toast.error("Network error.", {
      id: toastId,
    });
  } finally {
    setLoading(false);
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

          <LoadingButton
  loading={loading}
  onClick={handleSubmit}
  className="bg-primary text-white px-4 py-2 rounded"
>
  {category ? "Update" : "Create"}
</LoadingButton>

        </div>
      </div>
    </div>
  );
}