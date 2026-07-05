"use client";

import { useState } from "react";

import ExamToolbar from "@/components/admin/exams/ExamToolbar";
import type { Exam } from "@/components/admin/exams/types";
import ExamPreview from "@/components/admin/exams/ExamPreview";
import ExamsTable from "@/components/admin/exams/ExamsTable";
import CreateExamModal from "@/components/admin/exams/CreateExamModel";

// --- Types and Mock Data ---
type Props = {
  initialExams: Exam[];
};

export default function ExamsClient({
  initialExams,
}: Props) {
  const [exams, setExams] = useState(initialExams);
  

const [selectedExamId, setSelectedExamId] = useState<number>(
  initialExams[0]?.id ?? 0
);
const [editingExam, setEditingExam] = useState<Exam | undefined>();
  const selectedExam =
  exams.find((e) => e.id === selectedExamId) ?? exams[0];

  

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

  refreshExams();
}

const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto flex gap-6">
      
      {/* Left Column: Table & Management */}
      <div className="flex-1 space-y-6">
        
        {/* Header Section */}
        

<ExamToolbar
  onCreate={() => setOpenCreateModal(true)}
/>

        {/* Filters and Table Container */}
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

      {/* Right Sidebar: Quick Preview */}
      <ExamPreview exam={selectedExam} />

     <CreateExamModal
    open={openCreateModal}
    exam={editingExam}
    onClose={()=>{
        setOpenCreateModal(false);
        setEditingExam(undefined);
    }}
    onSuccess={refreshExams}
/>
      
    </div>
  );
}