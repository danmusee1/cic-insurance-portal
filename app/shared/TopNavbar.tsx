import { useEffect, useState } from "react";
import { useTheme } from "~/contexts/ThemeContext";
import ThemeToggle from "~/contexts/ThemeToggle";
import { useUser } from "~/contexts/UserContext";



export default function TopNavbar() {
  const { user, logout } = useUser();
 /*  const [theme, setTheme] = useState<"light" | "dark">("light"); */
  const { theme, toggleTheme } = useTheme();
  // Load from localStorage
 /*  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Apply theme to body class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }; */

  return (
<nav className="bg-white px-6 py-3 flex justify-between items-center w-full border-b border-blue-200 shadow-sm shadow-gray-100 ">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/images/cic-logo.png"
          alt="Logo"
          className="h-8 w-10 object-contain"
        />
        <span className="text-xl font-semibold  text-red-700">CIC</span>
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
           <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
           {/*  <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-sm text-gray-600">Not logged in</p>
        )}
      </div>
    </nav>
  );
}
