import { PokemonDetails } from "./PokemonDetails.js";
import { TradeDetails} from "./TradeDetails.js";


export function Pokemon(data = {}) {
    this.id = null;
    this.pokemonId = data.pokemonId ?? null;
    this.name = data.name ?? 'Unknown Pokémon';
    this.fastMove = data.fastMove ?? null;
    this.chargedMoveOne = data.chargedMoveOne ?? null;
    this.chargedMoveTwo = data.chargedMoveTwo ?? null;
    this.image = data.image ?? '';
    this.type = data.type ?? 'normal';
    this.secondaryType = data.secondaryType ?? null;

    this.pokemonDetails = data.pokemonDetails
        ? new PokemonDetails(data.pokemonDetails)
        : new PokemonDetails();

    this.tradeDetails = data.tradeDetails
        ? new TradeDetails(data.tradeDetails)
        : new TradeDetails();

    this.getFastClass = function(prefix, otherClasses = '') {
        return `${prefix}-type${this.fastMove?.type || ''} ${otherClasses}`.trim();
    };

    this.getChargedClass = function(prefix, moveIndex, otherClasses = '') {
        const move = moveIndex === 1 ? this.chargedMoveOne : this.chargedMoveTwo;
        return `${prefix}-type${move?.type || ''} ${otherClasses}`.trim();
    };
}

