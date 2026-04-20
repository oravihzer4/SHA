import { WHATSAPP_NUMBER } from "@/config/branding";
import { useI18n } from "@/i18n";
import styles from "./WhatsAppPopup.module.css";

const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "היי SHA, אשמח לדבר על פרויקט חדש.",
)}`;

export function WhatsAppPopup() {
  const { t } = useI18n();

  return (
    <a
      href={waHref}
      target="_blank"
      rel="noreferrer"
      className={styles.fab}
      aria-label={t("wa.open")}
    >
      <span className={styles.icon} aria-hidden>
        ✦
      </span>
      <span className={styles.label}>{t("wa.label")}</span>
    </a>
  );
}
