import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";
import { GlitchText } from "./GlitchText";
import { MessageCircle, Calendar } from "lucide-react";
import { usePageTransition } from "./PageTransition";

// ── Photos galerie ────────────────────────────────────────────────────────
const GALLERY_PHOTOS = [
  "/imagesWK/coiffurehomme2.jpeg",
  "/imagesWK/coiffurehomme3.jpeg",
  "/imagesWK/manucure1.jpeg",
  "/imagesWK/manucure2.jpeg",
  "/imagesWK/manucure4.jpeg",
  "/imagesWK/manucure5.jpeg",
  "/imagesWK/manucure6.jpeg",
  "/imagesWK/manucure13.jpeg",
  "/imagesWK/manucure17.jpeg",
  "/imagesWK/pedicure1.jpeg",
  "/imagesWK/pedicure2.jpeg",
];

// Dupliquer pour boucle infinie fluide
const STRIP_PHOTOS = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

// ── Bande de photos défilante ─────────────────────────────────────────────
const PhotoStrip = ({ direction = 1, speed = 30, offsetY = 0, rowPhotos }: {
  direction?: number;
  speed?: number;
  offsetY?: number;
  rowPhotos: string[];
}) => {
  const CARD_W = 200;
  const CARD_H = 270;
  const GAP    = 12;
  const TOTAL  = (CARD_W + GAP) * rowPhotos.length;

  return (
    <div
      className="absolute flex items-center overflow-hidden"
      style={{ top: offsetY, height: CARD_H, width: "100%", left: 0 }}
    >
      <motion.div
        className="flex gap-3 flex-shrink-0"
        style={{ willChange: "transform" }}
        animate={{ x: direction > 0 ? [-TOTAL / 3, 0] : [0, -TOTAL / 3] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {rowPhotos.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="flex-shrink-0 rounded-2xl overflow-hidden border border-white/10"
            style={{ width: CARD_W, height: CARD_H }}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ── Background avec 2 rangées ─────────────────────────────────────────────
const PhotoBackground = () => {
  const row1 = STRIP_PHOTOS;
  const row2 = [...STRIP_PHOTOS].reverse();

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      {/* Rangée du haut — gauche → droite */}
      <PhotoStrip rowPhotos={row1} direction={1}  speed={55} offsetY={20}  />
      {/* Rangée du bas — droite → gauche */}
      <PhotoStrip rowPhotos={row2} direction={-1} speed={45} offsetY={320} />

      {/* Overlay centre pour lisibilité du texte */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,13,26,0.82) 30%, rgba(10,13,26,0.55) 70%, rgba(10,13,26,0.35) 100%)",
        }}
      />
      {/* Gradient top */}
      <div className="absolute top-0 left-0 w-full h-32 z-10 bg-gradient-to-b from-background to-transparent" />
      {/* Gradient bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-10 bg-gradient-to-t from-background to-transparent" />
      {/* Gradient left */}
      <div className="absolute top-0 left-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      {/* Gradient right */}
      <div className="absolute top-0 right-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

// ── 3D Scissors ───────────────────────────────────────────────────────────
const ScissorsModel = () => {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.008;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });
  return (
    <group ref={meshRef}>
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0.4, -0.5, 0]}>
        <torusGeometry args={[0.3, 0.05, 12, 80]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-0.4, -0.5, 0]}>
        <torusGeometry args={[0.3, 0.05, 12, 80]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
};

// ── Particles ─────────────────────────────────────────────────────────────
const Particles = () => {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0008;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#d4af37" transparent opacity={0.35} />
    </points>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────
export const Hero3D = () => {
  const { navigateTo } = usePageTransition();

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-background">

      {/* ── Bandes de photos défilantes ── */}
      <PhotoBackground />

      {/* ── 3D Canvas ── */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-35">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#d4af37" intensity={1.5} />
          <pointLight position={[-10, -10, -10]} color="#3C3B6E" intensity={1} />
          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
            <ScissorsModel />
          </Float>
          <Particles />
          <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={0.5} />
        </Canvas>
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-[0.35em] mb-6 border border-gold/30 px-4 py-1.5 rounded-full backdrop-blur-sm bg-black/30"
          >
            ✂️ Mimboman Opep — Yaoundé
          </motion.span>

          <GlitchText
            text="WK HAIR CARE"
            as="h1"
            className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-3"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gold text-lg md:text-2xl font-light tracking-[0.2em] uppercase mb-5"
          >
            Salon de coiffure mixte
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-lg mx-auto text-white/55 text-sm md:text-base mb-12 leading-relaxed"
          >
            Coiffure homme & femme, manucure, pédicure et soin du visage.
            L'excellence de la beauté moderne à Yaoundé.
          </motion.p>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              onClick={() => navigateTo("booking")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)",
                color: "#0a0d1a",
                boxShadow: "0 0 35px rgba(212,175,55,0.35), 0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <Calendar className="w-5 h-5" />
              Prendre RDV
            </motion.button>

            <motion.a
              href="https://wa.me/237679234480"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-1 h-2 bg-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
