// app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tamarack Industries · Industrial Heating & Equipment",
  description:
    "Glycol and flameless heating systems and construction equipment, engineered and manufactured in Manitoba since 1995.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-body antialiased bg-[var(--bg)] text-[color:var(--ink)]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}