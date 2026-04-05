import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { WHATSAPP_NUMBER } from '@/config/branding'
import { brandIcons } from '@/config/assets'
import { Reveal } from '@/components/Reveal'

const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hello SHA — I would love to discuss a new project.',
)}`

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    window.setTimeout(() => setSent(false), 4000)
  }

  const deco = brandIcons.slice(0, 4)

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-cream)] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute -right-20 top-20 flex gap-6 opacity-[0.07]">
        {deco.map((src) => (
          <img key={src} src={src} alt="" className="h-24 w-24 object-contain" />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:gap-12 md:px-10">
        <Reveal className="md:col-span-5" as="div">
          <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)]">
            Contact
          </p>
          <h2 className="mb-6 font-serif text-4xl text-[var(--color-espresso)] md:text-[2.75rem]">
            Begin a conversation
          </h2>
          <p className="mb-10 text-[var(--color-muted)]">
            Share a few details about your space. We reply thoughtfully — typically within two
            business days.
          </p>
          <motion.a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-[var(--color-espresso)]/20 bg-white/60 px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-espresso)] shadow-sm transition hover:border-[var(--color-espresso)]/40 hover:bg-white"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg" aria-hidden>
              ✦
            </span>
            WhatsApp
          </motion.a>
        </Reveal>

        <Reveal className="md:col-span-6 md:col-start-7" as="div" delay={0.06}>
          <form
            onSubmit={onSubmit}
            className="space-y-6 border border-[var(--color-line)] bg-white/50 p-8 shadow-[var(--shadow-soft)] backdrop-blur-sm md:p-10"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="w-full border-b border-[var(--color-espresso)]/15 bg-transparent py-2 text-[var(--color-espresso)] outline-none transition focus:border-[var(--color-espresso)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full border-b border-[var(--color-espresso)]/15 bg-transparent py-2 text-[var(--color-espresso)] outline-none transition focus:border-[var(--color-espresso)]"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Project notes
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full resize-none border-b border-[var(--color-espresso)]/15 bg-transparent py-2 text-[var(--color-espresso)] outline-none transition focus:border-[var(--color-espresso)]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--color-espresso)] py-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-cream)] transition hover:bg-[var(--color-espresso-soft)]"
            >
              Send inquiry
            </button>
            {sent ? (
              <p className="text-center text-sm text-[var(--color-muted)]" role="status">
                Thank you — this demo captures your message locally. Connect{' '}
                <a href={waHref} className="underline underline-offset-4">
                  WhatsApp
                </a>{' '}
                or wire the form to your backend.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
