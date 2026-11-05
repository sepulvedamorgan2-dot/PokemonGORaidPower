export function PokemonDetails(maxCp, fastMoves, chargedMoves, specialFastMoves, specialChargedMoves, megaCapable) {
    this.maxCp = maxCp;
    this.fastMoves = fastMoves;
    this.chargedMoves = chargedMoves;
    this.specialFastMoves = specialFastMoves;
    this.specialChargedMoves = specialChargedMoves;
    this.megaCapable = megaCapable;

    this.test = function() {
        console.log('PokemonDetails test function called');
    }
}