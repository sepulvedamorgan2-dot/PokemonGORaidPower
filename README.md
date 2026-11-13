# PokemonGORaidPower [6.5.2(Nov 4th, 2026) - 6.6.2(Nov 8th, 2026)]

## [6.6.2 (Nov 8th, 2026)]

## TODO
#### Make `pokemonDetails` hold ALL static data for a pokemon, and have the pokemon object hold only the selected data
 - rename `pokemonDetails` to `pokemon` to better reflect its purpose
 - rename `pokemon` to `selected`
#### Make `HorizontalCardContainer` take a component as a cardstyle component as opposed to a string
#### HARD: make all `pokemon's` `pokemonDetails` reference a single `pokemonDetails` object, so that if a pokemon's details are updated, all pokemon with that same `pokemonDetails` object will be updated as well. (this will require a lot of work to implement, and will require a lot of refactoring)

### Added
- Added `VueDraggable` to `PokelistContainer`, `RaidTeamContainer`, and `TradePage` components
- Added `OffCanvasHorizontal` Folder containing the 6 different horizontal card styles. `HorizontalCard` is the base component, and the other 5 components extend it
- Added Doc Blocks to all Models and Factories
### Fixed
- Allowed all models to accept an id for re-hydration. (previously id's werent being set when hydrating objects, so they were being rehydrated with new id's each time)
 
## [6.6.1 (Nov 8th, 2026)]
### Fixed
- Fixed `SpecialMove` tag from duplication upon page reload

## [6.6.1 (meant to be 6.6.0)(Nov 7th, 2026)]
### Changed
- Did horrible things in `HorizontalCard`, will fix when composition is implemented for the horizontal card styles
- `TradeCard` Component

  - Component to look way better, (better inputs, selects, spacing)
    - Updates/remove tags to save space and proviod more useful information
    - Updated `TradeCard.wantList` to no longer remove added pokemon from search results, but to instead highlight them.
      - Users may now also remove pokemon from their wantList by re-selecting them in the search results
      - Removed pokemon whos images dont resolve from search results
    - Fixed Warning logic to only display all pokemon in `HaveList` when there are no unused pokemon in the `pokemonList
- Fixed `PokemonFactory.hydrateRaidTeamList` to properly return default list when none is provided
- Allowed `Pokemon` Object to have id set by the constructor(surly I wont have to do this to the rest of my models later...)

### Added
- `removeByImage` method to `PokemonList` to remove a pokemon from the list by its image property(for wanted list, since the pokemon object is not hydrated and only has the image property)
- Added `VueDraggable` project/`TradeCard` component to allow users to drag and drop pokemon in their wantList to reorder them

## [6.5.9(Nov 7th, 2026)]
### Added
- Added `selectList` component to reduce duplicate code in `TradeCard`
- Added `AlertWithClose` component to have a reusable alert component with a close button
    - Added info alert to `TradeCard` to inform users of how to remove a pokemon

### Changed
- Updated `SearchAndDisplayView` to display more pokemon since performance is less of an issue

## [6.5.8 (again... )(Nov 7th, 2026)]
### Changed
- Updated `GameDataFactory`'s  `fetchAllPokemon` to return only 3 properties for each pokemon, massive performance improvements from the reducition.
- Changed `AddPokemonOffCanvas` and `TradeCard` components to utilize the new `fetchSinglePokemon` method to fetch a single pokemon's full game data.
- Changed `ImageWithDetails` and other components to account for missing properties in the new `fetchAllPokemon` method

### Added
- Added `fetchSinglePokemon` method to `GameDataFactory` to fetch a single pokemon's full game data, and return a hydrated `Pokemon` object

## [6.5.8(Nov 7th, 2026)]
### Added
- Moved `helper.js` logic to new `GameDataFactory` factory.

## [6.5.7.1 & 6.5.7.2 (Nov 7th, 2026)]
### Removed
- `NodeModules` folder from repo, added to `.gitignore` file

## [6.5.7(Nov 7th, 2026)]
### Added
- Added `PokemonFactory` class to handle hydration of objects and lists
    - Remove All data fetching/saving logic from `app.vue` and moved it to the `PokemonFactory` and `DataFactory` Factories
  - Added `DataFactory` class to handle data fetching and saving to localStorage (Note: This does not include the `pokelistApi` data, that is still handled in `helper.js` for now)

## [6.5.6 (Again? I wasn't feeling it that day lol)(Nov 6th, 2026)]
### Changes 
- Updated application to utilize `TradeCardList`
- Attempted Hydration of `TradeCardList` in `app.vue`, would require repetetive code so am moving to a factory method to handle hydration

## [6.5.6(Nov 5th, 2026)]
### Added 
- Added `TradeCardList` collection class to hold `TradeCard` objects
- Updated ALL model's parameters to be destructured objects instead of positional parameters
- Added hydration to all data but `pokelistApi` and `tradeCardList` to `app.vue`(moving to factory later)


## [6.5.5(Nov 5th, 2026)]
### Added 
- New `Trade Card` model
- New `TagObject` model
    - Updated `TradeCard` and `Pokemon` models to utilize the new `TagObject` model for their tags
### Changed
- Deleted `Default Trade Settings`, moved data into `TradeCard` and `Pokemon` models as static properties

## [6.5.4(Nov 5th, 2026)]
### Added
- New `PokemonTeam` model, moved methods from app into model, and updated app to use the new model

### Changed
- Updated `Pokemon.find` to `Pokemon.findById` to be more descriptive and avoid confusion with the native `find` method

## [6.5.3(Nov 5th, 2026)]
### Added
- New `PokemonList` collection class to hold hydrated `Pokemon` objects and provide utility methods for the pokelist
    - Updated application to utilize the new methods in the `PokemonList`
    - Removed methods from application that were moved to the `PokemonList` class


## [6.5.2(Nov 4th, 2026)]
### Added
- Basic `pokemon`, `pokemonDetails`, and `tradeDetails` models
- Updated `helper` function to return hydrated `pokemon` objects instead of plain objects
### Changed
- Minor css changes
