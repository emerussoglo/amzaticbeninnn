"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import BrandMarquee from "@/components/BrandMarquee";
import Hero from "@/components/Hero";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { HOME_PRODUCT_IDS, PRODUCTS_DATA } from "@/lib/catalog";

const homeCatalogProducts = HOME_PRODUCT_IDS.flatMap((id) => {
  const product = PRODUCTS_DATA.find((item) => item.id === id);
  return product ? [product] : [];
});

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR")
    .trim();
}

function HomePageContent() {
  const { addToCart } = useCart();
  const storeProducts = useStoreProducts();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = normalizeSearchText(searchParams.get("search") || "");
  const categoryQuery = searchParams.get("cat") || "";
  const categoryMapping: Record<string, string> = {
    ordinateurs: "Ordinateurs",
    pc: "Ordinateurs",
    tablettes: "Tablettes",
    gaming: "Gaming",
    moniteurs: "Moniteurs",
    imprimantes: "Imprimantes",
    accessoires: "Accessoires",
    "casques-audio": "Casques & Audio",
    electromenager: "Électroménager",
  };
  const targetCategory = normalizeSearchText(
    categoryMapping[categoryQuery] || categoryQuery,
  );
  const searchTerms = searchQuery.split(/\s+/).filter(Boolean);
  const availableProducts = [
    ...storeProducts.slice(0, 4),
    ...homeCatalogProducts,
  ];
  const filteredProducts = availableProducts.filter((product) => {
    const searchableText = normalizeSearchText(
      `${product.name} ${product.category} ${"brand" in product ? product.brand : ""} ${product.tag || ""}`,
    );
    const matchesSearch = searchTerms.every((term) =>
      searchableText.includes(term),
    );
    const matchesCategory =
      !categoryQuery ||
      normalizeSearchText(product.category) === targetCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      {!searchQuery && !categoryQuery && (
        <div>
          <Hero />
          <BrandMarquee />
          <div className="features-section">
            <div className="features-container">
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-shipping">
                  <i className="fas fa-truck"></i>
                </div>
                <h3>Livraison Gratuite</h3>
                <p>Pour toutes commandes supérieures à 700.000 CFA</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-security">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Paiement Sécurisé</h3>
                <p>Transactions 100% sécurisées et cryptées</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-support">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Support 24/7</h3>
                <p>Assistance disponible à tout moment</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-guarantee">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h3>Garantie Satisfait</h3>
                <p>Retour gratuit sous 30 jours</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="home-page-container">
        <div className="featured-hero">
          <div className="featured-heading-copy">
            <h1>
              {searchQuery || categoryQuery
                ? `Résultats de votre recherche (${filteredProducts.length})`
                : "Produits phares"}
            </h1>
            <p>
              {searchQuery || categoryQuery
                ? "Les articles correspondant à votre sélection"
                : "Une sélection de produits de notre catalogue"}
            </p>
          </div>
          <div className="catalog-header-action">
            <button
              onClick={() => router.push("/produits")}
              className=""
              type="button"
              style={{
                color: "#007bff",
                backgroundColor: "transparent",
                fontSize: "18px",
                fontWeight: "bold",
                border: "0",
                cursor: "pointer",
              }}
            >
              <span style={{ color: "#007bff" }}>Voir tout</span>
              <i className="fas fa-arrow-right"></i>
            </button>
            {(searchQuery || categoryQuery) && (
              <button
                onClick={() => router.push("/")}
                className="catalog-clear-button"
                type="button"
              >
                Effacer les filtres
              </button>
            )}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              const discountPercent = product.oldPrice
                ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
                : null;

              return (
                <article key={product.id} className="product-card">
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
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#636366",
            }}
          >
            <i
              className="fas fa-search"
              style={{
                fontSize: "30px",
                marginBottom: "15px",
                display: "block",
              }}
            ></i>
            Aucun produit trouvé pour ces critères.
          </div>
        )}
      </div>

      {!searchQuery && !categoryQuery && (
        <section className="home-promotions">
          <div className="black-friday-section">
            <div className="black-friday-copy">
              <span className="black-friday-eyebrow">OFFRE LIMITÉE</span>
              <h2>
                Black Friday <strong>jusqu&apos;à -70%</strong>
              </h2>
              <p>
                Profitez de nos meilleures réductions sur une sélection de
                produits high-tech.
              </p>
              <div className="black-friday-actions">
                <Link href="/vedette" className="black-friday-button">
                  Découvrir les offres <i className="fas fa-arrow-right"></i>
                </Link>
                <Link
                  href="/vedette"
                  className="black-friday-button black-friday-button-secondary"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
            <img
              src="/img/msi-crosshair-16-generation-zero.avif"
              alt="Ordinateur portable en promotion"
              className="black-friday-image"
            />
            <span className="black-friday-mark" aria-hidden="true">
              BF
            </span>
          </div>
          <div className="promotion-tiles">
            <Link
              href="/?cat=gaming"
              className="promotion-tile promotion-tile-gaming"
            >
              <span className="promotion-tile-copy">
                <span className="hero-promo-tag">GAMING</span>
                <strong>Setup Gaming</strong>
                <span>Équipez-vous pour dominer</span>
                <span className="promotion-tile-button">Voir la sélection</span>
              </span>
              <span className="promotion-tile-icon">
                <i className="fas fa-gamepad" aria-hidden="true"></i>
              </span>
            </Link>
            <Link
              href="/?cat=ordinateurs"
              className="promotion-tile promotion-tile-innovation"
            >
              <span className="promotion-tile-copy">
                <span className="hero-promo-tag">INNOVATION</span>
                <strong>Développement</strong>
                <span>Les dernières innovations</span>
                <span className="promotion-tile-button">Découvrir</span>
              </span>
              <span className="promotion-tile-icon">
                <i className="fas fa-laptop" aria-hidden="true"></i>
              </span>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Chargement en cours</div>}>
      <HomePageContent />
    </Suspense>
  );
}
