"use client";

import { useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

export default function PersonalInfoCard({ user }: Props) {
  const [firstName, setFirstName] = useState(user.first_name ?? "");
  const [lastName, setLastName] = useState(user.last_name ?? "");
  const [loading, setLoading] = useState(false);

async function handleSave() {
  setLoading(true);

  const toastId = toast.loading("Updating profile...");

  try {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message, {
        id: toastId,
      });
      return;
    }

    toast.success("Profile updated successfully.", {
      id: toastId,
    });
  } catch {
    toast.error("Something went wrong.", {
      id: toastId,
    });
  } finally {
    setLoading(false);
  }
}
  return (
    <div className="bg-white border rounded-xl p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            value={user.email}
            disabled
           className="mt-1 w-full rounded-lg border bg-gray-100 px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Role</label>
          <input
            value={user.role}
            disabled
            className="mt-1 w-full rounded-lg border bg-gray-100 px-3 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
  <LoadingButton
    loading={loading}
  onClick={handleSave}
    className="w-full sm:w-auto"
  >
    Save Changes
  </LoadingButton>
</div>
    </div>
  );
}