import Link from "next/link";
import styles from "./LegalLayout.module.css";

const pages = [
  { href: "/cgv", label: "Conditions de vente" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export function LegalNotice({ children }: { children: React.ReactNode }) {
  return <p className={styles.notice}>{children}</p>;
}

type LegalLayoutProps = {
  title: string;
  summary: string;
  children: React.ReactNode;
};

export default function LegalLayout({
  title,
  summary,
  children,
}: LegalLayoutProps) {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.topline}>
          <Link className={styles.brand} href="/">
            AMZATIC<span>.</span>
          </Link>
          <Link className={styles.back} href="/">
            Retour à la boutique
          </Link>
        </div>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>INFORMATIONS LÉGALES</span>
          <h1>{title}</h1>
          <p className={styles.summary}>{summary}</p>
          <time className={styles.date} dateTime="2026-09-25">
            Dernière mise à jour : 25 septembre 2026
          </time>
        </div>
      </header>
      <div className={styles.layout}>
        <nav className={styles.nav} aria-label="Pages légales">
          <span className={styles.navTitle}>DOCUMENTS</span>
          {pages.map((page) => (
            <Link key={page.href} href={page.href}>
              {page.label}
            </Link>
          ))}
        </nav>
        <article className={styles.content}>
          {children}
          <div className={styles.contactLine}>
            <a href="mailto:amzaticofficiel@gmail.com">
              amzaticofficiel@gmail.com
            </a>
            <a href="tel:+2290167921796">+229 01 67 92 17 96</a>
          </div>
        </article>
      </div>
    </div>
  );
}
