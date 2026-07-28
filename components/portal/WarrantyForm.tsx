"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitWarrantyClaim } from "@/lib/portal/actions";

const inputClass =
  "w-full mt-1.5 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const labelClass = "tech-label block text-[color:var(--ink-dim)]";

export default function WarrantyForm({
  productLines,
}: {
  productLines: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const [serialNumber, setSerialNumber] = useState("");
  const [productLine, setProductLine] = useState("");
  const [model, setModel] = useState("");
  const [purchasedOn, setPurchasedOn] = useState("");
  const [failedOn, setFailedOn] = useState("");
  const [hoursOnUnit, setHoursOnUnit] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const valid = serialNumber.trim() !== "" && description.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;

    setBusy(true);
    setError(null);

    const result = await submitWarrantyClaim({
      serialNumber,
      productLine,
      model,
      purchasedOn,
      failedOn,
      hoursOnUnit,
      description,
    });

    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSent(true);
    setSerialNumber("");
    setModel("");
    setPurchasedOn("");
    setFailedOn("");
    setHoursOnUnit("");
    setDescription("");
    router.refresh();
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
        <p className="font-semibold text-[color:var(--ink)]">Claim submitted</p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          Our service team will review it and follow up. You can track its
          status in the list below.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-[color:var(--ink-dim)] underline underline-offset-4"
        >
          Submit another claim
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="serial" className={labelClass}>
            Serial number
          </label>
          <input
            id="serial"
            required
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="line" className={labelClass}>
            Product line
          </label>
          <select
            id="line"
            value={productLine}
            onChange={(e) => setProductLine(e.target.value)}
            className={inputClass}
          >
            <option value="">Select a product</option>
            {productLines.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
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
          <label htmlFor="hours" className={labelClass}>
            Hours on the unit
          </label>
          <input
            id="hours"
            type="number"
            min={0}
            value={hoursOnUnit}
            onChange={(e) => setHoursOnUnit(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="purchased" className={labelClass}>
            Purchase date
          </label>
          <input
            id="purchased"
            type="date"
            value={purchasedOn}
            onChange={(e) => setPurchasedOn(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="failed" className={labelClass}>
            Date of failure
          </label>
          <input
            id="failed"
            type="date"
            value={failedOn}
            onChange={(e) => setFailedOn(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="description" className={labelClass}>
          What happened
        </label>
        <textarea
          id="description"
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What failed, what the machine was doing at the time, and anything already tried."
          className={inputClass + " resize-y"}
        />
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
        {busy ? "Submitting..." : "Submit claim"}
      </button>
    </form>
  );
}
