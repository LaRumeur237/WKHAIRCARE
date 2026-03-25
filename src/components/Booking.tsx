import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, Send, CheckCircle, AlertCircle, Smartphone, Scissors } from "lucide-react";

export const Booking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    { id: "homme",   label: "Coiffure Homme",  icon: "✂️" },
    { id: "femme",   label: "Coiffure Femme",  icon: "💇‍♀️" },
    { id: "manuc",   label: "Manucure",         icon: "💅" },
    { id: "pedic",   label: "Pédicure",         icon: "🦶" },
    { id: "visage",  label: "Soin du Visage",   icon: "✨" },
    { id: "forfait", label: "Forfait Complet",  icon: "⭐" },
  ];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return dateStr;
    const [y, m, d] = dateStr.split("-");
    const months = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
    return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return timeStr;
    const [h, min] = timeStr.split(":");
    return `${h}h${min}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) return;

    const formData = new FormData(e.target as HTMLFormElement);
    const name  = formData.get("name")  as string;
    const phone = formData.get("phone") as string;
    const date  = formData.get("date")  as string;
    const time  = formData.get("time")  as string;
    const notes = formData.get("notes") as string;

    const serviceLabels = selectedServices
      .map((id) => services.find((s) => s.id === id)?.label ?? id)
      .join(", ");

    const sep = "━━━━━━━━━━━━━━━━━━━━━━";

    const message =
` *WK HAIR CARE — NOUVELLE RÉSERVATION* 
${sep}

 *CLIENT*
┣ Nom complet : *${name}*
┗ Téléphone   : *${phone}*

 *RENDEZ-VOUS*
┣ Service(s)  : *${serviceLabels}*
┣ Date        : *${formatDate(date)}*
┗ Heure       : *${formatTime(time)}*
${notes ? `\n *NOTES DU CLIENT*\n┗ _${notes}_\n` : ""}
${sep}

 *ACOMPTE DE RÉSERVATION*
┣ Montant requis : *25%* de la prestation
┣ Paiement via  :  *Orange Money*  ou   *MTN MoMo*
┗ _Le numéro de paiement sera communiqué au client_

${sep}
_Merci de confirmer ce rendez-vous au client dès que possible._ `;

    window.open(
      `https://wa.me/237695752235?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(212,175,55,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(178,34,52,0.10) 0%, transparent 60%)
          `,
        }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.3em] mb-5 border border-gold/30 px-4 py-1.5 rounded-full">
            <Scissors className="w-3.5 h-3.5" />
            Réservation en ligne
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Prenez <span className="text-gold">Rendez-vous</span>
          </h2>
          <p className="mt-5 text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Remplissez le formulaire — notre équipe vous contactera via WhatsApp pour confirmer votre créneau.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* ── Left panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="rounded-2xl border border-white/8 bg-white/3 p-7 space-y-6 backdrop-blur-sm">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/35">
                Informations pratiques
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Horaires</p>
                  <p className="text-white/50 text-sm">Lun – Sam : 08h00 – 21h00</p>
                  <p className="text-white/50 text-sm">Dim : 10h00 – 18h00</p>
                </div>
              </div>
              <div className="w-full h-px bg-white/8" />
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-usa-red/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-usa-red" />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider mb-1">Adresse</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Mimboman Opep<br />Yaoundé, Cameroun
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gold rounded-l-2xl" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-black uppercase tracking-wider text-gold text-sm">
                  Acompte requis — 25%
                </h3>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-5">
                Pour confirmer votre réservation, un acompte de{" "}
                <span className="text-gold font-bold">25%</span> du montant de la
                prestation est obligatoire.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between bg-[#FF6600]/15 border border-[#FF6600]/30 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#FF6600]" />
                    <span className="text-[#FF6600] font-bold text-xs uppercase tracking-wider">Orange Money</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 font-bold text-sm">695 75 22 35</p>
                    <p className="text-white/40 text-xs">Wilfried Kemche</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#FFCC00]/10 border border-[#FFCC00]/30 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#FFCC00]" />
                    <span className="text-[#FFCC00] font-bold text-xs uppercase tracking-wider">MTN MoMo</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 font-bold text-sm">680 04 03 90</p>
                    <p className="text-white/40 text-xs">Wilfried Kemche</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Form ── */}
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
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold/60 via-gold to-usa-red/60" />

                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Nom + Téléphone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Nom complet *</label>
                        <input
                          name="name" required type="text"
                          placeholder="Ex : Jean Dupont"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm placeholder:text-white/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Téléphone *</label>
                        <input
                          name="phone" required type="tel"
                          placeholder="+237 6XX XXX XXX"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* ── SERVICES MULTI-SELECT ── */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
                          Services souhaités *
                        </label>
                        {selectedServices.length > 0 && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[11px] font-bold text-gold bg-gold/10 border border-gold/30 px-2.5 py-1 rounded-full"
                          >
                            {selectedServices.length} sélectionné{selectedServices.length > 1 ? "s" : ""}
                          </motion.span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {services.map((service) => {
                          const isSelected = selectedServices.includes(service.id);
                          return (
                            <motion.button
                              key={service.id}
                              type="button"
                              onClick={() => toggleService(service.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.97 }}
                              className="relative flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-left overflow-hidden"
                              style={{
                                background: isSelected
                                  ? "linear-gradient(135deg, rgba(178,34,52,0.2), rgba(60,59,110,0.2))"
                                  : "rgba(255,255,255,0.03)",
                                borderColor: isSelected
                                  ? "rgba(178,34,52,0.6)"
                                  : "rgba(255,255,255,0.08)",
                              }}
                            >
                              {/* Glow si sélectionné */}
                              {isSelected && (
                                <motion.div
                                  layoutId={`glow-${service.id}`}
                                  className="absolute inset-0 rounded-xl"
                                  style={{
                                    boxShadow: "inset 0 0 20px rgba(178,34,52,0.15)",
                                  }}
                                />
                              )}

                              {/* Checkbox custom */}
                              <div
                                className="relative flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                                style={{
                                  borderColor: isSelected ? "#B22234" : "rgba(255,255,255,0.2)",
                                  background: isSelected
                                    ? "linear-gradient(135deg, #B22234, #3C3B6E)"
                                    : "transparent",
                                }}
                              >
                                <AnimatePresence>
                                  {isSelected && (
                                    <motion.svg
                                      initial={{ scale: 0, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0, opacity: 0 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                      className="w-3 h-3 text-white"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                    >
                                      <path
                                        d="M2 6l3 3 5-5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </motion.svg>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Emoji + Label */}
                              <span className="text-lg leading-none">{service.icon}</span>
                              <span
                                className="text-sm font-semibold transition-colors"
                                style={{ color: isSelected ? "#fff" : "rgba(255,255,255,0.6)" }}
                              >
                                {service.label}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Message si rien sélectionné au submit */}
                      {selectedServices.length === 0 && (
                        <p className="text-[11px] text-white/25 mt-1">
                          Cochez un ou plusieurs services
                        </p>
                      )}
                    </div>

                    {/* Date + Heure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Date souhaitée *</label>
                        <input
                          name="date" required type="date"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm"
                          style={{ colorScheme: "dark" }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Heure *</label>
                        <input
                          name="time" required type="time"
                          className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm"
                          style={{ colorScheme: "dark" }}
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Notes / Demandes spéciales</label>
                      <textarea
                        name="notes" rows={3}
                        placeholder="Précisez vos attentes, préférences, allergies..."
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3.5 outline-none transition-all text-sm placeholder:text-white/20 resize-none"
                      />
                    </div>

                    {/* Notice acompte */}
                    <div className="flex items-start gap-3 bg-gold/5 border border-gold/20 rounded-xl px-4 py-3.5">
                      <AlertCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <p className="text-white/50 text-xs leading-relaxed">
                        En soumettant ce formulaire, vous reconnaissez qu'un{" "}
                        <strong className="text-gold">acompte de 25%</strong> vous sera
                        demandé via{" "}
                        <strong className="text-[#FF6600]">Orange Money</strong> ou{" "}
                        <strong className="text-[#FFCC00]">MTN Mobile Money</strong>{" "}
                        pour valider définitivement votre réservation.
                      </p>
                    </div>

                    {/* Bouton */}
                    <motion.button
                      whileHover={{ scale: selectedServices.length > 0 ? 1.015 : 1 }}
                      whileTap={{ scale: selectedServices.length > 0 ? 0.985 : 1 }}
                      type="submit"
                      disabled={selectedServices.length === 0}
                      className="w-full rounded-xl py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 group transition-all"
                      style={{
                        background: selectedServices.length > 0
                          ? "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)"
                          : "rgba(255,255,255,0.05)",
                        color: selectedServices.length > 0 ? "#0a0d1a" : "rgba(255,255,255,0.2)",
                        boxShadow: selectedServices.length > 0
                          ? "0 0 30px rgba(212,175,55,0.25), 0 4px 16px rgba(0,0,0,0.4)"
                          : "none",
                        cursor: selectedServices.length > 0 ? "pointer" : "not-allowed",
                      }}
                    >
                      <span>Envoyer via WhatsApp</span>
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
                      Notre responsable vous contactera sur WhatsApp pour confirmer
                      votre créneau et vous communiquer le montant de l'acompte ainsi
                      que le numéro de paiement.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <div className="flex items-center justify-between bg-[#FF6600]/10 border border-[#FF6600]/25 rounded-xl px-4 py-3">
                      <span className="text-[#FF6600] text-xs font-bold uppercase tracking-wider">Orange Money</span>
                      <Smartphone className="w-4 h-4 text-[#FF6600]" />
                    </div>
                    <div className="flex items-center justify-between bg-[#FFCC00]/10 border border-[#FFCC00]/25 rounded-xl px-4 py-3">
                      <span className="text-[#FFCC00] text-xs font-bold uppercase tracking-wider">MTN Mobile Money</span>
                      <Smartphone className="w-4 h-4 text-[#FFCC00]" />
                    </div>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setSelectedServices([]); }}
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
