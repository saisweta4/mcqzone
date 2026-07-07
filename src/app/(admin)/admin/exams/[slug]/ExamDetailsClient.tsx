"use client";

import { useState } from "react";
import type { Exam } from "@/components/admin/exams/types";
import type { Subject } from "@/components/admin/subjects/types";
import SubjectsTable from "@/components/admin/subjects/SubjectsTable";
import CreateSubjectModal from "@/components/admin/subjects/CreateSubjectModal";

type Props = {
  exam: Exam;
  initialSubjects: Subject[];
};

export default function ExamDetailsClient({
  exam,
  initialSubjects,
}: Props) {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [editingSubject, setEditingSubject] = useState<Subject | undefined>();
const [openCreateModal, setOpenCreateModal] = useState(false);

async function refreshSubjects() {
  const res = await fetch(`/api/exams/${exam.slug}/subjects`);
  const json = await res.json();

  setSubjects(json.data);
}

async function handleDelete(subject: Subject) {
  if (!confirm("Delete this subject?")) return;

  await fetch("/api/subjects", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: subject.id,
    }),
  });

  refreshSubjects();
}

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {exam.title}
          </h1>

          <p className="text-gray-500 mt-2">
            {exam.description}
          </p>
        </div>

        <button  onClick={() => {
    setEditingSubject(undefined);
    setOpenCreateModal(true);
  }}
  className="bg-primary text-white px-4 py-2 rounded">
          Add Subject
        </button>
      </div>
        <SubjectsTable
  subjects={subjects}
  onEdit={(subject) => {
    setEditingSubject(subject);
    setOpenCreateModal(true);
  }}
  onDelete={handleDelete}
/>

<CreateSubjectModal
  open={openCreateModal}
  subject={editingSubject}
  examId={exam.id}
  onClose={() => {
    setOpenCreateModal(false);
    setEditingSubject(undefined);
  }}
  onSuccess={refreshSubjects}
/>

    </div>
  );
}