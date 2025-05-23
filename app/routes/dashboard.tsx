import Welcome from "~/welcome/welcome";
import Dashboard from "~/modules/dashboard/Dashboard";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function DashboardPage() {
  return <Dashboard />;
}
