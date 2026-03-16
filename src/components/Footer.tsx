import React from "react";
import { Scissors, Instagram, Facebook, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-gold font-bold text-2xl tracking-tighter">
            <Scissors className="w-8 h-8 rotate-45" />
            <span>WK HAIR CARE</span>
          </div>

          <div className="flex gap-8 text-sm uppercase tracking-widest text-white/40">
            <a href="#home" className="hover:text-gold transition-colors">Accueil</a>
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Galerie</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="text-white/40 hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/40 hover:text-gold transition-colors"><Facebook size={20} /></a>
            <a href="https://wa.me/237695752235" className="text-white/40 hover:text-gold transition-colors"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} IMANI-TECH SOLUTIONS SARL.  Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
