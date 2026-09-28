"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useStoreProducts } from "@/hooks/useStoreProducts";

// Définition du Type
export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  tag?: string;
  discount?: string;
};

function normalizeCatalogText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR")
    .trim();
}

export const PRODUCTS_DATA: Product[] = [
  // --- PC & Moniteurs ---
  {
    id: 2,
    name: 'PC Portable HP 15-fd0005dx – Intel Core i5 12è Génération - Écran Tactile 15.6" FHD - RAM 8GB - SSD 512GB',
    price: 400000,
    oldPrice: 450000,
    category: "Ordinateurs",
    image: "/img/hp-laptop-15-i5-12gen.jpeg",
    tag: "Coup de cœur",
  },
  {
    id: 3,
    name: 'PC Portable HP Elitebook mt45 – AMD Ryzen 3 Pro 2.10GHz (Éq Core i5) - Éran 14" FHD - RAM 8Go - SSD 256Go - Radeon 2Go Dédiée',
    price: 170000,
    oldPrice: 210000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-mt45.jpeg",
    tag: "Promo",
  },
  {
    id: 4,
    name: 'PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14" FHD - RAM 8Go - SSD 256Go',
    price: 180000,
    oldPrice: 220000,
    category: "Ordinateurs",
    image: "/img/hp-probook-640-g5.jpeg",
    tag: "Promo",
  },
  {
    id: 5,
    name: 'PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14" FHD - RAM 16Go - SSD 512Go',
    price: 210000,
    oldPrice: 250000,
    category: "Ordinateurs",
    image: "/img/hp-probook-640-g5.jpeg",
    tag: "Meilleure Performance",
  },
  {
    id: 6,
    name: 'PC Portable HP ProBook 650 G1 – Intel Core i5 2.60GHz - Écran 15.6" FHD - RAM 8Go - SSD 256Go',
    price: 135000,
    oldPrice: 165000,
    category: "Ordinateurs",
    image: "/img/hp-probook-650-g1.jpeg",
    tag: "Bon plan",
  },
  {
    id: 7,
    name: 'PC Portable HP ProBook 650 G1 – Intel Core i7 2.70GHz - Écran 15.6" FHD - RAM 8Go - HDD 500Go',
    price: 175000,
    oldPrice: 215000,
    category: "Ordinateurs",
    image: "/img/hp-probook-650-g1.jpeg",
    tag: "Puissant",
  },
  {
    id: 8,
    name: 'PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6" FHD - RAM 8Go - SSD 256Go',
    price: 260000,
    oldPrice: 300000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-850-g6.jpeg",
    tag: "Promo",
  },
  {
    id: 9,
    name: 'PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6" FHD - RAM 8Go - SSD 512Go',
    price: 280000,
    oldPrice: 320000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-850-g6.jpeg",
    tag: "Populaire",
  },
  {
    id: 10,
    name: 'PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6" FHD - RAM 16Go - SSD 512Go',
    price: 330000,
    oldPrice: 380000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-850-g6.jpeg",
    tag: "Meilleure Performance",
  },
  {
    id: 11,
    name: 'PC Portable HP Elitebook 1040G5 x360 (Convertible) – Intel Core i7 8è Génération - Écran Tactile 14" - RAM 16Go - SSD 512Go',
    price: 550000,
    oldPrice: 600000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-1040g5-x360.jpeg",
    tag: "Coup de cœur",
  },
  {
    id: 14,
    name: 'PC Portable Lenovo V15 G3 IAP – Intel Core i3 12è Génération - Écran 15" - RAM 8Go - SSD 256Go',
    price: 260000,
    oldPrice: 300000,
    category: "Ordinateurs",
    image: "/img/lenovo-v15-g3-8gb.jpeg",
    tag: "Promo",
  },
  {
    id: 15,
    name: 'PC Portable HP 250 G8 – Intel Core i3 10è Génération - Écran 15" - RAM 8Go - SSD 512Go',
    price: 300000,
    oldPrice: 350000,
    category: "Ordinateurs",
    image: "/img/lenovo-v15-g3-8gb.jpeg",
    tag: "Meilleure Performance",
  },
  {
    id: 16,
    name: 'PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14" FHD - RAM 8Go - SSD 256Go',
    price: 180000,
    oldPrice: 220000,
    category: "Ordinateurs",
    image: "/img/hp-probook-640-g5-256gb.jpeg",
    tag: "Promo",
  },
  {
    id: 17,
    name: 'PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14" FHD - RAM 16Go - SSD 512Go',
    price: 210000,
    oldPrice: 250000,
    category: "Ordinateurs",
    image: "/img/hp-probook-640-g5-256gb.jpeg",
    tag: "Meilleure Performance",
  },
  {
    id: 18,
    name: 'Ordinateur Tout-en-un HP 440 G9 All in one – Intel Core i5-12500T 12e Gén 2.0ghz - Écran 24" FHD - RAM 16Go - SSD 512Go',
    price: 580000,
    oldPrice: 630000,
    category: "Ordinateurs",
    image: "/img/hp-440-g9-all-in-one.jpeg",
    tag: "Coup de cœur",
  },
  {
    id: 19,
    name: 'PC Portable HP EliteBook Dragonfly – Intel Core i7 8è Génération - Écran Tactile 13" FHD - RAM 16Go - SSD 512Go',
    price: 410000,
    oldPrice: 460000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-dragonfly.jpeg",
    tag: "Promo",
  },
  {
    id: 20,
    name: 'PC Portable HP Elitebook 840G3 – Intel Core i5 6è Génération - Écran 14" - RAM 8Go - SSD 256Go + HDD 500Go',
    price: 150000,
    oldPrice: 185000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-840g3-double-stockage.jpeg",
    tag: "Promo",
  },
  {
    id: 21,
    name: 'PC Portable HP Elitebook 840G3 – Intel Core i5 6è Génération - Écran 14" - RAM 8Go - SSD 256Go + HDD 1To',
    price: 200000,
    oldPrice: 240000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-840g3-double-stockage.jpeg",
    tag: "Meilleure Performance",
  },
  {
    id: 22,
    name: 'Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 7è Génération - Écran 23" - RAM 8GB - HDD 500Go',
    price: 190000,
    oldPrice: 230000,
    category: "Ordinateurs",
    image: "/img/dell-optiplex-5060-moyen.jpeg",
    tag: "Promo",
  },
  {
    id: 23,
    name: 'Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 8è Génération - Écran 23" - RAM 8GB - HDD 500Go',
    price: 210000,
    oldPrice: 250000,
    category: "Ordinateurs",
    image: "/img/dell-optiplex-5060-moyen.jpeg",
    tag: "Meilleure Performance",
  },
  {
    id: 24,
    name: 'PC Portable Dell Vostro 15-3000 – Intel Core i3 11è Génération 3.00GHz - Écran 15" FHD - RAM 8GB - SSD 256GB',
    price: 250000,
    oldPrice: 290000,
    category: "Ordinateurs",
    image: "/img/dell-vostro-15-3000.jpeg",
    tag: "Promo",
  },
  {
    id: 25,
    name: 'PC Portable HP ProBook 450G1 – Intel Core i5 2.60GHz - Écran 15.6" - RAM 8Go - HDD 500Go',
    price: 100000,
    oldPrice: 130000,
    category: "Ordinateurs",
    image: "/img/hp-probook-450g1.jpeg",
    tag: "Promo",
  },
  {
    id: 26,
    name: 'PC Portable HP ProBook 650G1 – Intel Core i5 2.60GHz - Écran 15.6" - RAM 8Go - HDD 500Go',
    price: 100000,
    oldPrice: 130000,
    category: "Ordinateurs",
    image: "/img/hp-probook-450g1.jpeg",
    tag: "Promo",
  },
  {
    id: 27,
    name: 'Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 7è Génération - Écran 23" - RAM 8GB - HDD 500Go',
    price: 190000,
    oldPrice: 230000,
    category: "Ordinateurs",
    image: "/img/dell-optiplex-5060-moyen.jpeg",
    tag: "Promo",
  },
  {
    id: 28,
    name: 'Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 8è Génération - Écran 23" - RAM 8GB - HDD 500Go',
    price: 210000,
    oldPrice: 250000,
    category: "Ordinateurs",
    image: "/img/dell-optiplex-5060-moyen.jpeg",
    tag: "Meilleure Performance",
  },
  {
    id: 29,
    name: 'PC Portable HP EliteBook mt45 – AMD Ryzen 3 Pro 2.10GHz (éq Core i5) - Écran 14" Full HD - RAM 8Go - SSD 256Go - AMD Radeon 2Gb dédiée',
    price: 170000,
    oldPrice: 210000,
    category: "Ordinateurs",
    image: "/img/hp-elitebook-mt45.jpeg",
    tag: "Promo",
  },

  // --- Casques & Audio ---
  {
    id: 201,
    name: "ACER NITRO GAMING HEADSET",
    price: 210000,
    oldPrice: 245000,
    category: "Casques & Audio",
    image: "/img/ACERNITROGAMINGHEADSET.webp",
    tag: "Gaming",
  },
  {
    id: 202,
    name: "Casque Gaming Razer BlackShark V2",
    price: 65000,
    oldPrice: 80000,
    category: "Casques & Audio",
    image: "/img/CasqueGamingRazerBlackSharkV2.jpg",
    tag: "Promo",
  },
  {
    id: 203,
    name: "Écouteurs AirPods Pro 3",
    price: 160000,
    oldPrice: 190000,
    category: "Casques & Audio",
    image: "/img/ÉcouteursAirPodsPro3.jpg",
    tag: "Coup de cœur",
  },

  // --- Imprimantes & Accessoires ---
  {
    id: 301,
    name: "Imprimante ÉcoTank Epson L3250",
    price: 155000,
    oldPrice: 180000,
    category: "Imprimantes",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=60",
    tag: "Promo",
  },
  {
    id: 302,
    name: "Imprimante Laser HP Neverstop",
    price: 175000,
    oldPrice: 200000,
    category: "Imprimantes",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60",
    tag: "Pro",
  },
  {
    id: 303,
    name: "Souris Logitech MX Master 3S",
    price: 65000,
    oldPrice: 75000,
    category: "Accessoires",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60",
    tag: "Top Vente",
  },
  {
    id: 304,
    name: "Clavier Mécanique Corsair K70 RGB",
    price: 95000,
    oldPrice: 115000,
    category: "Accessoires",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    tag: "Gaming",
  },
  {
    id: 305,
    name: "Disque Dur Externe WD My Passport 2To",
    price: 55000,
    oldPrice: 65000,
    category: "Accessoires",
    image:
      "https://images.unsplash.com/photo-1601524909162-be87252be298?w=500&auto=format&fit=crop&q=60",
    tag: "Stockage",
  },
  {
    id: 306,
    name: "Hub USB-C 8-en-1 Anker",
    price: 30000,
    oldPrice: 40000,
    category: "Accessoires",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500&auto=format&fit=crop&q=60",
    tag: "Utile",
  },
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const storeProducts = useStoreProducts();

  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("default");
  const [searchText, setSearchText] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = [
    "Tous",
    "Ordinateurs",
    "Imprimantes",
    "Accessoires",
    "Casques & Audio",
    "Tablettes",
    "Gaming",
    "Électroménager",
    "Moniteurs",
  ];
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA, ...storeProducts];

    if (categoryFilter !== "Tous") {
      result = result.filter((product) => {
        const searchableProduct = normalizeCatalogText(
          `${product.name} ${product.category} ${product.tag || ""}`,
        );
        if (categoryFilter === "Gaming") {
          return searchableProduct.includes("gaming");
        }
        if (categoryFilter === "Moniteurs") {
          return (
            searchableProduct.includes("moniteur") ||
            searchableProduct.includes("monitor")
          );
        }
        if (categoryFilter === "Tablettes") {
          return (
            searchableProduct.includes("tablette") ||
            searchableProduct.includes("tablet")
          );
        }
        return (
          normalizeCatalogText(product.category) ===
          normalizeCatalogText(categoryFilter)
        );
      });
    }

    const normalizedSearch = normalizeCatalogText(searchText);
    if (normalizedSearch) {
      result = result.filter((product) =>
        normalizeCatalogText(
          `${product.name} ${product.category} ${product.tag || ""}`,
        ).includes(normalizedSearch),
      );
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
