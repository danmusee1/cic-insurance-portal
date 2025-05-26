Project Overview
This project is built using React with Vite, primarily to leverage the efficiency of Hot Module Reloading (HMR), which offers faster refresh times compared to Create React App (CRA).

Getting Started
To run this project, refer to the README.md file located in the root directory.

Architecture
The application follows a modular architecture for better scalability and maintainability.

Routing
Routing is file-based, but unlike Next.js, it is centrally managed in routes.ts.

Folder Structure
auth/: Handles authentication features like login and signup.

modules/: Contains all main modules of the application:

Dashboard

Policy Request

Transaction Management

User Management

contexts/: Manages global state using React Context API:

UserContext: Handles user session management.

ThemeContext: Manages global theme switching (light/dark mode).

shared/: Contains reusable UI components:

Sidebar.tsx

Topbar.tsx

services/: Centralizes HTTP methods in https.services.ts to avoid code duplication, including common setups like headers.

lib/: Stores reusable utilities, such as Zod schemas for validation.

State Management & Side Effects
Global State: Managed using React’s Context API.

Local State: Managed using useState.

Side Effects: Handled using useEffect.

Form Handling & Validation
Forms are built using React Hook Form.

Zod is used for schema-based validation, integrated via the zodResolver for lightweight and seamless setup.

Styling
The project uses Tailwind CSS, a modern, utility-first CSS framework that accelerates development with its lightweight structure.
