/**
 * Utility Service
 * Utility section of PokeAPI: language, currency, meta
 */

import apiClient from '../api/apiClient';
import { POKE_API_ENDPOINTS } from '../api/apiConfig';
import createResourceApi from '../api/createResourceApi';
import { ApiMeta, Currency, Language } from '@/types/pokeapi';

const { UTILITY } = POKE_API_ENDPOINTS;

class UtilityService {
  language = createResourceApi<Language>(UTILITY.LANGUAGE);
  currency = createResourceApi<Currency>(UTILITY.CURRENCY);

  /**
   * Get API deployment metadata
   * GET /meta
   */
  getMeta(): Promise<ApiMeta> {
    return apiClient.get<ApiMeta>(UTILITY.META);
  }
}

export const utilityService = new UtilityService();
export default utilityService;
