# Changelog

## [6.1.1 - 0.6.4.1]


### Upcoming
- Tags 

### Added
- `Trade Tool` page: Build a card to display what Pokémon you want and what you're willing to trade for them
  - `TradeCard` component displays the trade information.
  - `ToggleCard` component allows users to toggle between different tags for the trade card.
  - `ToggleButton` cycles through an array as the user clicks the button
- `CollapseArea` component to allow for consistent collapsible sections throughout the application.

### Changed
- `fastMoveType, chargedMoveOneType, chargedMoveTwoType` properties removed from `pokemon` object 
- `fastMove, chargedMoveOne, chargedMoveTwo, image, maxCp, fastMoves, chargedMoves, megaCapable` properties added to `pokemon` object
- `pokemonListAPI` updated to only receive Pokémon in Pokémon GO, every costume variant available, and every form for each Pokémon.
- `AddEditOffCanvas, HorizontalCard, PokemonlistItem, DetailsOffCanvas, PokemonImageName` components updated to use the new `pokemon` object properties.


          

### Fixed

- Object `pokemonTeam` not updating its arrays upon deletion of Pokémon.
- Search query being lost upon deletion of a Pokémon in `poke-list`.
- Navbar collapse functionality on mobile.
- Fixed removed `pokemonTeam` Pokémon being unable to be re-added to the raid team until the page is refreshed.

### Changed

- `OffCanvasContainer` manages its own state with its own page number and slots for each page(from only one slot for every page)
- `AddEditOffCanvas` changed from button to slider system to better match the in game experience
- Separated `filterOffCanvas` from `searchAndDisplayView` to both isolate functionality and for use with the new `offCanvasContainer`

