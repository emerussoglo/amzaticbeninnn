"use client";

import { useCart } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import Hero from "@/components/Hero";
import { Suspense } from "react";

const PRODUCTS_DATA = [
  // --- Rubrique Ordinateurs ---
  { id: 1, name: "PC Portable HP 15s (Intel i5, 16GB RAM, 512GB SSD)", price: 450000, oldPrice: 490000, category: "Ordinateurs", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60" },
  { id: 2, name: "MacBook Air M2 (8GB RAM, 256GB SSD)", price: 750000, oldPrice: 820000, category: "Ordinateurs", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60" },
  { id: 3, name: "PC Gaming ASUS TUF (RTX 4060, i7)", price: 850000, oldPrice: 950000, category: "Ordinateurs", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60" },

  // --- Rubrique Imprimantes ---
  { id: 13, name: "Imprimante ÉcoTank Epson L3250", price: 155000, oldPrice: 180000, category: "Imprimantes", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=60" },
  { id: 14, name: "Imprimante Laser HP Neverstop", price: 175000, oldPrice: 200000, category: "Imprimantes", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60" },

  // --- Rubrique Accessoires (Chargeur, batterie, clavier, écran...) ---
  { id: 5, name: "Écran Bureautique Dell 24\" UltraSharp", price: 110000, oldPrice: 130000, category: "Accessoires", image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=500&auto=format&fit=crop&q=60" },
  { id: 15, name: "Souris Logitech MX Master 3S", price: 65000, oldPrice: 75000, category: "Accessoires", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60" },
  { id: 16, name: "Clavier Mécanique Corsair K70 RGB", price: 95000, oldPrice: 115000, category: "Accessoires", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60" },
  { id: 19, name: "Chargeur Universel PC Portable 90W", price: 25000, oldPrice: 30000, category: "Accessoires", image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500&auto=format&fit=crop&q=60" },
  { id: 20, name: "Batterie Interne HP/Dell Haute Capacité", price: 35000, oldPrice: 45000, category: "Accessoires", image: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=500&auto=format&fit=crop&q=60" },

  // --- Rubrique Électroménager (TV toutes tailles, Clims, Cuisinières, Équipements cuisine) ---
  { id: 30, name: "Smart TV LED LG 55\" Ultra HD 4K", price: 385000, oldPrice: 420000, category: "Électroménager", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60" },
  { id: 31, name: "Smart TV 43\" Full HD (Autres tailles disponibles sur commande)", price: 195000, oldPrice: 220000, category: "Électroménager", image: "https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=500&auto=format&fit=crop&q=60" },
  { id: 32, name: "Climatiseur Split Westpoint 1.5 CV R410 (Mural)", price: 210000, oldPrice: 240000, category: "Électroménager", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60" },
  { id: 33, name: "Cuisinière à Gaz 4 Foyers Smart avec Four", price: 145000, oldPrice: 165000, category: "Électroménager", image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&auto=format&fit=crop&q=60" },
  { id: 34, name: "Four à Micro-ondes Numérique 20L", price: 65000, oldPrice: 75000, category: "Électroménager", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format&fit=crop&q=60" }
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