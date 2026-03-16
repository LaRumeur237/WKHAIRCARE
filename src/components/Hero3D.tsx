import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars, Text, MeshDistortMaterial, Float as FloatDrei } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "motion/react";
import { GlitchText } from "./GlitchText";
import { Phone, MessageCircle, Calendar } from "lucide-react";

const ScissorsModel = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={meshRef}>
      {/* Procedural Scissors-like shape */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.1, 2, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.4, -0.5, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 100]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.4, -0.5, 0]}>
        <torusGeometry args={[0.3, 0.05, 16, 100]} />
        <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const Particles = () => {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.001;
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  );
};

export const Hero3D = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#d4af37" intensity={2} />
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={2} />
          
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <ScissorsModel />
          </Float>
          
          <Particles />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlitchText
            text="WK HAIR CARE"
            as="h1"
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-2"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gold text-xl md:text-2xl font-light tracking-[0.2em] uppercase mb-8"
          >
            Salon de coiffure mixte
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-xl mx-auto text-white/60 text-sm md:text-base mb-12"
          >
            Coiffure homme et femme, manucure, pédicure et soin du visage. 
            L'excellence de la beauté moderne à Mimboman Opep, YAOUNDE.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gold text-background px-8 py-4 rounded-full font-bold uppercase tracking-widest glow-gold"
            >
              <Calendar className="w-5 h-5" />
              Prendre RDV
            </motion.a>
            <motion.a
              href="tel:+237695752235"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              Appeler
            </motion.a>
            <motion.a
              href="https://wa.me/237695752235"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-neon-violet text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest glow-violet"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </div>
    </section>
  );
};
