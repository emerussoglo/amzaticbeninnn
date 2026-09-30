"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { STATIC_PRODUCT_STORAGE_PREFIX } from "@/lib/catalog";
import "./admin.css";

type ManagedProduct = {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number | null;
  image: string;
  images: string[];
  specifications: Record<string, string>;
  tag: string;
  stock: number;
  featured: boolean;
  active: boolean;
  staticCatalog?: boolean;
};

type ProductForm = {
  name: string;
  description: string;
  brand: string;
  category: string;
  price: string;
  oldPrice: string;
  images: string;
  specifications: string;
  tag: string;
  stock: string;
  featured: boolean;
  active: boolean;
};

const emptyForm: ProductForm = {
  name: "",
  description: "",
  brand: "",
  category: "Ordinateurs",
  price: "",
  oldPrice: "",
  images: "",
  specifications: "",
  tag: "",
  stock: "0",
  featured: false,
  active: true,
};

const formatPrice = (price: number) => `${price.toLocaleString("fr-FR")} F CFA`;
const plainSpecificationPrefix = "__line_";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<ManagedProduct[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);

  async function loadProducts() {
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Impossible de charger le catalogue.");
    setProducts(data as ManagedProduct[]);
  }

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => {
        if (response.ok) {
          setAuthenticated(true);
          return loadProducts().catch((loadError: Error) =>
            setError(loadError.message),
          );
        }
      })
      .catch(() => setError("Connexion au serveur impossible."))
      .finally(() => setCheckingSession(false));
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Connexion refusée.");
      setAuthenticated(true);
      setPassword("");
      await loadProducts();
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Connexion impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setProducts([]);
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEditing(product: ManagedProduct) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      price: String(product.price),
      oldPrice: product.oldPrice === null ? "" : String(product.oldPrice),
      images: product.images.join("\n"),
      specifications: Object.entries(product.specifications)
        .map(([key, value]) =>
          key.startsWith(plainSpecificationPrefix) ? value : `${key}: ${value}`,
        )
        .join("\n"),
      tag: product.tag,
      stock: String(product.stock),
      featured: product.featured,
      active: product.active,
    });
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.currentTarget.files ?? []);
    if (files.length === 0) return;

    const currentImages = form.images.split(/\r?\n/).filter(Boolean);
    if (currentImages.length + files.length > 3) {
      setError(
        "La galerie accepte 1 image principale et 2 images supplémentaires maximum.",
      );
      event.currentTarget.value = "";
      return;
    }

    setUploadingImages(true);
    setError("");
    try {
      for (const file of files) {
        const body = new FormData();
        body.append("image", file);
        const response = await fetch("/api/admin/uploads", {
          method: "POST",
          body,
        });
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Téléversement impossible.");
        setForm((current) => ({
          ...current,
          images: [
            ...current.images.split(/\r?\n/).filter(Boolean),
            data.url,
          ].join("\n"),
        }));
      }
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Téléversement impossible.",
      );
    } finally {
      setUploadingImages(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  }

  function removeImage(imageToRemove: string) {
    setForm((current) => ({
      ...current,
      images: current.images
        .split(/\r?\n/)
        .filter((image) => image !== imageToRemove)
        .join("\n"),
    }));
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    const images = form.images
      .split(/\r?\n/)
      .map((image) => image.trim())
      .filter(Boolean);
    if (images.length === 0 || images.length > 3) {
      setError(
        "Ajoute une image principale et jusqu’à 2 images supplémentaires.",
      );
      setBusy(false);
      return;
    }
    const specifications = Object.fromEntries(
      form.specifications.split(/\r?\n/).flatMap((line, index) => {
        const content = line.trim();
        if (!content) return [];
        const separator = content.indexOf(":");
        if (separator < 0) {
          return [[`${plainSpecificationPrefix}${index + 1}`, content]];
        }
        const key = content.slice(0, separator).trim();
        const value = content.slice(separator + 1).trim();
        return key && value ? [[key, value]] : [];
      }),
    );

    try {
      if (editingStaticProduct && editingId) {
        const response = await fetch(
          `/api/admin/products/${encodeURIComponent(editingId)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ specifications, images }),
          },
        );
        const data = await response.json();
        if (!response.ok)
          throw new Error(
            data.error || "Enregistrement des caractéristiques impossible.",
          );
        await loadProducts();
        setNotice("Caractéristiques mises à jour.");
        resetForm();
        return;
      }

      const response = await fetch(
        editingId
          ? `/api/admin/products/${encodeURIComponent(editingId)}`
          : "/api/admin/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
            stock: Number(form.stock),
            images,
            specifications,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Enregistrement impossible.");
      await loadProducts();
      setNotice(
        editingId ? "Produit modifié." : "Produit ajouté au catalogue.",
      );
      resetForm();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Enregistrement impossible.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(product: ManagedProduct) {
    if (!window.confirm(`Supprimer « ${product.name} » ?`)) return;
    setError("");
    try {
      const response = await fetch(
        `/api/admin/products/${encodeURIComponent(product.id)}`,
        { method: "DELETE" },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Suppression impossible.");
      if (product.staticCatalog) await loadProducts();
      else
        setProducts((current) =>
          current.filter((item) => item.id !== product.id),
        );
      if (editingId === product.id) resetForm();
      setNotice(
        product.staticCatalog
          ? "Caractéristiques supprimées."
          : "Produit supprimé.",
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Suppression impossible.",
      );
    }
  }

  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.brand} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const editingStaticProduct = Boolean(
    editingId?.startsWith(STATIC_PRODUCT_STORAGE_PREFIX),
  );

  if (checkingSession) {
    return (
      <div className="admin-loading">
        <span className="admin-spinner" />
        Préparation de votre espace
      </div>
    );
  }

  if (!authenticated) {
    return (
      <main className="admin-login-shell">
        <div className="admin-login-aside">
          <Link className="admin-wordmark" href="/">
            AMZATIC<span>.</span>
          </Link>
          <div className="admin-aside-copy">
            <span className="admin-eyebrow">ESPACE DE GESTION</span>
            <h1>
              Votre boutique,
              <br />
              sous contrôle.
            </h1>
            <p>
              Gérez le catalogue, les prix et les disponibilités depuis un
              espace unique.
            </p>
          </div>
          <span className="admin-aside-footer">AMZATIC BÉNIN · GODOMEY</span>
        </div>
        <section className="admin-login-panel">
          <form className="admin-login-form" onSubmit={handleLogin}>
            <div className="admin-lock-icon">
              <i className="fas fa-lock" />
            </div>
            <span className="admin-eyebrow">ACCÈS SÉCURISÉ</span>
            <h2>Connexion administrateur</h2>
            <p>
              Connectez-vous avec les identifiants définis dans votre
              environnement.
            </p>
            {error && (
              <div className="admin-alert admin-alert-error" role="alert">
                {error}
              </div>
            )}
            <label htmlFor="admin-username">Nom d’utilisateur</label>
            <input
              id="admin-username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <label htmlFor="admin-password">Mot de passe</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              className="admin-primary-button admin-login-button"
              type="submit"
              disabled={busy}
            >
              {busy ? "Connexion…" : "Ouvrir la session"}
              <i className="fas fa-arrow-right" />
            </button>
            <Link className="admin-back-link" href="/">
              ← Retour à la boutique
            </Link>
          </form>
        </section>
      </main>
    );
  }

  const activeCount = products.filter((product) => product.active).length;
  const featuredCount = products.filter((product) => product.featured).length;
  const stockCount = products.reduce(
    (total, product) => total + product.stock,
    0,
  );

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-wordmark" href="/">
          AMZATIC<span>.</span>
        </Link>
        <div className="admin-sidebar-label">GESTION</div>
        <a href="#catalogue" className="admin-side-link active">
          <i className="fas fa-boxes-stacked" />
          Catalogue
        </a>
        <a href="#fiche-produit" className="admin-side-link">
          <i className="fas fa-circle-plus" />
          Ajouter un produit
        </a>
        <div className="admin-sidebar-bottom">
          <span className="admin-online">
            <i /> Espace sécurisé
          </span>
          <button
            className="admin-logout-button"
            onClick={handleLogout}
            type="button"
          >
            <i className="fas fa-arrow-right-from-bracket" />
            Déconnexion
          </button>
          <Link className="admin-back-link" href="/">
            ← Voir la boutique
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-breadcrumb">AMZATIC / ADMINISTRATION</span>
            <h1>Catalogue produits</h1>
          </div>
          <div className="admin-user-chip">
            <span className="admin-avatar">A</span>
            <span>Administrateur</span>
            <i className="fas fa-chevron-down" />
          </div>
        </header>

        <div className="admin-content">
          {error && (
            <div className="admin-alert admin-alert-error" role="alert">
              {error}
            </div>
          )}
          {notice && (
            <div className="admin-alert admin-alert-success" role="status">
              {notice}
            </div>
          )}

          <section className="admin-metrics" aria-label="Résumé du catalogue">
            <div className="admin-metric">
              <span className="admin-metric-icon mint">
                <i className="fas fa-cubes-stacked" />
              </span>
              <div>
                <span>Produits enregistrés</span>
                <strong>{products.length}</strong>
              </div>
            </div>
            <div className="admin-metric">
              <span className="admin-metric-icon blue">
                <i className="fas fa-eye" />
              </span>
              <div>
                <span>En ligne</span>
                <strong>{activeCount}</strong>
              </div>
            </div>
            <div className="admin-metric">
              <span className="admin-metric-icon orange">
                <i className="fas fa-star" />
              </span>
              <div>
                <span>En vedette</span>
                <strong>{featuredCount}</strong>
              </div>
            </div>
            <div className="admin-metric">
              <span className="admin-metric-icon pink">
                <i className="fas fa-box" />
              </span>
              <div>
                <span>Unités en stock</span>
                <strong>{stockCount.toLocaleString("fr-FR")}</strong>
              </div>
            </div>
          </section>

          <section className="admin-form-section" id="fiche-produit">
            <div className="admin-section-heading">
              <div>
                <span className="admin-eyebrow">
                  {editingStaticProduct
                    ? "CARACTÉRISTIQUES"
                    : editingId
                      ? "MISE À JOUR"
                      : "NOUVELLE FICHE"}
                </span>
                <h2>
                  {editingStaticProduct
                    ? "Modifier les caractéristiques"
                    : editingId
                      ? "Modifier le produit"
                      : "Ajouter un produit"}
                </h2>
              </div>
              {!editingStaticProduct && (
                <span className="admin-required-note">
                  * Champs obligatoires
                </span>
              )}
            </div>
            <form className="admin-product-form" onSubmit={handleSave}>
              {editingStaticProduct ? (
                <div className="admin-form-grid">
                  <div className="admin-field wide">
                    <span className="admin-field-label">Produit</span>
                    <strong>{form.name}</strong>
                  </div>
                  <div className="admin-field wide">
                    <label htmlFor="product-specs">Caractéristiques</label>
                    <textarea
                      id="product-specs"
                      rows={5}
                      value={form.specifications}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          specifications: event.target.value,
                        })
                      }
                      placeholder={
                        "Processeur: Intel Core i5\nMémoire: 16 Go RAM"
                      }
                    />
                    <small>
                      Une caractéristique par ligne, au format « Nom : valeur ».
                    </small>
                  </div>
                  <div className="admin-field wide">
                    <span className="admin-field-label">Images du produit</span>
                    <label
                      className="admin-upload-control"
                      htmlFor="product-images"
                    >
                      <i className="fas fa-cloud-arrow-up" />
                      <strong>
                        {uploadingImages
                          ? "Téléversement…"
                          : "Ajouter jusqu’à 2 images"}
                      </strong>
                      <small>
                        JPEG, PNG ou WebP · 5 Mo maximum · 3 images au total
                      </small>
                    </label>
                    <input
                      ref={imageInputRef}
                      className="admin-file-input"
                      id="product-images"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      disabled={uploadingImages || busy}
                      onChange={handleImageUpload}
                    />
                    <div className="admin-image-previews">
                      {form.images
                        .split(/\r?\n/)
                        .filter(Boolean)
                        .map((image, index) => (
                          <div className="admin-image-preview" key={image}>
                            <img
                              src={image}
                              alt={`Image ${index + 1} du produit`}
                            />
                            {index === 0 && <span>Principale</span>}
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeImage(image)}
                                aria-label={`Retirer l’image ${index + 1}`}
                                title="Retirer l’image"
                              >
                                <i className="fas fa-xmark" />
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="admin-form-grid">
                  <div className="admin-field wide">
                    <label htmlFor="product-name">
                      Nom du produit <b>*</b>
                    </label>
                    <input
                      id="product-name"
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      required
                      maxLength={160}
                      placeholder="Ex. HP EliteBook 840 G8"
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="product-brand">Marque</label>
                    <input
                      id="product-brand"
                      value={form.brand}
                      onChange={(event) =>
                        setForm({ ...form, brand: event.target.value })
                      }
                      placeholder="HP, Dell, Lenovo…"
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="product-category">
                      Catégorie <b>*</b>
                    </label>
                    <select
                      id="product-category"
                      value={form.category}
                      onChange={(event) =>
                        setForm({ ...form, category: event.target.value })
                      }
                    >
                      <option>Ordinateurs</option>
                      <option>Accessoires</option>
                      <option>Imprimantes</option>
                      <option>Électroménager</option>
                      <option>Casques & Audio</option>
                      <option>Téléphones</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div className="admin-field">
                    <label htmlFor="product-price">
                      Prix de vente (F CFA) <b>*</b>
                    </label>
                    <input
                      id="product-price"
                      type="number"
                      min="0"
                      step="1"
                      value={form.price}
                      onChange={(event) =>
                        setForm({ ...form, price: event.target.value })
                      }
                      required
                      placeholder="250000"
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="product-old-price">
                      Ancien prix (F CFA)
                    </label>
                    <input
                      id="product-old-price"
                      type="number"
                      min="0"
                      step="1"
                      value={form.oldPrice}
                      onChange={(event) =>
                        setForm({ ...form, oldPrice: event.target.value })
                      }
                      placeholder="300000"
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="product-stock">Quantité en stock</label>
                    <input
                      id="product-stock"
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={(event) =>
                        setForm({ ...form, stock: event.target.value })
                      }
                    />
                  </div>
                  <div className="admin-field">
                    <label htmlFor="product-tag">Étiquette</label>
                    <input
                      id="product-tag"
                      value={form.tag}
                      onChange={(event) =>
                        setForm({ ...form, tag: event.target.value })
                      }
                      placeholder="Promotion, Nouveau…"
                    />
                  </div>
                  <div className="admin-field wide">
                    <label htmlFor="product-description">Description</label>
                    <textarea
                      id="product-description"
                      rows={3}
                      value={form.description}
                      onChange={(event) =>
                        setForm({ ...form, description: event.target.value })
                      }
                      placeholder="Décrivez le produit et ses points forts."
                    />
                  </div>
                  <div className="admin-field">
                    <span className="admin-field-label">
                      Images du produit <b>*</b>
                    </span>
                    <label
                      className="admin-upload-control"
                      htmlFor="product-images"
                    >
                      <i className="fas fa-cloud-arrow-up" />
                      <strong>
                        {uploadingImages
                          ? "Téléversement…"
                          : "Choisir des images"}
                      </strong>
                      <small>
                        JPEG, PNG ou WebP · 5 Mo maximum · 3 images au total
                      </small>
                    </label>
                    <input
                      ref={imageInputRef}
                      className="admin-file-input"
                      id="product-images"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      disabled={uploadingImages || busy}
                      onChange={handleImageUpload}
                    />
                    <div className="admin-image-previews">
                      {form.images
                        .split(/\r?\n/)
                        .filter(Boolean)
                        .map((image, index) => (
                          <div className="admin-image-preview" key={image}>
                            <img
                              src={image}
                              alt={`Image ${index + 1} du produit`}
                            />
                            {index === 0 && <span>Principale</span>}
                            {(!editingStaticProduct || index > 0) && (
                              <button
                                type="button"
                                onClick={() => removeImage(image)}
                                aria-label={`Retirer l’image ${index + 1}`}
                                title="Retirer l’image"
                              >
                                <i className="fas fa-xmark" />
                              </button>
                            )}
                          </div>
                        ))}
                    </div>
                    <small>
                      La première image est la photo principale. Les fichiers
                      sont envoyés sur le serveur.
                    </small>
                  </div>
                  <div className="admin-field">
                    <label htmlFor="product-specs">Caractéristiques</label>
                    <textarea
                      id="product-specs"
                      rows={4}
                      value={form.specifications}
                      onChange={(event) =>
                        setForm({ ...form, specifications: event.target.value })
                      }
                      placeholder={
                        "Processeur: Intel Core i5\nMémoire: 16 Go RAM"
                      }
                    />
                    <small>
                      Une caractéristique par ligne, au format « Nom : valeur ».
                    </small>
                  </div>
                </div>
              )}
              {!editingStaticProduct && (
                <div className="admin-form-options">
                  <label className="admin-check">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(event) =>
                        setForm({ ...form, active: event.target.checked })
                      }
                    />
                    <span>Afficher dans la boutique</span>
                  </label>
                  <label className="admin-check">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(event) =>
                        setForm({ ...form, featured: event.target.checked })
                      }
                    />
                    <span>Mettre en vedette</span>
                  </label>
                </div>
              )}
              <div className="admin-form-actions">
                {editingId && (
                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={resetForm}
                  >
                    Annuler
                  </button>
                )}
                <button
                  type="submit"
                  className="admin-primary-button"
                  disabled={busy || uploadingImages}
                >
                  {busy
                    ? "Enregistrement…"
                    : editingId
                      ? "Enregistrer les modifications"
                      : "Ajouter au catalogue"}
                  <i className={`fas ${editingId ? "fa-check" : "fa-plus"}`} />
                </button>
              </div>
            </form>
          </section>

          <section className="admin-catalog-section" id="catalogue">
            <div className="admin-catalog-heading">
              <div>
                <span className="admin-eyebrow">INVENTAIRE</span>
                <h2>
                  Produits du catalogue <span>{products.length}</span>
                </h2>
              </div>
              <label className="admin-search">
                <i className="fas fa-search" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Rechercher un produit…"
                />
              </label>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>PRODUIT</th>
                    <th>CATÉGORIE</th>
                    <th>PRIX</th>
                    <th>STOCK</th>
                    <th>STATUT</th>
                    <th>GESTION</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="admin-product-cell">
                          <img src={product.image} alt="" />
                          <div>
                            <strong>{product.name}</strong>
                            <span>
                              {product.brand || "Sans marque"}
                              {product.featured && <em>Vedette</em>}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>
                        <strong>{formatPrice(product.price)}</strong>
                        {product.oldPrice !== null && (
                          <del>{formatPrice(product.oldPrice)}</del>
                        )}
                      </td>
                      <td>{product.stock}</td>
                      <td>
                        <span
                          className={`admin-status ${product.active ? "published" : "draft"}`}
                        >
                          <i />
                          {product.active ? "En ligne" : "Masqué"}
                        </span>
                      </td>
                      <td>
                        <div className="admin-row-actions">
                          <button
                            type="button"
                            onClick={() => startEditing(product)}
                            aria-label={`Modifier ${product.name}`}
                            title="Modifier"
                          >
                            <i
                              className={`fas ${product.staticCatalog ? "fa-list-check" : "fa-pen"}`}
                            />
                          </button>
                          {!product.staticCatalog && (
                            <button
                              type="button"
                              onClick={() => handleDelete(product)}
                              aria-label={`Supprimer ${product.name}`}
                              title="Supprimer"
                            >
                              <i className="fas fa-trash" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {visibleProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="admin-empty-row">
                        {products.length
                          ? "Aucun résultat pour cette recherche."
                          : "Aucun produit ajouté pour le moment."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
          <footer className="admin-footer">
            AMZATIC BÉNIN <span>·</span> Administration du catalogue
          </footer>
        </div>
      </div>
    </main>
  );
}
