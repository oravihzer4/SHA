import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import backgroundVideo from "@media/video/video1.mp4";
import { Button } from "@/components/Button";
import styles from "./ScrollThroughSection.module.css";

export function ScrollThroughSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.14]);
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="אזור וידאו מודגש"
    >
      <motion.div
        className={styles.backgroundWrap}
        style={{ y, scale }}
        aria-hidden
      >
        <video
          className={styles.backgroundVideo}
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </motion.div>
      <div className={styles.inner}>
        <p className={styles.smallHeadline}>בואו נעבוד יחד</p>
        <p className={styles.title}>
          אני אעזור לכם להתאהב מחדש
          <br />
          בבית שלכם
        </p>
        <Button
          type="button"
          variant="primary"
          className={styles.cta}
          onClick={scrollToContact}
        >
          לפרטים נוספים
        </Button>
      </div>
    </section>
  );
}
