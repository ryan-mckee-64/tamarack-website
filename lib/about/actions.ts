"use server";

// lib/about/actions.ts
//
// Records a "send us a picture of your unit" submission. The photos are
// already in storage by the time this runs — the browser uploads them
// directly, because a Server Action body is capped at 1 MB by default and a
// phone photo is several times that. This only ever receives the object paths.

import { createClient } from "@/lib/supabase/server";

// Note: a "use server" file may only export async functions, so any constant
// here has to stay module-local — exporting one breaks every export in the
// file. The marketing address lives in the notification block below.

const MAX_PHOTOS = 6;

type Result = { ok: true } | { ok: false; error: string };

export async function submitUnitPhotos(input: {
  name: string;
  company: string;
  email: string;
  phone: string;
  model: string;
  location: string;
  notes: string;
  photoPaths: string[];
}): Promise<Result> {
  const name = input.name.trim();
  const company = input.company.trim();

  if (!name || !company)
    return { ok: false, error: "Your name and company are both required." };

  const paths = (input.photoPaths ?? []).filter(
    (p) => typeof p === "string" && p.length > 0,
  );

  if (paths.length === 0)
    return { ok: false, error: "Attach at least one photo before sending." };

  if (paths.length > MAX_PHOTOS)
    return { ok: false, error: `Please attach no more than ${MAX_PHOTOS} photos.` };

  // Reject anything pointing outside the bucket's own upload prefix.
  if (paths.some((p) => p.includes("..") || p.startsWith("/")))
    return { ok: false, error: "Those photos could not be attached. Try again." };

  const supabase = await createClient();
  const text = (v: string) => v.trim() || null;

  const { error } = await supabase.from("unit_photo_submissions").insert({
    name,
    company,
    email: text(input.email),
    phone: text(input.phone),
    model: text(input.model),
    location: text(input.location),
    notes: text(input.notes),
    photo_paths: paths,
  });

  if (error)
    return { ok: false, error: "Could not send your photos. Please try again." };

  // TODO: notify marketing once Resend is configured. With lib/email.ts in
  // place this becomes:
  //
  //   await sendMail({
  //     to: "Marketing@tamarack-ind.com",
  //     replyTo: text(input.email) ?? undefined,
  //     subject: `Unit photos from ${company}`,
  //     text: [`${name} at ${company}`, ...paths].join("\n"),
  //   });
  //
  // Until then submissions sit in the unit_photo_submissions table and the
  // unit-photos bucket, both visible in the Supabase dashboard.

  return { ok: true };
}
