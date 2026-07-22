"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES_DATA = [
  {
    id: 1,
    title: "Ordinateurs de Performance : Portables & Moniteurs",
    subtitle: "Productivité & Puissance",
    description: "Équipez votre espace de travail ou votre setup avec le meilleur de l'informatique. Des PC configurés pour durer, avec SERVICE APRÈS-VENTE ASSURÉ.",
    image: "/img/bann2.jpg",
    btnText: "En savoir plus",
    link: "/?cat=ordinateurs",
    theme: "dark" // "dark" pour texte blanc sur fond sombre, "light" pour fond clair
  },
  {
    id: 2,
    title: "Imprimantes Professionnelles : Des impressions nettes",
    subtitle: "Équipements Pro",
    description: "Découvrez nos imprimantes laser et jet d'encre multifonctions idéales pour vos flux de travail et votre entreprise au Bénin.",
    image: "/img/img1.jpeg",
    btnText: "Voir la sélection",
    link: "/?cat=imprimantes",
    theme: "dark"
  },
  { 
    id: 3,
    title: "Électroménager Confort : TV, Climatiseurs & Cuisine",
    subtitle: "Maison & High-Tech",
    description: "Smart TV de 32 à 75\"+, climatiseurs puissants et équipements complets pour moderniser votre quotidien.",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1400&auto=format&fit=crop&q=80",
    btnText: "Découvrir",
    link: "/?cat=electromenager",
    theme: "dark"
  },
  {
    id: 4,
    title: "Accessoires & Périphériques High-Tech",
    subtitle: "Incontournables",
    description: "Claviers, souris, chargeurs universels et batteries de rechange de haute qualité.",
    image: "/img/bann3.jpg",
    btnText: "Acheter maintenant",
    link: "/?cat=accessoires",
    theme: "dark"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play (Timer 5 secondes)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES_DATA.length);
  };

  return (
    <section className="hero-section-single">
      <div className="hero-carousel-container">
        {SLIDES_DATA.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`hero-slide ${index === currentSlide ? "slide-active" : ""}`}
          >
            {/* Image de fond */}
            <img src={slide.image} alt={slide.title} className="slide-bg-img" />
            
            {/* Overlay d'assombrissement */}
            <div className="slide-overlay"></div>

            {/* Contenu principal */}
            <div className="slide-content-wrapper">
              <div className="slide-content">
                <span className="slide-tag">{slide.subtitle}</span>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-desc">{slide.description}</p>
                <Link href={slide.link} className="btn-hero-action">
                  {slide.btnText}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Flèches de navigation (Précédent / Suivant) */}
        <button 
          type="button" 
          className="carousel-arrow arrow-prev" 
          onClick={handlePrev} 
          aria-label="Diapositive précédente"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <button 
          type="button" 
          className="carousel-arrow arrow-next" 
          onClick={handleNext} 
          aria-label="Diapositive suivante"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Indicateurs de progression sous forme de barres horizontales */}
        <div className="slider-indicators">
          {SLIDES_DATA.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`indicator-line ${index === currentSlide ? "indicator-active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
            >
              <span className="line-progress"></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}