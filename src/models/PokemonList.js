
/**
 * Represents a list of Pokémon.
 * @param initialList {Array<PokemonInstance>} An array of Pokémon(moisturized object) to initialize the list with.
 */
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import pokeList from "@/views/PokeList.vue";

import {Pokemon} from "@/models/Pokemon.js";
import {PokemonInstance} from "@/models/PokemonInstance.js";
import {PokelistCollection} from "@/firebase/PokelistCollection.js";
export function PokemonList(initialList = []) {
    /**
     *
     * @type {Array<PokemonInstance>|*[]}
     */
    this.items = initialList ?? [];
    // /**
    //  * Sets the items of the Pokémon list to a new list.
    //  * @param newList
    //  */
    /**
     *
     * @param newList
     */
    this.setItems = function(newList = []) {
        this.items = newList;
    }
    /**
     * Adds a Pokémon to the list. If the second element of the pokemon parameter is provided, it adds that many copies of the Pokémon.
     * @param [pokemon, Number]
     */

    this.addSinglePokemon = function(id, pokemon) {
        console.log("Adding single pokemon with id:", id, "and pokemon:", pokemon);
        this.items.push(new PokemonInstance(id, pokemon));
    }
    this.addAnyAmountOfPokemon = function([pokemon, amount = 1]) {
        for (let i = 0; i < amount; i++) {
            const lastPokemon = this.items.at(-1);

            const newPokemon = {...pokemon};
            newPokemon.id = lastPokemon ? lastPokemon.id + 1 : 1;
            this.items.push(newPokemon);
        }
    }
    /**
     * Removes a Pokémon from the list by its id.
     * @param Pokemon the Pokémon to remove.
     */
    this.remove = function(pokemon) {

        PokelistCollection.deleteFromPokelist(pokemon);
    }

    this.update = function(pokemon) {
        PokelistCollection.updatePokelistItem(pokemon);
    }
    /**
     * Removes a Pokémon from the list by its image. used when a list doesnt have
     * a full pokemon object and only has the image to identify it.(mostly in the trade card lists)
     * @param image The image of the Pokémon to remove.
     */
    this.removeByImage = function(image) {
        this.items = this.items.filter(pokemon => pokemon.pokemon.image !== image);
    }
    this.removeByUID = function(uid) {
        this.items = this.items.filter(pokemon => pokemon.pokemon.uniquePokemonId !== uid);
    }

    this.findPokemonById = function(id) {
        return this.items.find(pokemon => pokemon.id === id) ?? false;
    }
}