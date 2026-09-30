import {
  getIdFromUrl,
  isResourceUrl,
  parseResourceUrl,
} from '@/utils/resourceUrl';
import {
  getLocalizedName,
  pickLatestLocalized,
  pickLocalized,
} from '@/utils/localization';
import { describeEvolutionDetail } from '@/utils/evolution';
import { EvolutionDetail } from '@/types/pokeapi';

describe('resourceUrl', () => {
  it('parses resource urls', () => {
    expect(
      parseResourceUrl('https://pokeapi.co/api/v2/pokemon-species/25/'),
    ).toEqual({ resource: 'pokemon-species', id: 25 });
    expect(parseResourceUrl('https://pokeapi.co/api/v2/unknown-thing/1/')).toBeNull();
  });

  it('extracts ids', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/evolution-chain/67/')).toBe(67);
  });

  it('detects resource urls', () => {
    expect(isResourceUrl('https://pokeapi.co/api/v2/machine/1/')).toBe(true);
    expect(isResourceUrl('hello')).toBe(false);
  });
});

describe('localization', () => {
  const lang = (name: string) => ({ name, url: '' });
  const names = [
    { name: 'Pikachu', language: lang('en') },
    { name: 'ピカチュウ', language: lang('ja') },
  ];

  it('picks requested language with english fallback', () => {
    expect(pickLocalized(names, 'ja')?.name).toBe('ピカチュウ');
    expect(pickLocalized(names, 'fr')?.name).toBe('Pikachu');
    expect(getLocalizedName([], 'mr-mime')).toBe('Mr Mime');
  });

  it('picks the latest entry', () => {
    const entries = [
      { flavor_text: 'old', language: lang('en') },
      { flavor_text: 'new', language: lang('en') },
    ];
    expect(pickLatestLocalized(entries, 'en')?.flavor_text).toBe('new');
  });
});

describe('evolution', () => {
  const base: EvolutionDetail = {
    item: null,
    trigger: { name: 'level-up', url: '' },
    gender: null,
    held_item: null,
    known_move: null,
    known_move_type: null,
    location: null,
    min_level: null,
    min_happiness: null,
    min_beauty: null,
    min_affection: null,
    needs_overworld_rain: false,
    party_species: null,
    party_type: null,
    relative_physical_stats: null,
    time_of_day: '',
    trade_species: null,
    turn_upside_down: false,
  };

  it('describes level and item evolutions', () => {
    expect(describeEvolutionDetail({ ...base, min_level: 16 })).toBe('Lv. 16');
    expect(
      describeEvolutionDetail({
        ...base,
        trigger: { name: 'use-item', url: '' },
        item: { name: 'thunder-stone', url: '' },
      }),
    ).toBe('Use Thunder Stone');
    expect(
      describeEvolutionDetail({
        ...base,
        min_happiness: 160,
        time_of_day: 'day',
      }),
    ).toBe('Level up happiness ≥ 160 (day)');
  });
});
