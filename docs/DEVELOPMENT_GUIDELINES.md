# Development Guidelines

Rules adopted from the BRIspot project and applied to this codebase.

## 1. Atomic Design

| Level | Folder | Rule |
| --- | --- | --- |
| Atoms | `components/atoms` | Smallest UI pieces. Only React Native primitives + design tokens (+ other atoms). No data fetching, no Redux, no navigation. |
| Molecules | `components/molecules` | Compose atoms into a reusable block (e.g. `InfoRow`, `StatBar`, `PokemonCard`). Still presentational: data comes in via props, events go out via callbacks. |
| Organisms | `components/organisms` | Feature-sized sections. May use hooks to fetch data (e.g. `EvolutionChainView`, `TypeDefenses`) but receive navigation as callbacks (`onPressSpecies`). |
| Templates | `components/template` | Page layouts only (`ScreenTemplate`, `DetailTemplate`). No business logic. |
| Screens | `screens/<feature>/<Name>Screen/` | Wire hooks + organisms. Screen-only pieces live in `components/` next to `index.tsx`; screen constants in `constants.ts`. |

Promote a component one level up as soon as a second screen needs it
(e.g. `FilterChipRow` moved from a screen into `molecules`). Screens never
import from another screen folder.

## 2. Component conventions

- File header doc comment: `/** Name Component \n description */`.
- `export default function Name(props: NameProps)` and `export interface NameProps`.
- Every folder has an `index.ts` barrel exporting the component **and** its props type.
- Styles via `StyleSheet.create` at the bottom of the file; no inline style objects (`react-native/no-inline-styles`).
- Only use tokens from `@/styles` (`colors`, `spacing`, `borderRadius`, `elevation`, `typography`) — no hard-coded hex values or magic numbers in screens.
- Text always goes through the `Text` atom with a `variant`.
- Add `accessibilityRole` / `accessibilityLabel` on touchables.

## 3. Imports & aliases

Use path aliases (configured in `babel.config.js` + `tsconfig.json`):
`@/`, `@components/`, `@screens/`, `@services/`, `@hooks/`, `@redux/`, `@routes/`,
`@config/`, `@types/`, `@styles/`, `@constants/`, `@utils/`.
Order: React/RN → libraries → `@/components` → `@/config|constants|hooks|redux|services` → `@/styles` → `@/types` → `@/utils` → relative.

## 4. Services / API layer

- `services/api/apiClient.ts` — single axios instance; normalizes errors into `ApiError`, caches GET responses (TTL, max size) and de-duplicates in-flight requests.
- `services/api/apiConfig.ts` — **all** endpoints in `POKE_API_ENDPOINTS`, grouped like the official docs. Never hard-code a path in a screen.
- `services/<section>/<section>Service.ts` — a class instance per PokeAPI section built with `createResourceApi<T>()` (`list`, `listAll`, `get`). Custom calls (e.g. `getEncounters`) are methods on the class.
- Components never call axios directly; they use hooks (`useResource`, `useResourceByUrl`, `useResourceIndex`, `usePaginatedResource`, `useApiQuery`).
- Adding an endpoint = add to `apiConfig` → add to the section service → add to `config/resourceRegistry.ts` (the registry test enforces this).

## 5. State management (Redux Toolkit)

- `redux/store.ts` configures the store + redux-persist (AsyncStorage). Only user data is persisted (`favorites`, `history`, `settings`); server data lives in the API cache.
- One slice per concern in `redux/slices/<name>Slice.ts` with doc comments, exported actions, **exported selectors** and default reducer.
- Components use the typed hooks `useAppDispatch` / `useAppSelector` from `redux/hooks.ts`.

## 6. Navigation

- `routes/RootNavigator.tsx` — native stack: `MainTabs` + every detail screen (so details can be pushed from any tab).
- `routes/MainTabNavigator.tsx` — bottom tabs (Pokédex, Moves, Items, World, More).
- All param lists are typed in `types/navigation.types.ts`; screens use `RootStackScreenProps<'Name'>`.
- Open a resource with `useResourceNavigation().openResource(key, id)` / `openUrl(url)`; it chooses the dedicated screen or falls back to `ResourceDetail`.
- Detail headers are configured with `useScreenHeader({ title, color, favorite })`.

## 7. TypeScript

- `strict` mode, no `any` (use `unknown` + guards).
- PokeAPI models live in `types/pokeapi/*.types.ts`, one file per docs section.

## 8. Quality gates

Before pushing: `npm run typecheck && npm run lint && npm test`.
Tests live in `__tests__/` mirroring `src/` (utils, redux, services, config, components) and use `@testing-library/react-native`.
Formatting: Prettier (`singleQuote`, `trailingComma: all`, `arrowParens: avoid`).

## 9. Git workflow (same as BRIspot)

1. Branch from `develop` (`feature/<name>`).
2. Implement following these rules + write tests.
3. Run the quality gates.
4. Open a PR, get review, merge to `develop`.
