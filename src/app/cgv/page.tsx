import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { LegalNotice } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions générales de vente | AMZATIC BÉNIN",
  description:
    "Conditions de consultation, commande, paiement, livraison et garantie des produits AMZATIC BÉNIN.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Conditions générales de vente"
      summary="Les règles applicables aux demandes de prix et aux commandes passées auprès d’AMZATIC BÉNIN."
    >
      <h2>1. Vendeur et champ d’application</h2>
      <p>
        Les présentes conditions encadrent les demandes d’achat de produits
        présentés sur le site AMZATIC BÉNIN. Le vendeur est joignable au début
        de l’échangeur de Godomey, à droite, à Abomey-Calavi, ainsi que par
        téléphone au +229 01 67 92 17 96 et par courriel à
        amzaticofficiel@gmail.com.
      </p>
      <p>
        Une commande n’est considérée comme acceptée qu’après confirmation
        expresse de la disponibilité, du prix total et des modalités par
        AMZATIC.
      </p>

      <h2>2. Produits, prix et disponibilité</h2>
      <p>
        Les caractéristiques essentielles, photographies, prix et disponibilités
        sont indiqués avec le produit lorsqu’ils sont connus. Les images sont
        illustratives ; de légères différences de présentation peuvent exister.
        Le vendeur confirme la configuration, l’état, les accessoires inclus et
        la garantie applicable avant validation de la commande.
      </p>
      <p>
        Les prix sont affichés en francs CFA (F CFA). Un ancien prix ou une
        étiquette promotionnelle n’est valable que pendant la période et dans
        les conditions annoncées. En cas d’erreur manifeste, le vendeur contacte
        le client avant toute confirmation.
      </p>

      <h2>3. Demande et confirmation de commande</h2>
      <p>
        Le client peut composer un panier sur le site et transmettre sa demande
        à AMZATIC par WhatsApp. Cette transmission constitue une demande de
        commande, pas une confirmation automatique de stock ni un paiement.
      </p>
      <p>
        Avant l’accord final, le vendeur confirme au client le récapitulatif des
        articles, les prix, les éventuels frais et délais de livraison ainsi que
        les modalités de paiement. Le client vérifie ces éléments et confirme
        son accord par écrit ou selon le moyen convenu avec le vendeur.
      </p>

      <h2>4. Paiement</h2>
      <p>
        Le moyen de paiement et le moment du règlement sont convenus lors de la
        confirmation de commande. Les moyens disponibles sont confirmés par le
        vendeur au moment de l’achat. Le client ne doit communiquer ses codes
        secrets, mots de passe ou codes de validation à personne.
      </p>

      <h2>5. Livraison et retrait</h2>
      <p>
        La zone, le délai, le coût éventuel et le mode de livraison ou de
        retrait sont convenus avec le client avant la confirmation. Le client
        fournit des coordonnées exactes et reste joignable. Tout empêchement ou
        changement d’adresse doit être signalé rapidement au vendeur.
      </p>

      <h2>6. Vérification, réclamation et garantie</h2>
      <p>
        À la réception, le client est invité à vérifier l’article et ses
        accessoires. Toute anomalie apparente ou erreur de référence doit être
        signalée sans délai à AMZATIC au +229 01 67 92 17 96 ou à
        amzaticofficiel@gmail.com, en joignant si possible le numéro de commande
        et des éléments utiles.
      </p>
      <p>
        La durée et le périmètre de toute garantie commerciale sont ceux
        expressément confirmés pour le produit concerné. Les garanties et droits
        impératifs prévus par les règles applicables demeurent réservés.
      </p>
      <p>
        Les modalités de retour, d’échange ou de remboursement sont examinées au
        cas par cas au regard de l’état du produit, des engagements convenus et
        des règles applicables. Le client doit contacter le vendeur avant de
        retourner un article.
      </p>

      <h2>7. Responsabilité et force majeure</h2>
      <p>
        AMZATIC s’efforce de maintenir le site disponible et les informations à
        jour. Une interruption technique, une indisponibilité d’un fournisseur
        ou un événement échappant raisonnablement au contrôle du vendeur peut
        retarder le traitement d’une demande. Cela ne limite pas les droits que
        les règles applicables reconnaissent au client.
      </p>

      <h2>8. Données personnelles et droit applicable</h2>
      <p>
        Les informations personnelles échangées pour une commande sont utilisées
        pour traiter la demande et organiser le suivi. Les modalités de
        traitement sont détaillées dans la{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
      <p>
        Les présentes conditions sont soumises aux règles applicables en
        République du Bénin. En cas de difficulté, le client est invité à
        contacter le vendeur afin de rechercher une solution amiable, sans
        renoncer aux recours prévus par la loi.
      </p>

      <LegalNotice>
        Avant publication définitive, le vendeur doit compléter sa forme
        juridique, ses identifiants RCCM/IFU et préciser ses politiques de
        garantie, retour et livraison.
      </LegalNotice>
    </LegalLayout>
  );
}
