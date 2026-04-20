import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/config/branding";
import { brandIcons } from "@/config/assets";
import { Reveal } from "@/components/Reveal";
import styles from "./Contact.module.css";

const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "היי SHA, אשמח לדבר על פרויקט חדש.",
)}`;
const SUBMIT_INTERVAL_MS = 15_000;
const MAX_NAME_LEN = 80;
const MAX_EMAIL_LEN = 120;
const MAX_MESSAGE_LEN = 2000;

function sanitizeText(value: string): string {
  return value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function Contact() {
  const [isSending, setIsSending] = useState(false);
  const mountedAtRef = useRef<number>(Date.now());

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const now = Date.now();
    const name = sanitizeText(String(data.get("name") ?? "")).slice(
      0,
      MAX_NAME_LEN,
    );
    const email = sanitizeText(String(data.get("email") ?? "")).slice(
      0,
      MAX_EMAIL_LEN,
    );
    const message = sanitizeText(String(data.get("message") ?? "")).slice(
      0,
      MAX_MESSAGE_LEN,
    );
    const antiSpam = String(data.get("_honey") ?? "").trim();
    if (antiSpam) return;

    if (now - mountedAtRef.current < 1500) {
      toast.error("נראה שהטופס נשלח מהר מדי. נסו שוב בעוד רגע.");
      return;
    }

    const lastSubmit = Number(
      window.localStorage.getItem("sha-last-contact-submit") ?? 0,
    );
    if (lastSubmit && now - lastSubmit < SUBMIT_INTERVAL_MS) {
      toast.error("כבר נשלחה פנייה לאחרונה. נסו שוב בעוד כמה שניות.");
      return;
    }

    if (!name || name.length < 2) {
      toast.error("אנא מלאו שם מלא תקין.");
      return;
    }
    if (!email || !isValidEmail(email)) {
      toast.error("אנא מלאו כתובת אימייל תקינה.");
      return;
    }
    if (!message || message.length < 8) {
      toast.error("אנא הוסיפו מעט יותר פרטים על הפרויקט.");
      return;
    }

    setIsSending(true);
    const toastId = toast.loading("שולח את הפנייה...");
    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("message", message);
      payload.append("_subject", `פנייה חדשה מאת ${name || "מבקר באתר"}`);
      payload.append("_captcha", "false");
      payload.append("_template", "table");

      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!res.ok) {
        throw new Error("שליחת הפנייה נכשלה");
      }

      form.reset();
      window.localStorage.setItem("sha-last-contact-submit", String(now));
      toast.success("הפנייה נשלחה בהצלחה. נחזור אליכם בהקדם.", {
        id: toastId,
      });
    } catch {
      toast.error("לא ניתן לשלוח כרגע. אפשר לפנות בוואטסאפ או במייל.", {
        id: toastId,
      });
    } finally {
      setIsSending(false);
    }
  };

  const deco = brandIcons.slice(0, 4);

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.deco}>
        {deco.map((src) => (
          <img key={src} src={src} alt="" className={styles.decoIcon} />
        ))}
      </div>

      <div className={styles.layout}>
        <Reveal className={styles.colIntro} as="div">
          <p className={styles.eyebrow}>צור קשר</p>
          <h2 className={styles.title}>בואו נתחיל שיחה</h2>
          <p className={styles.lead}>
            שתפו כמה פרטים על החלל שלכם. נחזור אליכם בהקדם, לרוב עד שני ימי
            עסקים.
          </p>
          <motion.a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className={styles.waLink}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={styles.waIcon} aria-hidden>
              ✦
            </span>
            וואטסאפ
          </motion.a>
        </Reveal>

        <Reveal className={styles.colForm} as="div" delay={0.06}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div>
              <label htmlFor="name" className={styles.label}>
                שם מלא
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className={styles.field}
              />
            </div>
            <div>
              <label htmlFor="email" className={styles.label}>
                אימייל
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={styles.field}
              />
            </div>
            <div>
              <label htmlFor="message" className={styles.label}>
                פרטי הפרויקט
              </label>
              <textarea
                id="message"
                name="message"
                rows={1}
                required
                className={styles.field}
              />
            </div>
            <input
              type="text"
              name="_honey"
              className="sr-only"
              tabIndex={-1}
              autoComplete="off"
            />
            <button
              type="submit"
              className={styles.submit}
              disabled={isSending}
            >
              {isSending ? "שולח..." : "שליחה במייל"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
