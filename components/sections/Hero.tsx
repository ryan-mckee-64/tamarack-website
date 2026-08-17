"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VIDEO_SRC: string | null = "/videos/hero.mp4";
// Add a still frame at this path and set it to the string to use it.
const POSTER_SRC: string | null = null;

export default function Hero() {
  const router = useRouter();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const hasVideo = VIDEO_SRC !== null;
  const playVideo = hasVideo && !reduceMotion;

  function openProducts() {
    if (window.innerWidth >= 1024) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("open-products-menu"));
    } else {
      router.push("/products");
    }
  }

  return (
    <section className="hero">
      {/* Background */}
      {playVideo ? (
        <video
          key={VIDEO_SRC as string}
          className="hero-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC ?? undefined}
        >
          <source src={VIDEO_SRC as string} type="video/mp4" />
        </video>
      ) : POSTER_SRC ? (
        // Reduced motion: hold on a still frame instead of playing the loop.
        <img src={POSTER_SRC} alt="" className="hero-media" />
      ) : (
        <div className="hero-fallback" />
      )}

      {/* Cinematic shading, stays over the video */}
      <div className="hero-shade" />
      <div className="hero-wash" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
          <p className="tech-label hero-eyebrow">
            Tamarack Industries · Winnipeg, Manitoba
          </p>

          <h1 className="font-display hero-title mt-5 max-w-4xl text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            Trusted in rental for 30 years.
          </h1>

          <div className="mt-9">
            <button
              onClick={openProducts}
              className="brand-gradient group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              View product lines
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}