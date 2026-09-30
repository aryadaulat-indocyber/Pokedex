import favoritesReducer, {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
  toggleFavorite,
} from '@/redux/slices/favoritesSlice';
import historyReducer, { addToHistory } from '@/redux/slices/historySlice';
import settingsReducer, {
  setLanguage,
  toggleShiny,
} from '@/redux/slices/settingsSlice';
import { MAX_RECENTLY_VIEWED } from '@/constants';

const pikachu = { resource: 'pokemon' as const, id: 25, name: 'pikachu' };

describe('favoritesSlice', () => {
  it('adds without duplicates and removes by key', () => {
    let state = favoritesReducer(undefined, addFavorite(pikachu));
    state = favoritesReducer(state, addFavorite(pikachu));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].key).toBe('pokemon:25');

    state = favoritesReducer(state, removeFavorite('pokemon:25'));
    expect(state.items).toHaveLength(0);
  });

  it('toggles and selects', () => {
    const state = favoritesReducer(undefined, toggleFavorite(pikachu));
    expect(selectIsFavorite('pokemon', 25)({ favorites: state })).toBe(true);
    const toggled = favoritesReducer(state, toggleFavorite(pikachu));
    expect(selectIsFavorite('pokemon', 25)({ favorites: toggled })).toBe(false);
  });
});

describe('historySlice', () => {
  it('moves re-viewed items to the top and caps the size', () => {
    let state = historyReducer(undefined, addToHistory(pikachu));
    state = historyReducer(
      state,
      addToHistory({ resource: 'move', id: 1, name: 'pound' }),
    );
    state = historyReducer(state, addToHistory(pikachu));
    expect(state.items.map(i => i.key)).toEqual(['pokemon:25', 'move:1']);

    for (let i = 0; i < MAX_RECENTLY_VIEWED + 5; i++) {
      state = historyReducer(
        state,
        addToHistory({ resource: 'item', id: i, name: `item-${i}` }),
      );
    }
    expect(state.items).toHaveLength(MAX_RECENTLY_VIEWED);
  });
});

describe('settingsSlice', () => {
  it('updates language and shiny flag', () => {
    let state = settingsReducer(undefined, setLanguage('ja'));
    state = settingsReducer(state, toggleShiny());
    expect(state).toEqual({ language: 'ja', showShiny: true });
  });
});
