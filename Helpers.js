const CPM_SQUARED = 0.840300 ** 2;
import {defaultTags} from '/styles/Data/DefaultTradeSettings.js'

function calculateCP(baseAtk, baseDef, baseSta) {
    const attackFactor = baseAtk + 15;
    const defenseFactor = Math.sqrt(baseDef + 15);
    const staminaFactor = Math.sqrt(baseSta + 15);
    const calculatedCP = Math.floor((attackFactor * defenseFactor * staminaFactor * CPM_SQUARED) / 10);
    // CP cannot be lower than 10
    return Math.max(10, calculatedCP);
}

function createPokemonObject(pokemon, version, index = null) {
    const assetForm = pokemon.assetForms?.[index];

    let image = null;
    if (version === 1) image = pokemon.assets?.image;
    else if (version === 2) image = pokemon.assets?.shinyImage;
    else if (version === 3) image = assetForm?.image;
    else if (version === 4) image = assetForm?.shinyImage;

    return {
        pokemonId: pokemon.dexNr,
        name: pokemon.id?.toLowerCase() || '',
        image: image ? String(image) : null,
        type: pokemon.primaryType?.names?.English?.toLowerCase() || null,
        secondaryType: pokemon.secondaryType?.names?.English?.toLowerCase() || null,
        pokemonDetails: {
            maxCp: calculateCP(pokemon.stats?.attack || 0, pokemon.stats?.defense || 0, pokemon.stats?.stamina || 0),
            fastMoves: pokemon.quickMoves || [],
            chargedMoves: pokemon.cinematicMoves || [],
            specialFastMoves: pokemon.eliteQuickMoves || [],
            specialChargedMoves: pokemon.eliteCinematicMoves || [],
            megaCapable: pokemon.hasMegaEvolution || false,
        },
        tradeDetails: {
            tags: [
                {
                    text: 'Size',
                    Options: ['None', 'XXS', 'XXL'],
                    selected: 'None'
                },
                {
                    text: 'None',
                    Options: ['None', 'Registered', 'Unregistered'],
                    selected: 'None'
                },
                {
                    text: 'Lucky',
                    Options: ['None', 'Lucky'],
                    selected: 'None'
                },
                {
                    text: 'Level',
                    Options: ['None', 'Lvl 1', 'Lvl 40', 'Lvl 50'],
                    selected: 'None'
                },
                {
                    text: 'Special Move',
                    Options: ['None',],
                    selected: 'None'
                },
                {
                    text: 'Priority',
                    Options: ['None', 'Priority'],
                    selected: 'None'
                },],
            tradeQuantity: 1,
            tradeBackground: '',
        },


    };
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