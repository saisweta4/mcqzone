"use client";

import { useEffect, useState } from "react";
import type { Subject } from "./types";
import { toast } from "react-hot-toast";
import LoadingButton from "@/components/ui/LoadingButton";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  examId: number;
  subject?: Subject;
};

export default function CreateSubjectModal({
  open,
  onClose,
  onSuccess,
  examId,
  subject,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!subject) {
      setName("");
      setDescription("");
      setDisplayOrder(1);
      return;
    }

    setName(subject.name);
    setDescription(subject.description);
    setDisplayOrder(subject.display_order);
  }, [subject]);

  if (!open) return null;

  async function handleSubmit() {
     setLoading(true);

  const toastId = toast.loading(
    subject ? "Updating subject..." : "Creating subject..."
  );

  try{
    const res = await fetch("/api/subjects", {
      method: subject ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: subject?.id,
        examId,
        name,
        description,
        displayOrder,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      toast.error(json.message || "Something went wrong.", {
        id: toastId,
      });
      return;
    }

    toast.success(
      subject
        ? "Subject updated successfully!"
        : "Subject created successfully!",
      {
        id: toastId,
      }
    );

    onSuccess();
    onClose();
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

        <h2 className="text-lg font-bold">
          {subject ? "Edit Subject" : "Create Subject"}
        </h2>

        <input
          className="w-full border rounded p-2"
          placeholder="Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          placeholder="Display Order"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(Number(e.target.value))}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>
            Cancel
          </button>

          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            {subject ? "Update" : "Create"}
          </LoadingButton>
        </div>

      </div>
    </div>
  );
}