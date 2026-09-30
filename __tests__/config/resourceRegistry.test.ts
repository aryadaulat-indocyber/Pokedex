import {
  RESOURCES,
  RESOURCE_GROUPS,
  getResourcesByGroup,
} from '@/config/resourceRegistry';
import { POKE_API_ENDPOINTS } from '@/services/api/apiConfig';

/**
 * Guards "every PokeAPI endpoint is a feature": each endpoint declared in
 * apiConfig must be browsable from the Library (and vice-versa).
 */
describe('resourceRegistry', () => {
  const endpointPaths = Object.values(POKE_API_ENDPOINTS)
    .flatMap(group => Object.values(group))
    .filter((value): value is string => typeof value === 'string')
    .filter(path => path !== 'meta'); // meta is not a list resource

  it('has unique keys', () => {
    const keys = RESOURCES.map(r => r.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('covers every endpoint in apiConfig', () => {
    const keys = new Set<string>(RESOURCES.map(r => r.key));
    endpointPaths.forEach(path => expect(keys.has(path)).toBe(true));
    expect(RESOURCES).toHaveLength(endpointPaths.length);
  });

  it('assigns every resource to a group', () => {
    const total = RESOURCE_GROUPS.reduce(
      (sum, g) => sum + getResourcesByGroup(g.key).length,
      0,
    );
    expect(total).toBe(RESOURCES.length);
  });
});
