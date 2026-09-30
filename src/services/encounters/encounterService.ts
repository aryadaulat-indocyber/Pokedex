/**
 * Encounter Service
 * Encounters section of PokeAPI: encounter-method, encounter-condition,
 * encounter-condition-value
 */

import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import {
  EncounterCondition,
  EncounterConditionValue,
  EncounterMethod,
} from '@/types/pokeapi';

const { ENCOUNTERS } = POKE_API_ENDPOINTS;

class EncounterService {
  method = createResourceApi<EncounterMethod>(ENCOUNTERS.ENCOUNTER_METHOD);
  condition = createResourceApi<EncounterCondition>(
    ENCOUNTERS.ENCOUNTER_CONDITION,
  );
  conditionValue = createResourceApi<EncounterConditionValue>(
    ENCOUNTERS.ENCOUNTER_CONDITION_VALUE,
  );
}

export const encounterService = new EncounterService();
export default encounterService;
