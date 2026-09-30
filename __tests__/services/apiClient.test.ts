import { apiClient } from '@/services/api/apiClient';
import pokemonService from '@/services/pokemon/pokemonService';

describe('apiClient', () => {
  const axiosInstance = apiClient.getClient();
  let getSpy: jest.SpyInstance;

  beforeEach(() => {
    apiClient.clearCache();
    getSpy = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementation(async (url: string) => ({ data: { url } }));
  });

  afterEach(() => {
    getSpy.mockRestore();
  });

  it('caches responses and treats relative paths and urls as the same key', async () => {
    await apiClient.getDetail('pokemon', 'Pikachu');
    await apiClient.getByUrl('https://pokeapi.co/api/v2/pokemon/pikachu/');
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy.mock.calls[0][0]).toBe(
      'https://pokeapi.co/api/v2/pokemon/pikachu/',
    );
  });

  it('de-duplicates in-flight requests', async () => {
    await Promise.all([
      apiClient.get('type/fire'),
      apiClient.get('type/fire'),
      apiClient.get('type/fire'),
    ]);
    expect(getSpy).toHaveBeenCalledTimes(1);
  });

  it('passes pagination params for list calls', async () => {
    await pokemonService.pokemon.list({ offset: 20, limit: 10 });
    expect(getSpy).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/', {
      params: { offset: 20, limit: 10 },
    });
  });

  it('calls the encounters sub-resource', async () => {
    await pokemonService.getEncounters(25);
    expect(getSpy.mock.calls[0][0]).toBe(
      'https://pokeapi.co/api/v2/pokemon/25/encounters/',
    );
  });
});
