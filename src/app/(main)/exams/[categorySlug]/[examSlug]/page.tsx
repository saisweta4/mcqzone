import Link from "next/link";
import { ChevronLeft, Search, Bell } from "lucide-react";

import { Sidebar } from "@/components/exams/sidebar";
import { MobileSidebar } from "@/components/exams/mobile-sidebar";
import { SubjectsGrid } from "@/components/subjects/subjects-grid";

import { getAllCategories } from "@/lib/db/repositories/category.repository";
import { getExamBySlug } from "@/lib/db/repositories/exam.repository";
import { getSubjectsByExamSlug } from "@/lib/db/repositories/subject.repository";

import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    examSlug: string;
  }>;
}

export default async function ExamPage({
  params,
}: PageProps) {
  const { categorySlug, examSlug } = await params;

  const categories = await getAllCategories();

  const exam = await getExamBySlug(examSlug);

  if (!exam) {
    notFound();
  }

  const subjects = await getSubjectsByExamSlug(examSlug);

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      <div className="hidden lg:block shrink-0 h-screen sticky top-0">
        <Sidebar examCategories={categories} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">

        <header className="h-16 px-6 flex items-center justify-between border-b bg-white sticky top-0 z-20">

          <div className="flex items-center gap-3">

            <MobileSidebar examCategories={categories} />

            <Link href={`/exams/${categorySlug}`}>
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </Link>

            <h1 className="font-bold text-lg">
              {exam.title}
            </h1>

          </div>

        </header>

        <main className="flex-1 p-8 space-y-8">

          <SubjectsGrid
  subjects={subjects}
  categorySlug={categorySlug}
  examSlug={examSlug}
/>

        </main>

      </div>

    </div>
  );
}