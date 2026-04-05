import { departmentIcons } from '@/config/assets'
import { services } from '@/data/services'
import { Reveal } from '@/components/Reveal'

const icons = departmentIcons

export function Services() {
  return (
    <section id="services" className="border-t border-[var(--color-line)] bg-[var(--color-ivory)] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="div" className="mb-16 max-w-xl">
          <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)]">
            Services
          </p>
          <h2 className="font-serif text-4xl text-[var(--color-espresso)] md:text-[2.75rem]">
            A complete, considered process
          </h2>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const icon = icons[i] ?? icons[icons.length - 1]
            return (
              <Reveal key={s.title} as="div" delay={(i % 6) * 0.05}>
                <article className="group flex h-full flex-col border border-[var(--color-line)] bg-white/40 p-8 transition-colors duration-500 hover:border-[var(--color-espresso)]/20 hover:bg-white/80">
                  {icon ? (
                    <div className="mb-6 flex h-14 w-14 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                      <img src={icon} alt="" className="max-h-12 w-auto object-contain opacity-90" />
                    </div>
                  ) : null}
                  <h3 className="mb-3 font-serif text-xl text-[var(--color-espresso)]">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-muted)]">{s.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>

        {icons.length > services.length ? (
          <Reveal as="div" className="mt-16 border-t border-[var(--color-line)] pt-12" delay={0.1}>
            <p className="mb-6 text-center text-[0.65rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
              Extended craft vocabulary
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-[0.22] grayscale">
              {icons.slice(services.length).map((src) => (
                <img key={src} src={src} alt="" className="h-10 w-auto object-contain md:h-11" />
              ))}
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
