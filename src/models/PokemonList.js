import {Pokemon} from './Pokemon.js';

export function PokemonList(initialList = []) {

        this.items = initialList ?? [];

    this.setItems = function(newList) {
        this.items = newList;
    }
    this.add = function(pokemon) {
        if (!pokemon[1]) {
            console.log(pokemon)
            this.items.push(pokemon);
        }
        else {

            for (let i = 0; i < pokemon[1]; i++) {
                const lastPokemon = this.items.at(-1);

                const newPokemon = {...pokemon[0]};
                newPokemon.id = lastPokemon ? lastPokemon.id + 1 : 1;
                this.items.push(newPokemon);
            }
        }
    }

    this.remove = function(id) {
        this.items = this.items.filter(pokemon => pokemon.id !== id);
    }
    this.removeByImage = function(image) {
        this.items = this.items.filter(pokemon => pokemon.image !== image);
    }

    this.findPokemonById = function(id) {
        return this.items.find(pokemon => pokemon.id === id) ?? false;
    }
}