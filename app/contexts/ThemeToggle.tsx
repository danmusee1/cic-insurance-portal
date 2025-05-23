import { BsSun } from "react-icons/bs";
import { MdModeNight } from "react-icons/md";

export default function ThemeToggle({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow transition-all duration-300"
    >
      {theme === "light" ? (
        <>
          <MdModeNight size={20} />
          <span>Dark Mode</span>
        </>
      ) : (
        <>
          <BsSun size={20} />
          <span>Light Mode</span>
        </>
      )}
    </button>
  );
}
