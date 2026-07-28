import { redirect } from "next/navigation";

// The portal itself lives behind sign in, so /portal is just the front door.
export default function PortalPage() {
  redirect("/portal/login");
}