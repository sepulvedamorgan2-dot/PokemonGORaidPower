import {PokemonDetails} from "@/models/PokemonDetails.js";
import {TradeDetails} from "@/models/TradeDetails.js";
import {Pokemon} from '@/models/Pokemon.js';

export default class GameDataFactory {


    static CPM_SQUARED = 0.840300 ** 2;



    static calculateCP(baseAtk, baseDef, baseSta) {
        const attackFactor = baseAtk + 15;
        const defenseFactor = Math.sqrt(baseDef + 15);
        const staminaFactor = Math.sqrt(baseSta + 15);
        const calculatedCP = Math.floor((attackFactor * defenseFactor * staminaFactor * GameDataFactory.CPM_SQUARED) / 10);
        // CP cannot be lower than 10
        return Math.max(10, calculatedCP);
    }

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


    static createPokemonObject(data, pokemon) {

        const pokemonDetailsData = new PokemonDetails({
            maxCp: GameDataFactory.calculateCP(data.stats?.attack || 0, data.stats?.defense || 0, data.stats?.stamina || 0),
            fastMoves: GameDataFactory.simpleMoves(data.quickMoves, 1) || [],
            chargedMoves: GameDataFactory.simpleMoves(data.cinematicMoves, 1) || [],
            specialFastMoves: GameDataFactory.simpleMoves(data.eliteQuickMoves, 2) || [],
            specialChargedMoves: GameDataFactory.simpleMoves(data.eliteCinematicMoves, 2) || [],
            megaCapable: data.hasMegaEvolution || false
        });
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