/**
 * Location Service
 * Locations section of PokeAPI: location, location-area, pal-park-area, region
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import { Location, LocationArea, PalParkArea, Region } from '@/types/pokeapi';

const { LOCATIONS } = POKE_API_ENDPOINTS;

class LocationService {
  location = createResourceApi<Location>(LOCATIONS.LOCATION);
  area = createResourceApi<LocationArea>(LOCATIONS.LOCATION_AREA);
  palParkArea = createResourceApi<PalParkArea>(LOCATIONS.PAL_PARK_AREA);
  region = createResourceApi<Region>(LOCATIONS.REGION);
}

export const locationService = new LocationService();
export default locationService;
