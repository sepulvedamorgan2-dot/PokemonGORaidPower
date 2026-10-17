




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
function addPokemon(pokemon, version, index) {
    const pokemonToAdd = {}
    pokemonToAdd.name = pokemon.id.toLowerCase();
    pokemonToAdd.pokemonId = pokemon.dexNr;
    pokemonToAdd.type = pokemon.primaryType.names.English.toLowerCase();
    pokemonToAdd.secondaryType = pokemon.secondaryType ? pokemon.secondaryType.names.English.toLowerCase() : null;

    pokemonToAdd.maxCp = calculateCP(pokemon.stats.attack, pokemon.stats.defense, pokemon.stats.stamina);
    pokemonToAdd.fastMoves = pokemon.quickMoves;
    pokemonToAdd.chargedMoves = pokemon.cinematicMoves;
    pokemonToAdd.megaCapable = pokemon.hasMegaEvolution;

    // pokemonToAdd.image = version === 1 ? String(pokemon.assets.image) : version === 2 ? String(pokemon.assets.shinyImage) : version === 3 ? String(pokemon.assetForms[0].image) : null;
    if(version === 1){
        pokemonToAdd.image = String(pokemon.assets.image);
    } else if(version === 2){
        pokemonToAdd.image = String(pokemon.assets.shinyImage);
    } else if(version === 3){
        pokemonToAdd.image = String(pokemon.assetForms[index].image);
    } else if(version === 4){
        pokemonToAdd.image = String(pokemon.assetForms[index].shinyImage);
    }
    pokemonListApi.push(pokemonToAdd);
}
export async function fetchPokemonList() {
    fetch("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json")
        .then((response) => response.json())
        .then((data) => {

            console.log(data);
            for (const pokemon of data) {
                try{
                    if(pokemon.assets.image){

                        addPokemon(pokemon, 1);
                    }
                } catch{
                }
                try{
                    if(pokemon.assets.shinyImage){

                        addPokemon(pokemon, 2);
                    }
                } catch{
                }
                try{
                    if(pokemon.assetForms.length > 0){

                        for(let i = 0; i < pokemon.assetForms.length; i++){
                            if (pokemon.assetForms[i].costume || pokemon.assetForms[i].form && pokemon.assetForms[i].form !== "PRIMAL"  && pokemon.assetForms[i].form !== "MEGA"&& pokemon.assetForms[i].form !== "MEGA_X" && pokemon.assetForms[i].form !== "MEGA_Y" ){
                                console.log(pokemon.assetForms[i]);
                                addPokemon(pokemon, 3, i);
                                try{
                                    if(pokemon.assetForms[i].shinyImage){
                                        addPokemon(pokemon, 4, i);
                                    }
                                }catch(e){

                                }
                            }

                        }

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
