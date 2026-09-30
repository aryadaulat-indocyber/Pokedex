/**
 * History Redux slice
 * Keeps a short list of recently viewed resources
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HistoryState, SavedResource } from '@/types/redux.types';
import { MAX_RECENTLY_VIEWED } from '@/constants';
import { buildResourceKey } from './favoritesSlice';

/**
 * Initial history state
 */
const initialState: HistoryState = {
  items: [],
};

/**
 * History slice
 */
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    /**
     * Move (or insert) a resource to the top of the history
     */
    addToHistory: (
      state,
      action: PayloadAction<Omit<SavedResource, 'key' | 'savedAt'>>,
    ) => {
      const key = buildResourceKey(action.payload.resource, action.payload.id);
      state.items = [
        { ...action.payload, key, savedAt: new Date().toISOString() },
        ...state.items.filter(item => item.key !== key),
      ].slice(0, MAX_RECENTLY_VIEWED);
    },

    /**
     * Clear history
     */
    clearHistory: () => initialState,
  },
});

/**
 * Export actions
 */
export const { addToHistory, clearHistory } = historySlice.actions;

/**
 * Export selectors
 */
export const selectHistory = (state: { history: HistoryState }) =>
  state.history.items;

/**
 * Export reducer
 */
export default historySlice.reducer;
