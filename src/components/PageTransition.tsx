import React, { useState, useCallback, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── TYPES ─────────────────────────────────────────────────────────────────────
export type PageId = "home" | "services" | "gallery" | "about" | "booking" | "contact" | "testimonials";

interface PageTransitionContextType {
  activePage: PageId;
  transitioning: boolean;
  navigateTo: (page: PageId) => void;
}

// ── OUTILS PAR PAGE ───────────────────────────────────────────────────────────
const PAGE_CONFIG: Record<PageId, { tools: string[]; color: string; label: string }> = {
  home:     { tools: ["✂️","✂️","✂️","✂️","✂️","✂️"], color: "#B22234", label: "Accueil" },
  services: { tools: ["🪒","🪒","🪒","🪒","🪒","🪒"], color: "#3C3B6E", label: "Services" },
  gallery:  { tools: ["📸","🖼️","📷","🎨","✨","🌟"], color: "#8b1a28", label: "Galerie" },
  about:    { tools: ["💈","💈","💈","💈","💈","💈"], color: "#1a1a5e", label: "À propos" },
  booking:  { tools: ["📅","⏰","📋","✅","🗓️","⭐"], color: "#B22234", label: "Rendez-vous" },
  testimonials: { tools: ["?","?","?","?","?","?"], color: "#d4af37", label: "T�moignages" },`n  contact:  { tools: ["📞","💬","📱","✉️","📍","🤝"], color: "#3C3B6E", label: "contact" | "testimonials" },
};

// ── CONTEXT ───────────────────────────────────────────────────────────────────
export const PageTransitionContext = React.createContext<PageTransitionContextType>({
  activePage: "home",
  transitioning: false,
  navigateTo: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

// ── PROVIDER ──────────────────────────────────────────────────────────────────
export const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [transitioning, setTransitioning] = useState(false);
  const [pendingPage, setPendingPage] = useState<PageId>("home");

  const navigateTo = useCallback((page: PageId) => {
    if (page === activePage || transitioning) return;
    setPendingPage(page);
    setTransitioning(true);
    setTimeout(() => {
      setActivePage(page);
      setTimeout(() => setTransitioning(false), 700);
    }, 750);
  }, [activePage, transitioning]);

  return (
    <PageTransitionContext.Provider value={{ activePage, transitioning, navigateTo }}>
      <TransitionOverlay isVisible={transitioning} targetPage={pendingPage} />
      {children}
    </PageTransitionContext.Provider>
  );
};

// ── OUTIL VOLANT ──────────────────────────────────────────────────────────────
const FlyingTool = ({ emoji, index }: { emoji: string; index: number }) => {
  const sx = 10 + Math.random() * 80;
  const sy = 10 + Math.random() * 80;
  const ex = 10 + Math.random() * 80;
  const ey = 10 + Math.random() * 80;
  const size = 28 + Math.floor(Math.random() * 36);
  const rot = Math.random() * 720 - 360;

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${sx}%`, top: `${sy}%`, fontSize: size }}
      initial={{ opacity: 0, scale: 0, rotate: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.6, 1.3, 0],
        rotate: rot,
        x: [`0%`, `${(ex - sx).toFixed(0)}vw`],
        y: [`0%`, `${(ey - sy).toFixed(0)}vh`],
      }}
      transition={{ duration: 1.3, delay: index * 0.07, ease: "easeInOut" }}
    >
      {emoji}
    </motion.div>
  );
};

// ── OVERLAY ───────────────────────────────────────────────────────────────────
const TransitionOverlay = ({ isVisible, targetPage }: { isVisible: boolean; targetPage: PageId }) => {
  const cfg = PAGE_CONFIG[targetPage];
  const tools = Array.from({ length: 14 }, (_, i) => ({
    emoji: cfg.tools[i % cfg.tools.length],
    id: i,
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[999] overflow-hidden flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Rideau principal */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: cfg.color }}
            initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
            animate={{ clipPath: ["inset(50% 50% 50% 50%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(50% 50% 50% 50%)"] }}
            transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
          />

          {/* Bande drapeau USA */}
          <motion.div
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              height: "6px",
              background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, times: [0, 0.3, 0.7, 1] }}
          />

          {/* Outils volants */}
          {tools.map((t) => <FlyingTool key={t.id} emoji={t.emoji} index={t.id} />)}

          {/* Nom de la page */}
          <motion.div
            className="relative z-20 text-center px-8"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1.1, 1, 0.8] }}
            transition={{ duration: 1.5, times: [0, 0.25, 0.75, 1] }}
          >
            <p
              className="text-white uppercase tracking-widest"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                textShadow: "0 0 40px rgba(255,255,255,0.6), 0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              {cfg.label}
            </p>
            <motion.div className="flex justify-center gap-2 mt-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="text-white"
                  style={{ fontSize: "1.2rem" }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                >
                  ★
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ── PAGE WRAPPER (animation d'entrée unique par page) ─────────────────────────
const PAGE_ENTER: Record<PageId, { initial: object; animate: object }> = {
  home:     { initial: { opacity: 0, scale: 0.97 },  animate: { opacity: 1, scale: 1 } },
  services: { initial: { opacity: 0, x: 80 },        animate: { opacity: 1, x: 0 } },
  gallery:  { initial: { opacity: 0, y: 60 },        animate: { opacity: 1, y: 0 } },
  about:    { initial: { opacity: 0, x: -80 },       animate: { opacity: 1, x: 0 } },
  booking:  { initial: { opacity: 0, scale: 1.04 },  animate: { opacity: 1, scale: 1 } },
  testimonials: { initial: { opacity: 0, y: 60 },        animate: { opacity: 1, y: 0 } },`n  contact:  { initial: { opacity: 0, y: -60 },       animate: { opacity: 1, y: 0 } },
};

export const PageWrapper = ({ pageId, children }: { pageId: PageId; children: React.ReactNode }) => {
  const { activePage } = usePageTransition();
  const anim = PAGE_ENTER[pageId];
  return (
    <AnimatePresence mode="wait">
      {activePage === pageId && (
        <motion.div
          key={pageId}
          initial={anim.initial}
          animate={anim.animate}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};



