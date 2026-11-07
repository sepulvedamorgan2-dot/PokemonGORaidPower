import { Pokemon } from "@/models/Pokemon.js";
import { PokemonDetails } from "@/models/PokemonDetails.js";
import { TradeDetails } from "@/models/TradeDetails.js";
import { PokemonList } from "@/models/PokemonList.js";
import { TradeCard } from "@/models/TradeCard.js";
import { TradeCardList } from "@/models/TradeCardList.js";
import {PokemonTeam} from "@/models/PokemonTeam.js";
// AI USAGE NOTICE:
// I pasted one of my factories into gemeni and asked what could be done better and it suggested
// allowing the pokemon object to do the hydration itself with its own constructor(because the constructor
// is already doing that) commented below was the correct but slightly convoluted way i was doing before:
// static hydratePokemon(pokemon) {
//
// const moistToAdd = (Object.assign(new Pokemon, pokemon));
//
// moistToAdd.pokemonDetails = Object.assign(new PokemonDetails, pokemon.pokemonDetails);
//
// moistToAdd.tradeDetails = Object.assign(new TradeDetails, pokemon.tradeDetails);
//
// return moistToAdd;
//
// }
// Fairly janky manually declaring the pokemonDetails/tradeDetails lol
// also arr = [] or pokemon = {} makes it so whatever is passed a list or object so the order of the parameters arent a factor, i can jsut call them directly
// and i can just throw in an empty array or object and itll still work exploding
export default class PokemonFactory {
    static hydratePokemonList(arr = []) {
        const moistList = new PokemonList();
        if (!arr || arr.length === 0) return moistList;

        for (const pokemon of arr) {
            moistList.add(PokemonFactory.hydratePokemon(pokemon));
        }
        return moistList;
    }

    static hydratePokemon(pokemon = {}) {
        return new Pokemon(pokemon);
    }

    static hydrateTradeCard(tradeCard = {}) {
        const card = new TradeCard(tradeCard);
        if (tradeCard?.haveList?.items) {
            card.haveList = PokemonFactory.hydratePokemonList(tradeCard.haveList.items);
        }
        if (tradeCard?.wantList?.items) {
            card.wantList = PokemonFactory.hydratePokemonList(tradeCard.wantList.items);
        }

        return card;
    }

    static hydrateTradeCardList(arr = []) {
        const moistList = new TradeCardList();
        if (!arr || arr.length === 0) return moistList;
        for (const tradeCard of arr) {
            moistList.add(PokemonFactory.hydrateTradeCard(tradeCard));
        }
        return moistList;
    }

    /**
     * Takes a single pokemon team, rehydrated it, and checks if any pokemon were
     * deleted from the pokemon list, if they were, it removes them from the team and
     * adds a backup pokemon if available
     * @param team = [pokemonTeam, PokemonList]
     * @returns {PokemonTeam}
     */
    static hydrateRaidTeam(team = [{}, PokemonList]) {
        if (!team[0] || !team[1]) {
            return new PokemonTeam()
        }
        const pokemonListIds = new Set(team[1].items.map(p => p.id));
        team[0].activeTeam = team[0].activeTeam.filter(id => pokemonListIds.has(id));
        if (team[0].activeTeam.length < 6 && team[0].backupPokemon.length > 0) {
            team[0].activeTeam.push(team[0].backupPokemon.shift());
        }
        return new PokemonTeam(team[0])
    }


    static types = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
    static hydrateRaidTeamList(teamAndPokeList = [{}, PokemonList]) {
        console.log('teamAndPokeList', teamAndPokeList);
        const moistList = [];
        if (!teamAndPokeList[0] || !teamAndPokeList[1] || teamAndPokeList.length === 0){
            for (const type of PokemonFactory.types) {
                moistList.push(new PokemonTeam({
                    id: moistList.length,
                    type: type,
                    activeTeam: [],
                    backupTeam: [],
                    activeMegaId: null
                }))
            }
           return moistList;
        }
        console.log('teamAndPokeList[0]', teamAndPokeList[0]);
        for (const team of teamAndPokeList[0]) {
            moistList.push(PokemonFactory.hydrateRaidTeam([team, teamAndPokeList[1]]));
        }
        return moistList;
    }
}