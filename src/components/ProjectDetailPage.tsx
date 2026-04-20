import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  getPortfolioProjectById,
  type PortfolioProject,
} from "@/config/portfolio";
import { OptimizedImage } from "@/components/OptimizedImage";
import styles from "./ProjectDetailPage.module.css";

function seededSort<T>(items: T[], seed: string): T[] {
  const out = items.map((item, index) => ({ item, index }));
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  out.sort(() => {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    const av = hash;
    hash = (hash * 1664525 + 1013904223) >>> 0;
    const bv = hash;
    if (av === bv) return 0;
    return av > bv ? 1 : -1;
  });
  return out.map((x) => x.item);
}

export function ProjectDetailPage({ projectId }: { projectId: string }) {
  const reduce = useReducedMotion();
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(
    null,
  );
  const [activeImage, setActiveImage] = useState(0);

  const resolved = useMemo(
    () => getPortfolioProjectById(projectId),
    [projectId],
  );
  const project = resolved?.project ?? null;

  const shuffledImages = useMemo(() => {
    if (!project) return [];
    return seededSort(project.images, `${project.id}-grid`);
  }, [project]);

  const close = useCallback(() => {
    setActiveProject(null);
    setActiveImage(0);
  }, []);

  const total = activeProject?.images.length ?? 0;
  const open = Boolean(activeProject && total > 0);

  const goPrev = useCallback(() => {
    if (!activeProject || total === 0) return;
    setActiveImage((i) => (i - 1 + total) % total);
  }, [activeProject, total]);

  const goNext = useCallback(() => {
    if (!activeProject || total === 0) return;
    setActiveImage((i) => (i + 1) % total);
  }, [activeProject, total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, goPrev, goNext]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const openImage = (src: string) => {
    if (!project) return;
    const idx = project.images.findIndex((img) => img === src);
    setActiveProject(project);
    setActiveImage(idx >= 0 ? idx : 0);
  };

  const goBack = () => {
    window.location.hash = "#portfolio";
    window.setTimeout(() => {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [projectId]);

  if (!project) {
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.notFound}>הפרויקט המבוקש לא נמצא.</p>
          <button type="button" className={styles.backBtn} onClick={goBack}>
            חזרה לפורטפוליו
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <button type="button" className={styles.backBtn} onClick={goBack}>
          ← חזרה לפורטפוליו
        </button>
        <p className={styles.eyebrow}>{resolved?.category.title}</p>
        <h1 className={styles.title}>{project.title}</h1>

        <div className={styles.masonry}>
          {shuffledImages.map((src, idx) => (
            <button
              key={`${project.id}-${idx}-${src}`}
              type="button"
              className={`${styles.tile} ${idx % 5 === 0 ? styles.tall : ""}`}
              onClick={() => openImage(src)}
              aria-label={`פתיחת תמונה ${idx + 1} בקרוסלה`}
            >
              <OptimizedImage
                src={src}
                alt={`${project.title} תמונה ${idx + 1}`}
                className={styles.image}
              />
            </button>
          ))}
        </div>

        <div className={styles.bottomActions}>
          <button type="button" className={styles.backBtn} onClick={goBack}>
            חזרה לפרויקטים
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && activeProject ? (
          <motion.div
            className={styles.backdrop}
            role="dialog"
            aria-modal="true"
            aria-label={`גלריה של ${activeProject.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            onClick={close}
          >
            <motion.div
              className={styles.dialogInner}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{
                duration: reduce ? 0 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className={styles.closeBtn}
                aria-label="סגירת גלריה"
              >
                ×
              </button>

              <h4 className={styles.modalProjectTitle}>{activeProject.title}</h4>
              <div className={styles.carouselWrap}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className={styles.navPrev}
                  aria-label="תמונה קודמת"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className={styles.navNext}
                  aria-label="תמונה הבאה"
                >
                  ›
                </button>

                <div className={styles.slideFrame}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${activeProject.id}-${activeImage}`}
                      className={styles.slideMotion}
                      initial={{ opacity: 0, x: reduce ? 0 : 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: reduce ? 0 : -28 }}
                      transition={{
                        duration: reduce ? 0 : 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <OptimizedImage
                        src={activeProject.images[activeImage]!}
                        alt={`${activeProject.title} תמונה ${activeImage + 1} מתוך ${total}`}
                        className={styles.slideImage}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
