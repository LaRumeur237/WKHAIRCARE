import React from "react";
import { motion } from "motion/react";
import { Scissors, User, Sparkles, Footprints, Hand, Heart } from "lucide-react";
import { cn } from "@/src/lib/utils";

const services = [
  {
    title: "Coiffure Homme",
    description: "Coupes modernes, dégradés, barbe et soins capillaires pour hommes.",
    icon: Scissors,
    color: "gold",
  },
  {
    title: "Coiffure Femme",
    description: "Tresses, greffes, coupes, colorations et coiffures de cérémonie.",
    icon: User,
    color: "neon-violet",
  },
  {
    title: "Manucure",
    description: "Pose vernis, gel, résine et soins des mains pour une élégance parfaite.",
    icon: Hand,
    color: "gold",
  },
  {
    title: "Pédicure",
    description: "Soins complets des pieds, gommage et pose de vernis.",
    icon: Footprints,
    color: "neon-violet",
  },
  {
    title: "Soin du Visage",
    description: "Nettoyage profond, hydratation et soins rajeunissants.",
    icon: Sparkles,
    color: "gold",
  },
  {
    title: "Massage & Bien-être",
    description: "Détente absolue avec nos massages relaxants et thérapeutiques.",
    icon: Heart,
    color: "neon-violet",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
          >
            Nos <span className="text-gold">Services</span>
          </motion.h2>
          <div className="w-24 h-1 bg-neon-violet mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl overflow-hidden transition-all hover:border-gold/50"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-neon-violet/20 transition-all" />
              
              <div className={cn(
                "w-16 h-16 flex items-center justify-center rounded-2xl mb-6 transition-all group-hover:scale-110",
                service.color === "gold" ? "bg-gold/20 text-gold" : "bg-neon-violet/20 text-neon-violet"
              )}>
                <service.icon className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-all">
                <span>Découvrir</span>
                <div className="ml-2 w-8 h-[1px] bg-gold" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
