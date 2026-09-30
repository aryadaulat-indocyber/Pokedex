/**
 * Favorites Redux slice
 * Manages resources bookmarked by the user (Pokémon, moves, items, ...)
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesState, SavedResource } from '@/types/redux.types';
import type { ResourceKey } from '@/config/resourceRegistry';

/**
 * Initial favorites state
 */
const initialState: FavoritesState = {
  items: [],
};

export const buildResourceKey = (resource: ResourceKey, id: number): string =>
  `${resource}:${id}`;

/**
 * Favorites slice
 */
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    /**
     * Add a resource to favorites (no-op if already saved)
     */
    addFavorite: (
      state,
      action: PayloadAction<Omit<SavedResource, 'key' | 'savedAt'>>,
    ) => {
      const key = buildResourceKey(action.payload.resource, action.payload.id);
      if (state.items.some(item => item.key === key)) {
        return;
      }
      state.items.unshift({
        ...action.payload,
        key,
        savedAt: new Date().toISOString(),
      });
    },

    /**
     * Remove a resource from favorites
     */
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.key !== action.payload);
    },

    /**
     * Toggle a resource
     */
    toggleFavorite: (
      state,
      action: PayloadAction<Omit<SavedResource, 'key' | 'savedAt'>>,
    ) => {
      const key = buildResourceKey(action.payload.resource, action.payload.id);
      const exists = state.items.some(item => item.key === key);
      if (exists) {
        state.items = state.items.filter(item => item.key !== key);
      } else {
        state.items.unshift({
          ...action.payload,
          key,
          savedAt: new Date().toISOString(),
        });
      }
    },

    /**
     * Clear every favorite
     */
    clearFavorites: () => initialState,
  },
});

/**
 * Export actions
 */
export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } =
  favoritesSlice.actions;

/**
 * Export selectors
 */
export const selectFavorites = (state: { favorites: FavoritesState }) =>
  state.favorites.items;
export const selectFavoritesByResource =
  (resource: ResourceKey) => (state: { favorites: FavoritesState }) =>
    state.favorites.items.filter(item => item.resource === resource);
export const selectIsFavorite =
  (resource: ResourceKey, id: number) =>
  (state: { favorites: FavoritesState }) =>
    state.favorites.items.some(
      item => item.key === buildResourceKey(resource, id),
    );

/**
 * Export reducer
 */
export default favoritesSlice.reducer;
