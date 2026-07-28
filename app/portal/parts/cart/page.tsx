import type { Metadata } from "next";
import CartView from "@/components/portal/CartView";

export const metadata: Metadata = {
  title: "Your Parts Order | Tamarack Industries",
};

export default function CartPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <p className="tech-label text-[color:var(--ember)]">Parts</p>
        <h1 className="font-display mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
          Your order
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[color:var(--ink-dim)]">
          Submit this to the parts desk. Nothing is charged online — we confirm
          pricing, freight and availability against your account first.
        </p>

        <div className="mt-10">
          <CartView />
        </div>
      </section>
    </main>
  );
}
