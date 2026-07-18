"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 

// 1. ADAPTATION DU SLIDER AVEC LES QUATRE GRANDES RUBRIQUES
const SLIDES_DATA = [
  {
    id: 1,
    title: "Ordinateurs de Performance : Portables & Moniteurs",
    subtitle: "Productivité & Puissance",
    description: "Équipez votre espace de travail ou votre setup avec le meilleur de l'informatique. Des PC configurés pour durer, avec SERVICE APRÈS-VENTE ASSURÉ.",
    image: "/img/img1.jpeg",
    btnText: "Voir les Ordinateurs",
    link: "/?cat=ordinateurs"
  },
  {
    id: 2,
    title: "Imprimantes Professionnelles : Des impressions nettes",
    subtitle: "Équipements Pro",
    description: "Découvrez nos imprimantes laser et jet d'encre multifonctions idéales pour vos flux de travail et votre entreprise au Bénin.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=1000&auto=format&fit=crop&q=80",
    btnText: "Voir les Imprimantes",
    link: "/?cat=imprimantes"
  },
  { 
    id: 3,
    title: "Électroménager Confort : TV, Climatiseurs & Cuisine",
    subtitle: "Maison & High-Tech",
    description: "Smart TV de 32 à 75\"+, climatiseurs puissants de 1 à 2 CV et équipements complets pour moderniser votre cuisine quotidienne.",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1000&auto=format&fit=crop&q=80",
    btnText: "Découvrir l'Électroménager",
    link: "/?cat=electromenager"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Défilement automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section-container">
      
      {/* COMPOSANT DE GAUCHE : LE SLIDER DYNAMIQUE */}
      <div className="hero-slider-left">
        {SLIDES_DATA.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "slide-active" : ""}`}
          >
            <img src={slide.image} alt={slide.title} className="slide-bg-img" />
            <div className="slide-overlay"></div>

            <div className="slide-content">
              <span className="slide-tag">{slide.subtitle}</span>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-desc">{slide.description}</p>
              <Link href={slide.link} className="btn-hero-action">
                {slide.btnText}
              </Link>
            </div>
          </div>
        ))}

        <div className="slider-dots">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`dot-indicator ${index === currentSlide ? "dot-active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* COMPOSANT DE DROITE : LES DEUX ENCARTS STATIQUES */}
      <div className="hero-banners-right">
  
        {/* Encart Haut - Ordinateurs de bureau */}
        <div className="right-banner-card text-light">
          <img 
            src="/img/img6.jpg" 
            alt="Ordinateurs de bureau" 
            className="banner-bg-img" 
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag text-red">Pro & Bureautique</span>
            <h3>PC de Bureau & Écrans</h3>
            <p>Optimisez votre espace de travail avec des PC performants et durables.</p>
            <Link href="/?cat=ordinateurs" className="btn-banner-small">
              Découvrir
            </Link>
          </div>
        </div>

        {/* Encart Bas - Rubrique Accessoires globaux */}
        <div className="right-banner-card text-light">
          <img 
            src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80" 
            alt="Accessoires informatiques complets" 
            className="banner-bg-img" 
          />
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-tag text-green">Composants & Matériel</span>
            <h3>Tout genre d'Accessoires</h3>
            <p>Chargeurs, batteries de rechange, claviers, souris et câbles essentiels.</p>
            <Link href="/?cat=accessoires" className="btn-banner-small">
              Acheter
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}