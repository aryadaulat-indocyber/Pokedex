/**
 * Game Service
 * Games section of PokeAPI: generation, pokedex, version, version-group
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import { Generation, Pokedex, Version, VersionGroup } from '@/types/pokeapi';

const { GAMES } = POKE_API_ENDPOINTS;

class GameService {
  generation = createResourceApi<Generation>(GAMES.GENERATION);
  pokedex = createResourceApi<Pokedex>(GAMES.POKEDEX);
  version = createResourceApi<Version>(GAMES.VERSION);
  versionGroup = createResourceApi<VersionGroup>(GAMES.VERSION_GROUP);
}

export const gameService = new GameService();
export default gameService;
