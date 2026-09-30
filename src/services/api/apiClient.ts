/**
 * API Client
 * Axios based HTTP client for PokeAPI with:
 * - in-memory response cache (TTL + max size)
 * - in-flight request de-duplication
 * - normalized errors (ApiError)
 */

import axios, { AxiosError, AxiosInstance } from 'axios';
import { getEnvironmentConfig } from '@/config/environment';
import { ApiError } from '@/types/api.types';
import { ListParams, ResourceList } from '@/types/pokeapi';
import { logger } from '@/utils/logger';
import { API_CACHE_CONFIG, API_PAGINATION, API_TIMEOUTS } from './apiConfig';

interface CacheEntry {
  data: unknown;
  expiresAt: number;
}

class ApiClient {
  private client: AxiosInstance;
  private cache = new Map<string, CacheEntry>();
  private inflight = new Map<string, Promise<unknown>>();

  constructor() {
    const config = getEnvironmentConfig();

    this.client = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: API_TIMEOUTS.DEFAULT,
      headers: {
        Accept: 'application/json',
      },
    });

    this.setupResponseInterceptor();
  }

  /**
   * Setup response interceptor
   * Converts every axios error into an ApiError
   */
  private setupResponseInterceptor(): void {
    this.client.interceptors.response.use(
      response => response,
      (error: AxiosError) => Promise.reject(this.normalizeError(error)),
    );
  }

  private normalizeError(error: AxiosError): ApiError {
    const url = error.config?.url;

    if (error.response) {
      const status = error.response.status;
      return {
        code: status === 404 ? 'NOT_FOUND' : 'SERVER_ERROR',
        message:
          status === 404
            ? 'The requested resource was not found.'
            : `Server responded with status ${status}.`,
        statusCode: status,
        url,
      };
    }

    if (error.code === 'ECONNABORTED') {
      return {
        code: 'TIMEOUT',
        message: 'The request timed out. Please try again.',
        statusCode: 0,
        url,
      };
    }

    if (error.request) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
        statusCode: 0,
        url,
      };
    }

    return {
      code: 'REQUEST_ERROR',
      message: error.message || 'An error occurred',
      statusCode: 0,
      url,
    };
  }

  /**
   * Build a stable cache key from a path (relative or absolute) and params
   */
  private buildKey(path: string, params?: Record<string, unknown>): string {
    const base = this.client.defaults.baseURL ?? '';
    const absolute = path.startsWith('http')
      ? path
      : `${base}/${path.replace(/^\//, '')}`;
    const normalized = absolute.endsWith('/') ? absolute : `${absolute}/`;
    if (!params) {
      return normalized;
    }
    const query = Object.keys(params)
      .sort()
      .map(key => `${key}=${String(params[key])}`)
      .join('&');
    return `${normalized}?${query}`;
  }

  private readCache<T>(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }
    if (entry.expiresAt < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.data as T;
  }

  private writeCache(key: string, data: unknown): void {
    if (!API_CACHE_CONFIG.ENABLED) {
      return;
    }
    if (this.cache.size >= API_CACHE_CONFIG.MAX_SIZE) {
      // Evict the oldest entry (Map keeps insertion order)
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + API_CACHE_CONFIG.DEFAULT_TTL,
    });
  }

  /**
   * GET request with cache + in-flight de-duplication.
   * Accepts a relative path (`pokemon/25`) or an absolute PokeAPI url.
   */
  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const key = this.buildKey(path, params);

    const cached = this.readCache<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    const pending = this.inflight.get(key);
    if (pending) {
      return pending as Promise<T>;
    }

    const request = this.client
      .get<T>(key.split('?')[0], { params })
      .then(response => {
        this.writeCache(key, response.data);
        return response.data;
      })
      .catch((error: ApiError) => {
        logger.warn(`[apiClient] GET ${key} failed`, error);
        throw error;
      })
      .finally(() => {
        this.inflight.delete(key);
      });

    this.inflight.set(key, request);
    return request;
  }

  /**
   * GET a paginated list of a resource
   */
  getList<T extends ResourceList = ResourceList>(
    resource: string,
    { offset = 0, limit = API_PAGINATION.PAGE_SIZE }: ListParams = {},
  ): Promise<T> {
    return this.get<T>(resource, { offset, limit });
  }

  /**
   * GET every entry of a resource list in a single request
   */
  getAll<T extends ResourceList = ResourceList>(resource: string): Promise<T> {
    return this.getList<T>(resource, { offset: 0, limit: API_PAGINATION.ALL });
  }

  /**
   * GET a single resource by id or name
   */
  getDetail<T>(resource: string, idOrName: string | number): Promise<T> {
    return this.get<T>(`${resource}/${String(idOrName).toLowerCase()}`);
  }

  /**
   * GET any PokeAPI url (NamedAPIResource.url / APIResource.url / list.next)
   */
  getByUrl<T>(url: string): Promise<T> {
    return this.get<T>(url);
  }

  clearCache(): void {
    this.cache.clear();
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
