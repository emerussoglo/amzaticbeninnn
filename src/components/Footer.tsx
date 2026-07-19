import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-top-container">
        
        {/* Colonne 1 : Brand / Slogan */}
        <div className="footer-column brand-col">
          <div className="footer-logo">
            <img src="/img/img.jpg" alt="AMZATIC BENIN" />
          </div>
          <p className="brand-description">
            Votre partenaire informatique de confiance au Bénin. Investissement garanti et SAV assuré.
          </p>
        </div>

        {/* Colonne 2 : Liens Rapides */}
        <div className="footer-column">
          <h3>Liens rapides</h3>
          <ul className="footer-links-list">
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/produits">Produits</Link></li>
            <li><Link href="/panier">Panier</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Colonne 3 : Nous Contacter */}
        <div className="footer-column contact-col">
          <h3>Nous contacter</h3>
          <ul className="footer-contact-list">
            <li>
              <i className="fas fa-map-marker-alt icon-geo"></i>
              <span>Début échangeur Godomey à droite</span>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <a href="tel:+2290154627062">+229 01 54 62 70 62</a>
            </li>
            <li>
              <i className="fab fa-whatsapp icon-wa"></i>
              <a href="https://wa.me/2290167921796" target="_blank" rel="noopener noreferrer">+229 01 67 92 17 96</a>
            </li>
            <li>
              <i className="far fa-envelope"></i>
              <a href="mailto:amzaticofficiel@gmail.com">amzaticofficiel@gmail.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Barre de Copyright tout en bas */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © {currentYear} <strong>Espanadeal</strong>. Tous droits réservés.
          </p>
          <div className="footer-legal-links">
            <Link href="/conditions">Conditions générales</Link>
            <Link href="/confidentialite">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}