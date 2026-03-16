import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero3D } from "./components/Hero3D";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { Booking } from "./components/Booking";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MessageCircle } from "lucide-react";
import { useGSAPAnimations } from "./lib/animations";
import { PageTransitionProvider, PageWrapper } from "./components/PageTransition";

// ── LOADER ────────────────────────────────────────────────────────────────────
const Loader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center"
  >
    <motion.div
      animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="mb-8"
    >
      <img
        src="/images/logo.jpeg"
        alt="WK Hair Care"
        className="h-28 w-28 rounded-full object-cover border-4 border-usa-red logo-pulse"
      />
    </motion.div>

    {/* Barre USA */}
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 260 }}
      transition={{ duration: 2.2, ease: "easeInOut" }}
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)" }}
    />

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-5 text-white/50 uppercase tracking-[0.5em] text-xs font-bold"
    >
      ★ WK HAIR CARE ★
    </motion.p>
  </motion.div>
);

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  useGSAPAnimations();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransitionProvider>
      <div className="relative min-h-screen bg-background text-white selection:bg-usa-red selection:text-white">

        <AnimatePresence>{loading && <Loader />}</AnimatePresence>

        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Navbar />

            <main className="relative">

              {/* ── ACCUEIL ── */}
              <PageWrapper pageId="home">
                <Hero3D />
              </PageWrapper>

              {/* ── SERVICES ── */}
              <PageWrapper pageId="services">
                <Services />
              </PageWrapper>

              {/* ── GALERIE ── */}
              <PageWrapper pageId="gallery">
                <Gallery />
              </PageWrapper>

              {/* ── À PROPOS ── */}
              <PageWrapper pageId="about">
                <About />
              </PageWrapper>

              {/* ── RENDEZ-VOUS ── */}
              <PageWrapper pageId="booking">
                <Booking />
              </PageWrapper>

              {/* ── CONTACT ── */}
              <PageWrapper pageId="contact">
                <Contact />
              </PageWrapper>

            </main>

            <Footer />

            {/* WhatsApp flottant */}
            <motion.a
              href="https://wa.me/237695752235"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#128C7E] transition-all glow-red"
            >
              <MessageCircle size={32} />
              <span className="absolute -top-2 -right-2 bg-usa-red text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                1
              </span>
            </motion.a>
          </motion.div>
        )}
      </div>
    </PageTransitionProvider>
  );
}
