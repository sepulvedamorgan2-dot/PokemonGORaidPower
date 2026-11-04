const CPM_SQUARED = 0.840300 ** 2;
import {Pokemon, PokemonDetails, TradeDetails} from '@/models/pokemon.js';
import {defaultTags} from '@/Services/DefaultTradeSettings.js'

function calculateCP(baseAtk, baseDef, baseSta) {
    const attackFactor = baseAtk + 15;
    const defenseFactor = Math.sqrt(baseDef + 15);
    const staminaFactor = Math.sqrt(baseSta + 15);
    const calculatedCP = Math.floor((attackFactor * defenseFactor * staminaFactor * CPM_SQUARED) / 10);
    // CP cannot be lower than 10
    return Math.max(10, calculatedCP);
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
        pokemon1.quickMoves || [],
        pokemon1.cinematicMoves || [],
        pokemon1.eliteQuickMoves || [],
        pokemon1.eliteCinematicMoves || [],
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
    console.log(pokemonToAdd)
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