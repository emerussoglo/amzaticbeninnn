"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [searchCat, setSearchCat] = useState("");
  const { cartCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const categories = [
    { label: "Ordinateurs", value: "ordinateurs", icon: "fa-laptop" },
    { label: "Imprimantes", value: "imprimantes", icon: "fa-print" },
    { label: "Accessoires", value: "accessoires", icon: "fa-keyboard" },
    { label: "Casques & Audio", value: "casques-audio", icon: "fa-headphones" },
    { label: "Électroménager", value: "electromenager", icon: "fa-tv" },
  ];

  useEffect(() => {
    if (!isSearchOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSearchOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = `/?search=${encodeURIComponent(searchTxt.trim())}`;
    if (searchCat) {
      url += `&cat=${searchCat}`;
    }
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    router.push(url);
  };

  return (
    <header className="header-container">
      {/* --- NIVEAU 1 : MARQUE, NAVIGATION ET ACTIONS --- */}
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
            <img src="/img/img.jpg" alt="AMZATIC Bénin" />
          </Link>
        </div>

        <ul className="nav-links primary-nav-links">
          <li>
            <Link href="/" className={pathname === "/" ? "active-link" : ""}>
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/produits"
              className={pathname === "/produits" ? "active-link" : ""}
            >
              Produits
            </Link>
          </li>
          <li>
            <Link
              href="/vedette"
              className={pathname === "/vedette" ? "active-link" : ""}
            >
              Promotions
            </Link>
          </li>
          <li>
            <Link href="/?cat=ordinateurs">Gaming Arena</Link>
          </li>
          <li>
            <Link href="/ordinateurs">PC d&apos;occasion</Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={pathname === "/contact" ? "active-link" : ""}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Barre de Recherche (Desktop) */}
        {/* Actions Icones */}
        <div className="nav-actions">
          <button
            type="button"
            className="action-icon search-trigger"
            aria-label="Ouvrir la recherche"
            onClick={() => setIsSearchOpen(true)}
          >
            <i className="fas fa-search"></i>
          </button>
          <Link
            href="/contact"
            className="action-icon fav-desktop"
            aria-label="Contact"
          >
            <i className="far fa-user"></i>
          </Link>

          {/* Bouton Panier avec l'icône de caddie mise à jour (image_373583.png) */}

          <Link
            href="/panier"
            className="action-icon cart-icon-wrapper panier"
            aria-label="Panier"
          >
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* --- NIVEAU 2 : CATÉGORIES --- */}
      <div className="bottom-navbar">
        <div className="bottom-navbar-container">
          <ul className="category-links">
            {categories.map((category) => (
              <li key={category.value}>
                <Link
                  href={`/?cat=${category.value}`}
                  className={
                    pathname === `/?cat=${category.value}`
                      ? "active-category"
                      : ""
                  }
                >
                  <span className="category-icon">
                    <i
                      className={`fas ${category.icon}`}
                      aria-hidden="true"
                    ></i>
                  </span>
                  <span>{category.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isSearchOpen && (
        <div
          className="search-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsSearchOpen(false);
          }}
        >
          <section
            className="search-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Rechercher un produit"
          >
            <form onSubmit={handleSearchSubmit} className="search-modal-form">
              <i className="fas fa-search" aria-hidden="true"></i>
              <input
                type="search"
                placeholder="Rechercher un produit..."
                className="search-modal-input"
                value={searchTxt}
                onChange={(event) => setSearchTxt(event.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="search-modal-close"
                aria-label="Fermer la recherche"
                onClick={() => setIsSearchOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </form>
            <div className="search-modal-options">
              <label htmlFor="search-category">Catégorie</label>
              <select
                id="search-category"
                className="search-modal-category"
                value={searchCat}
                onChange={(event) => setSearchCat(event.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="search-popular">
              <span>Catégories populaires</span>
              <div className="search-suggestions">
                {categories.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setSearchCat(value);
                      setSearchTxt("");
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* --- MENU RESPONSIVE SIDEBAR MOBILE --- */}
      <div
        className={`mobile-sidebar-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="sidebar-header">
            <button
              className="close-sidebar"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="sidebar-body">
            {/* Barre de recherche interne */}
            <div className="mobile-search-wrapper">
              <form
                onSubmit={handleSearchSubmit}
                className="search-form mobile-search-form"
              >
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="search-input"
                  value={searchTxt}
                  onChange={(e) => setSearchTxt(e.target.value)}
                />
                <button
                  type="submit"
                  className="search-button mobile-btn-blue"
                  aria-label="Rechercher"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>

            {/* Liens de navigation */}
            <ul className="sidebar-nav-links">
              <li>
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/produits" onClick={() => setIsMenuOpen(false)}>
                  Tous nos produits
                </Link>
              </li>
              <li>
                <Link
                  href="/vedette"
                  className="link-featured"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produits Vedettes <i className="fas fa-fire icon-fire"></i>
                </Link>
              </li>
              <li>
                <Link
                  href="/panier"
                  className="link-featured"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panier{" "}
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>

            <div className="sidebar-divider"></div>

            <div className="sidebar-section-title">
              <span>Filtrer par catégorie</span>
              <Link
                href="/produits"
                onClick={() => setIsMenuOpen(false)}
                className="see-all-link"
              >
                Tout voir
              </Link>
            </div>

            <ul className="sidebar-categories-list">
              {categories.map((category) => (
                <li key={category.value}>
                  <Link
                    href={`/?cat=${category.value}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className={`fas ${category.icon}`}></i>
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="sidebar-divider"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
