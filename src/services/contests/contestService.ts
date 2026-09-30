/**
 * Contest Service
 * Contests section of PokeAPI: contest-type, contest-effect, super-contest-effect
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import {
  ContestEffect,
  ContestType,
  SuperContestEffect,
} from '@/types/pokeapi';

const { CONTESTS } = POKE_API_ENDPOINTS;

class ContestService {
  type = createResourceApi<ContestType>(CONTESTS.CONTEST_TYPE);
  effect = createResourceApi<ContestEffect>(CONTESTS.CONTEST_EFFECT);
  superEffect = createResourceApi<SuperContestEffect>(
    CONTESTS.SUPER_CONTEST_EFFECT,
  );
}

export const contestService = new ContestService();
export default contestService;
