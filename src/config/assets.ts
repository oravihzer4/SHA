/**
 * Central registry for everything under /media.
 * Glob keys are stable source paths so we can sort by Artboard number before bundling.
 */

const raw = import.meta.glob("../../media/**/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function artboardNum(path: string): number {
  const m = path.match(/Artboard (\d+)/);
  return m ? parseInt(m[1]!, 10) : 0;
}

function urlsForFolder(folder: string, sortByArtboard = true): string[] {
  const entries = Object.entries(raw).filter(([key]) => key.includes(folder));
  if (!sortByArtboard) {
    return entries.map(([, url]) => url).sort((a, b) => a.localeCompare(b));
  }
  return entries
    .map(([path, url]) => ({ path, url }))
    .sort((a, b) => artboardNum(a.path) - artboardNum(b.path))
    .map((x) => x.url);
}

function urlForFilename(filename: string): string | null {
  const target = filename.toLowerCase();
  const entry = Object.entries(raw).find(([key]) =>
    key.toLowerCase().endsWith(`/${target}`),
  );
  return entry ? entry[1] : null;
}

/** Instagram-ready profile & highlight frames */
export const profileGallery = urlsForFolder("פרופיל והייליטס");

/** Ready-to-upload posts + standalone PNGs */
export const postGallery = urlsForFolder("פוסטים מוכנים");

/** Masonry / modal gallery — posts first, then profile */
export const portfolioImages = [
  ...new Set([...postGallery, ...profileGallery]),
];

/**
 * Optional category folders under `media/portfolio/<name>/`.
 * Add PNG/JPEG there to assign work to Residential, Offices, or Commercial.
 * If a folder is empty, `portfolio.ts` falls back to splitting `portfolioImages`.
 */
export const portfolioResidential = urlsForFolder("portfolio/residential");
export const portfolioOffices = urlsForFolder("portfolio/offices");
export const portfolioCommercial = urlsForFolder("portfolio/commercial");

/**
 * Hero background rotation — use each project's "תמונה ראשית" from projectsMedia.
 * Falls back to portfolioImages if no main images are found.
 */
export const HERO_ROTATION_COUNT = 6;
const projectMainImages = Object.entries(raw)
  .filter(([key]) => {
    const lower = key.toLowerCase();
    return lower.includes("/projectsmedia/") && lower.includes("תמונה ראשית");
  })
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([, url]) => url);

export const heroBackgroundImages =
  projectMainImages.length > 0
    ? projectMainImages.slice(0, HERO_ROTATION_COUNT)
    : portfolioImages.slice(0, HERO_ROTATION_COUNT);

/** Department / service icons */
export const departmentIcons = urlsForFolder("וריאציות אייקונים מחלקות");

/** Primary mark icons */
export const brandIcons = urlsForFolder("וריאציות אייקון ללא רקע");

/** Tagline / phrase lockups */
export const phraseLockups = urlsForFolder("וריאציות משפט");

/** Logo variants */
export const logoVariants = urlsForFolder("וריאציות לוגו");

/** Optional topic icons for portfolio tabs (drop these files anywhere under /media). */
export const residentialTopicIcon = urlForFilename("Artboard 47@4x-8.png");
export const officesTopicIcon = urlForFilename("Artboard 54@4x-8.png");
export const commercialTopicIcon = urlForFilename("Artboard 50@4x-8.png");
