import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import SecurityCard from "@/components/profile/SecurityCard";

export default async function AdminProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6">
      <ProfileHeader user={user} />

      <PersonalInfoCard user={user} />

      <SecurityCard />
    </div>
  );
}