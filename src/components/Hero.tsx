import { motion, useReducedMotion } from 'framer-motion'
import { portfolioImages, phraseLockups } from '@/config/assets'
import { logos } from '@/config/branding'
import { OptimizedImage } from '@/components/OptimizedImage'
import { Button } from '@/components/Button'

const heroImage = portfolioImages[0] ?? ''
const phraseSrc = phraseLockups[0]

export function Hero() {
  const reduce = useReducedMotion()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end justify-center overflow-hidden bg-[var(--color-espresso)]"
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={
          reduce
            ? undefined
            : {
                scale: [1, 1.04],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      >
        {heroImage ? (
          <OptimizedImage
            src={heroImage}
            alt=""
            priority
            className="h-full min-h-[100svh] w-full object-cover opacity-90"
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55"
          aria-hidden
        />
      </motion.div>

      <div className="relative z-10 flex w-full max-w-[1400px] flex-col gap-12 px-6 pb-16 pt-[calc(var(--header-height)+4rem)] md:px-10 md:pb-24">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={logos.studioLockup}
            alt="Studio SHA"
            className="mb-10 h-auto w-[min(100%,280px)] brightness-0 invert md:w-[320px]"
          />
          <p className="mb-4 font-serif text-4xl leading-[1.12] text-[var(--color-cream)] md:text-5xl lg:text-[3.25rem]">
            Interiors shaped with quiet confidence — light, texture, and proportion.
          </p>
          {phraseSrc ? (
            <img
              src={phraseSrc}
              alt=""
              className="mt-6 max-h-12 w-auto opacity-80 md:max-h-14"
            />
          ) : null}
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button type="button" variant="ghost" onClick={() => scrollTo('portfolio')}>
            View work
          </Button>
          <Button
            type="button"
            variant="primary"
            className="!bg-[var(--color-cream)] !text-[var(--color-espresso)] hover:!bg-white"
            onClick={() => scrollTo('contact')}
          >
            Begin a project
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden
      >
        <motion.div
          className="h-12 w-px bg-[var(--color-cream)]/50"
          animate={reduce ? undefined : { scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
