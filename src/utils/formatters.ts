/**
 * Formatters
 * Pure helpers to turn raw PokeAPI values into display strings
 */

/**
 * "mr-mime" -> "Mr Mime", "special-attack" -> "Special Attack"
 */
export const formatName = (value?: string | null): string => {
  if (!value) {
    return '';
  }
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * 25 -> "#025", 1025 -> "#1025"
 */
export const formatDexNumber = (id: number | string): string =>
  `#${String(id).padStart(3, '0')}`;

/**
 * Height is given in decimetres
 */
export const formatHeight = (decimetres: number): string =>
  `${(decimetres / 10).toFixed(1)} m`;

/**
 * Weight is given in hectograms
 */
export const formatWeight = (hectograms: number): string =>
  `${(hectograms / 10).toFixed(1)} kg`;

/**
 * Flavor texts contain form-feeds, soft hyphens and hard line breaks
 */
export const cleanFlavorText = (text?: string | null): string =>
  (text ?? '')
    .replace(/­\n/g, '')
    .replace(/­/g, '')
    .replace(/[\f\n\r]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

/**
 * Replace "$effect_chance" placeholders used by move/ability effect texts
 */
export const formatEffectText = (
  text: string | undefined,
  effectChance?: number | null,
): string =>
  cleanFlavorText(text).replace(
    /\$effect_chance/g,
    effectChance != null ? String(effectChance) : '—',
  );

/**
 * gender_rate is the chance of being female in eighths, -1 = genderless
 */
export const formatGenderRate = (
  genderRate: number,
): { female: number; male: number } | null => {
  if (genderRate < 0) {
    return null;
  }
  const female = (genderRate / 8) * 100;
  return { female, male: 100 - female };
};

export const formatPercent = (value: number, fractionDigits = 1): string =>
  `${Number.isInteger(value) ? value : value.toFixed(fractionDigits)}%`;

/**
 * Display value for nullable numeric stats (power, accuracy, ...)
 */
export const formatNullable = (
  value: number | string | null | undefined,
  suffix = '',
): string =>
  value === null || value === undefined ? '—' : `${value}${suffix}`;

/**
 * Human readable label for a JSON key: "base_experience" -> "Base Experience"
 */
export const formatKey = (key: string): string => formatName(key);

/**
 * "generation-iv" -> "Generation IV"
 */
export const formatGeneration = (name: string): string => {
  const [prefix, roman] = name.split('-');
  return roman
    ? `${formatName(prefix)} ${roman.toUpperCase()}`
    : formatName(name);
};
