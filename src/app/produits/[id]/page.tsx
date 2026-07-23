"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { PRODUCTS_DATA } from "../page";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);
  const router = useRouter();
  const { addToCart } = useCart();

  const product = PRODUCTS_DATA.find((p) => p.id === productId);

  if (!product) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Produit non trouvé</h2>
        <button onClick={() => router.push("/produits")} className="btn-back">
          Retour au catalogue
        </button>
      </div>
    );
  }

  const discountPercent = product.oldPrice 
    ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
    : null;

  return (
    <div className="product-detail-container">
      {/* Bouton Retour */}
      <button onClick={() => router.back()} className="btn-back">
        <i className="fas fa-arrow-left"></i>
        <span>Retour</span>
      </button>

      {/* Disposition principale */}
      <div className="product-detail-wrapper">
        
        {/* Colonne Image */}
        <div className="product-image-box">
          {discountPercent && (
            <span className="badge-discount">{discountPercent}</span>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-detail-img"
          />
        </div>

        {/* Colonne Infos */}
        <div className="product-info-box">
          <span className="product-detail-cat">{product.category}</span>
          <h1 className="product-detail-title">{product.name}</h1>

          {/* Prix */}
          <div className="product-detail-price-box">
            <span className="product-detail-price">
              {product.price.toLocaleString("fr-FR")} F CFA
            </span>
            {product.oldPrice && (
              <span className="product-detail-old-price">
                {product.oldPrice.toLocaleString("fr-FR")} F CFA
              </span>
            )}
          </div>

          {/* Description & Tag */}
          <div className="product-description-box">
            {product.tag && (
              <span className="product-tag-pill">{product.tag}</span>
            )}
            <p>
              Article d'origine certifié par <strong>AMZATIC</strong>. Produit garanti avec support client dédié pour l'achat et la livraison.
            </p>
          </div>

          {/* Bouton Ajouter au panier */}
          <button 
            onClick={() => addToCart(product)} 
            className="btn-detail-add-cart"
          >
            <i className="fas fa-shopping-cart"></i>
            <span>Ajouter au panier</span>
          </button>
        </div>

      </div>
    </div>
  );
}