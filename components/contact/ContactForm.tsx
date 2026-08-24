"use client";

import { useState } from "react";
import { visibleProductLines } from "@/lib/product-lines";

const SALES_EMAIL = "Sales@tamarack-ind.com";
const SUPPORT_EMAIL = "Support@tamarack-ind.com";

type Dept = "sales" | "support";

const inputClass =
  "w-full mt-1.5 rounded-lg border border-[color:var(--line-strong)] bg-white px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none transition focus:border-[color:var(--orange)]";

const labelClass = "tech-label block text-[color:var(--ink-dim)]";

export default function ContactForm({ department }: { department: Dept }) {
  const isSales = department === "sales";
  const email = isSales ? SALES_EMAIL : SUPPORT_EMAIL;

  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [serial, setSerial] = useState("");
  const [enquiryType, setEnquiryType] = useState(isSales ? "Purchase" : "Service");
  const [message, setMessage] = useState("");

  const valid = name.trim() !== "" && userEmail.trim() !== "" && message.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;

    let body = "Name: " + name + "\n";
    body += "Company: " + (company || "Not provided") + "\n";
    body += "Email: " + userEmail + "\n";
    body += "Phone: " + (phone || "Not provided") + "\n";
    body += "Product: " + (product || "Not specified") + "\n";
    if (!isSales) {
      body += "Model year: " + (modelYear || "Not provided") + "\n";
      body += "Serial number: " + (serial || "Not provided") + "\n";
    }
    body += "Enquiry type: " + enquiryType + "\n\n";
    body += message;

    const subject = (isSales ? "Sales" : "Support") + " enquiry from " + name;

    window.location.href =
      "mailto:" + email +
      "?subject=" + encodeURIComponent(subject) +
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
          Send the message that opened and our team will get back to you.
        </p>
        <p className="mt-3 text-sm text-[color:var(--ink-dim)]">
          If nothing opened, email us directly at {email}
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            required
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="product" className={labelClass}>Product line</label>
          <select
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className={inputClass}
          >
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
          <label htmlFor="enquiryType" className={labelClass}>Enquiry type</label>
          <select
            id="enquiryType"
            value={enquiryType}
            onChange={(e) => setEnquiryType(e.target.value)}
            className={inputClass}
          >
            {isSales && <option>Purchase</option>}
            {isSales && <option>Rental</option>}
            {isSales && <option>Pricing and availability</option>}
            {isSales && <option>Dealer enquiry</option>}
            {!isSales && <option>Service</option>}
            {!isSales && <option>Parts order</option>}
            {!isSales && <option>Troubleshooting</option>}
            {!isSales && <option>Warranty</option>}
          </select>
        </div>

        {!isSales && (
          <div>
            <label htmlFor="modelYear" className={labelClass}>Model year</label>
            <input
              id="modelYear"
              placeholder="e.g. 2019"
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
              className={inputClass}
            />
          </div>
        )}

        {!isSales && (
          <div>
            <label htmlFor="serial" className={labelClass}>Serial number</label>
            <input
              id="serial"
              placeholder="From the serial plate"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              className={inputClass}
            />
          </div>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass + " resize-y"}
        />
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="brand-gradient mt-7 rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send enquiry
      </button>
    </form>
  );
}