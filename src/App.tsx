import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero3D } from "./components/Hero3D";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { Booking } from "./components/Booking";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MessageCircle } from "lucide-react";
import { useGSAPAnimations } from "./lib/animations";
import { PageTransitionProvider, PageWrapper } from "./components/PageTransition";

// ── LOADER ────────────────────────────────────────────────────────────────
const Loader = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1, ease: "easeInOut" }}
    className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center px-4"
  >
    <motion.div
      animate={{ rotate: [0, 360], scale: [1, 1.15, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="mb-6 md:mb-8"
    >
      <img
        src="/images/logoWK.jpeg"
        alt="WK Hair Care"
        className="h-20 w-20 md:h-28 md:w-28 rounded-full object-cover border-4 border-usa-red logo-pulse"
      />
    </motion.div>

    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "min(260px, 80vw)" }}
      transition={{ duration: 2.2, ease: "easeInOut" }}
      className="h-1.5 rounded-full overflow-hidden"
      style={{ background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)" }}
    />

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-4 md:mt-5 text-white/50 uppercase tracking-[0.3em] md:tracking-[0.5em] text-xs font-bold text-center"
    >
      ★ WK HAIR CARE ★
    </motion.p>
  </motion.div>
);

// ── APP ───────────────────────────────────────────────────────────────────
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
              <PageWrapper pageId="home"><Hero3D /></PageWrapper>
              <PageWrapper pageId="services"><Services /></PageWrapper>
              <PageWrapper pageId="gallery"><Gallery /></PageWrapper>
              <PageWrapper pageId="about"><About /></PageWrapper>
              <PageWrapper pageId="booking"><Booking /></PageWrapper>
              <PageWrapper pageId="testimonials"><Testimonials /></PageWrapper>
              <PageWrapper pageId="contact"><Contact /></PageWrapper>
            </main>

            <Footer />
          </motion.div>
        )}
      </div>
    </PageTransitionProvider>
  );
}



