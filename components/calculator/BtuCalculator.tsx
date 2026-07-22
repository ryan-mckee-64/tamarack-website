// components/calculator/BtuCalculator.tsx
"use client";

import { useMemo, useState } from "react";

const INSULATION = [
  { id: "well", label: "Well insulated building", u: 0.06, ach: 1 },
  { id: "average", label: "Average building", u: 0.12, ach: 1.5 },
  { id: "light", label: "Lightly insulated or older", u: 0.2, ach: 2.5 },
  { id: "tarp", label: "Uninsulated or tarped enclosure", u: 0.4, ach: 4 },
  { id: "open", label: "Open frame hoarding", u: 0.6, ach: 6 },
];

function num(v: string, fallback = 0) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
  min,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix: string;
  min?: number;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono-label block text-[0.64rem] uppercase tracking-[0.14em] text-[color:var(--ink-faint)]"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[color:var(--line-strong)] bg-[var(--surface)] px-4 py-3 pr-12 font-body text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--orange)]"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono-label text-xs text-[color:var(--ink-faint)]">
          {suffix}
        </span>
      </div>
    </div>
  );
}

export default function BtuCalculator() {
  const [length, setLength] = useState("40");
  const [width, setWidth] = useState("30");
  const [height, setHeight] = useState("12");
  const [outdoor, setOutdoor] = useState("-10");
  const [indoor, setIndoor] = useState("60");
  const [insulationId, setInsulationId] = useState("average");

  const result = useMemo(() => {
    const L = Math.max(0, num(length));
    const W = Math.max(0, num(width));
    const H = Math.max(0, num(height));
    const ins = INSULATION.find((i) => i.id === insulationId) ?? INSULATION[1];
    const dT = Math.max(0, num(indoor) - num(outdoor));

    const volume = L * W * H;
    const area = 2 * (L * H) + 2 * (W * H) + 2 * (L * W); // walls + ceiling + floor
    const conduction = area * ins.u * dT;
    const infiltration = volume * ins.ach * 0.018 * dT;
    const subtotal = conduction + infiltration;
    const margin = subtotal * 0.2;
    const total = subtotal + margin;

    return {
      dT,
      conduction,
      infiltration,
      margin,
      total,
      kw: total * 0.00029307,
    };
  }, [length, width, height, outdoor, indoor, insulationId]);

  const rounded = Math.round(result.total / 1000) * 1000;

  const recommendation = useMemo(() => {
    const t = result.total;
    if (t <= 0) return "Enter a temperature rise to size a unit.";
    if (t <= 250000)
      return "Thawzall TCH 250 (250,000 BTU/hr) or a Heat King glycol system.";
    if (t <= 700000)
      return "Thawzall XHR 700 flameless heater (700,000 BTU/hr).";
    const units = Math.ceil(t / 700000);
    return `${units} × Thawzall XHR 700, or a Heat King HK1500 package. Contact us to confirm.`;
  }, [result.total]);

  const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Inputs */}
      <div className="border border-[color:var(--line)] bg-[var(--surface)] p-8 md:p-10">
        <p className="tech-label text-[color:var(--ember)]">Space dimensions</p>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <NumberField id="length" label="Length" value={length} onChange={setLength} suffix="ft" min={0} />
          <NumberField id="width" label="Width" value={width} onChange={setWidth} suffix="ft" min={0} />
          <NumberField id="height" label="Ceiling height" value={height} onChange={setHeight} suffix="ft" min={0} />
        </div>

        <p className="tech-label mt-10 text-[color:var(--ember)]">Temperature</p>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <NumberField id="outdoor" label="Outdoor temperature" value={outdoor} onChange={setOutdoor} suffix="°F" />
          <NumberField id="indoor" label="Desired indoor temperature" value={indoor} onChange={setIndoor} suffix="°F" />
        </div>

        <p className="tech-label mt-10 text-[color:var(--ember)]">Enclosure type</p>
        <div className="mt-5">
          <label htmlFor="insulation" className="sr-only">Enclosure type</label>
          <select
            id="insulation"
            value={insulationId}
            onChange={(e) => setInsulationId(e.target.value)}
            className="w-full appearance-none border border-[color:var(--line-strong)] bg-[var(--surface)] px-4 py-3 font-body text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--orange)]"
          >
            {INSULATION.map((i) => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="border-2 border-[color:var(--orange)] bg-[var(--surface)] p-8 md:p-10 lg:sticky lg:top-24">
        <p className="tech-label text-[color:var(--orange)]">Estimated requirement</p>
        <p className="font-display mt-4 text-5xl font-extrabold leading-none tracking-[-0.02em] text-[color:var(--ink)]">
          {fmt(rounded)}
        </p>
        <p className="font-mono-label mt-3 text-sm text-[color:var(--ink-dim)]">
          BTU/hr · {result.kw.toFixed(1)} kW · ΔT {fmt(result.dT)} °F
        </p>

        <dl className="mt-8 space-y-3 border-t border-[color:var(--line)] pt-6">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="font-mono-label text-[0.68rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">Envelope loss</dt>
            <dd className="font-mono-label text-sm text-[color:var(--ink)]">{fmt(result.conduction)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="font-mono-label text-[0.68rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">Air infiltration</dt>
            <dd className="font-mono-label text-sm text-[color:var(--ink)]">{fmt(result.infiltration)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="font-mono-label text-[0.68rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">Safety margin 20%</dt>
            <dd className="font-mono-label text-sm text-[color:var(--ink)]">{fmt(result.margin)}</dd>
          </div>
        </dl>

        <div className="mt-8 bg-[var(--orange-tint)] p-5">
          <p className="font-mono-label text-[0.64rem] uppercase tracking-[0.14em] text-[color:var(--ember)]">Suggested unit</p>
          <p className="font-body mt-2 text-sm leading-relaxed text-[color:var(--ink)]">{recommendation}</p>
        </div>

        <p className="font-body mt-6 text-xs leading-relaxed text-[color:var(--ink-faint)]">
          Estimate only. Actual sizing depends on wind, run time, ventilation, and ground thaw loads.{" "}
          <a href="/contact" className="text-[color:var(--orange)] underline underline-offset-2">Contact us</a> to confirm.
        </p>
      </div>

      {/* Methodology */}
      <details className="border border-[color:var(--line)] bg-[var(--surface-2)] p-6 lg:col-span-2">
        <summary className="font-mono-label cursor-pointer text-xs uppercase tracking-[0.14em] text-[color:var(--ink-dim)]">
          How this is calculated
        </summary>
        <div className="font-body mt-4 space-y-3 text-sm leading-relaxed text-[color:var(--ink-dim)]">
          <p>
            The estimate adds two heat loads plus a margin. Envelope loss is total surface
            area times a heat transfer factor times the temperature rise. Air infiltration is
            volume times air changes per hour times 0.018 times the temperature rise. A 20%
            margin covers recovery and cold starts.
          </p>
          <p>
            The enclosure type sets typical values for the heat transfer factor and air
            changes. These are planning figures for temporary and construction heating, not a
            replacement for a full engineered heat loss calculation.
          </p>
        </div>
      </details>
    </div>
  );
}