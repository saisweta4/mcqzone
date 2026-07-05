import CategoriesClient from "@/components/admin/categories/CategoriesClient";

async function getCategories() {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  const json = await res.json();

  return json.data;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <CategoriesClient initialCategories={categories} />
  );
}