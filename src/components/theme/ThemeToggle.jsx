import { useTheme } from "./theme-settings/useTheme";

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={dark ? "Kun rejimi" : "Tun rejimi"}
      className="
        relative w-9 h-9 rounded-lg border
        border-gray-300 dark:border-white/10
        bg-gray-200 dark:bg-white/5
        text-gray-500 dark:text-zinc-500
        hover:border-yellow-500/60 hover:text-yellow-500
        transition-all duration-200
        flex items-center justify-center
        overflow-hidden
      "
    >
      <span
        className={`absolute transition-all duration-300 ${dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"}`}
      >
        <SunIcon />
      </span>
      <span
        className={`absolute transition-all duration-300 ${!dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
      >
        <MoonIcon />
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
