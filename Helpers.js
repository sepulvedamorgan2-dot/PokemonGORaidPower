const pokemonListAPI = [];

await fetch("https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json")
    .then((response) => response.json())
    .then((data) => {


        for (const pokemon of data.results) {
            pokemonListAPI.push(pokemon);

        }

    })
    .catch((error) => {

        console.error(error);
    });

export async function getSpriteLink(pokemonID) {

    console.log(pokemonListAPI)
    if (typeof pokemonID === "number") {
        return `https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm${pokemonID}.fNORMAL.icon.png`;
    }
}



