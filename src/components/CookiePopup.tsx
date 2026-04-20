import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import styles from "./CookiePopup.module.css";

const STORAGE_KEY = "sha-cookie-consent";

export function CookiePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setVisible(saved !== "accepted");
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className={styles.popup} role="dialog" aria-live="polite" aria-label="הודעת עוגיות">
      <p className={styles.text}>
        אנחנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלכם.
      </p>
      <Button type="button" variant="outline" className={styles.action} onClick={acceptCookies}>
        אישור
      </Button>
    </aside>
  );
}
