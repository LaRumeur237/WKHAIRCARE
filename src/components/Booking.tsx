import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, Send, CheckCircle, AlertCircle, ChevronDown, Smartphone } from "lucide-react";

export const Booking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const services = [
    { name: "Coiffure Homme", price: 5000 },
    { name: "Coiffure Femme", price: 8000 },
    { name: "Manucure", price: 4000 },
    { name: "Pédicure", price: 4500 },
    { name: "Soin du Visage", price: 7000 },
    { name: "Forfait Complet", price: 20000 },
  ];

  const selectedServiceData = services.find((s) => s.name === selectedService);
  const acompte = selectedServiceData ? Math.round(selectedServiceData.price * 0.25) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const date = formData.get("date");
    const time = formData.get("time");
    const notes = formData.get("notes");

    const message = `🌟 *DEMANDE DE RÉSERVATION — WK HAIR CARE*

👤 *Nom :* ${name}
📞 *Téléphone :* ${phone}
✂️ *Service :* ${service}
📅 *Date souhaitée :* ${date}
🕐 *Heure :* ${time}
${notes ? `📝 *Notes :* ${notes}` : ""}

💳 *Je suis informé(e) qu'un acompte de 25% du montant de la prestation sera requis pour confirmer ma réservation, via Orange Money ou MTN Mobile Money.*

Merci de me confirmer les détails de paiement. 🙏`;

    window.open(`https://wa.me/237695752235?text=${encodeURIComponent(message)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative py-28 px-6 overflow-hidden">
      {/* Background ambiance */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 20% 40%, rgba(212,175,55,0.12) 0%, transparent 60%),
                            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(178,34,52,0.10) 0%, transparent 60%)`
        }}
      />
      {/* Diagonal stripe top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 border border-gold/30 px-4 py-1.5 rounded-full">
            Réservation en ligne
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Prenez <span className="text-gold">Rendez-vous</span>
          </h2>
          <p className="mt-5 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Remplissez le formulaire et notre équipe vous contactera via WhatsApp pour confirmer votre créneau.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Infos card */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-7 space-y-6 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40">Informations pratiques</h3>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Horaires d'ouverture</p>
                  <p className="text-white/50 text-sm leading-relaxed">Lun – Sam : 08h00 – 21h00</p>
                  <p className="text-white/50 text-sm">Dim : 10h00 – 18h00</p>
                </div>
              </div>

              <div className="w-full h-px bg-white/8" />

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-usa-red/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-usa-red" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Notre adresse</p>
                  <p className="text-white/50 text-sm leading-relaxed">Mimboman Opep<br />Yaoundé, Cameroun</p>
                </div>
              </div>
            </div>

            {/* Acompte info card — highlight */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-gold/30 bg-gold/5 p-7 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gold rounded-l-2xl" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center">
                  <AlertCircle className="w-4.5 h-4.5 text-gold" />
                </div>
                <h3 className="font-black uppercase tracking-wider text-gold text-sm">Acompte requis</h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Un acompte de <span className="text-gold font-bold">25%</span> du montant de votre prestation est requis pour confirmer toute réservation.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Le montant exact vous sera communiqué par notre responsable des réservations, qui vous transmettra également le numéro de paiement mobile.
              </p>

              {/* Mobile money badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-[#FF6600]/15 border border-[#FF6600]/30 rounded-xl px-4 py-2.5">
                  <Smartphone className="w-4 h-4 text-[#FF6600]" />
                  <span className="text-[#FF6600] font-bold text-xs uppercase tracking-wider">Orange Money</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-xl px-4 py-2.5">
                  <Smartphone className="w-4 h-4 text-[#FFCC00]" />
                  <span className="text-[#FFCC00] font-bold text-xs uppercase tracking-wider">MTN MoMo</span>
                </div>
              </div>

              {/* Dynamic acompte preview */}
              <AnimatePresence>
                {acompte && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="rounded-xl bg-gold/10 border border-gold/20 px-4 py-3 flex items-center justify-between"
                  >
                    <span className="text-white/60 text-sm">Acompte estimé pour</span>
                    <div className="text-right">
                      <p className="text-xs text-white/40">{selectedService}</p>
                      <p className="text-gold font-black text-lg">{acompte.toLocaleString()} FCFA</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="bg-white/3 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden"
                >
                  {/* Top gradient bar */}
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold/60 via-gold to-usa-red/60" />

                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Nom complet *</label>
                        <input
                          name="name"
                          required
                          type="text"
                          placeholder="Ex : Jean Dupont"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm placeholder:text-white/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Téléphone *</label>
                        <input
                          name="phone"
                          required
                          type="tel"
                          placeholder="+237 6XX XXX XXX"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Service souhaité *</label>
                      <div className="relative">
                        <select
                          name="service"
                          required
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-[#0a0d1a]">— Choisir un service —</option>
                          {services.map((s) => (
                            <option key={s.name} value={s.name} className="bg-[#0a0d1a]">
                              {s.name} — {s.price.toLocaleString()} FCFA
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Date souhaitée *</label>
                        <input
                          name="date"
                          required
                          type="date"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm"
                          style={{ colorScheme: "dark" }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Heure *</label>
                        <input
                          name="time"
                          required
                          type="time"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm"
                          style={{ colorScheme: "dark" }}
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Notes / Demandes spéciales</label>
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder="Précisez vos attentes, allergies, préférences..."
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm placeholder:text-white/20 resize-none"
                      />
                    </div>

                    {/* Notice acompte */}
                    <div className="flex items-start gap-3 bg-gold/5 border border-gold/20 rounded-xl px-4 py-3.5">
                      <AlertCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <p className="text-white/55 text-xs leading-relaxed">
                        En soumettant ce formulaire, vous acceptez qu'un <strong className="text-gold">acompte de 25%</strong> vous sera demandé via <strong className="text-white/70">Orange Money</strong> ou <strong className="text-white/70">MTN Mobile Money</strong> pour confirmer votre réservation.
                      </p>
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      type="submit"
                      className="w-full relative overflow-hidden rounded-xl py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 group"
                      style={{
                        background: "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)",
                        color: "#0a0d1a",
                        boxShadow: "0 0 30px rgba(212,175,55,0.25), 0 4px 16px rgba(0,0,0,0.4)"
                      }}
                    >
                      <span>Confirmer via WhatsApp</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/3 border border-gold/20 rounded-3xl p-12 flex flex-col items-center text-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Demande envoyée !</h3>
                    <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                      Notre responsable des réservations vous contactera bientôt sur WhatsApp pour confirmer votre créneau et vous communiquer les détails de l'acompte.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <div className="flex items-center justify-between bg-[#FF6600]/10 border border-[#FF6600]/25 rounded-xl px-4 py-3">
                      <span className="text-[#FF6600] text-xs font-bold uppercase tracking-wider">Orange Money</span>
                      <Smartphone className="w-4 h-4 text-[#FF6600]" />
                    </div>
                    <div className="flex items-center justify-between bg-[#FFCC00]/8 border border-[#FFCC00]/25 rounded-xl px-4 py-3">
                      <span className="text-[#FFCC00] text-xs font-bold uppercase tracking-wider">MTN Mobile Money</span>
                      <Smartphone className="w-4 h-4 text-[#FFCC00]" />
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-white/30 hover:text-white/60 text-xs uppercase tracking-widest transition-colors mt-2"
                  >
                    Faire une autre réservation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
