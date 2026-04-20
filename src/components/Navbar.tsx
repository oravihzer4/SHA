import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { logos } from "@/config/branding";
import { SITE_SECTION_LINKS } from "@/config/siteNav";
import { useI18n } from "@/i18n";
import styles from "./Navbar.module.css";

const links = SITE_SECTION_LINKS.filter((link) => link.id !== "testimonials");

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const { t } = useI18n();

  const labelById: Record<string, string> = {
    about: t("nav.about"),
    portfolio: t("nav.portfolio"),
    services: t("nav.services"),
    contact: t("nav.contact"),
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 48);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const logoSrc = solid ? logos.markDark : logos.markLight;

  return (
    <motion.header
      className={styles.header}
      initial={false}
      animate={{
        backgroundColor: solid ? "rgba(255, 253, 243, 0.92)" : "rgba(0,0,0,0)",
        boxShadow: solid ? "0 1px 0 rgba(56,23,25,0.06)" : "none",
        backdropFilter: solid ? "blur(14px)" : "blur(0px)",
      }}
      transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.inner} style={{ height: "var(--header-height)" }}>
        <button
          type="button"
          onClick={() => scrollTo("hero")}
          className={styles.logoBtn}
          aria-label="SHA — עמוד הבית"
        >
          <motion.img
            key={logoSrc}
            src={logoSrc}
            alt="SHA"
            className={styles.logo}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          />
        </button>

        <nav className={styles.navDesktop} aria-label="ניווט ראשי">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollTo(l.id)}
              className={
                solid ? styles.navLinkSolid : styles.navLinkTransparent
              }
            >
              {labelById[l.id] ?? l.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={solid ? styles.menuBtnSolid : styles.menuBtnTransparent}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{t("nav.menu")}</span>
          <motion.span
            className={styles.burgerLine}
            animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className={styles.burgerLine}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className={styles.burgerLine}
            animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      <motion.div
        id="mobile-menu"
        className={styles.mobileMenu}
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.35 }}
      >
        <div className={styles.mobileLinks}>
          {links.map((l, i) => (
            <motion.button
              key={l.id}
              type="button"
              initial={false}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -12 }}
              transition={{ delay: open ? 0.05 * i : 0 }}
              onClick={() => scrollTo(l.id)}
              className={styles.mobileLink}
            >
              {labelById[l.id] ?? l.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
