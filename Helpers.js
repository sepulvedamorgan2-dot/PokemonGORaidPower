


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
export async function fetchPokemonList() {
    fetch("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json")
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            for (const pokemon of data) {
                try{
                    if(pokemon.assets.image){

                        pokemonListApi.push({name: pokemon.id.toLowerCase(), pokemonId: pokemon.dexNr, image: String(pokemon.assets.image), maxCp: calculateCP(pokemon.stats.attack, pokemon.stats.defense, pokemon.stats.stamina)});
                    }
                } catch{

                }
                try{
                    if(pokemon.assets.shinyImage){

                        pokemonListApi.push({name: pokemon.id.toLowerCase(), pokemonId: pokemon.dexNr, image: pokemon.assets.shinyImage, maxCp: calculateCP(pokemon.stats.attack, pokemon.stats.defense, pokemon.stats.stamina)});
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
