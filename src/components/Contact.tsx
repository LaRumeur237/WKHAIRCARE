import React from "react";
import { motion } from "motion/react";
import { MapPin, Phone, MessageCircle, Instagram, Facebook, Mail } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-black uppercase tracking-tighter mb-8"
              >
                Nous <span className="text-neon-violet">Trouver</span>
              </motion.h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-gold shrink-0" />
                  <p className="text-white/60">Mimboman Opep, Douala – Cameroun</p>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-gold shrink-0" />
                  <div className="space-y-1">
                    <a href="tel:+237695752235" className="block hover:text-gold transition-colors">+237 695 75 22 35</a>
                    <a href="tel:+237679234480" className="block hover:text-gold transition-colors">+237 679 23 44 80</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="text-gold shrink-0" />
                  <p className="text-white/60">contact@wkhaircare.com</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Suivez-nous</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-background transition-all">
                  <Instagram />
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-background transition-all">
                  <Facebook />
                </a>
                <a href="https://wa.me/237695752235" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-neon-violet transition-all">
                  <MessageCircle />
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 h-[400px] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.704253163152!2d11.5333!3d3.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTInMDAuMCJOIDExwrAzMicwMC4wIkU!5e0!3m2!1sfr!2scm!4v1620000000000!5m2!1sfr!2scm"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
