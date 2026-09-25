"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useStoreProducts } from "@/hooks/useStoreProducts";

// CATALOGUE ÉLECTROMÉNAGER ET SMART-TV
const HOME_APPLIANCES_DATA = [
  {
    id: 30,
    name: 'Smart TV LED LG 55" Ultra HD 4K',
    price: 385000,
    oldPrice: 420000,
    category: "Télévisions",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 31,
    name: 'Téléviseur Innova Smart 43" Full HD',
    price: 195000,
    oldPrice: 220000,
    category: "Télévisions",
    image:
      "https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 32,
    name: "Climatiseur Split Westpoint 1.5 CV R410",
    price: 210000,
    oldPrice: 240000,
    category: "Climatiseurs",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 33,
    name: "Cuisinière à Gaz 4 Foyers Smart avec Four",
    price: 145000,
    oldPrice: 165000,
    category: "Cuisinières & Fours",
    image:
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500&auto=format&fit=crop&q=60",
  },
];

export default function ElectromenagerPage() {
  const { addToCart } = useCart();
  const storeProducts = useStoreProducts();
  const router = useRouter();

  const [categoryFilter, setCategoryFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("default");

  const handleBuyNow = (product: Parameters<typeof addToCart>[0]) => {
    addToCart(product);
    router.push("/panier");
  };

  const categories = [
    "Tous",
    "Télévisions",
    "Climatiseurs",
    "Cuisinières & Fours",
  ];
  const filteredAndSortedProducts = useMemo(() => {
    let result = [
      ...HOME_APPLIANCES_DATA,
      ...storeProducts.filter(
        (product) => product.category === "Électroménager",
      ),
    ];

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
  }, [categoryFilter, sortBy, storeProducts]);

  return (
    <div className="home-page-container">
      <h1 className="section-title">Électroménager & TV</h1>

      <p
        style={{
          color: "#636366",
          fontSize: "14px",
          marginTop: "-15px",
          marginBottom: "25px",
          fontWeight: "500",
        }}
      >
        {filteredAndSortedProducts.length}{" "}
        {filteredAndSortedProducts.length > 1
          ? "équipements disponibles"
          : "équipement disponible"}
      </p>

      <div className="catalog-controls">
        <div className="control-group">
          <label htmlFor="category-select">Équipement :</label>
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
              <div className="product-price-container">
                <span className="product-price">
                  {product.price.toLocaleString()} FCFA
                </span>
                {product.oldPrice && (
                  <span className="product-old-price">
                    {product.oldPrice.toLocaleString()} FCFA
                  </span>
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

      {filteredAndSortedProducts.length === 0 && (
        <div className="no-products-found">
          <i className="fas fa-search"></i>
          <p>Aucun appareil disponible dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}
