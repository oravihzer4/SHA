import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/data/services";
import { brandIcons } from "@/config/assets";
import { Reveal } from "@/components/Reveal";
import styles from "./Testimonials.module.css";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[index]!;

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const extraMarks = brandIcons.slice(4);

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.deco}>
        {extraMarks.map((src) => (
          <img key={src} src={src} alt="" className={styles.decoIcon} />
        ))}
      </div>
      <div className={styles.inner}>
        <Reveal as="div" className={styles.header}>
          <div>
            <p className={styles.eyebrow}>לקוחות מספרים</p>
            <h2 className={styles.title}>מה הלקוחות אומרים</h2>
          </div>
          <div className={styles.nav}>
            <button
              type="button"
              onClick={prev}
              className={styles.navBtn}
              aria-label="המלצה קודמת"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className={styles.navBtn}
              aria-label="המלצה הבאה"
            >
              ›
            </button>
          </div>
        </Reveal>

        <div className={styles.quoteWrap}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, x: reduce ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -24 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={styles.blockquote}
            >
              <p className={styles.quote}>“{t.quote}”</p>
              <footer className={styles.footer}>
                {t.name}
                <span className={styles.sep}>·</span>
                {t.role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`${styles.dot} ${i === index ? styles.dotActive : styles.dotInactive}`}
              aria-label={`מעבר להמלצה ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
