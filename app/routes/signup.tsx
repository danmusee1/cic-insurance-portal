import Welcome from "~/welcome/welcome";
import Login from "~/auth/login/LoginPage";
import SignUp from "~/auth/signup/SignUpPage";
import type { Route } from "./+types/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function SignUpPage() {
  return <SignUp />;
}
