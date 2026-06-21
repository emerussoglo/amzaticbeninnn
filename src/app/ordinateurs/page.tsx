"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// CATALOGUE TECHNIQUE EXCLUSIF AUX ORDINATEURS ET ÉCRANS
const COMPUTERS_DATA = [
  { id: 1, name: "PC Portable HP 15s (Intel i5, 16GB RAM, 512GB SSD)", price: 450000, oldPrice: 490000, category: "PC Portables", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60" },
  { id: 2, name: "MacBook Air M2 (8GB RAM, 256GB SSD)", price: 750000, oldPrice: 820000, category: "PC Portables", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60" },
  { id: 3, name: "PC Gaming ASUS TUF (RTX 4060, i7)", price: 850000, oldPrice: 950000, category: "PC Gaming", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60" },
  { id: 4, name: "Moniteur Gaming MSI 27\" Incurvé 165Hz", price: 145000, oldPrice: 175000, category: "Moniteurs & Écrans", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60" },
  { id: 5, name: "Écran Bureautique Dell 24\" UltraSharp", price: 110000, oldPrice: 130000, category: "Moniteurs & Écrans", image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=500&auto=format&fit=crop&q=60" }
];

export default function OrdinateursPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("default");

  const handleBuyNow = (product: typeof COMPUTERS_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  const categories = ["Tous", "PC Portables", "PC Gaming", "Moniteurs & Écrans"];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...COMPUTERS_DATA];

    if (categoryFilter !== "Tous") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [categoryFilter, sortBy]);

  return (
    <div className="home-page-container">
      <h1 className="section-title">Ordinateurs & Écrans</h1>
      
      <p style={{ color: "#636366", fontSize: "14px", marginTop: "-15px", marginBottom: "25px", fontWeight: "500" }}>
        {filteredAndSortedProducts.length} {filteredAndSortedProducts.length > 1 ? "modèles disponibles" : "modèle disponible"}
      </p>

      <div className="catalog-controls">
        <div className="control-group">
          <label htmlFor="category-select">Type :</label>
          <select 
            id="category-select"
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-select">Trier par :</label>
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

      <div className="products-grid">
        {filteredAndSortedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
            </div>
            <div className="product-info">
              <span className="product-cat">{product.category}</span>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price-container">
                <span className="product-price">{product.price.toLocaleString()} FCFA</span>
                {product.oldPrice && <span className="product-old-price">{product.oldPrice.toLocaleString()} FCFA</span>}
              </div>
              <div className="product-card-actions">
                <button onClick={() => addToCart(product)} className="btn-add-cart" title="Ajouter au panier" type="button">
                  <i className="fas fa-shopping-cart"></i>
                </button>
                <button onClick={() => handleBuyNow(product)} className="btn-buy-now" type="button">
                  Commander
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="no-products-found">
          <i className="fas fa-search"></i>
          <p>Aucun ordinateur disponible dans cette sous-catégorie.</p>
        </div>
      )}
    </div>
  );
}