
import Login from "~/auth/login/LoginPage";
import type { Route } from "./+types/login";
export function meta(_args: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LoinPage() {
  return <Login />;
}
