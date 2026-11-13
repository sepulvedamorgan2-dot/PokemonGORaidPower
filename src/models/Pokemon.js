
/**
 * Represents the details of a Pokémon, including its maximum CP and available  moves.
 * Special moves require an eliteTM
 * example move object: {name: "Fire Blast", type: "fire", isElite: true}
 * maybe make it a model, maybe not.
 * @param data An object containing the Pokémon's details.
 */
export function Pokemon(data = {}) {
    this.pokemonId = data.pokemonId ?? null;
    this.name = data.name ?? 'Unknown Pokémon';
    this.maxCp = data.maxCp || 0;
    this.fastMoves = data.fastMoves || [];
    this.chargedMoves = data.chargedMoves || [];
    this.specialFastMoves = data.specialFastMoves || [];
    this.specialChargedMoves = data.specialChargedMoves || [];
    this.megaCapable = data.megaCapable || false;
    this.image = data.image ?? '';
    this.type = data.type ?? 'normal';
    this.secondaryType = data.secondaryType ?? null;
    this.uniquePokemonId = data.uniquePokemonId ?? null;

}