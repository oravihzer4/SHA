import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "he";

type Dict = Record<string, string>;

const EN: Dict = {
  "lang.english": "אנגלית",
  "lang.hebrew": "עברית",
  "lang.switch": "החלפת שפה",
  "nav.menu": "תפריט",
  "nav.about": "אודות",
  "nav.portfolio": "פרויקטים",
  "nav.services": "שירותים",
  "nav.stories": "סיפורים",
  "nav.contact": "צור קשר",
  "hero.tagline": "עיצוב פנים מלא ביטחון שקט - אור, מרקם ופרופורציה מדויקת.",
  "hero.smallHeadline": "בואו נעבוד יחד",
  "hero.body": "עיצוב פנים מלא ביטחון שקט - אור, מרקם ופרופורציה מדויקת.",
  "hero.learnMore": "לפרטים נוספים",
  "hero.viewWork": "צפייה בעבודות",
  "hero.beginProject": "התחלת פרויקט",
  "footer.navigate": "ניווט",
  "footer.services": "שירותים",
  "footer.contact": "צור קשר",
  "footer.whatsapp": "ווטסאפ",
  "footer.inquiry": "טופס פנייה",
  "footer.tagline": "סטודיו לעיצוב פנים - שני שי",
  "wa.open": "פתח שיחת ווטסאפ",
  "wa.label": "ווטסאפ",
};

const HE: Dict = {
  "lang.english": "אנגלית",
  "lang.hebrew": "עברית",
  "lang.switch": "החלפת שפה",
  "nav.menu": "תפריט",
  "nav.about": "אודות",
  "nav.portfolio": "פרויקטים",
  "nav.services": "שירותים",
  "nav.stories": "סיפורים",
  "nav.contact": "צור קשר",
  "hero.tagline": "עיצוב פנים מלא ביטחון שקט - אור, מרקם ופרופורציה מדויקת.",
  "hero.smallHeadline": "בואו נעבוד יחד",
  "hero.body": "עיצוב פנים מלא ביטחון שקט - אור, מרקם ופרופורציה מדויקת.",
  "hero.learnMore": "לפרטים נוספים",
  "hero.viewWork": "צפייה בעבודות",
  "hero.beginProject": "התחלת פרויקט",
  "footer.navigate": "ניווט",
  "footer.services": "שירותים",
  "footer.contact": "צור קשר",
  "footer.whatsapp": "ווטסאפ",
  "footer.inquiry": "טופס פנייה",
  "footer.tagline": "סטודיו לעיצוב פנים - שני שי",
  "wa.open": "פתח שיחת ווטסאפ",
  "wa.label": "ווטסאפ",
};

const DICTS: Record<Language, Dict> = { en: EN, he: HE };
const STORAGE_KEY = "sha-language";

type I18nContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("he");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "he" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "he" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      toggleLanguage: () =>
        setLanguage((curr) => (curr === "en" ? "he" : "en")),
      t: (key: string) => DICTS[language][key] ?? EN[key] ?? key,
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
