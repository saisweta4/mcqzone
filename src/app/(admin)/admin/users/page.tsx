import UsersClient from "@/components/admin/users/UsersClient";
import { getAllUsers } from "@/lib/db/repositories/user.repository";

export default async function UserManagement() {
  const users = await getAllUsers();

  return <UsersClient initialUsers={users} />;
}