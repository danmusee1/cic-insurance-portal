import UserManagement from "~/modules/user-management/UserManagement";
import type { Route } from "./+types/user-management";

export function meta({}: Route.MetaArgs) {
  return [
    { title: " User Mnagement" },
    { name: "description", content: "Welcome to create user!" },
  ];
}

export default function UserManagementUser() {
  return <UserManagement />;
}
