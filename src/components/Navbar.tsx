import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { usePageTransition, PageId } from "./PageTransition";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigateTo, activePage } = usePageTransition();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu si on resize vers desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks: { name: string; page: PageId }[] = [
    { name: "Accueil",     page: "home" },
    { name: "A propos",    page: "about" },
    { name: "Services",    page: "services" },
    { name: "Galerie",     page: "gallery" },
    { name: "Rendez-vous", page: "booking" },
    { name: "Temoignages", page: "testimonials" },`n    { name: "Contact",     page: "contact" },
  ];

  const handleNav = (page: PageId) => {
    setIsOpen(false);
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Bande drapeau USA */}
      <div
        className="fixed top-0 left-0 w-full z-[60] h-1"
        style={{ background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)" }}
      />

      <nav className={cn(
        "fixed top-1 left-0 w-full z-50 transition-all duration-300 px-4 md:px-6 py-2 md:py-3",
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-usa-red/30 shadow-lg" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <motion.button
            onClick={() => handleNav("home")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3 min-w-0"
          >
            <img
              src="/images/logoWK.jpeg"
              alt="WK Hair Care"
              className="h-9 w-9 md:h-12 md:w-12 rounded-full object-cover border-2 border-usa-red logo-pulse flex-shrink-0"
            />
            <div className="flex flex-col leading-none min-w-0">
              <span
                className="text-white font-bold text-base md:text-xl tracking-widest uppercase truncate"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                WK HAIR CARE
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-usa-red font-semibold truncate">
                ★ Premium Barbershop ★
              </span>
            </div>
          </motion.button>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.page}
                onClick={() => handleNav(link.page)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "relative text-xs xl:text-sm uppercase tracking-widest transition-colors group whitespace-nowrap",
                  activePage === link.page ? "text-gold" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300",
                  activePage === link.page ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </motion.button>
            ))}
            <motion.a
              href="https://wa.me/237695752235"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-4 xl:px-6 py-2 rounded-full font-bold text-xs xl:text-sm uppercase tracking-wider whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #B22234, #3C3B6E)" }}
            >
              WhatsApp
            </motion.a>
          </div>

          {/* TABLET NAV — icônes seulement */}
          <div className="hidden md:flex lg:hidden items-center gap-3">
            {navLinks.slice(0, 4).map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={cn(
                  "text-xs uppercase tracking-wider transition-colors",
                  activePage === link.page ? "text-gold" : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
              </button>
            ))}
            <button
              className="text-white hover:text-gold transition-colors ml-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={22} />
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-white hover:text-gold transition-colors p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* MOBILE / TABLET MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-5 md:gap-7"
            style={{ background: "linear-gradient(135deg, #0a0d1a 0%, #1a0d12 50%, #0a0d2a 100%)" }}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>

            <img
              src="/images/logoWK.jpeg"
              alt="WK Hair Care"
              className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-4 border-usa-red logo-pulse mb-1"
            />

            {navLinks.map((link, i) => (
              <motion.button
                key={link.page}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNav(link.page)}
                className={cn(
                  "text-xl md:text-2xl uppercase tracking-widest transition-colors font-bold",
                  activePage === link.page ? "text-gold" : "text-white hover:text-gold"
                )}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link.name}
              </motion.button>
            ))}

            <div className="w-32 mt-2 h-[3px] rounded-full"
              style={{ background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)" }}
            />

            <div className="flex gap-4 mt-2">
              <a
                href="tel:+237695752235"
                className="p-3 md:p-4 rounded-full border border-usa-red/40 bg-usa-red/20 hover:bg-usa-red text-white transition-all"
              >
                <Phone size={20} />
              </a>
              <a
                href="https://wa.me/237695752235"
                className="p-3 md:p-4 rounded-full border border-usa-blue/40 bg-usa-blue/20 hover:bg-usa-blue text-white transition-all"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};




