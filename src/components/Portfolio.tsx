import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  PORTFOLIO_CATEGORIES,
  type PortfolioCategory,
  type PortfolioCategoryId,
  type PortfolioProject,
} from "@/config/portfolio";
import { Reveal } from "@/components/Reveal";
import { OptimizedImage } from "@/components/OptimizedImage";
import styles from "./Portfolio.module.css";

export function Portfolio() {
  const reduce = useReducedMotion();
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<PortfolioCategoryId>("residential");
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(
    null,
  );
  const [activeImage, setActiveImage] = useState(0);

  const selectedCategory = useMemo<PortfolioCategory>(
    () =>
      PORTFOLIO_CATEGORIES.find((c) => c.id === selectedCategoryId) ??
      PORTFOLIO_CATEGORIES[0]!,
    [selectedCategoryId],
  );

  const openProject = (project: PortfolioProject) => {
    setActiveProject(project);
    setActiveImage(0);
  };

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

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="div" className={styles.intro}>
          <p className={styles.eyebrow}>פורטפוליו</p>
          <h2 className={styles.title}>פרויקטים </h2>
          <p className={styles.lead}>
            בחרו תחום, היכנסו לפרויקט וצפו בכל התמונות הרלוונטיות.
          </p>
        </Reveal>

        <div
          className={styles.options}
          role="tablist"
          aria-label="תחומי פורטפוליו"
        >
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={cat.id === selectedCategoryId}
              aria-controls={`sector-panel-${cat.id}`}
              id={`sector-tab-${cat.id}`}
              className={`${styles.optionBtn} ${
                cat.id === selectedCategoryId ? styles.optionBtnActive : ""
              }`}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              <span className={styles.optionContent}>
                {cat.iconSrc ? (
                  <img src={cat.iconSrc} alt="" className={styles.optionIcon} />
                ) : null}
                <span className={styles.optionText}>
                  <span className={styles.optionTitle}>{cat.title}</span>
                  <span className={styles.optionHint}>צפייה בפרויקטים</span>
                </span>
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={selectedCategory.id}
            id={`sector-panel-${selectedCategory.id}`}
            role="tabpanel"
            aria-labelledby={`sector-tab-${selectedCategory.id}`}
            className={styles.categoryPanel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: reduce ? 0 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className={styles.categoryHead}>
              <h3 className={styles.categoryTitle}>{selectedCategory.title}</h3>
              <p className={styles.categoryDescription}>
                {selectedCategory.description}
              </p>
            </div>

            {selectedCategory.projects.length === 0 ? (
              <p className={styles.categoryEmpty}>
                עדיין אין פרויקטים בתחום הזה. הוסיפו תמונות תחת
                <span className={styles.categoryEmptyCode}>
                  {` media/projectsMedia/<private|offices|commercial>/<project-name>/`}
                </span>
                .
              </p>
            ) : (
              <div className={styles.projectsGrid}>
                {selectedCategory.projects.map((project, idx) => (
                  <Reveal
                    key={project.id}
                    as="div"
                    delay={(idx % 6) * 0.04}
                    className={styles.projectCardWrap}
                  >
                    <button
                      type="button"
                      className={`group ${styles.projectCard}`}
                      onClick={() => openProject(project)}
                      aria-label={`פתחו את ${project.title}`}
                    >
                      <div className={styles.projectCoverWrap}>
                        <OptimizedImage
                          src={project.cover}
                          alt={project.title}
                          className={styles.projectCover}
                        />
                        <span className={styles.projectOverlay} />
                        <span className={styles.projectEnter}>
                          כניסה לפרויקט
                        </span>
                      </div>
                      <div className={styles.projectMeta}>
                        <h4 className={styles.projectTitle}>{project.title}</h4>
                        <p className={styles.projectCount}>
                          {project.images.length} תמונות
                        </p>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            )}
          </motion.section>
        </AnimatePresence>
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

              <h4 className={styles.modalProjectTitle}>
                {activeProject.title}
              </h4>

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

              <p className={styles.counter}>
                {activeImage + 1}
                <span className={styles.counterSep}>/</span>
                {total}
              </p>

              {total > 1 ? (
                <div className={styles.thumbsRow}>
                  <div className={styles.thumbsTrack}>
                    {activeProject.images.map((_, i) => (
                      <button
                        key={`${activeProject.id}-${i}`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImage(i);
                        }}
                        className={`${styles.thumb} ${
                          i === activeImage
                            ? styles.thumbActive
                            : styles.thumbInactive
                        }`}
                        aria-label={`מעבר לתמונה ${i + 1}`}
                        aria-current={i === activeImage ? "true" : undefined}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
