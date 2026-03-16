import React from "react";
import { motion } from "motion/react";
import { MapPin, Phone, MessageCircle, Instagram, Facebook, Mail } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background px-4 md:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 border border-gold/30 px-4 py-1.5 rounded-full">
            📍 Nous trouver
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Nous <span className="text-gold">Contacter</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

          {/* Infos */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/35">Coordonnées</h3>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-gold w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Adresse</p>
                  <p className="text-white/55 text-sm leading-relaxed">Mimboman Opep<br />Yaoundé — Cameroun</p>
                </div>
              </div>

              <div className="w-full h-px bg-white/8" />

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-usa-red/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-usa-red w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Téléphone</p>
                  <a href="tel:+237695752235" className="block text-white/55 text-sm hover:text-gold transition-colors">+237 695 75 22 35</a>
                  <a href="tel:+237679234480" className="block text-white/55 text-sm hover:text-gold transition-colors">+237 679 23 44 80</a>
                </div>
              </div>

              <div className="w-full h-px bg-white/8" />

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-gold w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white/55 text-sm break-all">contact@wkhaircare.com</p>
                </div>
              </div>
            </div>

            {/* Réseaux */}
            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <h4 className="font-bold uppercase tracking-widest text-xs text-white/35 mb-5">Suivez-nous</h4>
              <div className="flex gap-3">
                <a href="#" className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-gold hover:text-background hover:border-gold transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-gold hover:text-background hover:border-gold transition-all">
                  <Facebook size={18} />
                </a>
                <a href="https://wa.me/237695752235" className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-all">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 h-[280px] sm:h-[350px] md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.704253163152!2d11.5333!3d3.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTInMDAuMCJOIDExwrAzMicwMC4wIkU!5e0!3m2!1sfr!2scm!4v1620000000000!5m2!1sfr!2scm"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
