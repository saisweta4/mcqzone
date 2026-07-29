import CategoriesClient from "@/components/admin/categories/CategoriesClient";

import { headers } from "next/headers";

async function getCategories() {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/categories`, {
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