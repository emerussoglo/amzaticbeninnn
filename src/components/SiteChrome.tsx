"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdminRoute = usePathname().startsWith("/admin");
  if (isAdminRoute)
    return (
      <>
        {children}
        <BackToTopButton />
      </>
    );

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTopButton />
    </>
  );
}

function BackToTopButton() {
  return (
    <button
      type="button"
      className="back-to-top-button"
      aria-label="Retour en haut de la page"
      title="Retour en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fas fa-arrow-up" aria-hidden="true" />
    </button>
  );
}
