import { departmentIcons } from "@/config/assets";
import { services } from "@/data/services";
import { Reveal } from "@/components/Reveal";
import styles from "./Services.module.css";

const icons = departmentIcons;

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="div" className={styles.intro}>
          <p className={styles.eyebrow}>שירותים</p>
          <h2 className={styles.title}>תהליך שלם, מדויק ומחושב</h2>
        </Reveal>

        <div className={styles.cardGrid}>
          {services.map((s, i) => {
            const icon = icons[i] ?? icons[icons.length - 1];
            return (
              <Reveal key={s.title} as="div" delay={(i % 6) * 0.05}>
                <article className={`group ${styles.card}`}>
                  {icon ? (
                    <div className={styles.iconWrap}>
                      <img src={icon} alt="" className={styles.icon} />
                    </div>
                  ) : null}
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardBody}>{s.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {icons.length > services.length ? (
          <Reveal
            as="div"
            className={styles.extra}
            delay={0.1}
          >
            <p className={styles.extraEyebrow}>שפת חומרים ומלאכות מורחבת</p>
            <div className={styles.extraIcons}>
              {icons.slice(services.length).map((src) => (
                <img key={src} src={src} alt="" className={styles.extraIcon} />
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
