"use client";

import { useRef, useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { submitUnitPhotos } from "@/lib/about/actions";

const inputClass =
  "w-full mt-1.5 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const labelClass = "tech-label block text-[color:var(--ink-dim)]";

const MAX_PHOTOS = 6;
const MAX_BYTES = 10 * 1024 * 1024; // matches the bucket's own limit
const ACCEPTED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

/** Strips anything that would make an awkward object key. */
function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ShareYourUnitForm() {
  const fileInput = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const busy = isPending || uploading;
  const valid =
    name.trim() !== "" && company.trim() !== "" && photos.length > 0;

  function addFiles(list: FileList | null) {
    if (!list) return;
    setError(null);

    const incoming = Array.from(list);
    const rejected: string[] = [];

    const accepted = incoming.filter((f) => {
      if (!ACCEPTED.includes(f.type)) {
        rejected.push(`${f.name} is not a supported image`);
        return false;
      }
      if (f.size > MAX_BYTES) {
        rejected.push(`${f.name} is over 10 MB`);
        return false;
      }
      return true;
    });

    setPhotos((current) => {
      const merged = [...current];
      for (const f of accepted) {
        if (merged.length >= MAX_PHOTOS) {
          rejected.push(`Only ${MAX_PHOTOS} photos can be sent at once`);
          break;
        }
        // Same name and size twice over is a re-pick, not a second photo.
        if (merged.some((m) => m.name === f.name && m.size === f.size)) continue;
        merged.push(f);
      }
      return merged;
    });

    if (rejected.length) setError(rejected[0]);
    if (fileInput.current) fileInput.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((current) => current.filter((_, i) => i !== index));
  }

  function resetForm() {
    setModel("");
    setLocation("");
    setNotes("");
    setPhotos([]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;

    setError(null);
    setUploading(true);

    // Photos go straight to storage from here. A Server Action body is capped
    // at 1 MB, so routing several megapixel photos through one would fail.
    const supabase = createClient();
    const folder =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const paths: string[] = [];

    try {
      for (const [i, file] of photos.entries()) {
        const path = `${folder}/${i}-${safeName(file.name)}`;
        const { error: uploadError } = await supabase.storage
          .from("unit-photos")
          .upload(path, file, { contentType: file.type, upsert: false });

        if (uploadError) {
          setUploading(false);
          setError(
            "One of the photos would not upload. Check your connection and try again.",
          );
          return;
        }
        paths.push(path);
      }
    } catch {
      setUploading(false);
      setError("Could not upload your photos. Try again in a moment.");
      return;
    }

    setUploading(false);

    startTransition(async () => {
      const result = await submitUnitPhotos({
        name,
        company,
        email,
        phone,
        model,
        location,
        notes,
        photoPaths: paths,
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setSent(true);
      resetForm();
    });
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
        <p className="font-semibold text-[color:var(--ink)]">
          Thanks — we have your photos
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          Our marketing team will take a look. If we would like to feature your
          machine we will get in touch first.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-[color:var(--ink-dim)] underline underline-offset-4"
        >
          Send more photos
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7 md:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="model" className={labelClass}>
            Model
          </label>
          <input
            id="model"
            placeholder="e.g. HK 600"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            Where was it taken
          </label>
          <input
            id="location"
            placeholder="City, province or state"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="notes" className={labelClass}>
          Anything you want to tell us
        </label>
        <textarea
          id="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={inputClass + " resize-y"}
        />
      </div>

      <div className="mt-7">
        <p className={labelClass}>Photos</p>

        <label
          htmlFor="photos"
          className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[color:var(--line-strong)] bg-[var(--surface-2)] px-6 py-8 text-center transition hover:border-[color:var(--orange)]"
        >
          <span className="text-sm font-semibold text-[color:var(--ink)]">
            Choose photos
          </span>
          <span className="mt-1 text-[0.78rem] text-[color:var(--ink-dim)]">
            Up to {MAX_PHOTOS} images, 10 MB each. JPG, PNG, WEBP or HEIC.
          </span>
          <input
            id="photos"
            ref={fileInput}
            type="file"
            accept={ACCEPTED.join(",")}
            multiple
            onChange={(e) => addFiles(e.target.files)}
            className="sr-only"
          />
        </label>

        {photos.length > 0 && (
          <ul className="mt-4 space-y-2">
            {photos.map((file, i) => (
              <li
                key={`${file.name}-${file.size}-${i}`}
                className="flex items-center justify-between gap-4 rounded-lg border border-[color:var(--line)] bg-white px-4 py-2.5"
              >
                <span className="min-w-0 flex-1 truncate text-sm text-[color:var(--ink)]">
                  {file.name}
                </span>
                <span className="shrink-0 text-[0.75rem] text-[color:var(--ink-faint)]">
                  {formatSize(file.size)}
                </span>
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  aria-label={`Remove ${file.name}`}
                  className="shrink-0 rounded-md px-2 py-1 text-lg leading-none text-[color:var(--ink-faint)] transition hover:text-[color:var(--ember)]"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-[color:var(--line-strong)] bg-white px-4 py-3 text-sm text-[color:var(--ink-dim)]"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!valid || busy}
        className="brand-gradient mt-7 rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {uploading
          ? "Uploading photos..."
          : isPending
            ? "Sending..."
            : "Send photos"}
      </button>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-[color:var(--ink-faint)]">
        By sending these you are giving Tamarack permission to use them in our
        marketing. We will contact you before featuring your machine.
      </p>
    </form>
  );
}
