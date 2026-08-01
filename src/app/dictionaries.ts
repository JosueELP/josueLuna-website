import 'server-only'

export type Locale = 'en-US' | 'es-US' | 'en-MX' | 'es-MX';

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface Dictionary {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
  };
  home: {
    preTitle: string;
    titleName: string;
    afterNameValues: string[];
    browserVideoFallback: string;
  };
  aboutMe: {
    question: string;
    descriptionIntro: string;
    descriptionRole: string;
    description: string;
    biographyIntro: string;
    biographyLearning: string;
    technologies: string;
    timelineTitle: string;
  };
  timeline: TimelineEntry[];
  projects: {
    title: string;
    loading: string;
  };
  contactMe: {
    title: string;
    description: string;
    downloadButton: string;
  };
  language: {
    es: { label: string; name: string };
    en: { label: string; name: string };
  };
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
  'es-US': () => import('./dictionaries/es.json').then((module) => module.default),
  'en-MX': () => import('./dictionaries/en.json').then((module) => module.default),
  'es-MX': () => import('./dictionaries/es.json').then((module) => module.default),
}

const DEFAULT_LOCALE: Locale = 'en-US';

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (locale in dictionaries) {
    return dictionaries[locale as Locale]();
  }

  console.warn(`Locale '${locale}' not found, falling back to '${DEFAULT_LOCALE}'`);
  return dictionaries[DEFAULT_LOCALE]();
}
