import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Images, ArrowLeft, ZoomIn } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Album {
  id: string;
  label: string;
  cover: string | null;
  photos: string[];
  color: string;
  accent: string;
  emoji: string;
}

// ── Albums — photos triées par nom de fichier ──────────────────────────────
const albums: Album[] = [
  {
    id: "coiffure-homme",
    label: "Coiffure Homme",
    emoji: "✂️",
    color: "from-usa-blue/40 to-background",
    accent: "text-neon-blue",
    cover: "/imagesWK/coiffurehomme1.jpeg",
    photos: [
      "/imagesWK/coiffurehomme1.jpeg",
      "/imagesWK/coiffurehomme2.jpeg",
      "/imagesWK/coiffurehomme3.jpeg",
      "/imagesWK/coiffurehomme4.jpeg",
      "/imagesWK/coiffurehomme5.jpeg",
      "/imagesWK/coiffurehomme6.jpeg",
      "/imagesWK/coiffurehomme7.jpeg",
      "/imagesWK/coiffurehomme8.jpeg",
      "/imagesWK/coiffurehomme9.jpeg",
      "/imagesWK/coiffurehomme10.jpeg",
      "/imagesWK/coiffurehomme11.jpeg",
    ],
  },
  {
    id: "coiffure-femme",
    label: "Coiffure Femme",
    emoji: "💇‍♀️",
    color: "from-usa-red/30 to-background",
    accent: "text-usa-red",
    cover: null,
    photos: [],
  },
  {
    id: "soins-visage",
    label: "Soins de Visage",
    emoji: "✨",
    color: "from-gold/20 to-background",
    accent: "text-gold",
    cover: null,
    photos: [],
  },
  {
    id: "manucure",
    label: "Manucure",
    emoji: "💅",
    color: "from-neon-red/20 to-background",
    accent: "text-neon-red",
    cover: "/imagesWK/manucure1.jpeg",
    photos: [
      "/imagesWK/manucure1.jpeg",
      "/imagesWK/manucure2.jpeg",
      "/imagesWK/manucure4.jpeg",
      "/imagesWK/manucure5.jpeg",
      "/imagesWK/manucure6.jpeg",
      "/imagesWK/manucure13.jpeg",
      "/imagesWK/manucure17.jpeg",
    ],
  },
  {
    id: "pedicure",
    label: "Pédicure",
    emoji: "🦶",
    color: "from-gold/15 to-background",
    accent: "text-gold",
    cover: "/imagesWK/pedicure1.jpeg",
    photos: [
      "/imagesWK/pedicure1.jpeg",
      "/imagesWK/pedicure2.jpeg",
    ],
  },
  {
    id: "soins-complet",
    label: "Soins Complet",
    emoji: "🌟",
    color: "from-neon-blue/20 to-background",
    accent: "text-neon-blue",
    cover: null,
    photos: [],
  },
];

// ── Component ──────────────────────────────────────────────────────────────
export const Gallery = () => {
  const [openAlbum, setOpenAlbum]   = useState<Album | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIdx(idx);
  };

  const prev = () =>
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + openAlbum!.photos.length) % openAlbum!.photos.length : 0
    );
  const next = () =>
    setLightboxIdx((i) =>
      i !== null ? (i + 1) % openAlbum!.photos.length : 0
    );

  return (
    <section id="gallery" className="relative py-28 px-6 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(212,175,55,0.10) 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.3em] mb-5 border border-gold/30 px-4 py-1.5 rounded-full">
            <Images className="w-3.5 h-3.5" />
            Notre galerie
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Nos <span className="text-gold">Réalisations</span>
          </h2>
          <p className="mt-5 text-white/45 text-base max-w-lg mx-auto leading-relaxed">
            Cliquez sur un album pour découvrir nos prestations en images.
          </p>
        </motion.div>

        {/* ── Album grid ── */}
        <AnimatePresence mode="wait">
          {!openAlbum && (
            <motion.div
              key="albums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {albums.map((album, i) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => album.photos.length > 0 && setOpenAlbum(album)}
                  className={`relative group rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] flex flex-col justify-end
                    ${album.photos.length > 0 ? "cursor-pointer" : "cursor-default opacity-60"}`}
                >
                  {/* Cover image or placeholder */}
                  {album.cover ? (
                    <img
                      src={album.cover}
                      alt={album.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${album.color} flex items-center justify-center`}>
                      <span className="text-7xl opacity-20">{album.emoji}</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="relative p-7 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{album.emoji}</span>
                      {album.photos.length > 0 && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white/10 border border-white/15 rounded-full px-3 py-1 text-white/60">
                          {album.photos.length} photo{album.photos.length > 1 ? "s" : ""}
                        </span>
                      )}
                      {album.photos.length === 0 && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/30">
                          Bientôt disponible
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white leading-tight">
                      {album.label}
                    </h3>
                    {album.photos.length > 0 && (
                      <p className={`text-xs font-bold uppercase tracking-widest ${album.accent} flex items-center gap-1.5 mt-1`}>
                        Voir l'album
                        <ChevronRight className="w-3.5 h-3.5" />
                      </p>
                    )}
                  </div>

                  {/* Gold border on hover */}
                  {album.photos.length > 0 && (
                    <div className="absolute inset-0 rounded-3xl border-2 border-gold/0 group-hover:border-gold/40 transition-all duration-300 pointer-events-none" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── Album detail view ── */}
          {openAlbum && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Back button + album title */}
              <div className="flex items-center gap-4 mb-10">
                <button
                  onClick={() => setOpenAlbum(null)}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Albums
                </button>
                <div className="w-px h-5 bg-white/15" />
                <span className="text-2xl">{openAlbum.emoji}</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">
                  {openAlbum.label}
                </h3>
                <span className="ml-auto text-xs text-white/35 font-bold uppercase tracking-wider">
                  {openAlbum.photos.length} photo{openAlbum.photos.length > 1 ? "s" : ""}
                </span>
              </div>

              {/* Photos grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {openAlbum.photos.map((photo, idx) => (
                  <motion.div
                    key={photo}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={(e) => openLightbox(idx, e)}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-white/8 hover:border-gold/40 transition-all duration-300"
                  >
                    <img
                      src={photo}
                      alt={`${openAlbum.label} ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && openAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all"
              onClick={() => setLightboxIdx(null)}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest text-white/40">
              {lightboxIdx + 1} / {openAlbum.photos.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl max-h-[85vh] w-full mx-16 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={openAlbum.photos[lightboxIdx]}
                alt={`${openAlbum.label} ${lightboxIdx + 1}`}
                className="w-full h-full object-contain"
                style={{ maxHeight: "85vh" }}
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center transition-all z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Album label bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <span className="text-lg">{openAlbum.emoji}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">{openAlbum.label}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

