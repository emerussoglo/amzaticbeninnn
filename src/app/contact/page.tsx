"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire (API, Email, etc.)
    alert(`Merci ${formData.name}, votre message a bien été transmis à ESPANA DEAL !`);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page-container">
      {/* En-tête de la page */}
      <div className="featured-hero">
        <span className="featured-subtitle">Contactez-nous</span>
        <h1>Une question ? Nous sommes là pour vous</h1>
        <p>Notre équipe technique et commerciale vous répond dans les plus brefs délais pour toute demande d'information, conseil ou SAV informatique.</p>
      </div>

      <div className="contact-content-grid">
        {/* Formulaire de contact */}
        {/* <div className="contact-form-card">
          <h2>Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nom@exemple.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Objet de votre message (ex: Devis, Disponibilité PC)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Votre message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Comment pouvons-nous vous aider ?"
              ></textarea>
            </div>

            <button type="submit" className="btn-send-message">
              Envoyer le message
            </button>
          </form>
        </div> */}

        {/* Infos de contact réelles */}
        <div className="contact-info-column">
          <div className="info-status-card">
            
            {/* Téléphone */}
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="info-text">
                <h3>Téléphone</h3>
                <a href="tel:+2290154627062" className="info-link">
                  +229 01 54 62 70 62
                </a>
                <p>Service client disponible pour tous vos achats informatiques.</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="info-item">
              <div className="info-icon" style={{ backgroundColor: "#e8f7ee" }}>
                <i className="fab fa-whatsapp" style={{ color: "#25D366" }}></i>
              </div>
              <div className="info-text">
                <h3>WhatsApp Direct</h3>
                <a href="https://wa.me/2290167921796" target="_blank" rel="noopener noreferrer" className="info-link">
                  +229 01 67 92 17 96
                </a>
                <p>Des conseillers en ligne pour des réponses instantanées.</p>
              </div>
            </div>

            {/* E-mail */}
            <div className="info-item">
              <div className="info-icon">
                <i className="far fa-envelope"></i>
              </div>
              <div className="info-text">
                <h3>Support E-mail</h3>
                <a href="mailto:amzaticofficiel@gmail.com" className="info-link">
                  amzaticofficiel@gmail.com
                </a>
                <p>Idéal pour vos demandes de devis et factures pro.</p>
              </div>
            </div>

            {/* Localisation Complète */}
            <div className="info-item">
              <div className="info-icon" style={{ backgroundColor: "#fdf2f2" }}>
                <i className="fas fa-map-marker-alt" style={{ color: "#e74c3c" }}></i>
              </div>
              <div className="info-text">
                <h3>Notre Boutique / Siège</h3>
                <p className="info-address" style={{ color: "#1c1c1e", fontWeight: "500" }}>
                  Début échangeur Godomey à droite, Abomey-Calavi, Bénin
                </p>
              </div>
            </div>

            {/* Horaires */}
            <div className="info-item">
              <div className="info-icon">
                <i className="far fa-clock"></i>
              </div>
              <div className="info-text">
                <h3>Horaires d'ouverture</h3>
                <p>Lundi - Vendredi : 8h00 - 19h00</p>
                <p>Samedi : 9h00 - 17h00</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}