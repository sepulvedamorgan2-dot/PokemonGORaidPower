import {TagObject} from "@/models/Tag.js";

export function TradeDetails(data = {}) {
    this.tags = (data.tags && data.tags.length > 0)
        ? data.tags
        : TradeDetails.defaultTags.map(tag => new TagObject({
            title: tag.title,
            selected: tag.selected,
            optionsArray: [...tag.optionsArray],

        }));

    this.tradeQuantity = data.tradeQuantity ?? 1;
    this.tradeBackground = data.tradeBackground ?? '';


        this.addMoveTag = function (pokemon){
            console.log(this.tags?.find(tag => tag.title === 'Size'))
            if ((this.tags?.find(tag => tag.title === 'Elite TM Attacks'))) {
                return;
            }
            const moves = {
                    optionsArray: ['None'],
                    selected: 'None',
                    title: 'Elite TM Attacks'
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
                this.tags.splice(3, 0, moves);
            }

        }
}

TradeDetails.defaultTags = [
    new TagObject({title: 'Size', selected: 'None', optionsArray: ['None', 'XXL', 'XXS']}),
    new TagObject({title: 'Level', selected: 'None', optionsArray: ['None', 'Lvl 1', 'Lvl 40', 'Lvl 50']}),
    new TagObject({title: 'Registered', selected: 'None', optionsArray: ['None', 'Unreg', 'Reg']}),
    new TagObject({title: 'Priority', selected: 'None', optionsArray: ['None', 'Priority']}),
    new TagObject({title: 'Multiple Accounts', selected: 'None', optionsArray: ['None', 'Alt', 'Main']}),
    new TagObject({title: 'Pokeball Type', selected: 'None', optionsArray: ['None', 'Poke Ball', 'Ultra Ball', 'Great Ball', 'Premier Ball', 'Master Ball', 'Safari Ball']}),
    new TagObject({title: 'Gender', selected: 'None', optionsArray: ['None', 'Male', 'Female']}),
]