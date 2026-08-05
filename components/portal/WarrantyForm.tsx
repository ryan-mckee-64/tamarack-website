"use client";

import { useMemo, useState, useTransition } from "react";
import { submitWarrantyClaim } from "@/lib/portal/actions";
import { money } from "@/lib/portal/format";
import {
  LABOR_RATE_CENTS,
  MAX_TRAVEL_HOURS,
  TRAVEL_RATE_CENTS,
  claimTotals,
  emptyPartLine,
  lineAmountCents,
  toNumber,
  type ClaimPartLine,
} from "@/lib/portal/warranty";

const inputClass =
  "w-full mt-1.5 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const labelClass = "tech-label block text-[color:var(--ink-dim)]";

const cellInputClass =
  "w-full rounded-md border border-[color:var(--line-strong)] bg-white px-2.5 py-2 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const STARTING_ROWS = 4;

export type WarrantyFormDefaults = {
  companyBranch?: string;
  contactName?: string;
  email?: string;
};

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="tech-label mt-10 border-b border-[color:var(--line)] pb-2 text-[color:var(--ember)] first:mt-0">
      {children}
    </h2>
  );
}

export default function WarrantyForm({
  productLines,
  defaults,
}: {
  productLines: { slug: string; name: string }[];
  defaults?: WarrantyFormDefaults;
}) {
  // Customer info
  const [companyBranch, setCompanyBranch] = useState(
    defaults?.companyBranch ?? "",
  );
  const [address, setAddress] = useState("");
  const [cityState, setCityState] = useState("");
  const [contactName, setContactName] = useState(defaults?.contactName ?? "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(defaults?.email ?? "");

  // Machine info
  const [serialNumber, setSerialNumber] = useState("");
  const [productLine, setProductLine] = useState("");
  const [model, setModel] = useState("");
  const [hoursOnUnit, setHoursOnUnit] = useState("");
  const [purchasedOn, setPurchasedOn] = useState("");
  const [failedOn, setFailedOn] = useState("");
  const [poOrInvoice, setPoOrInvoice] = useState("");

  // Parts, labour and travel
  const [parts, setParts] = useState<ClaimPartLine[]>(() =>
    Array.from({ length: STARTING_ROWS }, emptyPartLine),
  );
  const [laborHours, setLaborHours] = useState("");
  const [travelHours, setTravelHours] = useState("");

  // Failure and sign off
  const [description, setDescription] = useState("");
  const [submittedBy, setSubmittedBy] = useState(defaults?.contactName ?? "");
  const [submittedOn, setSubmittedOn] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [certified, setCertified] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const totals = useMemo(
    () => claimTotals(parts, laborHours, travelHours),
    [parts, laborHours, travelHours],
  );

  const travelOverCap = toNumber(travelHours) > MAX_TRAVEL_HOURS;

  const valid =
    serialNumber.trim() !== "" &&
    description.trim() !== "" &&
    submittedBy.trim() !== "" &&
    certified;

  function updatePart(index: number, patch: Partial<ClaimPartLine>) {
    setParts((rows) =>
      rows.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  function addPartRow() {
    setParts((rows) => [...rows, emptyPartLine()]);
  }

  function removePartRow(index: number) {
    setParts((rows) =>
      rows.length === 1
        ? [emptyPartLine()]
        : rows.filter((_, i) => i !== index),
    );
  }

  function resetForm() {
    setAddress("");
    setCityState("");
    setPhone("");
    setSerialNumber("");
    setProductLine("");
    setModel("");
    setHoursOnUnit("");
    setPurchasedOn("");
    setFailedOn("");
    setPoOrInvoice("");
    setParts(Array.from({ length: STARTING_ROWS }, emptyPartLine));
    setLaborHours("");
    setTravelHours("");
    setDescription("");
    setCertified(false);
    setSubmittedOn(new Date().toISOString().slice(0, 10));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || isPending) return;

    setError(null);

    // The action revalidates /portal/warranty, so the claim list below
    // re-renders in the same roundtrip — no follow-up refresh needed.
    startTransition(async () => {
      const result = await submitWarrantyClaim({
        companyBranch,
        address,
        cityState,
        contactName,
        phone,
        email,
        serialNumber,
        productLine,
        model,
        hoursOnUnit,
        purchasedOn,
        failedOn,
        poOrInvoice,
        parts,
        laborHours,
        travelHours,
        description,
        submittedBy,
        submittedOn,
        certified,
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
        <p className="font-semibold text-[color:var(--ink)]">Claim submitted</p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          Our service team will review it and follow up. You can track its
          status in the list below. Keep the failed parts until the claim has
          been judged — we may ask for them, along with photos.
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
      className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7 md:p-9"
    >
      <SectionHeading>Customer info</SectionHeading>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="company" label="Company / branch">
          <input
            id="company"
            value={companyBranch}
            onChange={(e) => setCompanyBranch(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="contact" label="Contact">
          <input
            id="contact"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="address" label="Address">
          <input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="cityState" label="City / state">
          <input
            id="cityState"
            value={cityState}
            onChange={(e) => setCityState(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="phone" label="Phone">
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="email" label="Email">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <SectionHeading>Machine info</SectionHeading>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="line" label="Product line">
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
        </Field>

        <Field id="model" label="Model">
          <input
            id="model"
            placeholder="e.g. HK 600"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="serial" label="Serial number">
          <input
            id="serial"
            required
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="hours" label="Hour meter">
          <input
            id="hours"
            type="number"
            min={0}
            value={hoursOnUnit}
            onChange={(e) => setHoursOnUnit(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="purchased" label="Delivery date">
          <input
            id="purchased"
            type="date"
            value={purchasedOn}
            onChange={(e) => setPurchasedOn(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="failed" label="Failure date">
          <input
            id="failed"
            type="date"
            value={failedOn}
            onChange={(e) => setFailedOn(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="po" label="PO # or invoice #">
          <input
            id="po"
            value={poOrInvoice}
            onChange={(e) => setPoOrInvoice(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <SectionHeading>Parts claimed</SectionHeading>

      <div className="mt-5 overflow-x-auto rounded-xl border border-[color:var(--line)]">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[color:var(--line)] bg-[var(--surface-2)] text-left">
              <th className="w-[16%] px-3 py-2.5 font-semibold">Part #</th>
              <th className="px-3 py-2.5 font-semibold">
                Description &amp; invoice #
              </th>
              <th className="w-[9%] px-3 py-2.5 font-semibold">Qty</th>
              <th className="w-[15%] px-3 py-2.5 font-semibold">Unit price</th>
              <th className="w-[15%] px-3 py-2.5 text-right font-semibold">
                Amount
              </th>
              <th className="w-10 px-2 py-2.5">
                <span className="sr-only">Remove line</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {parts.map((line, index) => (
              <tr
                key={index}
                className="border-b border-[color:var(--line)] last:border-0"
              >
                <td className="px-3 py-2">
                  <input
                    aria-label={`Part number, line ${index + 1}`}
                    value={line.partNumber}
                    onChange={(e) =>
                      updatePart(index, { partNumber: e.target.value })
                    }
                    className={cellInputClass}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    aria-label={`Description and invoice number, line ${index + 1}`}
                    value={line.description}
                    onChange={(e) =>
                      updatePart(index, { description: e.target.value })
                    }
                    className={cellInputClass}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    aria-label={`Quantity, line ${index + 1}`}
                    type="number"
                    min={0}
                    step="1"
                    value={line.quantity}
                    onChange={(e) =>
                      updatePart(index, { quantity: e.target.value })
                    }
                    className={cellInputClass}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    aria-label={`Unit price, line ${index + 1}`}
                    type="number"
                    min={0}
                    step="0.01"
                    value={line.unitPrice}
                    onChange={(e) =>
                      updatePart(index, { unitPrice: e.target.value })
                    }
                    className={cellInputClass}
                  />
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-[color:var(--ink-dim)]">
                  {money(lineAmountCents(line))}
                </td>
                <td className="px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => removePartRow(index)}
                    aria-label={`Remove line ${index + 1}`}
                    className="rounded-md px-2 py-1 text-lg leading-none text-[color:var(--ink-faint)] transition hover:text-[color:var(--ember)]"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addPartRow}
        className="mt-3 text-sm font-semibold text-[color:var(--orange)] underline underline-offset-4"
      >
        Add another part
      </button>

      <SectionHeading>Labour and travel</SectionHeading>

      <div className="mt-5 grid gap-8 lg:grid-cols-2">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          <Field id="laborHours" label="Labour hours">
            <input
              id="laborHours"
              type="number"
              min={0}
              step="0.25"
              value={laborHours}
              onChange={(e) => setLaborHours(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-[0.78rem] text-[color:var(--ink-faint)]">
              Tamarack labour rate {money(LABOR_RATE_CENTS)}/hr
            </p>
          </Field>

          <Field id="travelHours" label="Travel time hours">
            <input
              id="travelHours"
              type="number"
              min={0}
              step="0.25"
              value={travelHours}
              onChange={(e) => setTravelHours(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-[0.78rem] text-[color:var(--ink-faint)]">
              Tamarack travel rate {money(TRAVEL_RATE_CENTS)}/hr, max{" "}
              {MAX_TRAVEL_HOURS} hours
            </p>
            {travelOverCap && (
              <p className="mt-1.5 text-[0.78rem] font-semibold text-[color:var(--ember)]">
                Travel is capped at {MAX_TRAVEL_HOURS} hours, so{" "}
                {MAX_TRAVEL_HOURS} is what has been totalled.
              </p>
            )}
          </Field>
        </div>

        <dl className="self-start rounded-xl border border-[color:var(--line)] bg-[var(--surface-2)] p-5 text-sm">
          <div className="flex items-center justify-between py-1.5">
            <dt className="text-[color:var(--ink-dim)]">Parts total</dt>
            <dd className="font-semibold tabular-nums text-[color:var(--ink)]">
              {money(totals.partsTotalCents)}
            </dd>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <dt className="text-[color:var(--ink-dim)]">Labour total</dt>
            <dd className="font-semibold tabular-nums text-[color:var(--ink)]">
              {money(totals.laborTotalCents)}
            </dd>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <dt className="text-[color:var(--ink-dim)]">Travel total</dt>
            <dd className="font-semibold tabular-nums text-[color:var(--ink)]">
              {money(totals.travelTotalCents)}
            </dd>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-[color:var(--line-strong)] pt-3">
            <dt className="font-semibold text-[color:var(--ink)]">
              Grand total
            </dt>
            <dd className="font-display text-lg font-bold tabular-nums text-[color:var(--ink)]">
              {money(totals.grandTotalCents)}
            </dd>
          </div>
        </dl>
      </div>

      <SectionHeading>Description of failure and resolution</SectionHeading>

      <div className="mt-5">
        <label htmlFor="description" className="sr-only">
          Description of failure and resolution
        </label>
        <textarea
          id="description"
          required
          rows={8}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What failed, what the machine was doing at the time, what was done to resolve it, and anything already tried."
          className={inputClass + " mt-0 resize-y"}
        />
      </div>

      <SectionHeading>Submitted by</SectionHeading>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="submittedBy" label="Submitted by">
          <input
            id="submittedBy"
            required
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field id="submittedOn" label="Date submitted">
          <input
            id="submittedOn"
            type="date"
            value={submittedOn}
            onChange={(e) => setSubmittedOn(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <label className="mt-6 flex items-start gap-3 rounded-xl border border-[color:var(--line)] bg-[var(--surface-2)] p-4">
        <input
          type="checkbox"
          checked={certified}
          onChange={(e) => setCertified(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--orange)]"
        />
        <span className="text-sm leading-relaxed text-[color:var(--ink-dim)]">
          I certify that all information is correct and accurate. Claims must be
          completed and returned within 30 days of repair, and parts must be
          held until judgement has been determined. Take pictures and keep the
          parts — they may be requested.
        </span>
      </label>

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
        disabled={!valid || isPending}
        className="brand-gradient mt-7 rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPending ? "Submitting..." : "Submit claim"}
      </button>
    </form>
  );
}
