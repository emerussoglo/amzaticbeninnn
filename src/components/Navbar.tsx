"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");          
  const [searchCat, setSearchCat] = useState("");          
  const { cartCount } = useCart();
  const pathname = usePathname(); 
  const router = useRouter(); 

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = `/?search=${encodeURIComponent(searchTxt.trim())}`;
    if (searchCat) {
      url += `&cat=${searchCat}`;
    }
    setIsMenuOpen(false); 
    router.push(url);     
  };

  return (
    <header className="header-container">
      {/* --- NIVEAU 1 : BARRE PRINCIPALE --- */}
      <div className="main-navbar">
        {/* Bouton Burger (Mobile) */}
        <button 
          className="burger-menu" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Zone Logo */}
        <div className="nav-logo">
          <Link href="/">
            <img src="/img/img.jpg" alt="Logo" />
          </Link>
        </div>

        {/* Barre de Recherche (Desktop) */}
        <div className="nav-search-container desktop-search">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input 
              type="text" 
              placeholder="Rechercher un ordinateur, accessoire..." 
              className="search-input"
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            />
            <div className="search-select-wrapper">
              <select 
                className="search-category"
                value={searchCat}
                onChange={(e) => setSearchCat(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
<option value="ordinateurs">Ordinateurs</option>
<option value="imprimantes">Imprimantes</option>
<option value="accessoires">Accessoires</option>
<option value="electromenager">Électroménager</option>
</select>
            </div>
            <button type="submit" className="search-button" aria-label="Rechercher">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div> 

        {/* Actions Icones */}
        <div className="nav-actions">
          <Link href="/contact" className="action-icon fav-desktop" aria-label="Contact">
             Contact
          </Link>
          
          {/* Bouton Panier avec l'icône de caddie mise à jour (image_373583.png) */}
          
          <Link href="/panier" className="action-icon cart-icon-wrapper panier" aria-label="Panier">
            <i className="fas fa-shopping-cart"></i> Panier
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* --- NIVEAU 2 : BARRE DE NAVIGATION INFÉRIEURE (Desktop) --- */}
      <div className="bottom-navbar">
        <div className="bottom-navbar-container">
          <ul className="nav-links">
            <li>
              <Link href="/" className={pathname === "/" ? "active-link" : ""}>
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/produits" className={pathname === "/produits" ? "active-link" : ""}>
                Tous nos produits
              </Link>
            </li>
            <li>
              <Link href="/vedette" className={`link-featured ${pathname === "/vedette" ? "active-link" : ""}`}>
                Produits Vedettes <i className="fas fa-fire icon-fire"></i>
              </Link>
            </li>
            
            <li>
              <Link href="/contact" className={pathname === "/contact" ? "active-link" : ""}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Numéro de téléphone */}
          <div className="nav-phone">
            <a href="tel:+2290167921796">+229 01 67 92 17 96</a>
          </div>
        </div>
      </div>

      {/* Barre de recherche mobile en dehors du menu */}
      <div className="mobile-search-wrapper imagine-im">
        <form onSubmit={handleSearchSubmit} className="search-form mobile-search-form">
          <input 
            type="text" 
            placeholder="Rechercher un produit Tech..." 
            className="search-input"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
          />
          <button type="submit" className="search-button mobile-btn-blue" aria-label="Rechercher">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      {/* --- MENU RESPONSIVE SIDEBAR MOBILE --- */}
      <div className={`mobile-sidebar-overlay ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(false)}>
        <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
          
          <div className="sidebar-header">
            <button className="close-sidebar" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="sidebar-body">
            {/* Barre de recherche interne */}
            <div className="mobile-search-wrapper">
              <form onSubmit={handleSearchSubmit} className="search-form mobile-search-form">
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="search-input"
                  value={searchTxt}
                  onChange={(e) => setSearchTxt(e.target.value)}
                />
                <button type="submit" className="search-button mobile-btn-blue" aria-label="Rechercher">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>

            {/* Liens de navigation */}
            <ul className="sidebar-nav-links">
              <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
              <li><Link href="/produits" onClick={() => setIsMenuOpen(false)}>Tous nos produits</Link></li>
              <li><Link href="/vedette" className="link-featured" onClick={() => setIsMenuOpen(false)}>Produits Vedettes <i className="fas fa-fire icon-fire"></i></Link></li>
              <li><Link href="/panier" className="link-featured" onClick={() => setIsMenuOpen(false)}>Panier </Link></li>
              <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            </ul>
            
            <div className="sidebar-divider"></div>

            <div className="sidebar-section-title">
              <span>Filtrer par catégorie</span>
              <Link href="/produits" onClick={() => setIsMenuOpen(false)} className="see-all-link">Tout voir</Link>
            </div>

            {/* Liste des nouvelles catégories avec icônes adaptées */}
<ul className="sidebar-categories-list">
  <li>
    <Link href="/?cat=ordinateurs" onClick={() => setIsMenuOpen(false)}>
      <i className="fas fa-laptop"></i> Ordinateurs
    </Link>
  </li>
  <li>
    <Link href="/?cat=imprimantes" onClick={() => setIsMenuOpen(false)}>
      <i className="fas fa-print"></i> Imprimantes
    </Link>
  </li>
  <li> 
    <Link href="/?cat=accessoires" onClick={() => setIsMenuOpen(false)}>
      <i className="fas fa-keyboard"></i> Accessoires
    </Link>
  </li>
  <li>
    <Link href="/?cat=electromenager" onClick={() => setIsMenuOpen(false)}>
      <i className="fas fa-tv"></i> Électroménager
    </Link>
  </li>
</ul>

            <div className="sidebar-divider"></div>
          </div>
        </div>
      </div>
    </header>
  );
}