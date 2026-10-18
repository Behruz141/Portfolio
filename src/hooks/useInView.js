"use client";

import { useEffect, useRef, useState } from "react";

// Element ekranga kirganda true, chiqqanda false qaytaradi.
// Oldin bu kod About, Contact va ProjectsPage'da 3 marta takrorlangan edi.
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
