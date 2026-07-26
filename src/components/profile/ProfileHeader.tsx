import Image from "next/image";

type Props = {
  user: {
    first_name: string | null;
    last_name: string | null;
    email: string;
    image_url: string | null;
    role: string;
    created_at: string | Date;
  };
};

export default function ProfileHeader({ user }: Props) {
  return (
    <div className="bg-white rounded-xl border p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
      <Image
        src={
          user.image_url ??
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            `${user.first_name ?? ""} ${user.last_name ?? ""}`
          )}`
        }
        alt="Profile"
        width={90}
        height={90}
        className="rounded-full border"
      />

      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold break-words text-center sm:text-left">
          {`${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
            "User"}
        </h2>

        <p className="text-sm sm:text-base text-gray-500 break-all text-center sm:text-left">{user.email}</p>

        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-100 text-primary text-xs font-semibold">
          {user.role}
        </span>

        <p className="text-sm text-gray-500 mt-2">
          Joined{" "}
          {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}