import { useMemo, useState } from "react";
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

  const selectedCategory = useMemo<PortfolioCategory>(
    () =>
      PORTFOLIO_CATEGORIES.find((c) => c.id === selectedCategoryId) ??
      PORTFOLIO_CATEGORIES[0]!,
    [selectedCategoryId],
  );

  const openProject = (project: PortfolioProject) => {
    window.location.hash = `#/project/${encodeURIComponent(project.id)}`;
  };

  return (
    <section id="portfolio" className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="div" className={styles.intro}>
          <h2 className={styles.title}>פרויקטים </h2>
          <p className={styles.lead}>
            בחרו תחום, היכנסו לפרויקט וצפו בגלריית התמונות
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
              aria-label={cat.title}
            >
              <span className={styles.optionContent}>
                {cat.iconSrc ? (
                  <img src={cat.iconSrc} alt="" className={styles.optionIcon} />
                ) : null}
                <span className={styles.optionTitle}>{cat.title}</span>
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
    </section>
  );
}
