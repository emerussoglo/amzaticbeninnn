import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { LegalNotice } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales | AMZATIC BÉNIN",
  description:
    "Éditeur, contact, hébergement et propriété intellectuelle du site AMZATIC BÉNIN.",
};

export default function LegalNoticePage() {
  return (
    <LegalLayout
      title="Mentions légales"
      summary="Les informations relatives à l’éditeur et à l’utilisation du site AMZATIC BÉNIN."
    >
      <h2>Éditeur du site</h2>
      <p>
        <strong>Nom commercial :</strong> AMZATIC BÉNIN
      </p>
      <p>
        <strong>Adresse commerciale :</strong> début de l’échangeur de Godomey à
        droite, Abomey-Calavi, Bénin.
      </p>
      <p>
        <strong>Téléphone :</strong>{" "}
        <a href="tel:+2290167921796">+229 01 67 92 17 96</a>
      </p>
      <p>
        <strong>Courriel :</strong>{" "}
        <a href="mailto:amzaticofficiel@gmail.com">amzaticofficiel@gmail.com</a>
      </p>

      <h2>Identification juridique</h2>
      <p>
        La dénomination sociale complète, la forme juridique, le numéro RCCM,
        l’identifiant fiscal (IFU) et le nom du responsable de publication ne
        figurent pas dans les informations fournies pour ce site. Ils doivent
        être ajoutés et vérifiés par l’exploitant avant la mise en production.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le nom légal, l’adresse et les coordonnées de l’hébergeur doivent être
        complétés par l’exploitant en fonction du fournisseur et de l’offre
        réellement utilisés pour publier le site. Les clés d’accès à la base
        Turso sont conservées côté serveur et ne sont pas destinées à être
        publiées sur cette page.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, éléments graphiques et autres contenus propres au site ne
        peuvent être reproduits ou réutilisés sans autorisation de leur
        titulaire, sous réserve des exceptions prévues par les règles
        applicables. Les marques et logos de fabricants affichés sur la boutique
        appartiennent à leurs titulaires respectifs et sont présentés à titre
        d’identification des produits.
      </p>

      <h2>Liens et disponibilité</h2>
      <p>
        Le site peut contenir des liens vers des services externes. AMZATIC ne
        contrôle pas les contenus ni les politiques de confidentialité de ces
        services. L’éditeur s’efforce d’assurer l’accès au site, sans garantir
        une disponibilité continue en cas de maintenance ou d’incident
        technique.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Pour comprendre le fonctionnement du panier, des demandes WhatsApp et de
        l’espace administrateur, consultez la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>. Pour
        toute question concernant le site, utilisez les coordonnées indiquées
        plus haut.
      </p>

      <LegalNotice>
        Informations à compléter avant publication : identité légale de
        l’exploitant, responsable de publication et coordonnées vérifiées de
        l’hébergeur.
      </LegalNotice>
    </LegalLayout>
  );
}
