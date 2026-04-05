/**
 * Central registry for everything under /media.
 * Glob keys are stable source paths so we can sort by Artboard number before bundling.
 */

const raw = import.meta.glob('../../media/**/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function artboardNum(path: string): number {
  const m = path.match(/Artboard (\d+)/)
  return m ? parseInt(m[1]!, 10) : 0
}

function urlsForFolder(folder: string, sortByArtboard = true): string[] {
  const entries = Object.entries(raw).filter(([key]) => key.includes(folder))
  if (!sortByArtboard) {
    return entries.map(([, url]) => url).sort((a, b) => a.localeCompare(b))
  }
  return entries
    .map(([path, url]) => ({ path, url }))
    .sort((a, b) => artboardNum(a.path) - artboardNum(b.path))
    .map((x) => x.url)
}

/** Instagram-ready profile & highlight frames */
export const profileGallery = urlsForFolder('פרופיל והייליטס')

/** Ready-to-upload posts + standalone PNGs */
export const postGallery = urlsForFolder('פוסטים מוכנים')

/** Masonry / modal gallery — posts first, then profile */
export const portfolioImages = [...new Set([...postGallery, ...profileGallery])]

/** Department / service icons */
export const departmentIcons = urlsForFolder('וריאציות אייקונים מחלקות')

/** Primary mark icons */
export const brandIcons = urlsForFolder('וריאציות אייקון ללא רקע')

/** Tagline / phrase lockups */
export const phraseLockups = urlsForFolder('וריאציות משפט')

/** Logo variants */
export const logoVariants = urlsForFolder('וריאציות לוגו')
