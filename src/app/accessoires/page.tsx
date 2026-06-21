"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// CATALOGUE DÉDIÉ AUX IMPRIMANTES, COMPOSANTS ET ACCESSOIRES (BATTERIES, CHARGEURS, CLAVIERS...)
const ACCESSORIES_DATA = [
  { id: 13, name: "Imprimante ÉcoTank Epson L3250", price: 155000, oldPrice: 180000, category: "Imprimantes", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=60" },
  { id: 14, name: "Imprimante Laser HP Neverstop", price: 175000, oldPrice: 200000, category: "Imprimantes", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60" },
  { id: 15, name: "Souris Logitech MX Master 3S", price: 65000, oldPrice: 75000, category: "Claviers & Souris", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60" },
  { id: 16, name: "Clavier Mécanique Corsair K70 RGB", price: 95000, oldPrice: 115000, category: "Claviers & Souris", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60" },
  { id: 17, name: "Disque Dur Externe WD My Passport 2To", price: 55000, oldPrice: 65000, category: "Stockage", image: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=500&auto=format&fit=crop&q=60" },
  { id: 18, name: "Hub USB-C 8-en-1 Anker", price: 30000, oldPrice: 40000, category: "Connectique & Énergie", image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500&auto=format&fit=crop&q=60" },
  { id: 19, name: "Chargeur Universel PC Portable 90W", price: 25000, oldPrice: 30000, category: "Connectique & Énergie", image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500&auto=format&fit=crop&q=60" },
  { id: 20, name: "Batterie Interne de Remplacement pour HP/Dell", price: 35000, oldPrice: 45000, category: "Connectique & Énergie", image: "https://images.unsplash.com/photo-1624996379697-f01d168b1a52?w=500&auto=format&fit=crop&q=60" }
];

export default function AccessoiresPage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("default");

  const handleBuyNow = (product: typeof ACCESSORIES_DATA[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  const categories = ["Tous", "Imprimantes", "Claviers & Souris", "Stockage", "Connectique & Énergie"];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...ACCESSORIES_DATA];

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
      <h1 className="section-title">Imprimantes & Accessoires</h1>
      
      <p style={{ color: "#636366", fontSize: "14px", marginTop: "-15px", marginBottom: "25px", fontWeight: "500" }}>
        {filteredAndSortedProducts.length} {filteredAndSortedProducts.length > 1 ? "articles trouvés" : "article trouvé"}
      </p>

      <div className="catalog-controls">
        <div className="control-group">
          <label htmlFor="category-select">Catégorie :</label>
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
          <p>Aucun accessoire trouvé dans cette section.</p>
        </div>
      )}
    </div>
  );
}