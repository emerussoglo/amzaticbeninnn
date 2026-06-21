"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// Sélection des meilleurs produits (les vedettes adaptées à tes nouvelles rubriques)
const FEATURED_PRODUCTS = [
  { id: 1, name: "PC Portable HP 15s (Intel i5, 16GB RAM, 512GB SSD)", price: 450000, oldPrice: 490000, category: "Ordinateurs", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60", tag: "Coup de cœur" },
  { id: 3, name: "PC Gaming ASUS TUF (RTX 4060, i7)", price: 850000, oldPrice: 950000, category: "Ordinateurs", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60", tag: "Top Vente" },
  { id: 13, name: "Imprimante ÉcoTank Epson L3250", price: 155000, oldPrice: 180000, category: "Imprimantes", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=60", tag: "Offre Spéciale" },
  { id: 16, name: "Clavier Mécanique Corsair K70 RGB", price: 95000, oldPrice: 115000, category: "Accessoires", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60", tag: "Populaire" },
  { id: 19, name: "Chargeur Universel PC Portable 90W", price: 25000, oldPrice: 30000, category: "Accessoires", image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500&auto=format&fit=crop&q=60", tag: "Indispensable" },
  { id: 30, name: "Smart TV LED LG 55\" Ultra HD 4K", price: 385000, oldPrice: 420000, category: "Électroménager", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60", tag: "Premium" }
];

export default function FeaturedPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (product: typeof FEATURED_PRODUCTS[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  return (
    <div className="home-page-container">
      {/* En-tête stylisé pour la section Vedette */}
      <div className="featured-hero">
        <span className="featured-subtitle">Exclusivités ESPANA DEAL</span>
        <h1>Les Meilleurs Produits du Moment</h1>
        <p>Découvrez notre sélection exclusive de matériel plébiscité par nos clients au Bénin pour sa puissance, sa qualité et sa fiabilité.</p>
      </div>

      {/* Grille de produits avec badges et prix mis à jour */}
      <div className="products-grid">
        {FEATURED_PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            
            <div className="product-image-wrapper">
              {/* Badge Vedette dynamique sur l'image */}
              <span className="featured-badge">{product.tag}</span>
              
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
              
              {/* Conteneur de prix alignés à gauche */}
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
    </div>
  );
}