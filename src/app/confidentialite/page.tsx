import type { Metadata } from "next";
import LegalLayout, { LegalNotice } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité | AMZATIC BÉNIN",
  description:
    "Informations sur les données personnelles et le fonctionnement du site AMZATIC BÉNIN.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      summary="Quelles informations sont utilisées lorsque vous consultez la boutique, préparez un panier ou contactez AMZATIC."
    >
      <h2>1. Responsable et contact</h2>
      <p>
        Le responsable du traitement est AMZATIC BÉNIN, joignable à
        amzaticofficiel@gmail.com ou au +229 01 67 92 17 96. Son adresse
        commerciale indiquée sur le site est : début de l’échangeur de Godomey à
        droite, Abomey-Calavi, Bénin.
      </p>

      <h2>2. Informations concernées</h2>
      <ul>
        <li>
          <strong>Panier :</strong> les articles et quantités sont conservés
          dans le stockage local du navigateur afin de retrouver le panier sur
          cet appareil. Le site ne reçoit pas ces données tant que vous ne
          transmettez pas une demande.
        </li>
        <li>
          <strong>Demande de commande :</strong> si vous choisissez de
          poursuivre par WhatsApp, le message peut inclure le nom, le téléphone,
          la ville, l’adresse, les articles demandés et le montant indicatif que
          vous avez saisis. Vous choisissez de l’envoyer à AMZATIC depuis
          WhatsApp.
        </li>
        <li>
          <strong>Formulaire de contact :</strong> dans sa version actuelle, le
          formulaire affiche une confirmation dans le navigateur et ne transmet
          ni n’enregistre son contenu sur le serveur du site.
        </li>
        <li>
          <strong>Session administrateur :</strong> l’espace de gestion utilise
          un cookie HttpOnly de session, limité à 12 heures. Il ne concerne pas
          les visiteurs de la boutique.
        </li>
        <li>
          <strong>Données techniques :</strong> le fournisseur d’hébergement
          peut traiter des journaux techniques nécessaires à la sécurité et au
          fonctionnement du site, selon ses propres modalités.
        </li>
      </ul>

      <h2>3. Utilisation et stockage</h2>
      <p>
        Les informations envoyées par WhatsApp servent à répondre à la demande,
        confirmer la disponibilité, organiser une vente et assurer le suivi
        client. Leur conservation dans WhatsApp et sur les appareils des
        interlocuteurs dépend également du fonctionnement et de la politique de
        ce service.
      </p>
      <p>
        Le catalogue et les caractéristiques des produits gérés par
        l’administrateur sont stockés dans la base Turso. Dans l’implémentation
        actuelle, cette base ne reçoit pas les coordonnées client ni les données
        de paiement.
      </p>
      <p>
        Le panier reste dans le navigateur jusqu’à sa suppression par
        l’utilisateur ou à l’effacement des données de navigation. Le cookie
        d’administration expire au plus tard après 12 heures ou à la
        déconnexion.
      </p>

      <h2>4. Partage et services externes</h2>
      <p>
        Une demande envoyée par WhatsApp est traitée par WhatsApp/Meta, selon
        les conditions de ce service. Les liens vers les réseaux sociaux ou vers
        une carte ouvrent des services tiers soumis à leurs propres règles.
        AMZATIC ne vend pas les données personnelles des visiteurs.
      </p>

      <h2>5. Vos choix et vos droits</h2>
      <p>
        Vous pouvez effacer le panier depuis la boutique ou supprimer les
        données du site dans les réglages de votre navigateur. Pour demander
        l’accès, la rectification ou la suppression d’informations que vous avez
        transmises à AMZATIC, écrivez à amzaticofficiel@gmail.com ou appelez le
        +229 01 67 92 17 96. La demande sera traitée dans le cadre des règles
        applicables.
      </p>

      <h2>6. Sécurité</h2>
      <p>
        L’accès administrateur est protégé par des identifiants conservés côté
        serveur et une session sécurisée. Ne transmettez jamais vos mots de
        passe ni les codes de validation d’un moyen de paiement par message.
      </p>

      <h2>7. Évolution de cette politique</h2>
      <p>
        Cette politique pourra être mise à jour si le site ajoute un traitement
        de demandes, des outils de mesure d’audience, un paiement en ligne ou
        d’autres fonctionnalités. La date de mise à jour affichée en haut de
        page indique la version consultée.
      </p>

      <LegalNotice>
        Si de nouveaux outils sont ajoutés, préciser ici le fournisseur
        d’hébergement et tout prestataire qui recevrait des données de
        visiteurs.
      </LegalNotice>
    </LegalLayout>
  );
}
