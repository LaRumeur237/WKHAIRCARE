import React, { useState } from "react";
import { Scissors, Instagram, Facebook, MessageCircle } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { usePageTransition, PageId } from "./PageTransition";
import { MentionsLegales, PolitiqueConfidentialite } from "./LegalPages";

export const Footer = () => {
  const { navigateTo } = usePageTransition();
  const [showMentions, setShowMentions] = useState(false);
  const [showConfidentialite, setShowConfidentialite] = useState(false);

  const links: { name: string; page: PageId }[] = [
    { name: "Accueil",     page: "home" },
    { name: "Services",    page: "services" },
    { name: "Galerie",     page: "gallery" },
    { name: "Contact",     page: "contact" },
  ];

  return (
    <>
      <footer className="bg-background border-t border-white/10 py-10 md:py-14 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Ligne principale */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">

            {/* Logo */}
            <div className="flex items-center gap-3 text-gold font-bold text-xl md:text-2xl tracking-tighter">
              <Scissors className="w-6 h-6 md:w-8 md:h-8 rotate-45 flex-shrink-0" />
              <span style={{ fontFamily: "'Playfair Display', serif" }}>WK HAIR CARE</span>
            </div>

            {/* Navigation links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm uppercase tracking-widest text-white/40">
              {links.map((l) => (
                <button
                  key={l.page}
                  onClick={() => navigateTo(l.page)}
                  className="hover:text-gold transition-colors"
                >
                  {l.name}
                </button>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-3 md:gap-4">
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                <Facebook size={16} />
              </a>
              <a href="https://wa.me/237695752235" className="w-9 h-9 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-[#25D366] hover:border-[#25D366] transition-all">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 md:mt-10 h-px bg-white/5" />

          {/* Bas de footer : copyright + liens légaux */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">

            {/* Copyright */}
            <div className="flex flex-col gap-1 text-white/20 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em]">
              <p>© {new Date().getFullYear()} WK HAIR CARE — Tous droits réservés.</p>
              <p>Powered by <span className="text-gold/50">IMANI-TECH SOLUTIONS SARL</span></p>
            </div>

            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-5">
              <button
                onClick={() => setShowMentions(true)}
                className="flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-widest text-white/30 hover:text-gold transition-colors group"
              >
                <span className="w-3 h-px bg-white/20 group-hover:bg-gold transition-colors" />
                Mentions légales
              </button>
              <span className="text-white/15 text-xs">|</span>
              <button
                onClick={() => setShowConfidentialite(true)}
                className="flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-widest text-white/30 hover:text-gold transition-colors group"
              >
                <span className="w-3 h-px bg-white/20 group-hover:bg-gold transition-colors" />
                Politique de confidentialité
              </button>
            </div>
          </div>

          {/* Bande drapeau décorative */}
          <div className="mt-8 w-full h-0.5 rounded-full opacity-20"
            style={{ background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)" }}
          />
        </div>
      </footer>

      {/* Modals légales */}
      <AnimatePresence>
        {showMentions && <MentionsLegales onClose={() => setShowMentions(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showConfidentialite && <PolitiqueConfidentialite onClose={() => setShowConfidentialite(false)} />}
      </AnimatePresence>
    </>
  );
};
