/**
 * Pokémon Service
 * Pokémon section of PokeAPI: ability, characteristic, egg-group, gender,
 * growth-rate, nature, pokeathlon-stat, pokemon, pokemon encounters,
 * pokemon-color, pokemon-form, pokemon-habitat, pokemon-shape,
 * pokemon-species, stat, type
 */

import apiClient from '../api/apiClient';
import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import {
  Ability,
  Characteristic,
  EggGroup,
  Gender,
  GrowthRate,
  LocationAreaEncounter,
  Nature,
  PokeathlonStat,
  Pokemon,
  PokemonColor,
  PokemonForm,
  PokemonHabitat,
  PokemonShape,
  PokemonSpecies,
  Stat,
  Type,
} from '@/types/pokeapi';

const { POKEMON } = POKE_API_ENDPOINTS;

class PokemonService {
  ability = createResourceApi<Ability>(POKEMON.ABILITY);
  characteristic = createResourceApi<Characteristic>(POKEMON.CHARACTERISTIC);
  eggGroup = createResourceApi<EggGroup>(POKEMON.EGG_GROUP);
  gender = createResourceApi<Gender>(POKEMON.GENDER);
  growthRate = createResourceApi<GrowthRate>(POKEMON.GROWTH_RATE);
  nature = createResourceApi<Nature>(POKEMON.NATURE);
  pokeathlonStat = createResourceApi<PokeathlonStat>(POKEMON.POKEATHLON_STAT);
  pokemon = createResourceApi<Pokemon>(POKEMON.POKEMON);
  color = createResourceApi<PokemonColor>(POKEMON.POKEMON_COLOR);
  form = createResourceApi<PokemonForm>(POKEMON.POKEMON_FORM);
  habitat = createResourceApi<PokemonHabitat>(POKEMON.POKEMON_HABITAT);
  shape = createResourceApi<PokemonShape>(POKEMON.POKEMON_SHAPE);
  species = createResourceApi<PokemonSpecies>(POKEMON.POKEMON_SPECIES);
  stat = createResourceApi<Stat>(POKEMON.STAT);
  type = createResourceApi<Type>(POKEMON.TYPE);

  /**
   * Get the location areas where a Pokémon can be encountered
   * GET /pokemon/{id or name}/encounters
   */
  getEncounters(idOrName: string | number): Promise<LocationAreaEncounter[]> {
    return apiClient.get<LocationAreaEncounter[]>(
      POKEMON.POKEMON_ENCOUNTERS(String(idOrName).toLowerCase()),
    );
  }
}

export const pokemonService = new PokemonService();
export default pokemonService;
