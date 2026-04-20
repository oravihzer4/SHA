import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import backgroundVideo from "@media/video/video1.mp4";
import { Button } from "@/components/Button";
import styles from "./ScrollThroughSection.module.css";

export function ScrollThroughSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.14]);
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (shouldLoadVideo) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [shouldLoadVideo]);

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
          ref={videoRef}
          className={styles.backgroundVideo}
          src={shouldLoadVideo ? backgroundVideo : undefined}
          autoPlay={shouldLoadVideo}
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
