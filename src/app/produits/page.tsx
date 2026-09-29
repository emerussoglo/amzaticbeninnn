"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useStoreProducts } from "@/hooks/useStoreProducts";

import { PRODUCTS_DATA } from "@/lib/catalog";

function normalizeCatalogText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR")
    .trim();
}
export default function ProductsPage() {
  const { addToCart } = useCart();
  const storeProducts = useStoreProducts();

  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("default");
  const [searchText, setSearchText] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = useMemo(
    () => [
      "Tous",
      ...new Set(
        [...PRODUCTS_DATA, ...storeProducts]
          .map((product) => product.category)
          .sort((first, second) => first.localeCompare(second, "fr-FR")),
      ),
    ],
    [storeProducts],
  );
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA, ...storeProducts];

    if (categoryFilter !== "Tous") {
      result = result.filter(
        (product) =>
          normalizeCatalogText(product.category) ===
          normalizeCatalogText(categoryFilter),
      );
    }

    const searchTerms = normalizeCatalogText(searchText)
      .split(/\s+/)
      .filter(Boolean);
    if (searchTerms.length > 0) {
      result = result.filter((product) => {
        const searchableProduct = normalizeCatalogText(
          `${product.name} ${product.category} ${"brand" in product ? product.brand : ""} ${product.tag || ""}`,
        );
        return searchTerms.every((term) => searchableProduct.includes(term));
      });
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [categoryFilter, searchText, sortBy, storeProducts]);

  return (
    <div className="product-catalog-page">
      <header className="catalog-page-heading">
        <div className="catalog-page-heading-inner">
          <p className="catalog-breadcrumb">
            <Link href="/">Accueil</Link>
            <span>/</span> Produits
          </p>
          <h1>Nos Produits</h1>
          <p>Découvrez notre collection high-tech</p>
          <div className="catalog-count">
            <strong>{filteredAndSortedProducts.length}</strong>
            <span>Produits disponibles</span>
          </div>
        </div>
      </header>

      <div className="product-catalog-content">
        <p className="products-count">
          {filteredAndSortedProducts.length}{" "}
          {filteredAndSortedProducts.length > 1
            ? "produits disponibles"
            : "produit disponible"}
        </p>

        {/* Barre de contrôle */}
        <div className="catalog-controls">
          <label className="catalog-search" htmlFor="catalog-search">
            <i className="fas fa-search" aria-hidden="true"></i>
            <input
              id="catalog-search"
              type="search"
              placeholder="Rechercher un produit..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </label>
          <button
            type="button"
            className="mobile-filter-toggle"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((open) => !open)}
          >
            <i className="fas fa-sliders" aria-hidden="true"></i>
            Filtres
          </button>
          <div
            className={`catalog-filter-options ${filtersOpen ? "is-open" : ""}`}
          >
            <div className="control-group">
              <label htmlFor="category-select">Catégorie</label>
              <select
                id="category-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="sort-select">Trier par</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="default">Pertinence</option>
                <option value="price-asc">Prix : du - cher au + cher</option>
                <option value="price-desc">Prix : du + cher au - cher</option>
                <option value="alpha">Ordre alphabétique</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille des produits */}
        <div className="products-grid product-catalog-grid">
          {filteredAndSortedProducts.map((product) => {
            const discountPercent =
              ("discount" in product ? product.discount : undefined) ||
              (product.oldPrice
                ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
                : null);

            return (
              <article key={product.id} className="product-card">
                {/* Image + Badges */}
                <div className="product-image-wrapper">
                  {discountPercent && (
                    <span className="badge-discount">{discountPercent}</span>
                  )}

                  <button
                    type="button"
                    className="btn-wishlist"
                    aria-label="Ajouter aux favoris"
                  >
                    <i className="far fa-heart"></i>
                  </button>

                  <Link
                    href={`/produits/${encodeURIComponent(product.id)}`}
                    className="product-image-link"
                    aria-label={`Voir ${product.name}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                      loading="lazy"
                    />
                  </Link>
                </div>

                {/* Contenu et Détails */}
                <div className="product-info">
                  <span className="product-cat">{product.category}</span>
                  <span
                    className="product-rating"
                    aria-label="Aucun avis pour le moment"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <i
                        key={index}
                        className="fas fa-star"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  <h3 className="product-name" title={product.name}>
                    {product.name}
                  </h3>

                  {/* Ligne des prix */}
                  <div className="product-price-container">
                    <span className="product-price">
                      {product.price.toLocaleString("fr-FR")} F CFA
                    </span>
                    {product.oldPrice && (
                      <span className="product-old-price">
                        {product.oldPrice.toLocaleString("fr-FR")} F CFA
                      </span>
                    )}
                  </div>

                  {/* Duo de Boutons d'Action */}
                  <div className="product-actions-group">
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-add-cart"
                      type="button"
                      aria-label={`Ajouter ${product.name} au panier`}
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredAndSortedProducts.length === 0 && (
          <div className="no-products-found">
            <i className="fas fa-search"></i>
            <p>Aucun article disponible pour cette catégorie actuellement.</p>
          </div>
        )}
      </div>
    </div>
  );
}
