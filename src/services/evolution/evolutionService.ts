/**
 * Evolution Service
 * Evolution section of PokeAPI: evolution-chain, evolution-trigger,
 * evolution-variable
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import {
  EvolutionChain,
  EvolutionTrigger,
  EvolutionVariable,
} from '@/types/pokeapi';

const { EVOLUTION } = POKE_API_ENDPOINTS;

class EvolutionService {
  chain = createResourceApi<EvolutionChain>(EVOLUTION.EVOLUTION_CHAIN);
  trigger = createResourceApi<EvolutionTrigger>(EVOLUTION.EVOLUTION_TRIGGER);
  variable = createResourceApi<EvolutionVariable>(EVOLUTION.EVOLUTION_VARIABLE);
}

export const evolutionService = new EvolutionService();
export default evolutionService;
