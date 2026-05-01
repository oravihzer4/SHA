import { services } from "@/data/services";
import { Reveal } from "@/components/Reveal";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <Reveal as="div" className={styles.intro}>
          <p className={styles.eyebrow}>שירותים</p>
          <h2 className={styles.title}>תהליך שלם, מדויק ומחושב</h2>
        </Reveal>

        <div className={styles.cardGrid}>
          {services.map((s, i) => (
            <Reveal key={s.title} as="div" delay={(i % 6) * 0.05}>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardBody}>{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
