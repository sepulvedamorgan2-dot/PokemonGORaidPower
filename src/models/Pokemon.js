import { PokemonDetails } from "./PokemonDetails.js";
import { TradeDetails} from "./TradeDetails.js";


export function Pokemon(pokemonId, name, image, type, secondaryType, pokemonDetails, tradeDetails) {
    this.id = null
    this.pokemonId = pokemonId;
    this.name = name;
    this.fastMove = null;
    this.chargedMoveOne = null;
    this.chargedMoveTwo = null;
    this.image = image;
    this.type = type;
    this.secondaryType = secondaryType;
    this.pokemonDetails = pokemonDetails ?? new PokemonDetails();
    this.tradeDetails = tradeDetails ?? new TradeDetails();

    this.getFastClass = function(prefix, otherClasses) {
        console.log(this)
        return `${prefix}-type${this.fastMove?.type || ''} ${otherClasses}`;
    }
    this.getChargedClass = function(prefix, moveIndex, otherClasses) {
        console.log(this)
        const move = moveIndex === 1 ? this.chargedMoveOne : this.chargedMoveTwo;
        return `${prefix}-type${move?.type || ''} ${otherClasses}`;
    }



}

