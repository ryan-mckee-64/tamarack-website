"use client";

import { useState } from "react";
import { visibleProductLines } from "@/lib/product-lines";

const WARRANTY_EMAIL = "Support@tamarack-ind.com";

const inputClass =
  "w-full mt-1.5 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const labelClass = "tech-label block text-[color:var(--ink-dim)]";

// Matches components/contact/ContactForm.tsx: the submit opens the visitor's
// mail client rather than posting anywhere. Swap for a server action once
// there is somewhere to send it.
export default function WarrantyClaimForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [model, setModel] = useState("");
  const [serial, setSerial] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [dealer, setDealer] = useState("");
  const [hours, setHours] = useState("");
  const [failureDate, setFailureDate] = useState("");
  const [description, setDescription] = useState("");

  const valid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    serial.trim() !== "" &&
    description.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;

    let body = "WARRANTY CLAIM\n\n";
    body += "Name: " + name + "\n";
    body += "Company: " + (company || "Not provided") + "\n";
    body += "Email: " + email + "\n";
    body += "Phone: " + (phone || "Not provided") + "\n\n";
    body += "Product line: " + (product || "Not specified") + "\n";
    body += "Model: " + (model || "Not provided") + "\n";
    body += "Serial number: " + serial + "\n";
    body += "Model year: " + (modelYear || "Not provided") + "\n";
    body += "Purchase date: " + (purchaseDate || "Not provided") + "\n";
    body += "Purchased from: " + (dealer || "Not provided") + "\n";
    body += "Hours on unit: " + (hours || "Not provided") + "\n";
    body += "Date of failure: " + (failureDate || "Not provided") + "\n\n";
    body += "Description of the fault:\n" + description;

    window.location.href =
      "mailto:" + WARRANTY_EMAIL +
      "?subject=" + encodeURIComponent("Warranty claim, serial " + serial) +
      "&body=" + encodeURIComponent(body);

    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-8">
        <p className="font-semibold text-[color:var(--ink)]">
          Your email client should have opened
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          Send the message that opened, attaching photos of the fault and the
          serial plate if you have them. Our service team will open the claim
          and reply with a claim number.
        </p>
        <p className="mt-3 text-sm text-[color:var(--ink-dim)]">
          If nothing opened, email us directly at {WARRANTY_EMAIL}
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-[color:var(--ink-dim)] underline underline-offset-4"
        >
          Back to the form
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-7"
    >
      <p className="tech-label text-[color:var(--ember)]">Your details</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input id="company" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
        </div>
      </div>

      <p className="tech-label mt-8 text-[color:var(--ember)]">The machine</p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="product" className={labelClass}>Product line</label>
          <select id="product" value={product} onChange={(e) => setProduct(e.target.value)} className={inputClass}>
            <option value="">Select a product</option>
            {visibleProductLines.map((line) => (
              <option key={line.slug} value={line.name}>
                {line.name}
              </option>
            ))}
            <option value="Not sure">Not sure</option>
          </select>
        </div>

        <div>
          <label htmlFor="model" className={labelClass}>Model</label>
          <input id="model" placeholder="e.g. HK 300" value={model} onChange={(e) => setModel(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="serial" className={labelClass}>Serial number</label>
          <input id="serial" required placeholder="From the serial plate" value={serial} onChange={(e) => setSerial(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="modelYear" className={labelClass}>Model year</label>
          <input id="modelYear" placeholder="e.g. 2019" value={modelYear} onChange={(e) => setModelYear(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="purchaseDate" className={labelClass}>Purchase date</label>
          <input id="purchaseDate" placeholder="Month and year" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="dealer" className={labelClass}>Purchased from</label>
          <input id="dealer" placeholder="Dealer or branch" value={dealer} onChange={(e) => setDealer(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="hours" className={labelClass}>Hours on unit</label>
          <input id="hours" value={hours} onChange={(e) => setHours(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="failureDate" className={labelClass}>Date of failure</label>
          <input id="failureDate" value={failureDate} onChange={(e) => setFailureDate(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="description" className={labelClass}>
          What failed, and what was the machine doing at the time?
        </label>
        <textarea
          id="description"
          required
          rows={7}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass + " resize-y"}
        />
      </div>

      <p className="mt-4 text-[0.78rem] leading-relaxed text-[color:var(--ink-faint)]">
        Photos of the fault and the serial plate speed a claim up considerably.
        Attach them to the email that opens when you submit.
      </p>

      <button
        type="submit"
        disabled={!valid}
        className="brand-gradient mt-7 rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit claim
      </button>
    </form>
  );
}