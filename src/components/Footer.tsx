import React, { useState, useContext, createContext } from "react";
import { Scissors, Instagram, Facebook, MessageCircle, Globe, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { usePageTransition, PageId } from "./PageTransition";
import { MentionsLegales, PolitiqueConfidentialite } from "./LegalPages";

// ── TikTok Icon ────────────────────────────────────────────────────────────
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.02-.06z"/>
  </svg>
);

// ── Langue Context (global) ────────────────────────────────────────────────
export type Lang = "fr" | "en" | "es" | "de" | "zh" | "ar" | "pt" | "it" | "ru" | "nl";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "fr", label: "Français",    flag: "🇫🇷" },
  { code: "en", label: "English",     flag: "🇬🇧" },
  { code: "es", label: "Español",     flag: "🇪🇸" },
  { code: "de", label: "Deutsch",     flag: "🇩🇪" },
  { code: "zh", label: "中文",         flag: "🇨🇳" },
  { code: "ar", label: "العربية",     flag: "🇸🇦" },
  { code: "pt", label: "Português",   flag: "🇧🇷" },
  { code: "it", label: "Italiano",    flag: "🇮🇹" },
  { code: "ru", label: "Русский",     flag: "🇷🇺" },
  { code: "nl", label: "Nederlands",  flag: "🇳🇱" },
];

interface LangContextType { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; }
export const LangContext = createContext<LangContextType>({ lang: "fr", setLang: () => {}, t: (k) => k });
export const useLang = () => useContext(LangContext);

// ── Traductions ────────────────────────────────────────────────────────────
export const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  fr: {
    home: "Accueil", about: "A propos", services: "Services", gallery: "Galerie",
    booking: "Rendez-vous", testimonials: "Temoignages", contact: "Contact",
    tagline: "Salon de coiffure mixte",
    description: "Coiffure homme & femme, manucure, pédicure et soin du visage. L'excellence de la beauté moderne à Yaoundé.",
    rdv: "Prendre RDV", whatsapp: "WhatsApp",
    ourServices: "Nos Services", ourGallery: "Nos Réalisations",
    bookNow: "Réserver maintenant", sendWhatsApp: "Envoyer via WhatsApp",
    fullName: "Nom complet", phone: "Téléphone", service: "Service souhaité",
    date: "Date souhaitée", time: "Heure", notes: "Notes / Demandes spéciales",
    depositNotice: "Un acompte de 25% vous sera demandé via Orange Money ou MTN Mobile Money.",
    copyright: "Tous droits réservés.",
    poweredBy: "Propulsé par",
    mentions: "Mentions légales",
    privacy: "Politique de confidentialité",
    testimonials_title: "Ils nous font Confiance",
    testimonials_sub: "Découvrez les expériences de nos clients. Partagez la vôtre !",
    share: "Partager mon expérience",
    yourName: "Votre nom", yourService: "Service reçu", yourRating: "Votre note",
    yourExp: "Votre expérience", publish: "Publier mon témoignage",
    thankYou: "Merci !", published: "Votre témoignage a bien été publié.",
    chooseService: "— Choisir un service —",
    followUs: "Suivez-nous",
  },
  en: {
    home: "Home", about: "About", services: "Services", gallery: "Gallery",
    booking: "Appointment", testimonials: "Reviews", contact: "Contact",
    tagline: "Mixed hair salon",
    description: "Men & women haircuts, manicure, pedicure and facial care. The excellence of modern beauty in Yaoundé.",
    rdv: "Book Now", whatsapp: "WhatsApp",
    ourServices: "Our Services", ourGallery: "Our Work",
    bookNow: "Book Now", sendWhatsApp: "Send via WhatsApp",
    fullName: "Full Name", phone: "Phone", service: "Desired Service",
    date: "Preferred Date", time: "Time", notes: "Notes / Special Requests",
    depositNotice: "A 25% deposit will be required via Orange Money or MTN Mobile Money.",
    copyright: "All rights reserved.",
    poweredBy: "Powered by",
    mentions: "Legal Notice",
    privacy: "Privacy Policy",
    testimonials_title: "They Trust Us",
    testimonials_sub: "Discover our clients' experiences. Share yours!",
    share: "Share my experience",
    yourName: "Your name", yourService: "Service received", yourRating: "Your rating",
    yourExp: "Your experience", publish: "Publish my review",
    thankYou: "Thank you!", published: "Your review has been published.",
    chooseService: "— Choose a service —",
    followUs: "Follow us",
  },
  es: {
    home: "Inicio", about: "Nosotros", services: "Servicios", gallery: "Galería",
    booking: "Cita", testimonials: "Opiniones", contact: "Contacto",
    tagline: "Salón de peluquería mixto",
    description: "Cortes para hombre y mujer, manicura, pedicura y cuidado facial. La excelencia de la belleza moderna en Yaoundé.",
    rdv: "Reservar cita", whatsapp: "WhatsApp",
    ourServices: "Nuestros Servicios", ourGallery: "Nuestros Trabajos",
    bookNow: "Reservar ahora", sendWhatsApp: "Enviar por WhatsApp",
    fullName: "Nombre completo", phone: "Teléfono", service: "Servicio deseado",
    date: "Fecha preferida", time: "Hora", notes: "Notas / Solicitudes especiales",
    depositNotice: "Se requerirá un depósito del 25% vía Orange Money o MTN Mobile Money.",
    copyright: "Todos los derechos reservados.",
    poweredBy: "Desarrollado por",
    mentions: "Aviso legal",
    privacy: "Política de privacidad",
    testimonials_title: "Confían en nosotros",
    testimonials_sub: "Descubre las experiencias de nuestros clientes. ¡Comparte la tuya!",
    share: "Compartir mi experiencia",
    yourName: "Tu nombre", yourService: "Servicio recibido", yourRating: "Tu puntuación",
    yourExp: "Tu experiencia", publish: "Publicar mi opinión",
    thankYou: "¡Gracias!", published: "Tu opinión ha sido publicada.",
    chooseService: "— Elegir un servicio —",
    followUs: "Síguenos",
  },
  de: {
    home: "Startseite", about: "Über uns", services: "Leistungen", gallery: "Galerie",
    booking: "Termin", testimonials: "Bewertungen", contact: "Kontakt",
    tagline: "Gemischter Friseursalon",
    description: "Haarschnitte für Männer & Frauen, Maniküre, Pediküre und Gesichtspflege. Moderne Schönheit in Yaoundé.",
    rdv: "Termin buchen", whatsapp: "WhatsApp",
    ourServices: "Unsere Leistungen", ourGallery: "Unsere Arbeiten",
    bookNow: "Jetzt buchen", sendWhatsApp: "Per WhatsApp senden",
    fullName: "Vollständiger Name", phone: "Telefon", service: "Gewünschte Leistung",
    date: "Bevorzugtes Datum", time: "Uhrzeit", notes: "Notizen / Sonderwünsche",
    depositNotice: "Eine Anzahlung von 25% ist über Orange Money oder MTN Mobile Money erforderlich.",
    copyright: "Alle Rechte vorbehalten.",
    poweredBy: "Entwickelt von",
    mentions: "Impressum",
    privacy: "Datenschutzrichtlinie",
    testimonials_title: "Sie vertrauen uns",
    testimonials_sub: "Entdecken Sie die Erfahrungen unserer Kunden. Teilen Sie Ihre!",
    share: "Meine Erfahrung teilen",
    yourName: "Ihr Name", yourService: "Erhaltene Leistung", yourRating: "Ihre Bewertung",
    yourExp: "Ihre Erfahrung", publish: "Bewertung veröffentlichen",
    thankYou: "Danke!", published: "Ihre Bewertung wurde veröffentlicht.",
    chooseService: "— Leistung wählen —",
    followUs: "Folgen Sie uns",
  },
  zh: {
    home: "首页", about: "关于我们", services: "服务", gallery: "图库",
    booking: "预约", testimonials: "评价", contact: "联系",
    tagline: "综合美发沙龙",
    description: "男女发型、美甲、美脚和面部护理。雅温得现代美容的卓越之选。",
    rdv: "立即预约", whatsapp: "WhatsApp",
    ourServices: "我们的服务", ourGallery: "我们的作品",
    bookNow: "立即预约", sendWhatsApp: "通过WhatsApp发送",
    fullName: "全名", phone: "电话", service: "所需服务",
    date: "首选日期", time: "时间", notes: "备注 / 特殊要求",
    depositNotice: "需要通过Orange Money或MTN Mobile Money支付25%的订金。",
    copyright: "版权所有。",
    poweredBy: "技术支持",
    mentions: "法律声明",
    privacy: "隐私政策",
    testimonials_title: "他们信任我们",
    testimonials_sub: "了解我们客户的体验。分享您的！",
    share: "分享我的体验",
    yourName: "您的姓名", yourService: "所获服务", yourRating: "您的评分",
    yourExp: "您的体验", publish: "发布我的评价",
    thankYou: "谢谢！", published: "您的评价已发布。",
    chooseService: "— 选择服务 —",
    followUs: "关注我们",
  },
  ar: {
    home: "الرئيسية", about: "من نحن", services: "الخدمات", gallery: "المعرض",
    booking: "حجز موعد", testimonials: "التقييمات", contact: "اتصل بنا",
    tagline: "صالون تصفيف شعر مختلط",
    description: "قصات شعر للرجال والنساء، مانيكير، باديكير وعناية بالبشرة. التميز في الجمال الحديث في ياوندي.",
    rdv: "احجز الآن", whatsapp: "واتساب",
    ourServices: "خدماتنا", ourGallery: "أعمالنا",
    bookNow: "احجز الآن", sendWhatsApp: "إرسال عبر واتساب",
    fullName: "الاسم الكامل", phone: "الهاتف", service: "الخدمة المطلوبة",
    date: "التاريخ المفضل", time: "الوقت", notes: "ملاحظات / طلبات خاصة",
    depositNotice: "مطلوب دفع عربون 25% عبر Orange Money أو MTN Mobile Money.",
    copyright: "جميع الحقوق محفوظة.",
    poweredBy: "بدعم من",
    mentions: "الإشعار القانوني",
    privacy: "سياسة الخصوصية",
    testimonials_title: "يثقون بنا",
    testimonials_sub: "اكتشف تجارب عملائنا. شارك تجربتك!",
    share: "شارك تجربتي",
    yourName: "اسمك", yourService: "الخدمة المستلمة", yourRating: "تقييمك",
    yourExp: "تجربتك", publish: "نشر تقييمي",
    thankYou: "شكراً!", published: "تم نشر تقييمك.",
    chooseService: "— اختر خدمة —",
    followUs: "تابعنا",
  },
  pt: {
    home: "Início", about: "Sobre nós", services: "Serviços", gallery: "Galeria",
    booking: "Agendamento", testimonials: "Avaliações", contact: "Contato",
    tagline: "Salão de cabeleireiro misto",
    description: "Cortes para homens e mulheres, manicure, pedicure e cuidados faciais. A excelência da beleza moderna em Yaoundé.",
    rdv: "Agendar agora", whatsapp: "WhatsApp",
    ourServices: "Nossos Serviços", ourGallery: "Nossos Trabalhos",
    bookNow: "Agendar agora", sendWhatsApp: "Enviar pelo WhatsApp",
    fullName: "Nome completo", phone: "Telefone", service: "Serviço desejado",
    date: "Data preferida", time: "Hora", notes: "Notas / Pedidos especiais",
    depositNotice: "Um depósito de 25% será necessário via Orange Money ou MTN Mobile Money.",
    copyright: "Todos os direitos reservados.",
    poweredBy: "Desenvolvido por",
    mentions: "Aviso legal",
    privacy: "Política de privacidade",
    testimonials_title: "Eles confiam em nós",
    testimonials_sub: "Descubra as experiências dos nossos clientes. Compartilhe a sua!",
    share: "Compartilhar minha experiência",
    yourName: "Seu nome", yourService: "Serviço recebido", yourRating: "Sua avaliação",
    yourExp: "Sua experiência", publish: "Publicar minha avaliação",
    thankYou: "Obrigado!", published: "Sua avaliação foi publicada.",
    chooseService: "— Escolher um serviço —",
    followUs: "Siga-nos",
  },
  it: {
    home: "Home", about: "Chi siamo", services: "Servizi", gallery: "Galleria",
    booking: "Appuntamento", testimonials: "Recensioni", contact: "Contatti",
    tagline: "Salone di parrucchieri misto",
    description: "Tagli per uomini e donne, manicure, pedicure e cura del viso. L'eccellenza della bellezza moderna a Yaoundé.",
    rdv: "Prenota ora", whatsapp: "WhatsApp",
    ourServices: "I Nostri Servizi", ourGallery: "I Nostri Lavori",
    bookNow: "Prenota ora", sendWhatsApp: "Invia via WhatsApp",
    fullName: "Nome completo", phone: "Telefono", service: "Servizio desiderato",
    date: "Data preferita", time: "Ora", notes: "Note / Richieste speciali",
    depositNotice: "Sarà richiesto un acconto del 25% tramite Orange Money o MTN Mobile Money.",
    copyright: "Tutti i diritti riservati.",
    poweredBy: "Sviluppato da",
    mentions: "Note legali",
    privacy: "Informativa sulla privacy",
    testimonials_title: "Si fidano di noi",
    testimonials_sub: "Scopri le esperienze dei nostri clienti. Condividi la tua!",
    share: "Condividi la mia esperienza",
    yourName: "Il tuo nome", yourService: "Servizio ricevuto", yourRating: "La tua valutazione",
    yourExp: "La tua esperienza", publish: "Pubblica la mia recensione",
    thankYou: "Grazie!", published: "La tua recensione è stata pubblicata.",
    chooseService: "— Scegli un servizio —",
    followUs: "Seguici",
  },
  ru: {
    home: "Главная", about: "О нас", services: "Услуги", gallery: "Галерея",
    booking: "Запись", testimonials: "Отзывы", contact: "Контакты",
    tagline: "Смешанный салон красоты",
    description: "Стрижки для мужчин и женщин, маникюр, педикюр и уход за лицом. Превосходство современной красоты в Яунде.",
    rdv: "Записаться", whatsapp: "WhatsApp",
    ourServices: "Наши услуги", ourGallery: "Наши работы",
    bookNow: "Записаться", sendWhatsApp: "Отправить через WhatsApp",
    fullName: "Полное имя", phone: "Телефон", service: "Желаемая услуга",
    date: "Предпочтительная дата", time: "Время", notes: "Заметки / Особые пожелания",
    depositNotice: "Потребуется залог 25% через Orange Money или MTN Mobile Money.",
    copyright: "Все права защищены.",
    poweredBy: "Разработано",
    mentions: "Юридическая информация",
    privacy: "Политика конфиденциальности",
    testimonials_title: "Они нам доверяют",
    testimonials_sub: "Узнайте об опыте наших клиентов. Поделитесь своим!",
    share: "Поделиться опытом",
    yourName: "Ваше имя", yourService: "Полученная услуга", yourRating: "Ваша оценка",
    yourExp: "Ваш опыт", publish: "Опубликовать отзыв",
    thankYou: "Спасибо!", published: "Ваш отзыв опубликован.",
    chooseService: "— Выберите услугу —",
    followUs: "Следите за нами",
  },
  nl: {
    home: "Home", about: "Over ons", services: "Diensten", gallery: "Galerij",
    booking: "Afspraak", testimonials: "Beoordelingen", contact: "Contact",
    tagline: "Gemengde kapsalon",
    description: "Kapsels voor mannen en vrouwen, manicure, pedicure en gezichtsverzorging. De excellentie van moderne schoonheid in Yaoundé.",
    rdv: "Nu boeken", whatsapp: "WhatsApp",
    ourServices: "Onze Diensten", ourGallery: "Ons Werk",
    bookNow: "Nu boeken", sendWhatsApp: "Stuur via WhatsApp",
    fullName: "Volledige naam", phone: "Telefoon", service: "Gewenste dienst",
    date: "Voorkeursdatum", time: "Tijd", notes: "Notities / Speciale verzoeken",
    depositNotice: "Een aanbetaling van 25% is vereist via Orange Money of MTN Mobile Money.",
    copyright: "Alle rechten voorbehouden.",
    poweredBy: "Ontwikkeld door",
    mentions: "Wettelijke kennisgeving",
    privacy: "Privacybeleid",
    testimonials_title: "Ze vertrouwen ons",
    testimonials_sub: "Ontdek de ervaringen van onze klanten. Deel de jouwe!",
    share: "Deel mijn ervaring",
    yourName: "Uw naam", yourService: "Ontvangen dienst", yourRating: "Uw beoordeling",
    yourExp: "Uw ervaring", publish: "Publiceer mijn beoordeling",
    thankYou: "Bedankt!", published: "Uw beoordeling is gepubliceerd.",
    chooseService: "— Kies een dienst —",
    followUs: "Volg ons",
  },
};

// ── Provider langue ────────────────────────────────────────────────────────
export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem("wk_lang") as Lang) || "fr"; } catch { return "fr"; }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("wk_lang", l); } catch {}
  };

  const t = (key: string) => TRANSLATIONS[lang][key] ?? TRANSLATIONS["fr"][key] ?? key;

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

// ── Sélecteur de langue ────────────────────────────────────────────────────
export const LangSelector = () => {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider border border-white/10 hover:border-white/25 rounded-xl px-3 py-2 bg-white/3"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{current.flag} {current.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full mb-2 right-0 w-44 bg-[#0d1020] border border-white/12 rounded-2xl overflow-hidden shadow-2xl z-50"
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors hover:bg-white/8 ${lang === l.code ? "text-gold bg-gold/8" : "text-white/60"}`}
              >
                <span className="text-base">{l.flag}</span>
                <span className="font-medium">{l.label}</span>
                {lang === l.code && <span className="ml-auto text-gold text-[10px]">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Footer ─────────────────────────────────────────────────────────────────
export const Footer = () => {
  const { navigateTo } = usePageTransition();
  const { t } = useLang();
  const [showMentions, setShowMentions] = useState(false);
  const [showConfidentialite, setShowConfidentialite] = useState(false);

  const links: { key: string; page: PageId }[] = [
    { key: "home",     page: "home" },
    { key: "services", page: "services" },
    { key: "gallery",  page: "gallery" },
    { key: "contact",  page: "contact" },
  ];

  return (
    <>
      <footer className="bg-background border-t border-white/10 py-10 md:py-14 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Ligne principale */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">

            {/* Logo */}
            <div className="flex items-center gap-3 text-gold font-bold text-xl md:text-2xl tracking-tighter">
              <Scissors className="w-6 h-6 md:w-8 md:h-8 rotate-45 flex-shrink-0" />
              <span style={{ fontFamily: "'Playfair Display', serif" }}>WK HAIR CARE</span>
            </div>

            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm uppercase tracking-widest text-white/40">
              {links.map((l) => (
                <button key={l.page} onClick={() => navigateTo(l.page)} className="hover:text-gold transition-colors">
                  {t(l.key)}
                </button>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-3 md:gap-4">
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                <Facebook size={16} />
              </a>
              <a href="https://wa.me/237695752235" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-[#25D366] hover:border-[#25D366] transition-all">
                <MessageCircle size={16} />
              </a>
              <a href="https://www.tiktok.com/@kemchewilfried" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:border-white hover:bg-black transition-all">
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div className="mt-8 md:mt-10 h-px bg-white/5" />

          {/* Bas footer */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">

            <div className="flex flex-col gap-1 text-white/20 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em]">
              <p>© {new Date().getFullYear()} WK HAIR CARE — {t("copyright")}</p>
              <p>{t("poweredBy")} <span className="text-gold/50">IMANI-TECH SOLUTIONS SARL</span></p>
            </div>

            {/* Liens légaux + sélecteur langue */}
            <div className="flex flex-col items-center gap-3">
              <LangSelector />
              <div className="flex flex-wrap justify-center gap-3 md:gap-5">
                <button onClick={() => setShowMentions(true)}
                  className="flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-widest text-white/30 hover:text-gold transition-colors group">
                  <span className="w-3 h-px bg-white/20 group-hover:bg-gold transition-colors" />
                  {t("mentions")}
                </button>
                <span className="text-white/15 text-xs">|</span>
                <button onClick={() => setShowConfidentialite(true)}
                  className="flex items-center gap-1.5 text-[10px] md:text-xs uppercase tracking-widest text-white/30 hover:text-gold transition-colors group">
                  <span className="w-3 h-px bg-white/20 group-hover:bg-gold transition-colors" />
                  {t("privacy")}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full h-0.5 rounded-full opacity-20"
            style={{ background: "linear-gradient(90deg, #B22234 33%, #F5F5F5 33%, #F5F5F5 66%, #3C3B6E 66%)" }} />
        </div>
      </footer>

      <AnimatePresence>
        {showMentions && <MentionsLegales onClose={() => setShowMentions(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showConfidentialite && <PolitiqueConfidentialite onClose={() => setShowConfidentialite(false)} />}
      </AnimatePresence>
    </>
  );
};
