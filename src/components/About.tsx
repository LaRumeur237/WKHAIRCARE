import React from "react";
import { motion } from "motion/react";
import { Scissors } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 md:gap-16 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="relative z-10 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 aspect-square max-w-sm md:max-w-none mx-auto">
            <img
              src="/imagesWK/salon.webp"
              alt="WK Hair Care Salon"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -left-6 w-28 h-28 md:w-40 md:h-40 bg-gold/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-6 -right-6 w-28 h-28 md:w-40 md:h-40 bg-neon-violet/20 blur-3xl rounded-full" />
        </motion.div>

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="flex items-center gap-2 text-gold mb-4 md:mb-6">
            <Scissors className="w-5 h-5 md:w-6 md:h-6" />
            <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-xs md:text-sm">Notre Histoire</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-tight">
            L'excellence de la coiffure à <span className="text-gold">Yaoundé</span>
          </h2>

          <div className="space-y-4 md:space-y-6 text-white/60 text-base md:text-lg leading-relaxed">
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

          <div className="mt-8 md:mt-12 grid grid-cols-2 gap-4 md:gap-8">
            <div className="bg-white/3 border border-white/8 rounded-2xl p-4 md:p-6">
              <h4 className="text-white font-bold text-base md:text-xl mb-1 md:mb-2">Qualité Premium</h4>
              <p className="text-white/40 text-xs md:text-sm leading-relaxed">Produits haut de gamme et hygiène irréprochable.</p>
            </div>
            <div className="bg-white/3 border border-white/8 rounded-2xl p-4 md:p-6">
              <h4 className="text-white font-bold text-base md:text-xl mb-1 md:mb-2">Expertise Mixte</h4>
              <p className="text-white/40 text-xs md:text-sm leading-relaxed">Spécialistes de la beauté homme et femme.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
