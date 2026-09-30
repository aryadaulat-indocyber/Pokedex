/**
 * Machine Service
 * Machines section of PokeAPI: machine
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import { Machine } from '@/types/pokeapi';

const { MACHINES } = POKE_API_ENDPOINTS;

class MachineService {
  machine = createResourceApi<Machine>(MACHINES.MACHINE);
}

export const machineService = new MachineService();
export default machineService;
