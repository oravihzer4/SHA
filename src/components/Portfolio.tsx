import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { portfolioImages } from '@/config/assets'
import { Reveal } from '@/components/Reveal'
import { OptimizedImage } from '@/components/OptimizedImage'

export function Portfolio() {
  const [active, setActive] = useState<number | null>(null)
  const reduce = useReducedMotion()

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close])

  return (
    <section id="portfolio" className="bg-[var(--color-cream)] py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="div" className="mb-14 max-w-xl">
          <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)]">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl text-[var(--color-espresso)] md:text-[2.75rem]">
            Selected interiors &amp; vignettes
          </h2>
          <p className="mt-4 text-[var(--color-muted)]">
            A living archive of studio work — residential, hospitality, and bespoke details.
          </p>
        </Reveal>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {portfolioImages.map((src, i) => (
            <Reveal key={src} as="div" delay={(i % 6) * 0.04} className="mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden text-left"
              >
                <OptimizedImage
                  src={src}
                  alt={`Portfolio ${i + 1}`}
                  className="w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute inset-0 bg-[var(--color-espresso)]/0 transition-colors duration-500 group-hover:bg-[var(--color-espresso)]/12" />
                <span className="pointer-events-none absolute bottom-4 left-4 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  View
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && portfolioImages[active] ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/72 p-4 md:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
            onClick={close}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-5xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={portfolioImages[active]!}
                alt={`Portfolio enlarged ${active + 1}`}
                className="max-h-[90vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[var(--color-espresso)] shadow-md transition hover:bg-white"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
