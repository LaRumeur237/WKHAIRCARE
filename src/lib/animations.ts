import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGSAPAnimations = () => {
  useEffect(() => {
    // Parallax effect for images
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      gsap.to(img, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Glitch effect on scroll for titles
    const titles = document.querySelectorAll("h2");
    titles.forEach((title) => {
      gsap.fromTo(
        title,
        {
          skewX: 10,
          opacity: 0,
        },
        {
          skewX: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};
