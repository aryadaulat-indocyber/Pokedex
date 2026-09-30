import {
  cleanFlavorText,
  formatDexNumber,
  formatEffectText,
  formatGenderRate,
  formatGeneration,
  formatHeight,
  formatName,
  formatNullable,
  formatWeight,
} from '@/utils/formatters';

describe('formatters', () => {
  it('formats slugs into title case names', () => {
    expect(formatName('mr-mime')).toBe('Mr Mime');
    expect(formatName('special-attack')).toBe('Special Attack');
    expect(formatName(undefined)).toBe('');
  });

  it('pads dex numbers', () => {
    expect(formatDexNumber(1)).toBe('#001');
    expect(formatDexNumber(25)).toBe('#025');
    expect(formatDexNumber(1025)).toBe('#1025');
  });

  it('converts height and weight units', () => {
    expect(formatHeight(7)).toBe('0.7 m');
    expect(formatWeight(69)).toBe('6.9 kg');
  });

  it('cleans flavor text control characters', () => {
    expect(cleanFlavorText('A strange seed was\nplanted on its\fback')).toBe(
      'A strange seed was planted on its back',
    );
  });

  it('substitutes $effect_chance', () => {
    expect(formatEffectText('Has a $effect_chance% chance', 10)).toBe(
      'Has a 10% chance',
    );
  });

  it('computes gender ratio from eighths', () => {
    expect(formatGenderRate(-1)).toBeNull();
    expect(formatGenderRate(1)).toEqual({ female: 12.5, male: 87.5 });
  });

  it('formats generation names and nullable values', () => {
    expect(formatGeneration('generation-iv')).toBe('Generation IV');
    expect(formatNullable(null)).toBe('—');
    expect(formatNullable(90, '%')).toBe('90%');
  });
});
