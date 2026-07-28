import Image from "next/image";
import { getProductLine } from "@/lib/product-lines";

/**
 * Renders a product line as its wordmark logo where we have one, falling back
 * to the plain name otherwise. Badge style logos stay as text, since a round
 * badge does not sit on a text baseline cleanly.
 *
 * The wrapper is a fixed height so cards and headings line up whether the line
 * resolves to a logo or to text. logoZoom compensates for files that carry
 * more empty margin than the others, and is applied as height rather than a
 * transform so the zoomed logo still reserves its own width — a transform
 * left the wider marks sitting on top of the text beside them.
 */
export default function LineName({
  slug,
  name,
  height = "h-8",
}: {
  slug: string;
  name: string;
  height?: string;
}) {
  const line = getProductLine(slug);
  const logo = line && line.logoStyle !== "badge" ? line.logo : undefined;

  if (!logo) return <>{name}</>;

  const zoom = line?.logoZoom ?? 1;

  return (
    <span className={`inline-flex ${height} max-w-full items-center`}>
      <Image
        src={logo}
        alt={name}
        width={600}
        height={150}
        className="w-auto max-w-full object-contain"
        style={{ height: `${zoom * 100}%` }}
      />
    </span>
  );
}