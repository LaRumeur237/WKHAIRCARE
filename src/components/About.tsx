import React from "react";
import { motion } from "motion/react";
import { Scissors } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-24 bg-background px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2 relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 aspect-square">
            <img
              src="https://picsum.photos/seed/salon-interior/800/800"
              alt="WK Hair Care Interior"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-neon-violet/20 blur-3xl rounded-full" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-gold text-background p-6 rounded-2xl shadow-xl z-20"
          >
            <p className="text-4xl font-black">10+</p>
            <p className="text-xs font-bold uppercase tracking-widest">Années d'expérience</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-2 text-gold mb-6">
            <Scissors className="w-6 h-6" />
            <span className="uppercase tracking-[0.3em] font-bold text-sm">Notre Histoire</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
            L'excellence de la coiffure à <span className="text-gold">Douala</span>
          </h2>
          <div className="space-y-6 text-white/60 text-lg leading-relaxed">
            <p>
              WK HAIR CARE est bien plus qu'un simple salon de coiffure. Situé au cœur de Mimboman Opep, 
              nous sommes une destination de beauté premium pour l'homme et la femme moderne.
            </p>
            <p>
              Notre équipe de professionnels passionnés combine savoir-faire traditionnel et techniques 
              avant-gardistes pour vous offrir des services de coiffure, manucure, pédicure et soins du visage 
              d'une qualité exceptionnelle.
            </p>
            <p>
              Dans un cadre urbain, élégant et chaleureux, nous mettons tout en œuvre pour sublimer 
              votre style et vous offrir un moment de détente absolue.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold text-xl mb-2">Qualité Premium</h4>
              <p className="text-white/40 text-sm">Produits haut de gamme et hygiène irréprochable.</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-xl mb-2">Expertise Mixte</h4>
              <p className="text-white/40 text-sm">Spécialistes de la beauté homme et femme.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
