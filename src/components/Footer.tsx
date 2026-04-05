import { logos } from '@/config/branding'
import { logoVariants, phraseLockups } from '@/config/assets'

export function Footer() {
  const strip = logoVariants.slice(0, 6)
  const phrase = phraseLockups[1] ?? phraseLockups[0]

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-ivory)] py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <img src={logos.markDark} alt="SHA" className="h-8 w-auto opacity-90" />
          {phrase ? (
            <img src={phrase} alt="" className="max-h-10 w-auto opacity-50 md:max-h-12" />
          ) : null}
        </div>

        {strip.length > 0 ? (
          <div className="flex flex-wrap items-center gap-8 border-y border-[var(--color-line)] py-8 opacity-40 grayscale">
            {strip.map((src) => (
              <img key={src} src={src} alt="" className="h-7 w-auto object-contain md:h-8" />
            ))}
          </div>
        ) : null}

        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          © {new Date().getFullYear()} SHA · Shani Shay
        </p>
      </div>
    </footer>
  )
}
