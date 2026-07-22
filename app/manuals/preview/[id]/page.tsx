import Link from "next/link";
import { notFound } from "next/navigation";
import {
  documents,
  getProduct,
  categoryLabels,
  formatYears,
} from "@/lib/manuals";

export function generateStaticParams() {
  return documents.map((d) => ({ id: d.id }));
}

export default async function DocumentPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = documents.find((d) => d.id === id);
  if (!doc) notFound();

  const product = getProduct(doc.productSlug);

  const rows: { label: string; value: string }[] = [
    { label: "Product", value: product ? product.name : doc.productSlug },
    { label: "Document type", value: categoryLabels[doc.category] },
    { label: "Model years covered", value: formatYears(doc.years) },
    { label: "Model variant", value: doc.variant ?? "All variants" },
    { label: "Document number", value: doc.documentNumber ?? "Not assigned" },
    { label: "Revision", value: doc.revision ?? "Not assigned" },
    { label: "File size", value: doc.fileSize ?? "Unknown" },
    { label: "Record id", value: doc.id },
  ];

  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20 md:px-10">
        <Link
          href={`/manuals/${doc.productSlug}`}
          className="text-sm font-semibold text-[color:var(--ink-dim)] transition hover:text-[color:var(--orange)]"
        >
          Back to {product ? product.name : "product"} documents
        </Link>

        <div className="mt-8 rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] p-10">
          <p className="tech-label text-[color:var(--ember)]">
            Placeholder document
          </p>
          <h1 className="font-display mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
            {doc.title}
          </h1>

          <dl className="mt-10 divide-y divide-[color:var(--line)]">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-8"
              >
                <dt className="tech-label w-56 shrink-0 text-[color:var(--ink-dim)]">
                  {row.label}
                </dt>
                <dd className="text-[color:var(--ink)]">{row.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-sm leading-relaxed text-[color:var(--ink-dim)]">
            No file is attached to this record yet. When the controlled PDF is
            added to the site, this record will link straight to it instead of
            to this page.
          </p>
        </div>
      </section>
    </main>
  );
}