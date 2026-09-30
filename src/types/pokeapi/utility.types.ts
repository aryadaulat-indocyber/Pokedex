/**
 * PokeAPI Utility Types
 * @see https://pokeapi.co/docs/v2#utility-section
 */

import { Name } from './common.types';

export interface Language {
  id: number;
  name: string;
  official: boolean;
  iso639: string;
  iso3166: string;
  names: Name[];
}

export interface Currency {
  id: number;
  name: string;
  names: Name[];
}

export interface ApiMeta {
  deploy_date: string;
  hash: string;
  tag: string | null;
}
