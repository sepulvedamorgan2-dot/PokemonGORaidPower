import {PokemonDetails} from "@/models/PokemonDetails.js";
import {defaultTags} from '@/Services/DefaultTradeSettings.js'
import {TradeDetails} from "@/models/TradeDetails.js";

const CPM_SQUARED = 0.840300 ** 2;
import {Pokemon} from '@/models/Pokemon.js';


function calculateCP(baseAtk, baseDef, baseSta) {
    const attackFactor = baseAtk + 15;
    const defenseFactor = Math.sqrt(baseDef + 15);
    const staminaFactor = Math.sqrt(baseSta + 15);
    const calculatedCP = Math.floor((attackFactor * defenseFactor * staminaFactor * CPM_SQUARED) / 10);
    // CP cannot be lower than 10
    return Math.max(10, calculatedCP);
}
function simpleMoves(arr, category){
    let simpleArray = [];
    const arrLength = Object.keys(arr).length;
    const arrKeys = Object.keys(arr);
    const arrName = arr.constructor.name;
    let i = 0;
    if (arrLength > 0) {
        while (i < arrLength) {
            const move = arr[arrKeys[i]];
            console.log(move)
            const moveToAdd = {
                name: move.names?.English?.toLowerCase() || null,
                type : move.type?.names?.English?.toLowerCase() || null
            }
            if(category === 1){
                moveToAdd.isElite = 'false';
            }
            else if(category === 2){
                moveToAdd.isElite = 'true';
            }
            simpleArray.push(moveToAdd);
            i++;
        }
    }
    return simpleArray;
}

function createPokemonObject(pokemon1, version, index = null) {
    const assetForm = pokemon1.assetForms?.[index];

    let image = null;
    if (version === 1) image = pokemon1.assets?.image;
    else if (version === 2) image = pokemon1.assets?.shinyImage;
    else if (version === 3) image = assetForm?.image;
    else if (version === 4) image = assetForm?.shinyImage;
    const pokemonDetails = new PokemonDetails(
        calculateCP(pokemon1.stats?.attack || 0, pokemon1.stats?.defense || 0, pokemon1.stats?.stamina || 0),
        simpleMoves(pokemon1.quickMoves, 1) || [],
        simpleMoves(pokemon1.cinematicMoves, 1) || [],
        simpleMoves(pokemon1.eliteQuickMoves, 2) || [],
        simpleMoves(pokemon1.eliteCinematicMoves, 2) || [],
        pokemon1.hasMegaEvolution || false
    );
    const tradeDetails = new TradeDetails(
        {...defaultTags},
        1,
        ''
    );
    const pokemonToAdd = new Pokemon(
        pokemon1.dexNr,
        pokemon1.id?.toLowerCase() || '',
        image ? String(image) : null,
        pokemon1.primaryType?.names?.English?.toLowerCase() || null,
        pokemon1.secondaryType?.names?.English?.toLowerCase() || null
        ,pokemonDetails,
        tradeDetails,
    )
    // console.log(pokemonToAdd)
    return pokemonToAdd;
}

export async function fetchPokemonList() {
    try {
        const response = await fetch("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json");
        const data = await response.json();

        const pokemonListApi = [];

        for (const pokemon of data) {
            // Version 1: Standard image
            if (pokemon.assets?.image) {
                pokemonListApi.push(createPokemonObject(pokemon, 1));
            }

            // Version 2: Shiny image
            if (pokemon.assets?.shinyImage) {
                pokemonListApi.push(createPokemonObject(pokemon, 2));
            }

            // Version 3 & 4: Asset forms
            if (Array.isArray(pokemon.assetForms)) {
                pokemon.assetForms.forEach((form, i) => {
                    const isFormValid = form.costume || (form.form && !["PRIMAL", "MEGA", "MEGA_X", "MEGA_Y"].includes(form.form));

                    if (isFormValid) {
                        if (form.image) {
                            pokemonListApi.push(createPokemonObject(pokemon, 3, i));
                        }
                        if (form.shinyImage) {
                            pokemonListApi.push(createPokemonObject(pokemon, 4, i));
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