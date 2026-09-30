"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function FooterAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sectionId = `footer-${title.toLocaleLowerCase("fr-FR")}`;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return (
    <section
      className="footer-column footer-accordion"
      data-expanded={!isMobile || isOpen}
    >
      <button
        type="button"
        className="footer-accordion-trigger"
        aria-expanded={!isMobile || isOpen}
        aria-controls={sectionId}
        onClick={() => {
          if (isMobile) setIsOpen((open) => !open);
        }}
      >
        {title}
      </button>
      <ul className="footer-links-list" id={sectionId}>
        {children}
      </ul>
    </section>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-top-container">
        {/* Colonne 1 : Brand / Présentation / Contact direct / Réseaux sociaux */}
        <div className="footer-column brand-col">
          <div className="footer-logo">
            <img src="/img/log1-removebg-preview.png" alt="AMZATIC BENIN" />
          </div>

          <p className="brand-description">
            Votre partenaire informatique de confiance au Bénin. Investissement
            garanti et SAV assuré.
          </p>

          {/* Icônes des Réseaux Sociaux */}
          <div className="footer-social-links">
            <a
              href="https://www.facebook.com/AmzaTik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.tiktok.com/@amzat2400?_r=1&_t=ZN-98Fb3AAIit4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href="https://www.instagram.com/amzatic_benin_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          {/* Infos de contact direct intégrées dans la colonne de marque */}
          <ul className="footer-direct-contact">
            <li>
              <i className="fas fa-map-marker-alt icon-geo"></i>
              <span>Début échangeur Godomey à droite, Cotonou</span>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+2290167921796">+229 01 67 92 17 96</a>
            </li>
            <li>
              <i className="fab fa-whatsapp icon-wa"></i>
              <a
                href="https://wa.me/2290167921796"
                target="_blank"
                rel="noopener noreferrer"
              >
                +229 01 67 92 17 96
              </a>
            </li>
            <li>
              <i className="far fa-envelope"></i>
              <a href="mailto:amzaticofficiel@gmail.com">
                amzaticofficiel@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Colonne 2 : Produits */}
        <FooterAccordion title="Produits">
          <li>
            <Link href="/?cat=ordinateurs">Ordinateurs</Link>
          </li>
          <li>
            <Link href="/?cat=tablettes">Tablettes</Link>
          </li>
          <li>
            <Link href="/?cat=gaming">Gaming</Link>
          </li>
          <li>
            <Link href="/?cat=casques-audio">Audio</Link>
          </li>
          <li>
            <Link href="/produits">Tous les produits</Link>
          </li>
          <li>
            <Link href="/?cat=accessoires">Accessoires</Link>
          </li>
        </FooterAccordion>

        {/* Colonne 3 : Services */}
        <FooterAccordion title="Services">
          <li>
            <Link href="/contact">Support technique</Link>
          </li>
          <li>
            <Link href="/contact">Livraison</Link>
          </li>
          <li>
            <Link href="/cgv">Garantie</Link>
          </li>
          <li>
            <Link href="/contact">Installation</Link>
          </li>
          <li>
            <Link href="/contact">Formation</Link>
          </li>
          <li>
            <Link href="/contact">Maintenance</Link>
          </li>
        </FooterAccordion>

        {/* Colonne 4 : Entreprise et aide */}
        <FooterAccordion title="Entreprise">
          <li>
            <Link href="/contact">À propos</Link>
          </li>
          <li>
            <Link href="/vedette">Promotions</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/contact">Partenaires</Link>
          </li>
        </FooterAccordion>

        <FooterAccordion title="Aide">
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/panier">Mon panier</Link>
          </li>
          <li>
            <Link href="/cgv">Retours et conditions</Link>
          </li>
          <li>
            <Link href="/confidentialite">Confidentialité</Link>
          </li>
        </FooterAccordion>
      </div>

      {/* Barre de Copyright & Moyens de paiement tout en bas */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {currentYear} <strong>AMZATIC</strong>. Tous droits réservés.
          </p>

          <nav className="footer-legal-links" aria-label="Liens légaux">
            <Link href="/cgv">Conditions d&apos;utilisation</Link>
            <Link href="/confidentialite">Politique de confidentialité</Link>
            <Link href="/mentions-legales">Mentions légales</Link>
          </nav>

          <div className="footer-payment-methods">
            <span className="payment-title">Paiement accepté :</span>
            <span className="payment-badge mtn">MTN</span>
            <span className="payment-badge moov">MOOV</span>
            <span className="payment-badge cash">CELTIIS</span>
            <span className="payment-badge visa">VISA</span>
          </div>
        </div>
        <p
          className="copyright-text"
          style={{ textAlign: "center", marginTop: "10px" }}
        >
          Réalisé par{" "}
          <a
            style={{ color: "#02bbf2", textDecoration: "none" }}
            href="https://emerussoglo.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Emérus SOGLO
          </a>
        </p>
      </div>
    </footer>
  );
}
