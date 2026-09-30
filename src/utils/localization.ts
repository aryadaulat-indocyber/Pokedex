/**
 * Localization Helpers
 * PokeAPI returns translations as arrays of `{ ..., language: { name } }`.
 * These helpers pick the entry for the selected language with an English
 * fallback.
 */

import { NamedAPIResource } from '@/types/pokeapi';
import { formatName } from './formatters';

export const DEFAULT_LANGUAGE = 'en';

interface Localized {
  language: NamedAPIResource;
}

/**
 * Pick the entry for `language`, falling back to English and then the
 * first entry available.
 */
export function pickLocalized<T extends Localized>(
  entries: T[] | undefined,
  language: string = DEFAULT_LANGUAGE,
): T | undefined {
  if (!entries || entries.length === 0) {
    return undefined;
  }
  return (
    entries.find(entry => entry.language.name === language) ??
    entries.find(entry => entry.language.name === DEFAULT_LANGUAGE) ??
    entries[0]
  );
}

/**
 * Pick the latest entry for `language` (flavor texts are ordered by version)
 */
export function pickLatestLocalized<T extends Localized>(
  entries: T[] | undefined,
  language: string = DEFAULT_LANGUAGE,
): T | undefined {
  if (!entries || entries.length === 0) {
    return undefined;
  }
  const inLanguage = entries.filter(e => e.language.name === language);
  if (inLanguage.length) {
    return inLanguage[inLanguage.length - 1];
  }
  const inEnglish = entries.filter(e => e.language.name === DEFAULT_LANGUAGE);
  return inEnglish.length ? inEnglish[inEnglish.length - 1] : entries[0];
}

/**
 * Localized display name from a `names` array with slug fallback
 */
export const getLocalizedName = (
  names: { name: string; language: NamedAPIResource }[] | undefined,
  fallbackSlug: string,
  language: string = DEFAULT_LANGUAGE,
): string => pickLocalized(names, language)?.name ?? formatName(fallbackSlug);
