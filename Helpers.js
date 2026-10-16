// async function fetchPokemonImg(pokemonID) {
//     fetch(`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/${pokemonID}.json`)
//         try {
//             const response = await fetch(`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/${pokemonID}.json`);
//
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//
//             const data = await response.json();
//
//             console.log(data.assets.image);
//             return data.assets.image;
//         } catch (error) {
//             console.error(error);
//         }
// }



export  function getSpriteLink(pokemonID) {

    if (typeof pokemonID === "number") {



        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;

    }
}