import { profileGallery } from "@/config/assets";
import { Reveal } from "@/components/Reveal";
import { OptimizedImage } from "@/components/OptimizedImage";
import aboutImage from "@media/aboutImage.jpg";
import styles from "./About.module.css";

const fallbackPrimary =
  profileGallery[Math.min(4, profileGallery.length - 1)] ?? "";
const primary = aboutImage || fallbackPrimary;

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
          </div>
        </Reveal>

        <Reveal className={styles.colCopy} as="div" delay={0.08}>
          <p className={styles.eyebrow}>סטודיו · שני שי</p>
          <h2 className={styles.title}>.LOOKS GOOD. WORK EVEN BETTER</h2>
          <div className={styles.body}>
            <p>
              אני מאמינה שעיצוב טוב הוא הרבה מעבר למה שרואים בעין. הוא מתחיל
              בהבנה עמוקה של האנשים שחיים או עובדים בתוך החלל.
            </p>
            <p>
              אני שני שי ובסטודיו SHA אני מלווה פרויקטים משלב הרעיון ועד לפרטים
              הקטנים ביותר, תוך הקפדה על תכנון מדויק, חשיבה יצירתית ותוצאות שלא
              משאירות מקום לפשרות.
            </p>
            <p>
              אני מאמינה בחללות שמבוססות גם על פרקטיקה ולא רק על אסתטיקה. המטרה
              היא ליצור חלל שמרגיש נכון, מדויק ומאוזן, כזה שישרת אתכם לאורך זמן
              וישתלב באופן טבעי בחיים שלכם.
            </p>
            <p>כשתכנון מדויק מההתחלה - התוצאה מדברת בעד עצמה.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
