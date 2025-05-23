import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [
index("routes/login.tsx"),
route("signup","routes/signup.tsx"),
route("dashboard","routes/dashboard.tsx"),
route("user-management","routes/user-management.tsx"),
route("transactions","routes/transactions.tsx"),
route("policy-requests","routes/policy-requests.tsx"),
 route("*", "routes/not-found.tsx"), 

] satisfies RouteConfig;
