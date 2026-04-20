import { profileGallery, brandIcons } from "@/config/assets";
import { Reveal } from "@/components/Reveal";
import { OptimizedImage } from "@/components/OptimizedImage";
import aboutImage from "@media/aboutImage.jpg";
import styles from "./About.module.css";

const fallbackPrimary = profileGallery[Math.min(4, profileGallery.length - 1)] ?? "";
const primary = aboutImage || fallbackPrimary;
const accentIcon = brandIcons[Math.min(2, brandIcons.length - 1)];

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.layout}>
        <Reveal className={styles.colImage} as="div">
          <div className={styles.imageStack}>
            {primary ? (
              <OptimizedImage
                src={primary}
                alt="קומפוזיציית פנים של SHA"
                className={styles.primaryImage}
              />
            ) : null}
            {accentIcon ? (
              <img src={accentIcon} alt="" className={styles.accentIcon} />
            ) : null}
          </div>
        </Reveal>

        <Reveal className={styles.colCopy} as="div" delay={0.08}>
          <p className={styles.eyebrow}>סטודיו · שני שי</p>
          <h2 className={styles.title}>
            יוקרה מינימליסטית שמרגישה שייכת למקום.
          </h2>
          <div className={styles.body}>
            <p>
              SHA הוא סטודיו לעיצוב פנים המתמקד בחללים רגועים ועכשוויים —
              מקום שבו חומריות מדויקת, אור נדיב וירידה לפרטים פוגשים את חיי
              היומיום.
            </p>
            <p>
              בהובלת שני שי, כל פרויקט נבנה באיפוק ובדיוק: פלטה מאוזנת, נגיעות
              בהתאמה אישית וריהוט שמרגיש נאסף לאורך זמן ולא "מולבש" בבת אחת.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
