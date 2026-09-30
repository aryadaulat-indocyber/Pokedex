/**
 * Services Index
 * Export all API services
 */

export { apiClient } from './api/apiClient';
export {
  POKE_API_ENDPOINTS,
  API_CACHE_CONFIG,
  API_PAGINATION,
} from './api/apiConfig';
export { createResourceApi } from './api/createResourceApi';
export type { ResourceApi } from './api/createResourceApi';

export { berryService } from './berries/berryService';
export { contestService } from './contests/contestService';
export { encounterService } from './encounters/encounterService';
export { evolutionService } from './evolution/evolutionService';
export { gameService } from './games/gameService';
export { itemService } from './items/itemService';
export { locationService } from './locations/locationService';
export { machineService } from './machines/machineService';
export { moveService } from './moves/moveService';
export { pokemonService } from './pokemon/pokemonService';
export { utilityService } from './utility/utilityService';
