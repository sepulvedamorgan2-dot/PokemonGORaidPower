export function PokemonDetails(data = {}) {
    this.maxCp = data.maxCp || 0;
    this.fastMoves = data.fastMoves || [];
    this.chargedMoves = data.chargedMoves || [];
    this.specialFastMoves = data.specialFastMoves || [];
    this.specialChargedMoves = data.specialChargedMoves || [];
    this.megaCapable = data.megaCapable || false;

    this.test = function() {
        console.log('PokemonDetails test function called');
    }
}