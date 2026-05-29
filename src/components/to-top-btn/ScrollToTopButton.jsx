import { useState, useEffect } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll holatini kuzatish
  useEffect(() => {
    const toggleVisibility = () => {
      // Agar sahifa 300px dan ko'proq pastga tushsa, tugmani ko'rsat
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Komponent o'chganda event listenerni tozalash (xotira uchun muhim)
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Tepaga qaytish funksiyasi
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-xl bg-amber-500 text-white shadow-lg transition-all duration-300 z-50 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
