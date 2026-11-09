import {PokemonList} from "@/models/PokemonList.js";
import {TradeCardList} from "@/models/TradeCardList.js";
import PokemonFactory from "@/models/PokemonFactory.js";

/**
 * Data factory handles the saving and loading of data to and from local storage.
 * It does NOT handle the hydration of data or the handling of full game data array
 *
 * */
export default class DataFactory {
    static pokemonListKey = 'pokemonList';

    /**
     * Fetches the PokemonList from local storage and returns a hydrated PokemonList object.
     * @returns {PokemonList}
     */
    static fetchPokemonList() {
        if (localStorage.getItem(DataFactory.pokemonListKey)) {
            return PokemonFactory.hydratePokemonList(JSON.parse(localStorage.getItem(DataFactory.pokemonListKey)).items);
        } else {
            return new PokemonList();
        }
    }

    /**
     * Saves the given PokemonList to local storage. If the list is null or undefined, it saves an empty PokemonList instead.
     * All other get in DataFactory function this way besides pokemonTeamList
     * @param pokemonList
     */
    static savePokemonList(pokemonList) {
        if (!pokemonList) {
            console.error(`PokemonList not found.`);
            localStorage.setItem('pokemonList', JSON.stringify(new PokemonList()));
        }
        for (let pokemon of pokemonList.items) {
            if (!pokemon.cp) {
                pokemon.cp = 50;
            }
        }
        if (pokemonList) {
            localStorage.setItem('pokemonList', JSON.stringify(pokemonList))
        }
    }

    static pokemonTeamsKey = 'pokemonTeamList';

    /**
     * Fetches the PokemonTeamList from local storage, hydrates it, and returns it. If no list is found, it returns an empty array.
     * MUST pass in the current PokemonList to check for deleted pokemon and replace them with backup pokemon if available.
     * @param pokemonList
     * @returns {[]}
     */
    static fetchPokemonTeamList(pokemonList) {
        if (localStorage.getItem(DataFactory.pokemonTeamsKey)) {
            return PokemonFactory.hydrateRaidTeamList([JSON.parse(localStorage.getItem(DataFactory.pokemonTeamsKey)), pokemonList]);
        } else {
            return [];
        }
    }
    static savePokemonTeamList(pokemonTeamList) {
        if (!pokemonTeamList) {
            console.error(`PokemonTeamList not found.`);
            localStorage.setItem('pokemonTeamList', JSON.stringify([]));
        }
        if (pokemonTeamList) {
            localStorage.setItem('pokemonTeamList', JSON.stringify(pokemonTeamList))
        }
    }
    static tradeCardListKey = 'tradeCardList';
    static saveTradeCardList(tradeCardList) {
        if (!tradeCardList) {
            console.error(`TradeCardList not found.`);
            localStorage.setItem('tradeCardList', JSON.stringify([]));
        }
        if (tradeCardList) {
            localStorage.setItem('tradeCardList', JSON.stringify(tradeCardList))
        }
    }
    static fetchTradeCardList() {
        if (localStorage.getItem(DataFactory.tradeCardListKey)) {
            return PokemonFactory.hydrateTradeCardList(JSON.parse(localStorage.getItem(DataFactory.tradeCardListKey)).items);
        } else {
            return new TradeCardList();
        }
    }
}