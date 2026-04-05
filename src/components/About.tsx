import { profileGallery, brandIcons } from '@/config/assets'
import { Reveal } from '@/components/Reveal'
import { OptimizedImage } from '@/components/OptimizedImage'

const primary = profileGallery[Math.min(4, profileGallery.length - 1)] ?? ''
const secondary = profileGallery[Math.min(11, profileGallery.length - 1)] ?? ''
const accentIcon = brandIcons[Math.min(2, brandIcons.length - 1)]

export function About() {
  return (
    <section
      id="about"
      className="border-t border-[var(--color-line)] bg-[var(--color-ivory)] py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <Reveal className="md:col-span-5" as="div">
          <div className="relative">
            {primary ? (
              <OptimizedImage
                src={primary}
                alt="SHA interior composition"
                className="aspect-[3/4] w-full object-cover shadow-[var(--shadow-soft)]"
              />
            ) : null}
            {secondary ? (
              <div className="absolute -bottom-10 -right-4 hidden w-[48%] md:block">
                <OptimizedImage
                  src={secondary}
                  alt=""
                  className="aspect-[4/5] w-full border-4 border-[var(--color-ivory)] object-cover shadow-[var(--shadow-soft)]"
                />
              </div>
            ) : null}
            {accentIcon ? (
              <img
                src={accentIcon}
                alt=""
                className="absolute -left-4 top-8 w-16 opacity-40 md:w-20"
              />
            ) : null}
          </div>
        </Reveal>

        <Reveal className="flex flex-col justify-center md:col-span-6 md:col-start-7" as="div" delay={0.08}>
          <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)]">
            Studio · Shani Shay
          </p>
          <h2 className="mb-8 font-serif text-4xl text-[var(--color-espresso)] md:text-[2.75rem]">
            Minimalist luxury, grounded in place.
          </h2>
          <div className="space-y-6 text-[var(--color-muted)]">
            <p>
              SHA is an interior design studio devoted to calm, contemporary spaces — where material
              honesty, generous light, and precise detailing meet everyday life.
            </p>
            <p>
              Led by Shani Shay, each project is edited with restraint: a refined palette, bespoke
              touches, and furniture that feels collected rather than decorated.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
