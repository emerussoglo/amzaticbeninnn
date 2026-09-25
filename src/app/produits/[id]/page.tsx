"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { StoreProduct } from "@/lib/product-input";
import styles from "./ProductDetail.module.css";
import { PRODUCTS_DATA } from "../page";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const productId = Number(resolvedParams.id);
  const router = useRouter();
  const { addToCart } = useCart();
  const [databaseProduct, setDatabaseProduct] = useState<StoreProduct | null>(
    null,
  );
  const [selectedImage, setSelectedImage] = useState("");

  const staticProduct = PRODUCTS_DATA.find((p) => p.id === productId);

  useEffect(() => {
    if (staticProduct) return;
    fetch(`/api/products/${encodeURIComponent(resolvedParams.id)}`, {
      cache: "no-store",
    })
      .then((response) =>
        response.ok ? (response.json() as Promise<StoreProduct>) : null,
      )
      .then((item) => setDatabaseProduct(item))
      .catch(() => setDatabaseProduct(null));
  }, [resolvedParams.id, staticProduct]);

  const product = staticProduct ?? databaseProduct;

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
  const productImages =
    "images" in product && product.images.length
      ? product.images
      : [product.image];
  const heroImage = selectedImage || productImages[0];

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
        <div className={`product-image-box ${styles.gallery}`}>
          {discountPercent && (
            <span className="badge-discount">{discountPercent}</span>
          )}
          <img
            src={heroImage}
            alt={product.name}
            className="product-detail-img"
          />
          {productImages.length > 1 && (
            <div className={styles.thumbnails}>
              {productImages.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label="Afficher cette image"
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
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
              {"description" in product && product.description ? (
                product.description
              ) : (
                <>
                  Article d&apos;origine certifié par <strong>AMZATIC</strong>.
                  Produit garanti avec support client dédié pour l&apos;achat et
                  la livraison.
                </>
              )}
            </p>
          </div>

          {"specifications" in product &&
            Object.keys(product.specifications).length > 0 && (
              <dl className={styles.specifications}>
                {Object.entries(product.specifications).map(
                  ([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ),
                )}
              </dl>
            )}

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
