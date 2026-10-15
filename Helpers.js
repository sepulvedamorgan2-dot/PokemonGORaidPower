
export  function getSpriteLink(pokemonID) {
    if (typeof pokemonID === "number") {

        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;

    }
}