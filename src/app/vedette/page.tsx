"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import { FEATURED_PRODUCT_IDS, PRODUCTS_DATA } from "@/lib/catalog";

const featuredCatalogProducts = FEATURED_PRODUCT_IDS.flatMap((id) => {
  const product = PRODUCTS_DATA.find((item) => item.id === id);
  return product ? [product] : [];
});

export default function FeaturedPage() {
  const { addToCart } = useCart();
  const storeProducts = useStoreProducts();
  const router = useRouter();
  const featuredProducts = [
    ...featuredCatalogProducts,
    ...storeProducts.filter((product) => product.featured),
  ];

  return (
    <div className="home-page-container">
      <div className="featured-hero">
        <span className="featured-subtitle">Exclusivités Amzatic</span>
        <h1>Les Meilleurs Produits du Moment</h1>
        <p>
          Découvrez notre sélection exclusive de matériel plébiscité par nos
          clients au Bénin pour sa puissance, sa qualité et sa fiabilité.
        </p>
        <div className="catalog-header-action">
          <button
            onClick={() => router.push("/produits")}
            className="btn-see-all"
            type="button"
          >
            <span>Voir tous les produits</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="products-grid product-catalog-grid">
        {featuredProducts.map((product) => {
          const discountPercent =
            ("discount" in product ? product.discount : undefined) ||
            (product.oldPrice
              ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
              : null);

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
                    <i key={index} className="fas fa-star" aria-hidden="true" />
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
    </div>
  );
}
