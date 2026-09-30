/**
 * Environment Configuration
 * Central place for runtime configuration values
 */

export interface EnvironmentConfig {
  apiBaseUrl: string;
  spriteBaseUrl: string;
  requestTimeout: number;
  enableLogging: boolean;
}

export const config: EnvironmentConfig = {
  apiBaseUrl: 'https://pokeapi.co/api/v2',
  spriteBaseUrl:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites',
  requestTimeout: 20000,
  enableLogging: __DEV__,
};

export const getEnvironmentConfig = (): EnvironmentConfig => config;

export default config;
