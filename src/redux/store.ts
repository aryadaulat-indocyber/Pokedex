/**
 * Redux store configuration
 * Configures Redux Toolkit store with persistence
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import reducers
import favoritesReducer from './slices/favoritesSlice';
import historyReducer from './slices/historySlice';
import settingsReducer from './slices/settingsSlice';

/**
 * Root reducer
 * Combines all slice reducers
 */
export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  history: historyReducer,
  settings: settingsReducer,
});

/**
 * Root state type
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Persist configuration
 * Only user data is persisted; PokeAPI responses are cached by apiClient
 */
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['favorites', 'history', 'settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure and create the Redux store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: __DEV__,
});

/**
 * Create persistor for the store
 */
export const persistor = persistStore(store);

/**
 * Export store types
 */
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
