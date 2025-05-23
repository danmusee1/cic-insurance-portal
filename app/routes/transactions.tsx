

import PaymentListing from "~/modules/transaction-management/Tansactions";
import type { Route } from "./+types/transactions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Todo App" },
    { name: "description", content: "Welcome to Todo Router!" },
  ];
}

export default function TransactionsPage() {
  return <PaymentListing />;
}
