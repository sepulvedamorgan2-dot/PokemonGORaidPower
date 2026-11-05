import {Pokemon} from './Pokemon.js';

export class PokemonList {
    constructor(initialList = []) {
        this.items = initialList;
    }

    add(pokemon) {
        console.log(pokemon ?? 'nopokemo')
        if (!pokemon[1]) {
            const lastPokemon = this.items.at(-1);
            pokemon.id = lastPokemon ? lastPokemon.id + 1 : 1;
            this.items.push(pokemon);
        }
        else {
            while (pokemon[1] > 0) {
                console.log(pokemon[0]);
                pokemon[1]--;
                const lastPokemon = this.items[this.items.length - 1].id;
                pokemon[0].id = lastPokemon ? lastPokemon + 1 : 1;
                this.items.push(pokemon[0]);
            }
        }
    }

    remove(id) {
        this.items = this.items.filter(pokemon => pokemon.id !== id);
    }

    find(id) {
        return this.items.find(pokemon => pokemon.id === id);
    }
}