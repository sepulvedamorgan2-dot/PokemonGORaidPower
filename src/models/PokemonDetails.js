
/**
 * Represents the details of a Pokémon, including its maximum CP and available  moves.
 * Special moves require an eliteTM
 * example move object: {name: "Fire Blast", type: "fire", isElite: true}
 * maybe make it a model, maybe not.
 * @param data An object containing the Pokémon's details.
 */
export function PokemonDetails(data = {}) {
    this.maxCp = data.maxCp || 0;
    this.fastMoves = data.fastMoves || [];
    this.chargedMoves = data.chargedMoves || [];
    this.specialFastMoves = data.specialFastMoves || [];
    this.specialChargedMoves = data.specialChargedMoves || [];
    this.megaCapable = data.megaCapable || false;

}