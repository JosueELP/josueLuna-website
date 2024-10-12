// app/dictionaries.ts
import 'server-only'

const dictionaries = {
  'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
  'es-US': () => import('./dictionaries/es.json').then((module) => module.default),
  'en-MX': () => import('./dictionaries/en.json').then((module) => module.default),
  'es-MX': () => import('./dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: string) => dictionaries[locale]()