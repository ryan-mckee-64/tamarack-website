"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Set this to "/video/hero.mp4" once the footage is in place.
const VIDEO_SRC: string | null = null;
const POSTER_SRC = "/images/hero-poster.jpg";

const SPECS = [
  { value: "700,000", unit: "BTU/hr", label: "Flameless output" },
  { value: "11,000", unit: "sq ft", label: "Glycol ground coverage" },
  { value: "30", unit: "yrs", label: "Building since 1995" },
  { value: "2", unit: "", label: "Plants: MB & MN" },
];

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
          className="hero-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
        >
          <source src={VIDEO_SRC as string} type="video/mp4" />
        </video>
      ) : hasVideo ? (
        <img src={POSTER_SRC} alt="" className="hero-media" />
      ) : (
        <div className="hero-fallback" />
      )}

      {/* Cinematic shading, stays over the video */}
      <div className="hero-shade" />
      <div className="hero-wash" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-10 md:pb-20">
          <p className="tech-label hero-eyebrow">
            Tamarack Industries · Winnipeg, Manitoba
          </p>

          <h1 className="font-display hero-title mt-5 max-w-4xl text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.035em]">
            Winter doesn&rsquo;t stop the job.
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

          <dl className="hero-specs mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4">
            {SPECS.map((s) => (
              <div key={s.label} className="hero-spec p-5">
                <dt className="font-display hero-spec-value text-2xl font-bold md:text-3xl">
                  {s.value}
                  {s.unit && (
                    <span className="hero-spec-unit ml-1 text-sm font-medium">
                      {s.unit}
                    </span>
                  )}
                </dt>
                <dd className="tech-label hero-spec-label mt-1.5">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
