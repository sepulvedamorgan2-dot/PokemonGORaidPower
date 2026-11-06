import {Pokemon} from './Pokemon.js';

export function PokemonList(initialList = []) {

        this.items = initialList ?? [];

    this.setItems = function(newList) {
        this.items = newList;
    }
    this.add = function(pokemon) {

        if (!pokemon[1]) {
            const lastPokemon = this.items.at(-1);
            pokemon.id = lastPokemon ? lastPokemon.id + 1 : 1;
            this.items.push(pokemon);
        }
        else {
            while (pokemon[1] > 0) {
                console.log(pokemon[0]);
                pokemon[1]--;
                const lastPokemon = this.items[this.items.length - 1]?.id;
                pokemon[0].id = lastPokemon ? lastPokemon + 1 : 1;
                this.items.push(pokemon[0]);
            }
        }
    }

    this.remove = function(id) {
        this.items = this.items.filter(pokemon => pokemon.id !== id);
    }

    this.findPokemonById = function(id) {
        return this.items.find(pokemon => pokemon.id === id) ?? false;
    }
}