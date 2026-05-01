import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { heroBackgroundImages } from "@/config/assets";
import { logos } from "@/config/branding";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/Button";
import { useI18n } from "@/i18n";
import styles from "./Hero.module.css";
import heroLogo from "@media/וריאציות אייקון ללא רקע/Artboard 35@4x-8.png";

const HERO_SLIDE_INTERVAL_MS = 7000;

export function Hero() {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const [heroIndex, setHeroIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const images = heroBackgroundImages;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  useEffect(() => {
    if (reduce || images.length <= 1) return;
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % images.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, images.length]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.section} ref={sectionRef}>
      <motion.div
        className={styles.bgWrap}
        style={reduce ? undefined : { y: bgY }}
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                scale: [1, 1.04],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        {images[0] ? (
          <div className={styles.slidesHost} aria-hidden>
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={images[heroIndex]}
                className={styles.slide}
                initial={{ opacity: reduce ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: reduce ? 1 : 0 }}
                transition={{
                  duration: reduce ? 0 : 1.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <OptimizedImage
                  src={images[heroIndex]!}
                  alt=""
                  priority={heroIndex === 0}
                  className={styles.heroImage}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        ) : null}
        <div className={styles.gradient} aria-hidden />
      </motion.div>

      <div className={styles.content}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={heroLogo || logos.studioLockup}
            alt="Studio SHA"
            className={styles.logo}
          />
          <h1 className={styles.tagline}>{t("hero.tagline")}</h1>
          <p className={styles.description}>{t("hero.body")}</p>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            type="button"
            variant="ghost"
            onClick={() => scrollTo("portfolio")}
          >
            {t("hero.viewWork")}
          </Button>
          <Button
            type="button"
            variant="primary"
            className={styles.ctaPrimary}
            onClick={() => scrollTo("contact")}
          >
            {t("hero.beginProject")}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden
      >
        <motion.div
          className={styles.scrollLine}
          animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
