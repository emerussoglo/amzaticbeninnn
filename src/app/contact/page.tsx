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
    alert(
      `Merci ${formData.name}, votre message a bien été transmis à AMZATIC !`,
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page-container">
      {/* En-tête de la page */}
      <div className="featured-hero">
        <span className="featured-subtitle">CONTACTEZ-NOUS</span>
        <h1>Une question ? Nous sommes là pour vous</h1>
      </div>

      {/* Grille des 4 Cartes d'information (Style Maquette) */}
      <div className="contact-cards-grid">
        {/* Carte 1 : Appelez-nous */}
        <div className="contact-card">
          <div className="card-icon icon-phone">
            <i className="fas fa-phone-alt"></i>
          </div>
          <h3>Appelez-nous</h3>
          <p className="card-subtitle">Lun–Sam, 8h00 – 19h00</p>
          <p className="card-value">+229 01 67 92 17 96</p>
          <a href="tel:+2290167921796" className="card-action-link">
            Appeler maintenant <i className="fas fa-chevron-right"></i>
          </a>
        </div>

        {/* Carte 2 : Support / E-mail */}
        <div className="contact-card">
          <div className="card-icon icon-email">
            <i className="far fa-envelope"></i>
          </div>
          <h3>Support E-mail</h3>
          <p className="card-subtitle">Devis & Factures Pro</p>
          <p className="card-value">amzaticofficiel@gmail.com</p>
          <a
            href="mailto:amzaticofficiel@gmail.com"
            className="card-action-link"
          >
            Écrire un message <i className="fas fa-chevron-right"></i>
          </a>
        </div>

        {/* Carte 3 : WhatsApp */}
        <div className="contact-card">
          <div className="card-icon icon-whatsapp">
            <i className="fab fa-whatsapp"></i>
          </div>
          <h3>WhatsApp</h3>
          <p className="card-subtitle">Chat en direct avec notre équipe</p>
          <p className="card-value">+229 01 67 92 17 96</p>
          <a
            href="https://wa.me/2290167921796"
            target="_blank"
            rel="noopener noreferrer"
            className="card-action-link"
          >
            Ouvrir WhatsApp <i className="fas fa-chevron-right"></i>
          </a>
        </div>

        {/* Carte 4 : Visitez-nous */}
        <div className="contact-card">
          <div className="card-icon icon-location">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <h3>Visitez-nous</h3>
          <p className="card-subtitle">Début échangeur Godomey à droite</p>
          <p className="card-value">Abomey-Calavi, Bénin</p>
          <a
            href="https://maps.app.goo.gl/CFwWkJr2m3TYJsni6"
            target="_blank"
            rel="noopener noreferrer"
            className="card-action-link"
          >
            Voir sur la carte <i className="fas fa-chevron-right"></i>
          </a>
        </div>
      </div>

      {/* Section de Localisation / Carte Interactive */}
      <div className="contact-map-section">
        <div className="map-card-wrapper">
          <div className="map-header">
            <div className="map-title-info">
              <i className="fas fa-map-marked-alt"></i>
              <div>
                <h3>Notre Localisation au Bénin</h3>
                <p>Début échangeur Godomey à droite, Abomey-Calavi</p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/CFwWkJr2m3TYJsni6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-map-directions"
            >
              <i className="fas fa-directions"></i> Itinéraire
            </a>
          </div>

          <div className="map-responsive-container">
            <iframe
              title="Localisation AMZATIC"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.268153073998!2d2.3168!3d6.3654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjEnNTUuNCJOIDInMTknMDAuOCJF!5e0!3m2!1sfr!2sbj!4v1650000000000!5m2!1sfr!2sbj"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Formulaire de Contact */}
      <div className="contact-form-wrapper">
        <div className="contact-form-card">
          <h2>Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
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
        </div>
      </div>
    </div>
  );
}