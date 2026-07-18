"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import { Suspense } from "react";

const PRODUCTS_DATA = [
  // --- Rubrique Ordinateurs ---
  { id: 4, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 8Go - SSD 256Go", price: 180000, oldPrice: 220000, category: "Ordinateurs", image: "/img/hp-probook-640-g5.jpeg", tag: "Promo" },
  { id: 5, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 16Go - SSD 512Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/hp-probook-640-g5.jpeg", tag: "Meilleure Performance" },
  { id: 6, name: "PC Portable HP ProBook 650 G1 – Intel Core i5 2.60GHz - Écran 15.6\" FHD - RAM 8Go - SSD 256Go", price: 135000, oldPrice: 165000, category: "Ordinateurs", image: "/img/hp-probook-650-g1.jpeg", tag: "Bon plan" },
  { id: 9, name: "PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6\" FHD - RAM 8Go - SSD 512Go", price: 280000, oldPrice: 320000, category: "Ordinateurs", image: "/img/hp-elitebook-850-g6.jpeg", tag: "Populaire" },
  { id: 10, name: "PC Portable HP EliteBook 850 G6 – Intel Core i5 8è Génération - Écran 15.6\" FHD - RAM 16Go - SSD 512Go", price: 330000, oldPrice: 380000, category: "Ordinateurs", image: "/img/hp-elitebook-850-g6.jpeg", tag: "Meilleure Performance" },
  { id: 11, name: "PC Portable HP Elitebook 1040G5 x360 (Convertible) – Intel Core i7 8è Génération - Écran Tactile 14\" - RAM 16Go - SSD 512Go", price: 550000, oldPrice: 600000, category: "Ordinateurs", image: "/img/hp-elitebook-1040g5-x360.jpeg", tag: "Coup de cœur" },
  { id: 15, name: "PC Portable HP 250 G8 – Intel Core i3 10è Génération - Écran 15\" - RAM 8Go - SSD 512Go", price: 300000, oldPrice: 350000, category: "Ordinateurs", image: "/img/lenovo-v15-g3-8gb.jpeg", tag: "Meilleure Performance" },
  { id: 16, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 8Go - SSD 256Go", price: 180000, oldPrice: 220000, category: "Ordinateurs", image: "/img/hp-probook-640-g5-256gb.jpeg", tag: "Promo" },
  { id: 17, name: "PC Portable HP ProBook 640 G5 – Intel Core i5 8è Génération - Écran 14\" FHD - RAM 16Go - SSD 512Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/hp-probook-640-g5-256gb.jpeg", tag: "Meilleure Performance" },
  { id: 18, name: "Ordinateur Tout-en-un HP 440 G9 All in one – Intel Core i5-12500T 12e Gén 2.0ghz - Écran 24\" FHD - RAM 16Go - SSD 512Go", price: 580000, oldPrice: 630000, category: "Ordinateurs", image: "/img/hp-440-g9-all-in-one.jpeg", tag: "Coup de cœur" },
  { id: 19, name: "PC Portable HP EliteBook Dragonfly – Intel Core i7 8è Génération - Écran Tactile 13\" FHD - RAM 16Go - SSD 512Go", price: 410000, oldPrice: 460000, category: "Ordinateurs", image: "/img/hp-elitebook-dragonfly.jpeg", tag: "Promo" },
  { id: 21, name: "PC Portable HP Elitebook 840G3 – Intel Core i5 6è Génération - Écran 14\" - RAM 8Go - SSD 256Go + HDD 1To", price: 200000, oldPrice: 240000, category: "Ordinateurs", image: "/img/hp-elitebook-840g3-double-stockage.jpeg", tag: "Meilleure Performance" },
  { id: 22, name: "Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 7è Génération - Écran 23\" - RAM 8GB - HDD 500Go", price: 190000, oldPrice: 230000, category: "Ordinateurs", image: "/img/dell-optiplex-5060-moyen.jpeg", tag: "Promo" },
  { id: 23, name: "Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 8è Génération - Écran 23\" - RAM 8GB - HDD 500Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/dell-optiplex-5060-moyen.jpeg", tag: "Meilleure Performance" },
  { id: 24, name: "PC Portable Dell Vostro 15-3000 – Intel Core i3 11è Génération 3.00GHz - Écran 15\" FHD - RAM 8GB - SSD 256GB", price: 250000, oldPrice: 290000, category: "Ordinateurs", image: "/img/dell-vostro-15-3000.jpeg", tag: "Promo" },
  { id: 25, name: "PC Portable HP ProBook 450G1 – Intel Core i5 2.60GHz - Écran 15.6\" - RAM 8Go - HDD 500Go", price: 100000, oldPrice: 130000, category: "Ordinateurs", image: "/img/hp-probook-450g1.jpeg", tag: "Promo" },
  { id: 26, name: "PC Portable HP ProBook 650G1 – Intel Core i5 2.60GHz - Écran 15.6\" - RAM 8Go - HDD 500Go", price: 100000, oldPrice: 130000, category: "Ordinateurs", image: "/img/hp-probook-450g1.jpeg", tag: "Promo" },
  { id: 27, name: "Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 7è Génération - Écran 23\" - RAM 8GB - HDD 500Go", price: 190000, oldPrice: 230000, category: "Ordinateurs", image: "/img/dell-optiplex-5060-moyen.jpeg", tag: "Promo" },
  { id: 28, name: "Ordinateur de Bureau Dell Optiplex 5060 (Moyen) – Intel Core i5 8è Génération - Écran 23\" - RAM 8GB - HDD 500Go", price: 210000, oldPrice: 250000, category: "Ordinateurs", image: "/img/dell-optiplex-5060-moyen.jpeg", tag: "Meilleure Performance" },
  { id: 29, name: "PC Portable HP EliteBook mt45 – AMD Ryzen 3 Pro 2.10GHz (éq Core i5) - Écran 14\" Full HD - RAM 8Go - SSD 256Go - AMD Radeon 2Gb dédiée", price: 170000, oldPrice: 210000, category: "Ordinateurs", image: "/img/hp-elitebook-mt45.jpeg", tag: "Promo" },


  
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
 
  const handleBuyNow = (product: typeof PRODUCTS_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

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
              : "Nos produits phares "}
          </h1>
          
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
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-img"
                    loading="lazy"
                  />
                </div>

                <div className="product-info">
                  <span className="product-cat">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  
                  {/* ZONE DES PRIX MISE À JOUR */}
                  <div className="product-price-container">
                    <span className="product-price">{product.price.toLocaleString()} FCFA</span>
                    {product.oldPrice && (
                      <span className="product-old-price">{product.oldPrice.toLocaleString()} FCFA</span>
                    )}
                  </div>
                  
                  <div className="product-card-actions">
                    <button 
                      onClick={() => addToCart(product)} 
                      className="btn-add-cart"
                      title="Ajouter au panier"
                      type="button"
                    >
                      <i className="fas fa-shopping-cart"></i> 
                    </button>
                    <button 
                      onClick={() => handleBuyNow(product)} 
                      className="btn-buy-now"
                      type="button"
                    >
                      Commander
                    </button>
                  </div>
                </div>
              </div>
            ))}
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