# Pokédex (React Native)

Mobile Pokédex built with React Native CLI + TypeScript that consumes **every
resource of [PokeAPI v2](https://pokeapi.co/docs/v2)**. Architecture and coding
rules follow the **BRIspot** project (Atomic Design, service layer, Redux
Toolkit, path aliases, design tokens).

## Features

Bottom tab navigation with 5 tabs:

| Tab | What it does | Endpoints |
| --- | --- | --- |
| **Pokédex** | Grid of all Pokémon, search by name / number, filter by type & generation, favorites, shiny toggle | `pokemon`, `type`, `generation` |
| **Moves** | All moves with type / damage-class filters | `move`, `type`, `move-damage-class` |
| **Items** | Items, berries and bag pockets with search | `item`, `berry`, `item-pocket` |
| **World** | Regions, generations, games, Pokédexes | `region`, `generation`, `version-group`, `pokedex` |
| **More** | Favorites, history, language, **Library** (browse all 50 endpoints), about | everything else + `language`, `meta` |

Dedicated detail screens: Pokémon (About · Stats · Evolution · Moves ·
Locations · Forms), Type, Ability, Evolution Chain, Move, Item, Berry, Region,
Location, Location Area, Generation, Pokédex.
Every other resource (natures, egg groups, machines, contest effects,
characteristics, …) opens in the generic **ResourceDetail** screen, which
renders any PokeAPI payload and makes every linked resource tappable.

Also: display language picked from `/language` (names, genera and flavor
texts are localized), favorites & recently-viewed persisted with
redux-persist, in-memory API cache with request de-duplication (PokeAPI
fair-use policy).

## Getting started

Requirements: Node ≥ 20, JDK 17, Android SDK (Android Studio), Xcode + CocoaPods for iOS.

```bash
npm install
npm start                     # Metro
npm run mac:android:debug     # build + install on emulator/device (JDK 17)
npm run pod:install && npm run ios
```

| Script | Description |
| --- | --- |
| `start` / `start:reset` | Metro bundler (reset cache) |
| `android` / `android:debug` | `react-native run-android` |
| `mac:android:debug` | Same, forcing JDK 17 via `/usr/libexec/java_home` (macOS) |
| `mac:android:release` | Release variant |
| `androidDevice:debug` | `adb reverse` + run on a physical device |
| `android:clean` | `gradlew clean` then run |
| `build:android:debug` / `build:android:release` | Assemble APK |
| `ios` / `pod:install` | iOS run / CocoaPods |
| `lint` / `typecheck` / `test` / `test:coverage` | Quality gates |

## Project structure

```
src/
├── components/
│   ├── atoms/        # Text, Icon, Badge, TypeBadge, Chip, Button, Card, ...
│   ├── molecules/    # ScreenHeader, InfoRow, StatBar, PokemonCard, ListItem, ...
│   ├── organisms/    # PokemonGrid, ResourceList, EvolutionChainView, ResourceDataView, ...
│   └── template/     # ScreenTemplate, DetailTemplate
├── config/           # environment, resourceRegistry (all endpoints)
├── constants/        # type colors, stat names, app constants
├── hooks/            # useApiQuery, useResource, usePaginatedResource, useFavorite, ...
├── redux/            # store, typed hooks, slices (favorites, history, settings)
├── routes/           # RootNavigator (stack), MainTabNavigator (bottom tabs), navigationRef
├── screens/<feature>/<Screen>/index.tsx (+ components/, constants.ts)
├── services/
│   ├── api/          # apiClient (axios + cache), apiConfig (endpoints), createResourceApi
│   └── <section>/    # berryService, moveService, pokemonService, ... (one per PokeAPI section)
├── styles/           # colors, spacing, typography, theme
├── types/            # pokeapi/* models, navigation, redux, api
└── utils/            # formatters, localization, resourceUrl, sprites, typeEffectiveness, evolution
```

See [docs/DEVELOPMENT_GUIDELINES.md](docs/DEVELOPMENT_GUIDELINES.md) for the rules.

## API coverage

All 50 list resources + `pokemon/{id}/encounters` + `meta`, grouped exactly
like the PokeAPI docs (`src/services/<section>`). A unit test
(`__tests__/config/resourceRegistry.test.ts`) fails if an endpoint in
`apiConfig` is not reachable from the app.

Pokémon and Pokémon character names are trademarks of Nintendo. Data from pokeapi.co.
