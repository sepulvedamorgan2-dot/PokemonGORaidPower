function pokemonList(pokemonList) {
    this.pokemonList = pokemonList ?? [];
    pokemonList.add = function (pokemon) {
        pokemon.id = this.pokemonList[-1].id + 1 || 1;
        this.pokemonList.push(pokemon);
    }
    pokemonList.remove = function (pokemonId) {
        this.pokemonList = this.pokemonList.filter(pokemon => pokemon.pokemonId !== pokemonId);
    }
    pokemonList.find = function (pokemonId) {
        return this.pokemonList.find(pokemon => pokemon.pokemonId === pokemonId);
    }

}

export function Pokemon(pokemonId, name, image, type, secondaryType, pokemonDetails, tradeDetails) {
    this.id = null
    this.pokemonId = pokemonId;
    this.name = name;
    this.image = image;
    this.type = type;
    this.secondaryType = secondaryType;
    this.pokemonDetails = pokemonDetails;
    this.tradeDetails = tradeDetails;
}
export function PokemonDetails(maxCp, fastMoves, chargedMoves, specialFastMoves, specialChargedMoves, megaCapable) {
    this.maxCp = maxCp;
    this.fastMoves = fastMoves;
    this.chargedMoves = chargedMoves;
    this.specialFastMoves = specialFastMoves;
    this.specialChargedMoves = specialChargedMoves;
    this.megaCapable = megaCapable;
}

export function TradeDetails(tags, tradeQuantity, tradeBackground) {
    this.tags = tags;
    this.tradeQuantity = tradeQuantity;
    this.tradeBackground = tradeBackground;
}

function LibraryItem(title){
    this.title = title ?? '';

    // set the default status
    this.status = 'in';

    // methods
    this.checkIn = function(){
        this.status = 'in';
    }

    this.checkOut = function(){
        this.status = 'out';
    }

    this.isAvailable = function(){
        return this.status === 'in';
    }
}
