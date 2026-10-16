


function calculateCP(baseAtk, baseDef, baseSta) {
    const attackFactor = baseAtk + 15;
    const defenseFactor = Math.sqrt(baseDef + 15);
    const staminaFactor = Math.sqrt(baseSta + 15);
    const cpmFactor = Math.pow(0.840300, 2)

    const calculatedCP = Math.floor((attackFactor * defenseFactor * staminaFactor * cpmFactor) / 10);

    // CP cannot be lower than 10
    return Math.max(10, calculatedCP);
}

const pokemonListApi = [];
function addPokemon(pokemon, shiny) {

    pokemonListApi.push({name: pokemon.id.toLowerCase(),
        pokemonId: pokemon.dexNr,
        type: pokemon.primaryType.names.English.toLowerCase(),
        secondaryType: pokemon.secondaryType ? pokemon.secondaryType.names.English.toLowerCase() : null,
        image: shiny? String(pokemon.assets.image): String(pokemon.assets.shinyImage) ,
        maxCp: calculateCP(pokemon.stats.attack, pokemon.stats.defense, pokemon.stats.stamina),
        fastMoves: pokemon.quickMoves,
        chargedMoves: pokemon.cinematicMoves,


    });
}
export async function fetchPokemonList() {
    fetch("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json")
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            for (const pokemon of data) {
                try{
                    if(pokemon.assets.image){

                        addPokemon(pokemon, true);
                    }
                } catch{

                }
                try{
                    if(pokemon.assets.shinyImage){

                        addPokemon(pokemon);
                    }
                } catch{

                }

            }

        })
        .catch((error) => {

            console.error(error);
        });
    console.log(pokemonListApi[0]);
    return pokemonListApi;
}
