import { Pokemon } from "./Pokemon.js";


/**
 * Represents a Pokémon with its basic information, details, and trade details.
 * @param data An object containing the Pokémon's properties.
 */

export function PokemonInstance(data = {}) {
    this.id = data.id ?? null;
    this.fastMove = data.fastMove ?? null;
    this.chargedMoveOne = data.chargedMoveOne ?? null;
    this.chargedMoveTwo = data.chargedMoveTwo ?? null;
    this.isShadow = data.isShadow ?? false;
    this.pokemon = data.pokemon
        ? new Pokemon(data.pokemon)
        : new Pokemon();
    // this.tradeDetails = data.tradeDetails
    //     ? new TradeDetails(data.tradeDetails)
    //     : new TradeDetails();
    this.tradeDetails = {
        tradeQuantity: data.tradeDetails?.tradeQuantity ?? 1,
        tradeBackground: data.tradeDetails?.tradeBackground ?? 'None',
        size: data.tradeDetails?.size ?? 'None',
        lucky: data.tradeDetails?.lucky ?? 'None',
        level: data.tradeDetails?.level ?? 'None',
        priority: data.tradeDetails?.priority ?? 'None',
        registered: data.tradeDetails?.registered ?? 'None',
        multiAccount: data.tradeDetails?.multiAccount ?? 'None',
        pokeball: data.tradeDetails?.pokeball ?? 'None',
        gender: data.tradeDetails?.gender ?? 'None',
        eliteTmMoves: data.tradeDetails?.eliteTmMoves ?? 'None'
    };

    this.getEliteTmMoves = function () {
        const moves = ['None']

        if (this.pokemon.specialChargedMoves.length > 0) {
            for (const move of Object.values(this.pokemon.specialChargedMoves)) {
                moves.push(move.name);
            }
        }
        if (this.pokemon.specialFastMoves.length > 0) {
            for (const move of Object.values(this.pokemon.specialFastMoves)) {
                moves.push(move.name);
            }
        }
        return moves;

    }

    /**
     * Returns a string representing the CSS class for the Pokémon's fast move type.
     * @param prefix A string to prefix the class name. (example: 'text-' or 'bg-')
     * @param otherClasses Additional classes to include in the returned string.
     * @returns {string} The CSS class string for the fast move type.
     */
    this.getFastClass = function(prefix, otherClasses = '') {
        return `${prefix}-type${this.fastMove?.type || ''} ${otherClasses}`.trim();
    };

    /**
     * Returns a string representing the CSS class for the Pokémon's charged move type.
     * @param prefix A string to prefix the class name. (example: 'text-' or 'bg-')
     * @param moveIndex choose between 1 or 2 for the charged move, 1 = chargedMoveOne, 2 = chargedMoveTwo
     * @param otherClasses Additional classes to include in the returned string.
     * @returns {string} The CSS class string for the charged move type.
     */
    this.getChargedClass = function(prefix, moveIndex, otherClasses = '') {
        const move = moveIndex === 1 ? this.chargedMoveOne : this.chargedMoveTwo;
        return `${prefix}-type${move?.type || ''} ${otherClasses}`.trim();
    };
}

