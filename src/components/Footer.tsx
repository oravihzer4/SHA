import { CONTACT_EMAIL, logos, WHATSAPP_NUMBER } from "@/config/branding";
import { SITE_SECTION_LINKS } from "@/config/siteNav";
import { services } from "@/data/services";
import { useI18n } from "@/i18n";
import styles from "./Footer.module.css";

const waHref = `https://wa.me/${WHATSAPP_NUMBER}`;
const socialLinks = [
  { id: "instagram", label: "אינסטגרם", href: "https://instagram.com" },
  { id: "facebook", label: "פייסבוק", href: "https://facebook.com" },
  { id: "pinterest", label: "פינטרסט", href: "https://pinterest.com" },
] as const;

function SocialIcon({ id }: { id: (typeof socialLinks)[number]["id"] }) {
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M13.3 20V12.9H15.9L16.3 10.2H13.3V8.5C13.3 7.7 13.6 7.1 14.8 7.1H16.4V4.7C16.1 4.7 15.3 4.6 14.3 4.6C12.1 4.6 10.6 5.9 10.6 8.3V10.2H8.3V12.9H10.6V20H13.3Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.8c-3.4 0-6.2 2.6-6.2 5.9 0 2.3 1.2 4.1 3 4.9-.1-.4-.2-1.1 0-1.6l.8-3.2s-.2-.5-.2-1.2c0-1.1.7-2 1.6-2 .8 0 1.2.6 1.2 1.3 0 .8-.5 2.1-.8 3.2-.2 1 .6 1.8 1.7 1.8 2 0 3.3-2.5 3.3-5.4 0-2.2-1.5-3.9-4.2-3.9-3.1 0-5 2.2-5 4.7 0 .9.3 1.5.8 2 .2.2.2.3.1.6l-.3 1.1c-.1.3-.3.4-.6.3-1.6-.6-2.3-2.3-2.3-4.2 0-3.2 2.8-7 7.7-7 3.9 0 6.5 2.8 6.5 5.8 0 4-2.2 7-5.5 7-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.3 1-.8 2-1.2 2.8.9.3 1.8.4 2.8.4 3.4 0 6.2-2.6 6.2-5.9S15.4 4.8 12 4.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  const { t } = useI18n();
  const labelById: Record<string, string> = {
    about: t("nav.about"),
    portfolio: t("nav.portfolio"),
    services: t("nav.services"),
    testimonials: t("nav.stories"),
    contact: t("nav.contact"),
  };

  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.brandCol}>
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className={styles.logoBtn}
              aria-label="SHA — חזרה לראש העמוד"
            >
              <img src={logos.markDark} alt="SHA" className={styles.logo} />
            </button>
            <p className={styles.tagline}>
              {t("footer.tagline")}
            </p>
            <ul className={styles.socialList} aria-label="רשתות חברתיות">
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.socialLink}
                  >
                    <span className={styles.socialIcon} aria-hidden>
                      <SocialIcon id={social.id} />
                    </span>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.navCol} aria-label="תפריט תחתון">
            <h2 className={styles.navTitle}>{t("footer.navigate")}</h2>
            <ul className={styles.navList}>
              {SITE_SECTION_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(l.id)}
                    className={styles.navBtn}
                  >
                    {labelById[l.id] ?? l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.servicesCol}>
            <h2 className={styles.navTitle}>{t("footer.services")}</h2>
            <ul className={styles.navList}>
              {services.map((s) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => scrollToSection("services")}
                    className={styles.navBtn}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h2 className={styles.navTitle}>{t("footer.contact")}</h2>
            <ul className={styles.contactList}>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={styles.contactLink}
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactLink}
                >
                  {t("footer.whatsapp")}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className={styles.contactBtn}
                >
                  {t("footer.inquiry")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} SHA · שני שי. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
