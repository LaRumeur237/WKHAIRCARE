import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, Send, CheckCircle, Loader2, MessageSquarePlus, X, ChevronDown } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────
interface Testimonial {
  id: string;
  name: string;
  service: string;
  rating: number;
  message: string;
  date: string;
  initials: string;
  color: string;
}

const AVATAR_COLORS = [
  "from-gold/80 to-gold/40",
  "from-usa-red/80 to-usa-red/40",
  "from-neon-blue/80 to-neon-blue/40",
  "from-[#25D366]/80 to-[#25D366]/40",
];

const SERVICES = [
  "Coiffure Homme",
  "Coiffure Femme",
  "Manucure",
  "Pédicure",
  "Soin du Visage",
  "Massage & Bien-être",
  "Forfait Complet",
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Marie Nguema",
    service: "Coiffure Femme",
    rating: 5,
    message: "Service exceptionnel ! Mes tresses sont magnifiques, l'équipe est très professionnelle et accueillante. Je recommande vivement WK Hair Care à toutes les femmes de Yaoundé.",
    date: "2024-12-10",
    initials: "MN",
    color: AVATAR_COLORS[0],
  },
  {
    id: "2",
    name: "Jean-Paul Mbarga",
    service: "Coiffure Homme",
    rating: 5,
    message: "Le meilleur barbershop de Mimboman ! Dégradé impeccable, barbe bien taillée. L'ambiance est top et le personnel très sympathique. Mon nouveau salon de référence.",
    date: "2025-01-05",
    initials: "JM",
    color: AVATAR_COLORS[1],
  },
  {
    id: "3",
    name: "Sandra Bello",
    service: "Manucure",
    rating: 5,
    message: "Pose gel parfaite, ça tient depuis 3 semaines sans aucun problème. Les techniciennes sont douces et minutieuses. L'endroit est propre et très bien aménagé.",
    date: "2025-01-20",
    initials: "SB",
    color: AVATAR_COLORS[2],
  },
  {
    id: "4",
    name: "Patrick Essomba",
    service: "Soin du Visage",
    rating: 5,
    message: "Mon visage n'a jamais été aussi frais ! Le soin purifiant est vraiment efficace. Je suis impressionné par le niveau de qualité. WK Hair Care c'est du sérieux.",
    date: "2025-02-01",
    initials: "PE",
    color: AVATAR_COLORS[3],
  },
];

// ── Étoiles ────────────────────────────────────────────────────────────────
const StarRating = ({ value, onChange, readonly = false }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} type="button" disabled={readonly} onClick={() => onChange?.(star)}
        className={`transition-all ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}>
        <Star className={`w-5 h-5 ${star <= value ? "text-gold fill-gold" : "text-white/20"}`} />
      </button>
    ))}
  </div>
);

// ── Carte témoignage ───────────────────────────────────────────────────────
const TestimonialCard = ({ t, index }: { t: Testimonial; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: index * 0.1 }}
    layout
    className="relative bg-white/3 border border-white/10 rounded-3xl p-6 md:p-7 flex flex-col gap-4 hover:border-gold/30 transition-all duration-300 group"
  >
    <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent rounded-full" />
    <div className="absolute top-5 right-5 opacity-8 group-hover:opacity-15 transition-opacity">
      <Quote className="w-9 h-9 text-gold" />
    </div>

    {/* Avatar + nom */}
    <div className="flex items-center gap-3">
      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center font-black text-white text-xs flex-shrink-0`}>
        {t.initials}
      </div>
      <div className="min-w-0">
        <p className="font-bold text-white text-sm truncate">{t.name}</p>
        <p className="text-gold/60 text-[11px] uppercase tracking-wider truncate">{t.service}</p>
      </div>
    </div>

    <StarRating value={t.rating} readonly />

    <p className="text-white/58 text-sm leading-relaxed flex-1 italic">"{t.message}"</p>

    <p className="text-white/22 text-[11px] uppercase tracking-widest">
      {new Date(t.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
    </p>
  </motion.div>
);

// ── Formulaire modal ───────────────────────────────────────────────────────
const TestimonialForm = ({ onSubmit, onClose }: {
  onSubmit: (t: Omit<Testimonial, "id" | "date" | "initials" | "color">) => Promise<void>;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !service || !message.trim() || rating === 0) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (message.trim().length < 20) {
      setError("Votre témoignage doit faire au moins 20 caractères.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onSubmit({ name: name.trim(), service, rating, message: message.trim() });
      setDone(true);
      setTimeout(() => { setDone(false); onClose(); }, 2500);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93 }}
        transition={{ type: "spring", damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-white/12 bg-[#0d1020] shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Header modal */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold/15 flex items-center justify-center">
              <MessageSquarePlus className="w-4 h-4 text-gold" />
            </div>
            <h3 className="font-black uppercase tracking-tight text-white text-base">Votre témoignage</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all">
            <X className="w-3.5 h-3.5 text-white/60" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="px-7 py-14 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-gold" />
              </div>
              <h4 className="font-black uppercase tracking-tight text-white text-lg">Merci !</h4>
              <p className="text-white/50 text-sm">Votre témoignage a bien été publié.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="px-7 py-6 space-y-4">

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Votre nom *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Marie Dupont"
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3 outline-none transition-all text-sm placeholder:text-white/20" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Service reçu *</label>
                <div className="relative">
                  <select value={service} onChange={(e) => setService(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3 outline-none transition-all text-sm appearance-none cursor-pointer">
                    <option value="" className="bg-[#0a0d1a]">— Choisir un service —</option>
                    {SERVICES.map((s) => <option key={s} value={s} className="bg-[#0a0d1a]">{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Votre note *</label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
                  Votre expérience * <span className="text-white/20 normal-case tracking-normal">({message.length}/300)</span>
                </label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                  rows={4} placeholder="Partagez votre expérience chez WK Hair Care..."
                  className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold rounded-xl px-4 py-3 outline-none transition-all text-sm placeholder:text-white/20 resize-none" />
              </div>

              {error && (
                <p className="text-usa-red text-xs bg-usa-red/10 border border-usa-red/20 rounded-xl px-4 py-2.5">
                  ⚠️ {error}
                </p>
              )}

              <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
                type="submit" disabled={loading}
                className="w-full rounded-xl py-3.5 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #d4af37 0%, #f0c040 50%, #d4af37 100%)", color: "#0a0d1a", boxShadow: "0 0 25px rgba(212,175,55,0.2)" }}>
                {loading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Publication...</>
                  : <><Send className="w-4 h-4" /> Publier mon témoignage</>}
              </motion.button>

              <p className="text-white/20 text-xs text-center">
                Votre témoignage remplacera le plus ancien parmi les 4 affichés.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ── Page Testimonials ──────────────────────────────────────────────────────
export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wk_testimonials");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) setTestimonials(parsed);
      }
    } catch {}
  }, []);

  const handleNewTestimonial = async (data: Omit<Testimonial, "id" | "date" | "initials" | "color">) => {
    const initials = data.name.split(" ").map((w) => w[0]?.toUpperCase() ?? "").slice(0, 2).join("");
    const newT: Testimonial = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      initials,
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      ...data,
    };
    // Max 4 : garde les 3 derniers + le nouveau
    const updated = [...testimonials.slice(-3), newT];
    setTestimonials(updated);
    try { localStorage.setItem("wk_testimonials", JSON.stringify(updated)); } catch {}
  };

  return (
    <section id="testimonials" className="relative py-20 md:py-28 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-15"
        style={{ backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%)" }} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.3em] mb-5 border border-gold/30 px-4 py-1.5 rounded-full">
            <Star className="w-3.5 h-3.5 fill-gold" />
            Avis clients
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Ils nous font <span className="text-gold">Confiance</span>
          </h2>
          <p className="mt-5 text-white/45 text-base max-w-lg mx-auto leading-relaxed">
            Découvrez les expériences de nos clients. Partagez la vôtre !
          </p>
        </motion.div>

        {/* Grille 4 témoignages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          <AnimatePresence mode="popLayout">
            {testimonials.slice(-4).map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex justify-center">
          <motion.button onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm border border-gold/40 bg-gold/8 text-gold hover:bg-gold hover:text-background transition-all duration-300">
            <MessageSquarePlus className="w-5 h-5" />
            Partager mon expérience
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && <TestimonialForm onSubmit={handleNewTestimonial} onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </section>
  );
};
