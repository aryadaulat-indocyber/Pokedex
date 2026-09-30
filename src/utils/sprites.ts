/**
 * Sprite Helpers
 * Build sprite urls from ids so list screens can show artwork without
 * fetching every Pokémon detail.
 */

import { config } from '@/config/environment';
import { PokemonSprites } from '@/types/pokeapi';

export const getPokemonArtworkUrl = (id: number | string): string =>
  `${config.spriteBaseUrl}/pokemon/other/official-artwork/${id}.png`;

export const getPokemonSpriteUrl = (id: number | string): string =>
  `${config.spriteBaseUrl}/pokemon/${id}.png`;

export const getItemSpriteUrl = (name: string): string =>
  `${config.spriteBaseUrl}/items/${name}.png`;

/**
 * Best available artwork for a Pokémon detail
 */
export const getBestArtwork = (
  sprites: PokemonSprites | undefined,
  shiny = false,
): string | null => {
  if (!sprites) {
    return null;
  }
  const artwork = sprites.other?.['official-artwork'];
  const home = sprites.other?.home;
  if (shiny) {
    return (
      artwork?.front_shiny ?? home?.front_shiny ?? sprites.front_shiny ?? null
    );
  }
  return artwork?.front_default ?? home?.front_default ?? sprites.front_default;
};

export interface SpriteGalleryEntry {
  label: string;
  uri: string;
}

/**
 * Flatten the main sprite set into a gallery list
 */
export const getSpriteGallery = (
  sprites: PokemonSprites | undefined,
): SpriteGalleryEntry[] => {
  if (!sprites) {
    return [];
  }
  const entries: [string, string | null | undefined][] = [
    ['Front', sprites.front_default],
    ['Back', sprites.back_default],
    ['Front Shiny', sprites.front_shiny],
    ['Back Shiny', sprites.back_shiny],
    ['Front Female', sprites.front_female],
    ['Back Female', sprites.back_female],
    ['Artwork', sprites.other?.['official-artwork']?.front_default],
    ['Artwork Shiny', sprites.other?.['official-artwork']?.front_shiny],
    ['Home', sprites.other?.home?.front_default],
    ['Home Shiny', sprites.other?.home?.front_shiny],
  ];
  return entries
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([label, uri]) => ({ label, uri }));
};
