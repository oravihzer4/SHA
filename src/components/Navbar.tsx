import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { logos } from '@/config/branding'

const links = [
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Stories' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 48)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const logoSrc = solid ? logos.markDark : logos.markLight

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-5 md:px-10"
      initial={false}
      animate={{
        backgroundColor: solid ? 'rgba(250, 248, 245, 0.92)' : 'rgba(0,0,0,0)',
        boxShadow: solid ? '0 1px 0 rgba(48,28,20,0.06)' : 'none',
        backdropFilter: solid ? 'blur(14px)' : 'blur(0px)',
      }}
      transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="flex w-full max-w-[1400px] items-center justify-between gap-6"
        style={{ height: 'var(--header-height)' }}
      >
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="relative z-[60] flex shrink-0 items-center py-2 transition-opacity duration-300 hover:opacity-85"
          aria-label="SHA — home"
        >
          <motion.img
            key={logoSrc}
            src={logoSrc}
            alt="SHA"
            className="h-9 w-auto md:h-10"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          />
        </button>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollTo(l.id)}
              className={`text-[0.68rem] font-medium uppercase tracking-[0.26em] transition-colors duration-300 ${
                solid
                  ? 'text-[var(--color-espresso)]/75 hover:text-[var(--color-espresso)]'
                  : 'text-[var(--color-cream)]/90 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={`relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${
            solid ? 'text-[var(--color-espresso)]' : 'text-[var(--color-cream)]'
          }`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <motion.span
            className="block h-px w-6 bg-current"
            animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-px w-6 bg-current"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-px w-6 bg-current"
            animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      <motion.div
        id="mobile-menu"
        className="fixed inset-0 z-40 flex flex-col bg-[var(--color-ivory)] px-8 pt-[calc(var(--header-height)+2rem)] md:hidden"
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex flex-col gap-8">
          {links.map((l, i) => (
            <motion.button
              key={l.id}
              type="button"
              initial={false}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -12 }}
              transition={{ delay: open ? 0.05 * i : 0 }}
              onClick={() => scrollTo(l.id)}
              className="text-left font-serif text-3xl text-[var(--color-espresso)]"
            >
              {l.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.header>
  )
}
