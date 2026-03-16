import React, { useState, useContext } from "react";
import { usePageTransition } from "./PageTransition";
import { motion, AnimatePresence } from "motion/react";
import {
  Scissors, User, Sparkles, Footprints, Hand, Heart,
  X, ChevronRight, CalendarCheck, Check,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// ── Données détaillées par service ────────────────────────────────────────
const services = [
  {
    title: "Coiffure Homme",
    tagline: "Précision & Style Urbain",
    description: "Coupes modernes, dégradés, barbe et soins capillaires pour hommes.",
    icon: Scissors,
    color: "gold",
    emoji: "✂️",
    details: {
      intro: "Notre équipe de coiffeurs experts façonne votre style avec une précision chirurgicale. Du dégradé américain aux coupes tendances, chaque prestation est personnalisée selon votre morphologie et votre style de vie.",
      prestations: [
        "Coupe + Shampoing + Coiffage",
        "Dégradé américain / skin fade",
        "Taille et modelage de barbe",
        "Rasage traditionnel au coupe-chou",
        "Soin hydratant cuir chevelu",
        "Coupe enfant (moins de 12 ans)",
      ],
      duree: "30 – 60 min",
      ambiance: "Ambiance barbershop premium, produits professionnels exclusifs.",
    },
  },
  {
    title: "Coiffure Femme",
    tagline: "Élégance & Créativité",
    description: "Tresses, greffes, coupes, colorations et coiffures de cérémonie.",
    icon: User,
    color: "neon-violet",
    emoji: "💇‍♀️",
    details: {
      intro: "De la coiffure quotidienne aux créations les plus audacieuses, nos coiffeuses subliment votre féminité. Tresses africaines, greffes, défrisage ou coloration — chaque cheveu est traité avec soin et expertise.",
      prestations: [
        "Tresses africaines (nattes, vanilles, box braids)",
        "Greffes et extensions capillaires",
        "Défrisage & lissage brésilien",
        "Coloration & mèches",
        "Coiffure de cérémonie / mariage",
        "Shampoing, soin & coiffage",
      ],
      duree: "1h – 4h selon prestation",
      ambiance: "Espace dédié féminin, produits naturels et professionnels.",
    },
  },
  {
    title: "Manucure",
    tagline: "Mains Sublimées",
    description: "Pose vernis, gel, résine et soins des mains pour une élégance parfaite.",
    icon: Hand,
    color: "gold",
    emoji: "💅",
    details: {
      intro: "Vos mains sont votre carte de visite. Nos techniciennes en onglerie réalisent des manucures soignées avec des produits haut de gamme pour un résultat longue durée et une finition impeccable.",
      prestations: [
        "Manucure classique (lime, repousse, vernis)",
        "Pose gel semi-permanent",
        "Pose résine / capsules",
        "Nail art & décoration",
        "Soin des mains (gommage + hydratation)",
        "French manucure",
      ],
      duree: "45 min – 1h30",
      ambiance: "Matériel stérilisé, produits certifiés, hygiène irréprochable.",
    },
  },
  {
    title: "Pédicure",
    tagline: "Pieds Parfaits",
    description: "Soins complets des pieds, gommage et pose de vernis.",
    icon: Footprints,
    color: "neon-violet",
    emoji: "🦶",
    details: {
      intro: "Offrez à vos pieds le soin qu'ils méritent. Nos soins de pédicure combinent détente et esthétique pour des pieds doux, soignés et parfaitement présentés en toute saison.",
      prestations: [
        "Pédicure complète (coupe + lime + repousse)",
        "Bain de pieds aromatique",
        "Gommage & exfoliation",
        "Soin hydratant intensif",
        "Pose vernis classique ou gel",
        "Traitement callosités",
      ],
      duree: "45 min – 1h15",
      ambiance: "Bains de pieds relaxants, produits apaisants et parfumés.",
    },
  },
  {
    title: "Soin du Visage",
    tagline: "Éclat & Jeunesse",
    description: "Nettoyage profond, hydratation et soins rajeunissants.",
    icon: Sparkles,
    color: "gold",
    emoji: "✨",
    details: {
      intro: "Retrouvez un teint éclatant et une peau revitalisée grâce à nos soins visage personnalisés. Adaptés à chaque type de peau, nos protocoles allient techniques modernes et actifs naturels pour des résultats visibles dès la première séance.",
      prestations: [
        "Nettoyage de peau en profondeur",
        "Soin hydratant & nourrissant",
        "Masque purifiant / éclat",
        "Traitement anti-taches",
        "Massage facial relaxant",
        "Soin anti-âge & raffermissant",
      ],
      duree: "45 min – 1h",
      ambiance: "Cabine privée, ambiance zen, produits cosmétiques premium.",
    },
  },
  {
    title: "Massage & Bien-être",
    tagline: "Détente Absolue",
    description: "Détente absolue avec nos massages relaxants et thérapeutiques.",
    icon: Heart,
    color: "neon-violet",
    emoji: "🌿",
    details: {
      intro: "Libérez les tensions et rechargez votre énergie avec nos soins bien-être. Nos praticiens formés aux techniques de massage vous offrent une parenthèse de sérénité au cœur de Yaoundé.",
      prestations: [
        "Massage relaxant (corps entier)",
        "Massage thérapeutique & décontracturant",
        "Massage du dos & nuque",
        "Massage des pieds (réflexologie)",
        "Soin corps (gommage + enveloppement)",
        "Forfait duo (couple / amies)",
      ],
      duree: "30 min – 1h30",
      ambiance: "Musique douce, huiles essentielles, espace cocooning.",
    },
  },
];

// ── Component ──────────────────────────────────────────────────────────────
export const Services = () => {
  const { navigateTo } = usePageTransition();
  const [active, setActive] = useState<typeof services[0] | null>(null);

  const scrollToBooking = () => {
    setActive(null);
    setTimeout(() => navigateTo("booking"), 300);
  };

  return (
    <section id="services" className="relative py-28 px-6 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 60%, rgba(212,175,55,0.10) 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.3em] mb-5 border border-gold/30 px-4 py-1.5 rounded-full">
            <Scissors className="w-3.5 h-3.5" />
            Ce que nous faisons
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Nos <span className="text-gold">Services</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.22 } }}
              onClick={() => setActive(service)}
              className="group relative bg-white/3 border border-white/10 hover:border-gold/40 p-8 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
            >
              {/* Glow blob */}
              <div className={cn(
                "absolute top-0 right-0 w-36 h-36 blur-3xl rounded-full -mr-16 -mt-16 transition-all duration-500",
                service.color === "gold"
                  ? "bg-gold/8 group-hover:bg-gold/18"
                  : "bg-neon-violet/8 group-hover:bg-neon-violet/18"
              )} />

              {/* Icon */}
              <div className={cn(
                "w-14 h-14 flex items-center justify-center rounded-2xl mb-6 transition-all duration-300 group-hover:scale-110",
                service.color === "gold"
                  ? "bg-gold/15 text-gold"
                  : "bg-neon-violet/15 text-neon-violet"
              )}>
                <service.icon className="w-7 h-7" />
              </div>

              {/* Text */}
              <p className={cn(
                "text-[10px] font-bold uppercase tracking-[0.25em] mb-2 transition-colors",
                service.color === "gold" ? "text-gold/60" : "text-neon-violet/60"
              )}>
                {service.tagline}
              </p>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* CTA */}
              <div className={cn(
                "mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0",
                service.color === "gold" ? "text-gold" : "text-neon-violet"
              )}>
                <span>Voir les détails</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>

              {/* Bottom border accent */}
              <div className={cn(
                "absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-3xl",
                service.color === "gold" ? "bg-gold/60" : "bg-neon-violet/60"
              )} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Modal détail ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8"
            onClick={() => setActive(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/12 bg-[#0d1020] shadow-2xl"
            >
              {/* Top accent bar */}
              <div className={cn(
                "absolute top-0 left-0 w-full h-0.5",
                active.color === "gold"
                  ? "bg-gradient-to-r from-transparent via-gold to-transparent"
                  : "bg-gradient-to-r from-transparent via-neon-violet to-transparent"
              )} />

              {/* Close */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all z-10"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>

              <div className="p-8 md:p-10">

                {/* Header modal */}
                <div className="flex items-start gap-5 mb-8">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0",
                    active.color === "gold" ? "bg-gold/15 text-gold" : "bg-neon-violet/15 text-neon-violet"
                  )}>
                    <active.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className={cn(
                      "text-[10px] font-bold uppercase tracking-[0.25em] mb-1",
                      active.color === "gold" ? "text-gold/60" : "text-neon-violet/60"
                    )}>
                      {active.tagline}
                    </p>
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">
                      {active.title}
                    </h3>
                  </div>
                </div>

                {/* Intro */}
                <p className="text-white/60 text-sm leading-relaxed mb-8 border-l-2 border-gold/30 pl-4">
                  {active.details.intro}
                </p>

                {/* Prestations */}
                <div className="mb-7">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/35 mb-4">
                    Prestations incluses
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {active.details.prestations.map((p) => (
                      <div key={p} className="flex items-center gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-3">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                          active.color === "gold" ? "bg-gold/20 text-gold" : "bg-neon-violet/20 text-neon-violet"
                        )}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-white/70 text-xs leading-snug">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Durée + Ambiance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1.5">⏱ Durée estimée</p>
                    <p className="text-white/80 text-sm font-semibold">{active.details.duree}</p>
                  </div>
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1.5">🌿 Ambiance</p>
                    <p className="text-white/60 text-xs leading-relaxed">{active.details.ambiance}</p>
                  </div>
                </div>

                {/* CTA Rendez-vous */}
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={scrollToBooking}
                  className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                  style={{
                    background: "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)",
                    color: "#0a0d1a",
                    boxShadow: "0 0 30px rgba(212,175,55,0.20), 0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <CalendarCheck className="w-5 h-5" />
                  Prendre un Rendez-vous
                </motion.button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};




