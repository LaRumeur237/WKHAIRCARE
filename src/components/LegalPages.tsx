import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Scale, Shield, ChevronDown, ChevronUp } from "lucide-react";

// ── Section accordéon ──────────────────────────────────────────────────────
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/3 transition-colors"
      >
        <span className="font-bold text-sm md:text-base uppercase tracking-wider text-white/90">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gold flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-white/55 text-sm leading-relaxed space-y-3 border-t border-white/8 pt-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Modal Mentions Légales ─────────────────────────────────────────────────
export const MentionsLegales = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-8 rounded-3xl border border-white/10 bg-[#0d1020] shadow-2xl overflow-hidden"
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
              <Scale className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">Mentions Légales</h2>
              <p className="text-xs text-white/35 uppercase tracking-wider">Conformément au droit camerounais</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 py-8 space-y-3">

          {/* Intro */}
          <div className="bg-gold/5 border border-gold/20 rounded-2xl px-5 py-4 mb-6">
            <p className="text-white/60 text-sm leading-relaxed">
              Conformément aux dispositions de la <strong className="text-gold">Loi n° 2010/012 du 21 décembre 2010</strong> relative à la cybersécurité et à la cybercriminalité au Cameroun, et aux textes réglementaires en vigueur, les informations suivantes sont portées à la connaissance des utilisateurs du présent site.
            </p>
          </div>

          <Section title="1. Éditeur du site">
            <p><strong className="text-white/80">Dénomination sociale :</strong> WK HAIR CARE</p>
            <p><strong className="text-white/80">Forme juridique :</strong> Entreprise individuelle / Salon de coiffure</p>
            <p><strong className="text-white/80">Siège social :</strong> Mimboman Opep, Yaoundé — République du Cameroun</p>
            <p><strong className="text-white/80">Téléphone :</strong> +237 695 75 22 35 / +237 679 23 44 80</p>
            <p><strong className="text-white/80">Email :</strong> contact@wkhaircare.com</p>
            <p><strong className="text-white/80">Développement :</strong> IMANI-TECH SOLUTIONS SARL, Cameroun</p>
          </Section>

          <Section title="2. Hébergement">
            <p>Le présent site est hébergé par un prestataire d'hébergement dont les coordonnées sont tenues à disposition sur simple demande adressée à <strong className="text-white/80">contact@wkhaircare.com</strong>.</p>
            <p>L'hébergeur est soumis aux obligations légales applicables en matière de conservation des données de connexion conformément à la réglementation camerounaise en vigueur.</p>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <p>L'ensemble du contenu de ce site (textes, images, logos, photographies, vidéos, illustrations) est la propriété exclusive de <strong className="text-white/80">WK HAIR CARE</strong> ou de ses partenaires, et est protégé par les dispositions de la <strong className="text-gold">Loi n° 2000/011 du 19 décembre 2000</strong> relative au droit d'auteur et aux droits voisins au Cameroun.</p>
            <p>Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, de l'un quelconque des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de WK HAIR CARE.</p>
          </Section>

          <Section title="4. Responsabilité">
            <p>WK HAIR CARE s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, WK HAIR CARE ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.</p>
            <p>WK HAIR CARE décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.</p>
            <p>Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de WK HAIR CARE.</p>
          </Section>

          <Section title="5. Droit applicable et juridiction compétente">
            <p>Le présent site est soumis au droit camerounais. En cas de litige, les tribunaux camerounais seront seuls compétents.</p>
            <p>Références légales applicables :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité</li>
              <li>Loi n° 2000/011 du 19 décembre 2000 relative au droit d'auteur et aux droits voisins</li>
              <li>Loi n° 2010/021 du 21 décembre 2010 régissant le commerce électronique au Cameroun</li>
              <li>Décret n° 2012/1638/PM du 14 juin 2012 fixant les règles applicables aux réseaux et services de communications électroniques</li>
            </ul>
          </Section>

          <Section title="6. Contactez-nous">
            <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :</p>
            <p>📧 <strong className="text-white/80">contact@wkhaircare.com</strong></p>
            <p>📞 <strong className="text-white/80">+237 695 75 22 35</strong></p>
            <p>📍 <strong className="text-white/80">Mimboman Opep, Yaoundé — Cameroun</strong></p>
          </Section>

          <p className="text-white/25 text-xs text-center pt-4">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Modal Politique de Confidentialité ────────────────────────────────────
export const PolitiqueConfidentialite = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-8 rounded-3xl border border-white/10 bg-[#0d1020] shadow-2xl overflow-hidden"
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-blue/15 flex items-center justify-center">
              <Shield className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">Politique de Confidentialité</h2>
              <p className="text-xs text-white/35 uppercase tracking-wider">Protection de vos données personnelles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 py-8 space-y-3">

          {/* Intro */}
          <div className="bg-neon-blue/5 border border-neon-blue/20 rounded-2xl px-5 py-4 mb-6">
            <p className="text-white/60 text-sm leading-relaxed">
              WK HAIR CARE accorde une importance capitale à la protection de vos données personnelles. La présente politique est établie conformément à la <strong className="text-neon-blue">Loi n° 2010/012 du 21 décembre 2010</strong> relative à la cybersécurité et à la cybercriminalité au Cameroun, ainsi qu'aux bonnes pratiques internationales en matière de protection des données.
            </p>
          </div>

          <Section title="1. Responsable du traitement">
            <p><strong className="text-white/80">WK HAIR CARE</strong>, représentée par son gérant, sise à Mimboman Opep, Yaoundé — Cameroun, est responsable du traitement de vos données personnelles collectées via ce site.</p>
            <p>Contact DPO (Délégué à la Protection des Données) : <strong className="text-white/80">contact@wkhaircare.com</strong></p>
          </Section>

          <Section title="2. Données collectées">
            <p>Dans le cadre de la prise de rendez-vous et de l'utilisation de notre site, nous sommes amenés à collecter les données suivantes :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white/70">Données d'identification :</strong> nom et prénom</li>
              <li><strong className="text-white/70">Coordonnées :</strong> numéro de téléphone</li>
              <li><strong className="text-white/70">Données de réservation :</strong> service souhaité, date et heure souhaitées</li>
              <li><strong className="text-white/70">Données de navigation :</strong> adresse IP, type de navigateur, pages visitées (données anonymisées)</li>
            </ul>
            <p>Nous ne collectons <strong className="text-white/80">aucune donnée bancaire</strong> directement sur ce site. Les paiements mobiles (Orange Money, MTN MoMo) sont traités par des opérateurs tiers soumis à leurs propres politiques de confidentialité.</p>
          </Section>

          <Section title="3. Finalités du traitement">
            <p>Vos données sont collectées et traitées pour les finalités suivantes :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gestion et confirmation de vos réservations</li>
              <li>Communication relative à votre rendez-vous (confirmation, rappels)</li>
              <li>Amélioration de nos services et de votre expérience client</li>
              <li>Respect de nos obligations légales et réglementaires</li>
              <li>Envoi d'informations commerciales (avec votre consentement préalable)</li>
            </ul>
          </Section>

          <Section title="4. Base légale du traitement">
            <p>Conformément à la législation camerounaise, le traitement de vos données repose sur :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white/70">L'exécution d'un contrat :</strong> traitement nécessaire à la gestion de vos réservations</li>
              <li><strong className="text-white/70">Le consentement :</strong> pour les communications marketing</li>
              <li><strong className="text-white/70">L'intérêt légitime :</strong> amélioration de nos services</li>
              <li><strong className="text-white/70">L'obligation légale :</strong> conservation des données requises par la loi</li>
            </ul>
          </Section>

          <Section title="5. Durée de conservation">
            <p>Vos données personnelles sont conservées pour les durées suivantes :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white/70">Données de réservation :</strong> 3 ans à compter de la dernière prestation</li>
              <li><strong className="text-white/70">Données de navigation :</strong> 13 mois maximum</li>
              <li><strong className="text-white/70">Données comptables :</strong> 10 ans conformément au droit commercial camerounais</li>
            </ul>
            <p>À l'expiration de ces délais, vos données sont supprimées ou anonymisées de manière sécurisée.</p>
          </Section>

          <Section title="6. Partage des données">
            <p>Vos données personnelles ne sont <strong className="text-white/80">jamais vendues ni cédées</strong> à des tiers à des fins commerciales.</p>
            <p>Elles peuvent être partagées uniquement avec :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Les prestataires techniques nécessaires au fonctionnement du site (hébergeur, développeur)</li>
              <li>Les opérateurs de paiement mobile (Orange Cameroun, MTN Cameroun) dans le cadre du paiement de l'acompte</li>
              <li>Les autorités compétentes sur réquisition légale</li>
            </ul>
          </Section>

          <Section title="7. Vos droits">
            <p>Conformément à la loi camerounaise et aux principes internationaux de protection des données, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white/70">Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li><strong className="text-white/70">Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong className="text-white/70">Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong className="text-white/70">Droit d'opposition :</strong> vous opposer à certains traitements</li>
              <li><strong className="text-white/70">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong className="text-white/70">Droit de retirer votre consentement</strong> à tout moment</li>
            </ul>
            <p>Pour exercer ces droits, contactez-nous à : <strong className="text-white/80">contact@wkhaircare.com</strong></p>
            <p>Nous nous engageons à répondre dans un délai de <strong className="text-white/80">30 jours ouvrables</strong>.</p>
          </Section>

          <Section title="8. Sécurité des données">
            <p>WK HAIR CARE met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre toute perte, destruction, altération, accès ou divulgation non autorisés, conformément à l'article 74 de la <strong className="text-gold">Loi n° 2010/012</strong>.</p>
            <p>Ces mesures incluent notamment : chiffrement des données, accès restreint, sauvegardes régulières et formation du personnel.</p>
          </Section>

          <Section title="9. Cookies et traceurs">
            <p>Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de profilage n'est utilisé sans votre consentement explicite.</p>
            <p>Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies. Cette action peut toutefois affecter le bon fonctionnement de certaines fonctionnalités du site.</p>
          </Section>

          <Section title="10. Modifications de la politique">
            <p>WK HAIR CARE se réserve le droit de modifier la présente politique à tout moment. Les utilisateurs seront informés des modifications significatives via une notice affichée sur le site.</p>
            <p>La version en vigueur est toujours accessible depuis le footer du site.</p>
          </Section>

          <Section title="11. Contact & réclamations">
            <p>Pour toute question, exercice de droits ou réclamation relative à la protection de vos données :</p>
            <p>📧 <strong className="text-white/80">contact@wkhaircare.com</strong></p>
            <p>📞 <strong className="text-white/80">+237 695 75 22 35</strong></p>
            <p>📍 <strong className="text-white/80">Mimboman Opep, Yaoundé — Cameroun</strong></p>
            <p className="mt-3 text-white/40 text-xs">En cas de litige non résolu, vous pouvez saisir l'<strong className="text-white/60">Agence Nationale des Technologies de l'Information et de la Communication (ANTIC)</strong> du Cameroun, autorité compétente en matière de cybersécurité et de protection des données.</p>
          </Section>

          <p className="text-white/25 text-xs text-center pt-4">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
