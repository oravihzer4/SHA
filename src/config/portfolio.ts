import {
  commercialTopicIcon,
  officesTopicIcon,
  portfolioImages,
  residentialTopicIcon,
} from "@/config/assets";

export type PortfolioCategoryId = "residential" | "offices" | "commercial";

export type PortfolioProject = {
  id: string;
  title: string;
  images: string[];
  cover: string;
};

export type PortfolioCategory = {
  id: PortfolioCategoryId;
  title: string;
  description: string;
  iconSrc?: string;
  projects: PortfolioProject[];
};

const categoryMeta: Record<
  PortfolioCategoryId,
  { title: string; description: string; iconSrc?: string }
> = {
  residential: {
    title: "מגורים",
    description:
      "בתים וחללים פרטיים — פלטות רגועות, נגרות מותאמת ותכנון שמובל על ידי אור טבעי.",
    iconSrc: residentialTopicIcon ?? undefined,
  },
  offices: {
    title: "משרדים",
    description:
      "סביבות עבודה לתפקוד ואירוח — קבלה, חדרי הנהלה ואזורים משותפים.",
    iconSrc: officesTopicIcon ?? undefined,
  },
  commercial: {
    title: "מסחרי",
    description:
      "קמעונאות, אירוח ומותגים — חללים עם תנועה נכונה וזהות ברורה.",
    iconSrc: commercialTopicIcon ?? undefined,
  },
};

const categoryOrder: PortfolioCategoryId[] = ["residential", "offices", "commercial"];

const rawPortfolio = import.meta.glob("../../media/projectsMedia/**/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function toTitleCase(input: string): string {
  return input
    .replace(/^\d+\s*/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase())
    .replace(/\b([A-Za-z])\s*-\s*([A-Za-z])\b/g, "$1-$2");
}

function projectTitleFromSlug(slug: string): string {
  if (!slug) return "פרויקט";
  return toTitleCase(slug);
}

function isPrimaryImage(path: string): boolean {
  return path.toLowerCase().includes("תמונה ראשית");
}

function chunkProjects(images: string[], size = 4): PortfolioProject[] {
  if (images.length === 0) return [];
  const out: PortfolioProject[] = [];
  let n = 1;
  for (let i = 0; i < images.length; i += size) {
    const slice = images.slice(i, i + size);
    if (!slice[0]) continue;
    out.push({
      id: `project-${n}`,
      title: `פרויקט ${n}`,
      images: slice,
      cover: slice[0],
    });
    n += 1;
  }
  return out;
}

function splitIntoThree(arr: string[]): [string[], string[], string[]] {
  if (arr.length === 0) return [[], [], []];
  const n = arr.length;
  const a = Math.max(1, Math.ceil(n / 3));
  const b = Math.max(1, Math.ceil((n - a) / 2));
  const i1 = Math.min(a, n);
  const i2 = Math.min(a + b, n);
  return [arr.slice(0, i1), arr.slice(i1, i2), arr.slice(i2)];
}

type ProjectAccumulator = { path: string; url: string }[];
const grouped: Record<PortfolioCategoryId, Record<string, ProjectAccumulator>> = {
  residential: {},
  offices: {},
  commercial: {},
};

for (const [path, url] of Object.entries(rawPortfolio)) {
  const m = path.match(/\/projectsMedia\/(private|offices|commercial)\/([^/]+)\//i);
  if (!m) continue;
  const rawCategory = m[1]!.toLowerCase();
  const category =
    rawCategory === "private"
      ? "residential"
      : (rawCategory as Exclude<PortfolioCategoryId, "residential">);
  const projectSlug = m[2]!;
  grouped[category][projectSlug] ??= [];
  grouped[category][projectSlug].push({ path, url });
}

function orderedProjectsForCategory(id: PortfolioCategoryId): PortfolioProject[] {
  const projects = grouped[id];
  const slugs = Object.keys(projects).sort((a, b) => a.localeCompare(b));
  return slugs
    .map((slug) => {
      const entries = projects[slug]!
        .slice()
        .sort((a, b) => {
          const aIsPrimary = isPrimaryImage(a.path);
          const bIsPrimary = isPrimaryImage(b.path);
          if (aIsPrimary && !bIsPrimary) return -1;
          if (!aIsPrimary && bIsPrimary) return 1;
          return a.path.localeCompare(b.path);
        });
      const images = entries.map((e) => e.url);
      if (!images[0]) return null;
      return {
        id: `${id}-${slug}`,
        title: projectTitleFromSlug(slug),
        images,
        cover: images[0],
      } satisfies PortfolioProject;
    })
    .filter((x): x is PortfolioProject => Boolean(x));
}

const folderProjects: Record<PortfolioCategoryId, PortfolioProject[]> = {
  residential: orderedProjectsForCategory("residential"),
  offices: orderedProjectsForCategory("offices"),
  commercial: orderedProjectsForCategory("commercial"),
};

const hasFolderProjects = categoryOrder.some((id) => folderProjects[id].length > 0);

const [fallbackR, fallbackO, fallbackC] = splitIntoThree(portfolioImages);
const fallbackProjects: Record<PortfolioCategoryId, PortfolioProject[]> = {
  residential: chunkProjects(fallbackR),
  offices: chunkProjects(fallbackO),
  commercial: chunkProjects(fallbackC),
};

export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = categoryOrder.map((id) => ({
  id,
  title: categoryMeta[id].title,
  description: categoryMeta[id].description,
  iconSrc: categoryMeta[id].iconSrc,
  projects: hasFolderProjects ? folderProjects[id] : fallbackProjects[id],
}));

export function getPortfolioProjectById(projectId: string): {
  category: PortfolioCategory;
  project: PortfolioProject;
} | null {
  for (const category of PORTFOLIO_CATEGORIES) {
    const project = category.projects.find((p) => p.id === projectId);
    if (project) return { category, project };
  }
  return null;
}
