import 'server-only'

// Define the valid locales as a union type
export type Locale = 'en-US' | 'es-US' | 'en-MX' | 'es-MX';

// Define the dictionary type
type Dictionary = {
  [key: string]: any;
}

// Type the dictionaries object with the Locale keys
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
  'es-US': () => import('./dictionaries/es.json').then((module) => module.default),
  'en-MX': () => import('./dictionaries/en.json').then((module) => module.default),
  'es-MX': () => import('./dictionaries/es.json').then((module) => module.default),
}

// Update the getDictionary function to handle invalid locales
export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Check if the locale exists in our dictionaries
  if (locale in dictionaries) {
    return dictionaries[locale as Locale]();
  }
  
  // Fallback to en-US if the locale doesn't exist
  console.warn(`Locale '${locale}' not found, falling back to 'en-US'`);
  return dictionaries['en-US']();
}