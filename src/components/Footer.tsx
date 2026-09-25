import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-top-container">
        {/* Colonne 1 : Brand / Présentation / Contact direct / Réseaux sociaux */}
        <div className="footer-column brand-col">
          <div className="footer-logo">
            <img src="/img/img.jpg" alt="AMZATIC BENIN" />
          </div>

          <p className="brand-description">
            Votre partenaire informatique de confiance au Bénin. Investissement
            garanti et SAV assuré.
          </p>

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
        </div>

        {/* Colonne 2 : Boutique */}
        <div className="footer-column">
          <h3>BOUTIQUE</h3>
          <ul className="footer-links-list">
            <li>
              <Link href="/produits">Tous les produits</Link>
            </li>
            <li>
              <Link href="/vedettes">Meilleures ventes</Link>
            </li>
            <li>
              <Link href="/?cat=ordinateurs">Ordinateurs</Link>
            </li>
            <li>
              <Link href="/?cat=imprimantes">Imprimantes</Link>
            </li>
            <li>
              <Link href="/?cat=accessoires">Accessoires</Link>
            </li>
            <li>
              <Link href="/?cat=electromenager">Électroménager</Link>
            </li>
            <li>
              <Link href="/panier">Mon panier</Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Aide & Contact */}
        <div className="footer-column">
          <h3>AIDE</h3>
          <ul className="footer-links-list">
            <li>
              <Link href="/contact">Nous contacter</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/a-propos">À propos</Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4 : Légal */}
        <div className="footer-column">
          <h3>LÉGAL</h3>
          <ul className="footer-links-list">
            <li>
              <Link href="/cgv">CGV</Link>
            </li>
            <li>
              <Link href="/confidentialite">Confidentialité</Link>
            </li>
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre de Copyright & Moyens de paiement tout en bas */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {currentYear} <strong>AMZATIC</strong>. Tous droits réservés.
          </p>

          <div className="footer-payment-methods">
            <span className="payment-title">Paiement accepté :</span>
            <span className="payment-badge mtn">MTN</span>
            <span className="payment-badge moov">MOOV</span>
            <span className="payment-badge cash">CELTIIS</span>
            <span className="payment-badge visa">VISA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
