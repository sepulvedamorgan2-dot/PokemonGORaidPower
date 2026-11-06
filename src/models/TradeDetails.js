import {TagObject} from "@/models/Tag.js";

export function TradeDetails(tradeQuantity, tradeBackground, tags) {
    this.tags = (tags && tags.length > 0)
        ? tags
        : TradeDetails.defaultTags.map(tag => new TagObject(
            tag.title,
            tag.selected,
            [...tag.optionsArray]

        ));
    this.tradeQuantity = tradeQuantity ?? 1;
    this.tradeBackground = tradeBackground ?? '';


        this.addMoveTag = function (pokemon){
            const moves = {
                    optionsArray: ['None'],
                    selected: 'None',
                    title: 'Elite TM Move'
                }
            if (pokemon.pokemonDetails.specialChargedMoves.length > 0) {
                for (const move of Object.values(pokemon.pokemonDetails.specialChargedMoves)) {
                    moves.optionsArray.push(move.name);
                }
            }
            if(pokemon.pokemonDetails.specialFastMoves.length > 0){
            for (const move of Object.values(pokemon.pokemonDetails.specialFastMoves)) {
                moves.optionsArray.push(move.name);
            }
            }
            console.log(moves)
            if(moves.optionsArray.length > 0) {
                this.tags.push(moves);
            }

        }
}

TradeDetails.defaultTags = [
    new TagObject('Size', 'None', ['None', 'XXL', 'XXS']),
    new TagObject('Level', 'None', ['None', 'Lvl 1', 'Lvl 40', 'Lvl 50']),
    new TagObject('Special Move', 'None', ['None']),
    new TagObject('Priority', 'None', ['None', 'Priority']),
    new TagObject('Registered', 'None', ['None', 'Unreg', 'Reg'])
]