/**
 * Settings Redux slice
 * User preferences (display language, shiny sprites)
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '@/types/redux.types';
import { DEFAULT_LANGUAGE } from '@/utils/localization';

/**
 * Initial settings state
 */
const initialState: SettingsState = {
  language: DEFAULT_LANGUAGE,
  showShiny: false,
};

/**
 * Settings slice
 */
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    /**
     * Set the display language (PokeAPI language name)
     */
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },

    /**
     * Toggle shiny artwork
     */
    toggleShiny: state => {
      state.showShiny = !state.showShiny;
    },

    /**
     * Reset settings
     */
    resetSettings: () => initialState,
  },
});

/**
 * Export actions
 */
export const { setLanguage, toggleShiny, resetSettings } =
  settingsSlice.actions;

/**
 * Export selectors
 */
export const selectLanguage = (state: { settings: SettingsState }) =>
  state.settings.language;
export const selectShowShiny = (state: { settings: SettingsState }) =>
  state.settings.showShiny;

/**
 * Export reducer
 */
export default settingsSlice.reducer;
