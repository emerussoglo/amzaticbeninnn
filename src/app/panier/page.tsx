"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  // État pour afficher/masquer la pop-up du formulaire
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // États pour les informations du client
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  // Calcul du prix total global
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Construction de la liste des produits pour le message
    const itemsListText = cart
      .map((item) => `- ${item.name} (Qté: ${item.quantity}) : ${(item.price * item.quantity).toLocaleString()} FCFA`)
      .join("\n");

    // 2. Création du message WhatsApp personnalisé
    const whatsappMessage = `*NOUVELLE COMMANDE -   AMZATIC BENIN *\n\n` +
      `*Client :* ${customerInfo.name}\n` +
      `*Téléphone :* ${customerInfo.phone}\n` +
      `*Ville :* ${customerInfo.city}\n` +
      `*Adresse :* ${customerInfo.address}\n\n` +
      `*Détails des articles :*\n${itemsListText}\n\n` +
      `*TOTAL COMMANDE :* ${totalPrice.toLocaleString()} FCFA\n` +
      `*Livraison :* Gratuite`;

    // 3. Encodage du message pour l'URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "2290167921796";
    
    // 4. Redirection vers WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    
    // Fermer le formulaire
    setIsModalOpen(false);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty-container">
        <i className="fas fa-shopping-bag empty-icon"></i>
        <h2>Votre panier est vide</h2>
        <p>Il semblerait que vous n'avez pas encore ajouté de produits.</p>
        <Link href="/" className="btn-back-home">
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h1 className="page-title">Mon Panier ({cart.length})</h1>
      
      <div className="cart-content-wrapper">
        
        {/* Colonne de Gauche : Liste des produits */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item-card">
              <div className="cart-item-img-wrapper">
                <img src={item.image} alt={item.name} className="cart-item-img" />
              </div>
              
              <div className="cart-item-details">
                <span className="cart-item-cat">{item.category}</span>
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-unit-price">
                  Prix unitaire : {item.price.toLocaleString()} FCFA
                </p>
              </div>

              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} type="button">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} type="button">+</button>
              </div>

              <div className="cart-item-actions">
                <p className="cart-item-subtotal">{(item.price * item.quantity).toLocaleString()} FCFA</p>
                <button onClick={() => removeFromCart(item.id)} className="btn-remove-item" type="button">
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Colonne de Droite : Résumé */}
        <div className="cart-summary-card">
          <h3>Résumé de la commande</h3>
          <div className="summary-row">
            <span>Sous-total</span>
            <span>{totalPrice.toLocaleString()} FCFA</span>
          </div>
          <div className="summary-row">
            <span>Livraison</span>
            <span className="free-shipping">Gratuite</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>{totalPrice.toLocaleString()} FCFA</span>
          </div>
          
          {/* Ouvre la pop-up au clic */}
          <button 
            className="btn-checkout" 
            onClick={() => setIsModalOpen(true)}
            type="button"
          >
            Commander
          </button>
        </div>
      </div>

      {/* Pop-up / Formulaire Modal de Commande */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Détails de la livraison</h2>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleOrderSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="modal-name">Nom et Prénom</label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  required
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Jean Koffi"
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-phone">Téléphone</label>
                <input
                  type="tel"
                  id="modal-phone"
                  name="phone"
                  required
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Ex: +229 01 XX XX XX XX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-city">Ville</label>
                <input
                  type="text"
                  id="modal-city"
                  name="city"
                  required
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  placeholder="Ex: Cotonou, Calavi..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-address">Adresse précise</label>
                <input
                  type="text"
                  id="modal-address"
                  name="address"
                  required
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="Ex: Calavi, zogbadjè"
                />
              </div>

              <button type="submit" className="btn-submit-order">
                Valider et envoyer sur WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}