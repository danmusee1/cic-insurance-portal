import Welcome from "~/welcome/welcome";
import PolicyRequests from "~/modules/policy-request/PolicyRequests";
import type { Route } from "./+types/policy-requests";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function PolicyRequestPage() {
  return <PolicyRequests />;
}
