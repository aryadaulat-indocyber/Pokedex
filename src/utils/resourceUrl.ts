/**
 * Resource URL Helpers
 * Parse PokeAPI resource urls such as
 * https://pokeapi.co/api/v2/pokemon-species/25/
 */

import { isResourceKey, ResourceKey } from '@/config/resourceRegistry';

export interface ParsedResourceUrl {
  resource: ResourceKey;
  id: number;
}

const RESOURCE_URL_REGEX = /\/api\/v2\/([a-z-]+)\/(\d+)\/?$/;

export const parseResourceUrl = (url: string): ParsedResourceUrl | null => {
  const match = RESOURCE_URL_REGEX.exec(url);
  if (!match) {
    return null;
  }
  const [, resource, id] = match;
  if (!isResourceKey(resource)) {
    return null;
  }
  return { resource, id: Number(id) };
};

export const getIdFromUrl = (url: string): number => {
  const match = /\/(\d+)\/?$/.exec(url);
  return match ? Number(match[1]) : 0;
};

export const isResourceUrl = (value: unknown): boolean =>
  typeof value === 'string' && RESOURCE_URL_REGEX.test(value);
