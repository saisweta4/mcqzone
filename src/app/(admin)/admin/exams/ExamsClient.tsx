"use client";

import { useEffect, useState } from "react";

import ExamToolbar from "@/components/admin/exams/ExamToolbar";
import type { Exam } from "@/components/admin/exams/types";
import ExamPreview from "@/components/admin/exams/ExamPreview";
import ExamsTable from "@/components/admin/exams/ExamsTable";
import CreateExamModal from "@/components/admin/exams/CreateExamModel";

type Props = {
  initialExams: Exam[];
};

export default function ExamsClient({ initialExams }: Props) {
  const [exams, setExams] = useState<Exam[]>(initialExams);

  const [selectedExamId, setSelectedExamId] = useState<number>(
    initialExams[0]?.id ?? 0
  );

  const [editingExam, setEditingExam] = useState<Exam | undefined>();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  // Always calculate selected exam safely
  const selectedExam =
    exams.find((e) => e.id === selectedExamId) ?? null;

  // Keep selection valid whenever exams change
  useEffect(() => {
    if (exams.length === 0) {
      setSelectedExamId(0);
      return;
    }

    const exists = exams.some((e) => e.id === selectedExamId);

    if (!exists) {
      setSelectedExamId(exams[0].id);
    }
  }, [exams, selectedExamId]);

  async function refreshExams() {
    const res = await fetch("/api/exams");

    const json = await res.json();

    setExams(json.data);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this exam?")) return;

    await fetch("/api/exams", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    await refreshExams();
  }

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      {/* Left */}
      <div className="flex-1 space-y-6">
        <ExamToolbar
          onCreate={() => {
            setEditingExam(undefined);
            setOpenCreateModal(true);
          }}
        />

        <ExamsTable
          exams={exams}
          selectedExamId={selectedExamId}
          onSelectExam={setSelectedExamId}
          onEdit={(exam) => {
            setEditingExam(exam);
            setOpenCreateModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* Right */}
      {selectedExam && <ExamPreview exam={selectedExam} />}

      <CreateExamModal
        open={openCreateModal}
        exam={editingExam}
        onClose={() => {
          setOpenCreateModal(false);
          setEditingExam(undefined);
        }}
        onSuccess={refreshExams}
      />
    </div>
  );
}