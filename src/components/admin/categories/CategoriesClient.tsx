"use client";
import { useState } from "react";
import CategoryToolbar from "@/components/admin/categories/CategoryToolbar";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import CategoryPreview from "@/components/admin/categories/CategoryPreview";
import type { Category } from "@/components/admin/categories/types";
import CreateCategoryModal from "@/components/admin/categories/CreateCategoryModal";
type Props = {
  initialCategories: Category[];
};


export default function CategoriesClient({
  initialCategories,
}: Props) {
  const [categories, setCategories] = useState(initialCategories);

const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
  initialCategories[0]?.id ?? 0
);
const [openCreateModal, setOpenCreateModal] = useState(false);
const [editingCategory, setEditingCategory] = useState<Category | undefined>();

  const selectedCategory =
  categories.find((c) => c.id === selectedCategoryId) ??
  categories[0];

  function handleCategorySaved(category: Category) {
  setCategories((prev) =>
    prev.some((c) => c.id === category.id)
      ? prev.map((c) => (c.id === category.id ? category : c))
      : [...prev, category]
  );

  setSelectedCategoryId(category.id);
}

async function handleDelete(category: Category) {
  const confirmed = window.confirm(
    `Delete "${category.name}"?`
  );

  if (!confirmed) return;

  const res = await fetch("/api/categories", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: category.id,
    }),
  });

  if (!res.ok) {
    alert("Failed to delete category");
    return;
  }

  const updated = categories.filter((c) => c.id !== category.id);

  setCategories(updated);

  if (updated.length > 0) {
    setSelectedCategoryId(updated[0].id);
  }
}

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      
      {/* Left Column: Table & Management */}
      <div className="flex-1 space-y-6">
        
        {/* Header Section */}
       <CategoryToolbar
  onCreate={() => setOpenCreateModal(true)}
/>

        {/* Filters and Table Container */}
        <CategoriesTable
  categories={categories}
  selectedCategoryId={selectedCategoryId}
  onSelectCategory={setSelectedCategoryId}
   onEdit={setEditingCategory}
   onDelete={handleDelete}
/>
        
      </div>

      {/* Right Sidebar: Quick Preview */}
      <CategoryPreview category={selectedCategory} />

     <CreateCategoryModal
  open={openCreateModal || !!editingCategory}
  category={editingCategory}
  onClose={() => {
    setOpenCreateModal(false);
    setEditingCategory(undefined);
  }}
  onSuccess={handleCategorySaved}
/>
      
    </div>
  );

  
}

