/**
 * Berry Service
 * Berries section of PokeAPI: berry, berry-firmness, berry-flavor
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import { Berry, BerryFirmness, BerryFlavor } from '@/types/pokeapi';

const { BERRIES } = POKE_API_ENDPOINTS;

class BerryService {
  berry = createResourceApi<Berry>(BERRIES.BERRY);
  firmness = createResourceApi<BerryFirmness>(BERRIES.BERRY_FIRMNESS);
  flavor = createResourceApi<BerryFlavor>(BERRIES.BERRY_FLAVOR);
}

export const berryService = new BerryService();
export default berryService;
