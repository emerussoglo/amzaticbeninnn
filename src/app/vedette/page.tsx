"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// Sélection des meilleurs produits vedettes
const FEATURED_PRODUCTS = [
  { id: 2, name: "PC Portable HP 15-fd0005dx – Intel Core i5 12è Génération - Écran Tactile 15.6\" FHD - RAM 8GB - SSD 512GB", price: 400000, oldPrice: 450000, category: "Ordinateurs", image: "/img/hp-laptop-15-i5-12gen.jpeg", tag: "Coup de cœur" },
  { id: 5, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 16Go - SSD 512Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/hp-probook-640-g5.jpeg", tag: "Meilleure Performance" },
  { id: 8, name: "PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6\" FHD - RAM 8Go - SSD 256Go", price: 260000, oldPrice: 300000, category: "Ordinateurs", image: "/img/hp-elitebook-850-g6.jpeg", tag: "Promo" },
  { id: 9, name: "PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6\" FHD - RAM 8Go - SSD 512Go", price: 280000, oldPrice: 320000, category: "Ordinateurs", image: "/img/hp-elitebook-850-g6.jpeg", tag: "Populaire" },
  { id: 10, name: "PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6\" FHD - RAM 16Go - SSD 512Go", price: 330000, oldPrice: 380000, category: "Ordinateurs", image: "/img/hp-elitebook-850-g6.jpeg", tag: "Meilleure Performance" },
  { id: 11, name: "PC Portable HP Elitebook 1040G5 x360 (Convertible) – Intel Core i7 8è Génération - Écran Tactile 14\" - RAM 16Go - SSD 512Go", price: 550000, oldPrice: 600000, category: "Ordinateurs", image: "/img/hp-elitebook-1040g5-x360.jpeg", tag: "Coup de cœur" },
  { id: 14, name: "PC Portable Lenovo V15 G3 IAP – Intel Core i3 12è Génération - Écran 15\" - RAM 8Go - SSD 256Go", price: 260000, oldPrice: 300000, category: "Ordinateurs", image: "/img/lenovo-v15-g3-8gb.jpeg", tag: "Promo" },
  { id: 15, name: "PC Portable HP 250 G8 – Intel Core i3 10è Génération - Écran 15\" - RAM 8Go - SSD 512Go", price: 300000, oldPrice: 350000, category: "Ordinateurs", image: "/img/lenovo-v15-g3-8gb.jpeg", tag: "Meilleure Performance" },
  { id: 16, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 8Go - SSD 256Go", price: 180000, oldPrice: 220000, category: "Ordinateurs", image: "/img/hp-probook-640-g5-256gb.jpeg", tag: "Promo" },
  { id: 17, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 16Go - SSD 512Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/hp-probook-640-g5-256gb.jpeg", tag: "Meilleure Performance" },
  { id: 18, name: "Ordinateur Tout-en-un HP 440 G9 All in one – Intel Core i5-12500T 12e Gén 2.0ghz - Écran 24\" FHD - RAM 16Go - SSD 512Go", price: 580000, oldPrice: 630000, category: "Ordinateurs", image: "/img/hp-440-g9-all-in-one.jpeg", tag: "Coup de cœur" },
  { id: 20, name: "PC Portable HP Elitebook 840G3 – Intel Core i5 6è Génération - Écran 14\" - RAM 8Go - SSD 256Go + HDD 500Go", price: 150000, oldPrice: 185000, category: "Ordinateurs", image: "/img/hp-elitebook-840g3-double-stockage.jpeg", tag: "Promo" },
  { id: 21, name: "PC Portable HP Elitebook 840G3 – Intel Core i5 6è Génération - Écran 14\" - RAM 8Go - SSD 256Go + HDD 1To", price: 200000, oldPrice: 240000, category: "Ordinateurs", image: "/img/hp-elitebook-840g3-double-stockage.jpeg", tag: "Meilleure Performance" },
  { id: 23, name: "Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 8è Génération - Écran 23\" - RAM 8GB - HDD 500Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/dell-optiplex-5060-moyen.jpeg", tag: "Meilleure Performance" },
  { id: 24, name: "PC Portable Dell Vostro 15-3000 – Intel Core i3 11è Génération 3.00GHz - Écran 15\" FHD - RAM 8GB - SSD 256GB", price: 250000, oldPrice: 290000, category: "Ordinateurs", image: "/img/dell-vostro-15-3000.jpeg", tag: "Promo" },
  { id: 27, name: "Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 7è Génération - Écran 23\" - RAM 8GB - HDD 500Go", price: 190000, oldPrice: 230000, category: "Ordinateurs", image: "/img/dell-optiplex-5060-moyen.jpeg", tag: "Promo" },
];

export default function FeaturedPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  return (
    <div className="home-page-container">
      {/* En-tête stylisé pour la section Vedette */}
      <div className="featured-hero">
        <span className="featured-subtitle">Exclusivités Amzatic</span>

        <h1>Les Meilleurs Produits du Moment</h1>
        <p>Découvrez notre sélection exclusive de matériel plébiscité par nos clients au Bénin pour sa puissance, sa qualité et sa fiabilité.</p>

        {/* Action Header centrée */}
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

      {/* Grille de produits mise au même design responsive */}
      <div className="products-grid">
        {FEATURED_PRODUCTS.map((product) => {
          // Calcul dynamique de la remise
          const discountPercent = product.oldPrice 
            ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%` 
            : null;

          return (
            <div key={product.id} className="product-card">
              
              {/* Image + Badge Réduction + Favoris */}
              <div className="product-image-wrapper">
                {discountPercent && (
                  <span className="badge-discount">{discountPercent}</span>
                )}
                
                <button type="button" className="btn-wishlist" aria-label="Ajouter aux favoris">
                  <i className="far fa-heart"></i>
                </button>

                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-img"
                  loading="lazy"
                />
              </div>

              {/* Détails du produit */}
              <div className="product-info">
                <span className="product-cat">{product.category}</span>
                <h3 className="product-name" title={product.name}>{product.name}</h3>
                
                {/* Zone des prix */}
                <div className="product-price-container">
                  <span className="product-price">{product.price.toLocaleString("fr-FR")} F CFA</span>
                  {product.oldPrice && (
                    <span className="product-old-price">{product.oldPrice.toLocaleString("fr-FR")} F CFA</span>
                  )}
                </div>
                
                {/* Duo de Boutons d'Action (Voir & Ajouter) */}
                <div className="product-actions-group">
                  <button 
                    onClick={() => router.push(`/produits/${product.id}`)} 
                    className="btn-view-product"
                    type="button"
                  >
                    <i className="far fa-eye"></i>
                    <span>Voir</span>
                  </button>

                  <button 
                    onClick={() => addToCart(product)} 
                    className="btn-add-cart"
                    type="button"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span>Ajouter</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}