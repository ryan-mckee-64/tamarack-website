"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades and lifts its children into place the first time they scroll into
 * view, then stops watching. Anyone who has asked their system for reduced
 * motion gets the content immediately, with no movement at all.
 *
 * The animation is CSS (see .reveal in globals.css) so the only thing this
 * component does is flip a data attribute at the right moment.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Stagger, in milliseconds. Keep it under about 400ms so a list does not
   *  feel like it is loading slowly. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      // Start the animation a little before the element reaches the fold, so
      // it has finished by the time it is properly in view.
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}