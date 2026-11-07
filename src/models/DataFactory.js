import {PokemonList} from "@/models/PokemonList.js";
import {TradeCardList} from "@/models/TradeCardList.js";
import PokemonFactory from "@/models/PokemonFactory.js";

export default class DataFactory {

    static pokemonListKey = 'pokemonList';
    static fetchPokemonList() {
        if (localStorage.getItem(DataFactory.pokemonListKey)) {
            return PokemonFactory.hydratePokemonList(JSON.parse(localStorage.getItem(DataFactory.pokemonListKey)).items);
        } else {
            return new PokemonList();
        }
    }
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
    static fetchTradeCardList(pokemonList) {
        if (localStorage.getItem(DataFactory.tradeCardListKey)) {
            return PokemonFactory.hydrateTradeCardList(JSON.parse(localStorage.getItem(DataFactory.tradeCardListKey)).items);
        } else {
            return new TradeCardList();
        }
    }
}