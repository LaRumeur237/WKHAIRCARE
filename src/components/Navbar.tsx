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

  const navLinks: { name: string; page: PageId }[] = [
    { name: "Accueil",      page: "home" },
    { name: "Services",     page: "services" },
    { name: "Galerie",      page: "gallery" },
    { name: "À propos",     page: "about" },
    { name: "Rendez-vous",  page: "booking" },
    { name: "Contact",      page: "contact" },
  ];

  const handleNav = (page: PageId) => {
    setIsOpen(false);
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Bande drapeau USA tout en haut */}
      <div
        className="fixed top-0 left-0 w-full z-[60] h-1"
        style={{ background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)" }}
      />

      <nav
        className={cn(
          "fixed top-1 left-0 w-full z-50 transition-all duration-300 px-6 py-3",
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-usa-red/30 shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* ── LOGO ── */}
          <motion.button
            onClick={() => handleNav("home")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo.jpeg"
              alt="WK Hair Care"
              className="h-12 w-12 rounded-full object-cover border-2 border-usa-red logo-pulse"
            />
            <div className="flex flex-col leading-none">
              <span
                className="glitch text-white font-bold text-xl tracking-widest uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                data-text="WK HAIR CARE"
              >
                WK HAIR CARE
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-usa-red font-semibold">
                ★ Premium Barbershop ★
              </span>
            </div>
          </motion.button>

          {/* ── DESKTOP NAV ── */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.page}
                onClick={() => handleNav(link.page)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "relative text-sm uppercase tracking-widest transition-colors group",
                  activePage === link.page ? "text-usa-red" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] bg-usa-red transition-all duration-300",
                    activePage === link.page ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </motion.button>
            ))}
            <motion.a
              href="https://wa.me/237695752235"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider glow-red"
              style={{ background: "linear-gradient(135deg, #B22234, #3C3B6E)" }}
            >
              WhatsApp
            </motion.a>
          </div>

          {/* ── MOBILE TOGGLE ── */}
          <button
            className="md:hidden text-white hover:text-usa-red transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 md:hidden"
            style={{ background: "linear-gradient(135deg, #0a0d1a 0%, #1a0d12 50%, #0a0d2a 100%)" }}
          >
            {/* Étoiles */}
            {["top-8 left-8 text-4xl", "top-16 right-12 text-2xl", "bottom-20 left-16 text-3xl"].map((pos, i) => (
              <motion.span
                key={i}
                className={`absolute text-white/20 star-spin ${pos}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
              >★</motion.span>
            ))}

            <img
              src="/images/logo.jpeg"
              alt="WK Hair Care"
              className="h-20 w-20 rounded-full object-cover border-4 border-usa-red logo-pulse mb-2"
            />

            {navLinks.map((link, i) => (
              <motion.button
                key={link.page}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNav(link.page)}
                className={cn(
                  "text-2xl uppercase tracking-widest transition-colors",
                  activePage === link.page ? "text-usa-red" : "text-white hover:text-usa-red"
                )}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {link.name}
              </motion.button>
            ))}

            <div
              className="w-32 mt-2"
              style={{ height: "3px", background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)" }}
            />

            <div className="flex gap-4 mt-2">
              <a
                href="tel:+237695752235"
                className="p-4 rounded-full border border-usa-red/40 bg-usa-red/20 hover:bg-usa-red text-white transition-all"
              >
                <Phone />
              </a>
              <a
                href="https://wa.me/237695752235"
                className="p-4 rounded-full border border-usa-blue/40 bg-usa-blue/20 hover:bg-usa-blue text-white transition-all"
              >
                <MessageCircle />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
