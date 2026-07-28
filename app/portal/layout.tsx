import { createClient } from "@/lib/supabase/server";
import PortalNav from "@/components/portal/PortalNav";

// The sign-in, forgot-password and reset pages live under /portal too, so the
// portal nav only appears once there is someone to show it to.
export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let signedIn = false;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    signedIn = Boolean(user);
  } catch {
    // Supabase not configured yet — render the page and let it say so.
  }

  return (
    <>
      {signedIn && <PortalNav />}
      {children}
    </>
  );
}
