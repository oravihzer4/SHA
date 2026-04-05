import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { testimonials } from '@/data/services'
import { brandIcons } from '@/config/assets'
import { Reveal } from '@/components/Reveal'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const t = testimonials[index]!

  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  const extraMarks = brandIcons.slice(4)

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[var(--color-espresso)] py-24 text-[var(--color-cream)] md:py-32"
    >
      <div className="pointer-events-none absolute -left-16 bottom-10 hidden flex-col gap-8 opacity-[0.06] lg:flex">
        {extraMarks.map((src) => (
          <img key={src} src={src} alt="" className="h-16 w-16 object-contain" />
        ))}
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal as="div" className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-[var(--color-cream)]/55">
              Testimonials
            </p>
            <h2 className="font-serif text-4xl md:text-[2.75rem]">Words from clients</h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg transition hover:bg-white/10"
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg transition hover:bg-white/10"
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </Reveal>

        <div className="relative min-h-[200px] overflow-hidden md:min-h-[180px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, x: reduce ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduce ? 0 : -24 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="font-serif text-2xl leading-snug md:text-3xl">“{t.quote}”</p>
              <footer className="mt-8 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-[var(--color-cream)]/60">
                {t.name}
                <span className="mx-2 text-white/35">·</span>
                {t.role}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1 flex-1 max-w-[4rem] rounded-full transition-colors ${
                i === index ? 'bg-[var(--color-cream)]' : 'bg-white/20 hover:bg-white/35'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
