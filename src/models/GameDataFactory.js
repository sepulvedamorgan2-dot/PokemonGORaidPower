import {PokemonDetails} from "@/models/PokemonDetails.js";
import {TradeDetails} from "@/models/TradeDetails.js";
import {Pokemon} from '@/models/Pokemon.js';

export default class GameDataFactory {


    static CPM_SQUARED = 0.840300 ** 2;


    /**
     * Calculates the CP (Combat Power) of a Pokemon based on its base stats.
     * @param baseAtk The base attack of the Pokemon.
     * @param baseDef The base defense of the Pokemon.
     * @param baseSta The base stamina of the Pokemon.
     * @returns {number} The calculated CP.
     */
    static calculateCP(baseAtk, baseDef, baseSta) {
        const attackFactor = baseAtk + 15;
        const defenseFactor = Math.sqrt(baseDef + 15);
        const staminaFactor = Math.sqrt(baseSta + 15);
        const calculatedCP = Math.floor((attackFactor * defenseFactor * staminaFactor * GameDataFactory.CPM_SQUARED) / 10);
        // CP cannot be lower than 10
        return Math.max(10, calculatedCP);
    }
    // FUTURE RAID POWER CALCULATION MAYBE HERE

    /**
     *
     * @param arr the array of moves from the API to simplify
     * @param category 1 = normal, 2 = elite
     * @returns {Array} simplified array of moves with name, type, and isElite properties, can easily be expanded when more
     * data is needed from the API
     */

    static simpleMoves(arr, category) {
        let simpleArray = [];
        const arrLength = Object.keys(arr).length;
        const arrKeys = Object.keys(arr);
        const arrName = arr.constructor.name;
        let i = 0;
        if (arrLength > 0) {
            while (i < arrLength) {
                const move = arr[arrKeys[i]];

                const moveToAdd = {
                    name: move.names?.English?.toLowerCase() || null,
                    type: move.type?.names?.English?.toLowerCase() || null
                }
                if (category === 1) {
                    moveToAdd.isElite = 'false';
                } else if (category === 2) {
                    moveToAdd.isElite = 'true';
                }
                simpleArray.push(moveToAdd);
                i++;
            }
        }
        return simpleArray;
    }

    /**
     * Creates a simple Pokemon object {name, image, pokemonId} with basic information. mirrors the
     * Pokemon object but without the details and tradeDetails properties.
     * @param pokemon1 The raw Pokemon data from the API.
     * @param version The version of the image to use (1 = normal, 2 = shiny, 3 = normal form, 4 = shiny form).
     * @param index The index of the asset form to use.
     * @returns {Object} A simple Pokemon object with id, name, and image properties.
     */
    static createSimplePokemonObject(pokemon1, version, index = null) {
        const assetForm = pokemon1.assetForms?.[index];
        let image = null;
        if (version === 1) image = pokemon1.assets?.image;
        else if (version === 2) image = pokemon1.assets?.shinyImage;
        else if (version === 3) image = assetForm?.image;
        else if (version === 4) image = assetForm?.shinyImage;
        return {
            pokemonId: pokemon1.dexNr,
            name: pokemon1.id?.toLowerCase() || '',
            image: image ? String(image) : null,
        };
    }

    /**
     * Creates a fully hydrated Pokemon object with details and tradeDetails properties.
     * @param data The raw Pokemon data from the API.
     * @param pokemon The simple Pokemon object, used to get the name, image, and pokemonId properties.
     * @returns {Pokemon}
     */
    static createPokemonObject(data, pokemon) {

        const pokemonDetailsData = new PokemonDetails({
            maxCp: GameDataFactory.calculateCP(data.stats?.attack || 0, data.stats?.defense || 0, data.stats?.stamina || 0),
            fastMoves: GameDataFactory.simpleMoves(data.quickMoves, 1) || [],
            chargedMoves: GameDataFactory.simpleMoves(data.cinematicMoves, 1) || [],
            specialFastMoves: GameDataFactory.simpleMoves(data.eliteQuickMoves, 2) || [],
            specialChargedMoves: GameDataFactory.simpleMoves(data.eliteCinematicMoves, 2) || [],
            megaCapable: data.hasMegaEvolution || false
        });
        console.log(pokemonDetailsData);
        const pokemonToAdd = new Pokemon({
                pokemonId: pokemon?.pokemonId,
                name: pokemon?.name,
                image: pokemon?.image,
                type: data.primaryType?.names?.English?.toLowerCase() || null,
                secondaryType: data.secondaryType?.names?.English?.toLowerCase() || null,
                pokemonDetails: pokemonDetailsData,
                tradeDetails: new TradeDetails(),
            }
        )
        // console.log(pokemonToAdd)
        return pokemonToAdd;
    }

    /**
     * Fetches a single Pokemon's data from the API using its pokemonId, hydrates it,
     * and returns a promise that resolves to the fully hydrated Pokemon object.
     * (i made it return only the object at first until i realized i needed to use it in a promise)
     * @param pokemon The simple Pokemon object containing the pokemonId, image, and name.
     * @returns {Promise<Pokemon>}
     */
    static async fetchSinglePokemon(pokemon){
        try {
            if (pokemon?.pokemonId) {
                return fetch(`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/${pokemon.pokemonId}.json`)
                    .then(response => response.json())
                    .then(data => {
                        const pokemonObject = GameDataFactory.createPokemonObject(data, pokemon);
                        console.log('Fetched single pokemon data:', pokemonObject);
                        return pokemonObject;
                    })
                    .catch(err => {
                        console.error('Error fetching single pokemon:', err);
                        return null;
                    });



            } else{
                console.error('No id provided')
            }
        } catch (e){
            console.error(e);
        }
    }

    /**
     * Fetches the entire Pokémon list from the API, processes it to create simplified Pokémon objects,
     * and returns a promise that resolves to an array of these simplified Pokémon objects.
     * @returns {Promise<*[]>}
     */
    static async fetchPokemonListApi() {
        try {
            const response = await fetch("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json");
            const data = await response.json();

            const pokemonListApi = [];

            for (const pokemon of data) {
                // Version 1: Standard image
                if (pokemon.assets?.image) {
                    pokemonListApi.push(GameDataFactory.createSimplePokemonObject(pokemon, 1));
                }

                // Version 2: Shiny image
                if (pokemon.assets?.shinyImage) {
                    pokemonListApi.push(GameDataFactory.createSimplePokemonObject(pokemon, 2));
                }

                // Version 3 & 4: Asset forms
                if (Array.isArray(pokemon.assetForms)) {
                    pokemon.assetForms.forEach((form, i) => {
                        const isFormValid = form.costume || (form.form && !["PRIMAL", "MEGA", "MEGA_X", "MEGA_Y"].includes(form.form));

                        if (isFormValid) {
                            if (form.image) {
                                pokemonListApi.push(GameDataFactory.createSimplePokemonObject(pokemon, 3, i));
                            }
                            if (form.shinyImage) {
                                pokemonListApi.push(GameDataFactory.createSimplePokemonObject(pokemon, 4, i));
                            }
                        }
                    });
                }
            }

            console.log("First processed Pokémon:", pokemonListApi[0]);
            return pokemonListApi;

        } catch (error) {
            console.error("Failed to fetch Pokémon list:", error);
            return [];
        }
    }
}