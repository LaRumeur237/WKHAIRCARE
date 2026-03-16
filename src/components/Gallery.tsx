import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";

const images = [
  { id: 1, url: "https://picsum.photos/seed/barber1/800/1000", category: "Homme", title: "Coupe Dégradée" },
  { id: 2, url: "https://picsum.photos/seed/hair2/800/1000", category: "Femme", title: "Tresses Africaines" },
  { id: 3, url: "https://picsum.photos/seed/nails3/800/1000", category: "Beauté", title: "Manucure Gel" },
  { id: 4, url: "https://picsum.photos/seed/facial4/800/1000", category: "Beauté", title: "Soin Purifiant" },
  { id: 5, url: "https://picsum.photos/seed/barber5/800/1000", category: "Homme", title: "Taille de Barbe" },
  { id: 6, url: "https://picsum.photos/seed/hair6/800/1000", category: "Femme", title: "Coloration Premium" },
];

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
          >
            Notre <span className="text-neon-violet">Galerie</span>
          </motion.h2>
          <p className="text-white/60 uppercase tracking-widest text-sm">L'art de la coiffure en images</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-gold text-xs font-bold uppercase tracking-widest mb-2">{img.category}</span>
                <h3 className="text-2xl font-bold text-white mb-4">{img.title}</h3>
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-3 py-1 bg-neon-violet text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  WK Style
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-gold transition-colors">
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="relative max-w-4xl w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedImage.title}</h3>
                <p className="text-gold uppercase tracking-widest text-sm">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
