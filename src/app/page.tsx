"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import { Suspense } from "react";

// SELECTION EXACTE DE 35 PRODUITS PHARES POUR L'ACCUEIL
const PRODUCTS_DATA = [
  // --- PC & Ordinateurs (20 articles populaires) ---
  { id: 2, name: "PC Portable HP 15-fd0005dx – Intel Core i5 12è Génération - Écran Tactile 15.6\" FHD - RAM 8GB - SSD 512GB", price: 400000, oldPrice: 450000, category: "Ordinateurs", image: "/img/hp-laptop-15-i5-12gen.jpeg", tag: "Coup de cœur" },
  { id: 3, name: "PC Portable HP Elitebook mt45 – AMD Ryzen 3 Pro 2.10GHz (Éq Core i5) - Éran 14\" FHD - RAM 8Go - SSD 256Go", price: 170000, oldPrice: 210000, category: "Ordinateurs", image: "/img/hp-elitebook-mt45.jpeg", tag: "Promo" },
  { id: 4, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 8Go - SSD 256Go", price: 180000, oldPrice: 220000, category: "Ordinateurs", image: "/img/hp-probook-640-g5.jpeg", tag: "Promo" },
  { id: 5, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 16Go - SSD 512Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/hp-probook-640-g5.jpeg", tag: "Meilleure Performance" },
  { id: 6, name: "PC Portable HP ProBook 650 G1 – Intel Core i5 2.60GHz - Écran 15.6\" FHD - RAM 8Go - SSD 256Go", price: 135000, oldPrice: 165000, category: "Ordinateurs", image: "/img/hp-probook-650-g1.jpeg", tag: "Bon plan" },
  { id: 7, name: "PC Portable HP ProBook 650 G1 – Intel Core i7 2.70GHz - Écran 15.6\" FHD - RAM 8Go - HDD 500Go", price: 175000, oldPrice: 215000, category: "Ordinateurs", image: "/img/hp-probook-650-g1.jpeg", tag: "Puissant" },
  { id: 8, name: "PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6\" FHD - RAM 8Go - SSD 256Go", price: 260000, oldPrice: 300000, category: "Ordinateurs", image: "/img/hp-elitebook-850-g6.jpeg", tag: "Promo" },
  { id: 9, name: "PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6\" FHD - RAM 8Go - SSD 512Go", price: 280000, oldPrice: 320000, category: "Ordinateurs", image: "/img/hp-elitebook-850-g6.jpeg", tag: "Populaire" },
  { id: 10, name: "PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6\" FHD - RAM 16Go - SSD 512Go", price: 330000, oldPrice: 380000, category: "Ordinateurs", image: "/img/hp-elitebook-850-g6.jpeg", tag: "Meilleure Performance" },
  { id: 11, name: "PC Portable HP Elitebook 1040G5 x360 (Convertible) – Intel Core i7 8è Génération - Écran Tactile 14\" - RAM 16Go - SSD 512Go", price: 550000, oldPrice: 600000, category: "Ordinateurs", image: "/img/hp-elitebook-1040g5-x360.jpeg", tag: "Coup de cœur" },
  { id: 14, name: "PC Portable Lenovo V15 G3 IAP – Intel Core i3 12è Génération - Écran 15\" - RAM 8Go - SSD 256Go", price: 260000, oldPrice: 300000, category: "Ordinateurs", image: "/img/lenovo-v15-g3-8gb.jpeg", tag: "Promo" },
  { id: 15, name: "PC Portable HP 250 G8 – Intel Core i3 10è Génération - Écran 15\" - RAM 8Go - SSD 512Go", price: 300000, oldPrice: 350000, category: "Ordinateurs", image: "/img/lenovo-v15-g3-8gb.jpeg", tag: "Meilleure Performance" },
  { id: 18, name: "Ordinateur Tout-en-un HP 440 G9 All in one – Intel Core i5-12500T 12e Gén - Écran 24\" FHD - RAM 16Go - SSD 512Go", price: 580000, oldPrice: 630000, category: "Ordinateurs", image: "/img/hp-440-g9-all-in-one.jpeg", tag: "Coup de cœur" },
  { id: 19, name: "PC Portable HP EliteBook Dragonfly – Intel Core i7 8è Génération - Écran Tactile 13\" FHD - RAM 16Go - SSD 512Go", price: 410000, oldPrice: 460000, category: "Ordinateurs", image: "/img/hp-elitebook-dragonfly.jpeg", tag: "Promo" },
  { id: 20, name: "PC Portable HP Elitebook 840G3 – Intel Core i5 6è Génération - Écran 14\" - RAM 8Go - SSD 256Go + HDD 500Go", price: 150000, oldPrice: 185000, category: "Ordinateurs", image: "/img/hp-elitebook-840g3-double-stockage.jpeg", tag: "Promo" },
  { id: 21, name: "PC Portable HP Elitebook 840G3 – Intel Core i5 6è Génération - Écran 14\" - RAM 8Go - SSD 256Go + HDD 1To", price: 200000, oldPrice: 240000, category: "Ordinateurs", image: "/img/hp-elitebook-840g3-double-stockage.jpeg", tag: "Meilleure Performance" },
  { id: 22, name: "Ordinateur de Bureau Dell Optiplex 5060 – Intel Core i5 7è Génération - Écran 23\" - RAM 8GB - HDD 500Go", price: 190000, oldPrice: 230000, category: "Ordinateurs", image: "/img/dell-optiplex-5060-moyen.jpeg", tag: "Promo" },
  { id: 23, name: "Ordinateur de Bureau Dell Optiplex 5060 – Intel Core i5 8è Génération - Écran 23\" - RAM 8GB - HDD 500Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/dell-optiplex-5060-moyen.jpeg", tag: "Meilleure Performance" },
  { id: 24, name: "PC Portable Dell Vostro 15-3000 – Intel Core i3 11è Génération - Écran 15\" FHD - RAM 8GB - SSD 256GB", price: 250000, oldPrice: 290000, category: "Ordinateurs", image: "/img/dell-vostro-15-3000.jpeg", tag: "Promo" },
  { id: 25, name: "PC Portable HP ProBook 450G1 – Intel Core i5 2.60GHz - Écran 15.6\" - RAM 8Go - HDD 500Go", price: 100000, oldPrice: 130000, category: "Ordinateurs", image: "/img/hp-probook-450g1.jpeg", tag: "Promo" },

  
  // --- Casques & Audio ---
  { id: 201, name: "ACER NITRO GAMING HEADSET", price: 210000, oldPrice: 245000, category: "Casques & Audio", image: "/img/ACERNITROGAMINGHEADSET.webp", tag: "Gaming" },
  { id: 202, name: "Casque Gaming Razer BlackShark V2", price: 65000, oldPrice: 80000, category: "Casques & Audio", image: "/img/CasqueGamingRazerBlackSharkV2.jpg", tag: "Promo" },
  { id: 203, name: "Écouteurs AirPods Pro 3", price: 160000, oldPrice: 190000, category: "Casques & Audio", image: "/img/ÉcouteursAirPodsPro3.jpg", tag: "Coup de cœur" },

  
  { id: 307, name: "PC Portable HP ProBook 650G1 – Intel Core i5 2.60GHz - RAM 8Go", price: 100000, oldPrice: 130000, category: "Ordinateurs", image: "/img/hp-probook-450g1.jpeg" },
  { id: 308, name: "PC Portable HP EliteBook mt45 – AMD Ryzen 3 Pro - RAM 8Go", price: 170000, oldPrice: 210000, category: "Ordinateurs", image: "/img/hp-elitebook-mt45.jpeg" }

];

export function HomePageContent() {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryQuery = searchParams.get("cat") || "";

  const categoryMapping: { [key: string]: string } = {
    ordinateurs: "Ordinateurs",
    imprimantes: "Imprimantes",
    accessoires: "Accessoires",
    electromenager: "Électroménager"
  };
  const targetCategory = categoryMapping[categoryQuery] || "";

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    
    const cleanProductCat = product.category.replace(/\s+/g, '').toLowerCase();
    const cleanTargetCat = targetCategory.replace(/\s+/g, '').toLowerCase();
    
    const matchesCategory = targetCategory ? cleanProductCat === cleanTargetCat : true;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main>
      {!searchQuery && !categoryQuery && (
        <div>
          <Hero />
            
          <div className="features-section">
            <div className="features-container">
              <div className="feature-card">
                <div className="feature-icon-wrapper icon-shipping"> 
                  <i className="fas fa-tools"></i>
                </div>
                <h3>SERVICE APRÈS VENTE ASSURÉ</h3>
                <p>Une assistance technique dédiée pour suivre vos équipements</p>
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
                <p>Assistance commerciale disponible à tout moment</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon-wrapper icon-guarantee">
                  <i className="fas fa-user-check"></i>
                </div>
                <h3>Investissement Garanti</h3>
                <p>Choisir nos articles informatiques, c'est sécuriser son achat</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="home-page-container">
        <div className="featured-hero">
          <span className="featured-subtitle">AMZATIC BÉNIN</span>
          <h1>
            {searchQuery || categoryQuery 
              ? `Résultats de votre recherche (${filteredProducts.length})` 
              : "Nos produits phares"}
          </h1>

          <div className="catalog-header-action">
  <button 
    onClick={() => router.push("/produits")} // Ou le chemin vers votre page catalogue
    className="btn-see-all"
    type="button"
  >
    <span>Voir tous les produits</span>
    <i className="fas fa-arrow-right"></i>
  </button>
</div>
          
          {(searchQuery || categoryQuery) && (
            <button 
              onClick={() => router.push("/")}
              style={{ marginTop: "15px", padding: "8px 16px", backgroundColor: "#1a1a1a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" }}
            >
              Voir tout le catalogue Tech
            </button>
          )}
        </div>
      

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => {
              // Calcul dynamique de la remise
              const discountPercent = product.oldPrice 
                ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%` 
                : null;

              return (
                <div key={product.id} className="product-card">
                  
                  {/* Image + Badge Promo + Bouton Favoris (Design Maquette) */}
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

                  {/* Contenu de la Carte Produit */}
                  <div className="product-info">
                    <span className="product-cat">{product.category}</span>
                    <h3 className="product-name" title={product.name}>{product.name}</h3>
                    
                    {/* Zone des Prix */}
                    <div className="product-price-container">
                      <span className="product-price">{product.price.toLocaleString("fr-FR")} F CFA</span>
                      {product.oldPrice && (
                        <span className="product-old-price">{product.oldPrice.toLocaleString("fr-FR")}</span>
                      )}
                    </div>
                    
                    {/* Bouton Unique 'Ajouter au Panier' Pleine Largeur */}
                    <button 
                      onClick={() => addToCart(product)} 
                      className="btn-add-cart"
                      type="button"
                    >
                      <i className="fas fa-shopping-cart"></i>
                      <span>Ajouter au panier</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#636366" }}>
            <i className="fas fa-search" style={{ fontSize: "30px", marginBottom: "15px", display: "block" }}></i>
            Aucun produit informatique trouvé pour ces critères.
          </div>
        )}
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Chargement du catalogue...</div>}>
      <HomePageContent />
    </Suspense>
  );
}