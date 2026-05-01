import { useEffect, useMemo, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { CONTACT_EMAIL } from "@/config/branding";
import aboutImage from "@media/aboutImage.jpg";
import styles from "./LeadCardPopup.module.css";

const SHOW_DELAY_MS = 8_000;
const STORAGE_KEY = "sha-lead-popup-dismissed";

function sanitizeInput(value: string): string {
  return value.replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, "").trim();
}

function isValidPhone(phone: string): boolean {
  const normalized = phone.replace(/[^\d+]/g, "");
  return /^\+?\d{9,15}$/.test(normalized);
}

export function LeadCardPopup() {
  const [visible, setVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (dismissed) return;

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const formId = useMemo(() => `lead-popup-form-${Math.random().toString(36).slice(2)}`, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = sanitizeInput(String(data.get("name") ?? "")).slice(0, 80);
    const phone = sanitizeInput(String(data.get("phone") ?? "")).slice(0, 30);
    const antiSpam = String(data.get("_honey") ?? "").trim();
    if (antiSpam) return;

    if (name.length < 2) {
      toast.error("אנא הזינו שם מלא תקין.");
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error("אנא הזינו מספר טלפון תקין.");
      return;
    }

    setIsSending(true);
    const toastId = toast.loading("שולח פרטים...");
    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("phone", phone);
      payload.append("_subject", `ליד חדש מפופאפ — ${name}`);
      payload.append("_captcha", "false");
      payload.append("_template", "table");

      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!res.ok) {
        throw new Error("Lead popup submit failed");
      }

      toast.success("תודה! נחזור אליכם בהקדם.", { id: toastId });
      closePopup();
    } catch {
      toast.error("שליחה נכשלה כרגע. נסו שוב בעוד רגע.", { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={closePopup}>
      <aside
        className={styles.card}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={closePopup}
          aria-label="סגירת חלון"
        >
          ×
        </button>

        <img src={aboutImage} alt="שני שי" className={styles.photo} />

        <div className={styles.content}>
          <p className={styles.eyebrow}>סטודיו SHA</p>
          <h3 id={`${formId}-title`} className={styles.title}>
            כל פרויקט טוב מתחיל בתכנון מדויק.
          </h3>
          <p className={styles.description}>
            השאירו פרטים ואחזור אליכם לשיחה קצרה שתכוון אתכם נכון כבר מהשלב
            הראשון.
          </p>
          <form onSubmit={onSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="שם מלא"
              className={styles.field}
              required
            />
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="טלפון"
              className={styles.field}
              required
            />
            <input
              type="text"
              name="_honey"
              className="sr-only"
              tabIndex={-1}
              autoComplete="off"
            />
            <button type="submit" className={styles.submit} disabled={isSending}>
              {isSending ? "שולח..." : "שליחה"}
            </button>
          </form>
          <small className={styles.note}>*ייעוץ ראשוני ללא התחייבות</small>
        </div>
      </aside>
    </div>
  );
}
