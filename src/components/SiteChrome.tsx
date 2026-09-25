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
  if (isAdminRoute) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
