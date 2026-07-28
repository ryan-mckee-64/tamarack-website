"use client";

import { useState } from "react";
import { createSerialEnquiry, lookupSerial } from "@/lib/portal/actions";
import { shortDate } from "@/lib/portal/format";

type Match = {
  id: string;
  kind: string;
  reference: string | null;
  title: string;
  summary: string | null;
  published_on: string;
  document_url: string | null;
};

export default function SerialLookup() {
  const [serial, setSerial] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [note, setNote] = useState("");
  const [enquirySent, setEnquirySent] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!serial.trim() || busy) return;

    setBusy(true);
    setError(null);
    setEnquirySent(false);

    const result = await lookupSerial(serial);
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setMatches(result.data?.matches ?? []);
  }

  async function askSupport() {
    setBusy(true);
    const result = await createSerialEnquiry(serial, note);
    setBusy(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setEnquirySent(true);
  }

  return (
    <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7">
      <p className="font-semibold text-[color:var(--ink)]">
        Check a serial number
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-dim)]">
        On the serial plate of the unit. We will show anything that applies to
        it.
      </p>

      <form onSubmit={search} className="mt-5 flex flex-wrap gap-3">
        <input
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="e.g. HK600-2019-0472"
          className="min-w-[220px] flex-1 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[color:var(--orange)]"
        />
        <button
          type="submit"
          disabled={busy || !serial.trim()}
          className="brand-gradient rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {busy ? "Checking..." : "Check"}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 text-sm text-[color:var(--orange)]">
          {error}
        </p>
      )}

      {matches?.length ? (
        <ul className="mt-6 space-y-4 border-t border-[color:var(--line)] pt-6">
          {matches.map((m) => (
            <li key={m.id}>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold ${
                    m.kind === "recall"
                      ? "bg-[var(--orange-tint-2)] text-[color:var(--orange)]"
                      : "bg-[var(--surface-2)] text-[color:var(--ink-dim)]"
                  }`}
                >
                  {m.kind === "recall" ? "Recall" : "Service bulletin"}
                </span>
                <span className="text-[0.78rem] text-[color:var(--ink-faint)]">
                  {m.reference ? `${m.reference} · ` : ""}
                  {shortDate(m.published_on)}
                </span>
              </div>
              <p className="mt-2 font-semibold text-[color:var(--ink)]">
                {m.title}
              </p>
              {m.summary && (
                <p className="mt-1 text-sm leading-relaxed text-[color:var(--ink-dim)]">
                  {m.summary}
                </p>
              )}
              {m.document_url && (
                <a
                  href={m.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
                >
                  Open the document
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      {matches?.length === 0 && !enquirySent && (
        <div className="mt-6 border-t border-[color:var(--line)] pt-6">
          <p className="text-sm leading-relaxed text-[color:var(--ink-dim)]">
            Nothing on file for {serial.trim()}. That usually means there is
            nothing outstanding — but if you want it confirmed, send it to our
            support team and they will check the build record and get back to
            you.
          </p>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anything else we should know? Symptoms, hours on the unit, where it is working."
            className="mt-4 w-full resize-y rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[color:var(--orange)]"
          />
          <button
            onClick={askSupport}
            disabled={busy}
            className="mt-3 rounded-full border border-[color:var(--line-strong)] px-6 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--orange)] hover:text-[color:var(--orange)] disabled:opacity-40"
          >
            {busy ? "Sending..." : "Ask support to check"}
          </button>
        </div>
      )}

      {enquirySent && (
        <p className="mt-6 border-t border-[color:var(--line)] pt-6 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          Sent. Our support team has your serial number and will be in touch.
        </p>
      )}
    </div>
  );
}
