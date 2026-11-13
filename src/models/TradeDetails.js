import {TagObject} from "@/models/Tag.js";

/**
 * Contains trade details for a Pokémon, including tags, trade quantity, and trade background.
 * The tags are represented as an array of TagObjects,
 * they are used to display information about the Pokémon in the trade card, not filter.
 * @param data An object containing the properties of the TradeDetails.
 * @constructor
 */
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

    /**
     * Adds a move tag to the trade details if the Pokémon has special moves.
     * The move tag is added only if it doesn't already exist in the tags array and if the Pokémon has special charged or fast moves.
     * @param pokemon object
     */
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
            if (pokemon.pokemon.specialChargedMoves.length > 0) {
                for (const move of Object.values(pokemon.pokemon.specialChargedMoves)) {
                    moves.optionsArray.push(move.name);
                }
            }
            if(pokemon.pokemon.specialFastMoves.length > 0){
            for (const move of Object.values(pokemon.pokemon.specialFastMoves)) {
                moves.optionsArray.push(move.name);
            }
            }
            console.log(moves)
            if(moves.optionsArray.length > 0) {
                this.tags.splice(3, 0, moves);
            }

        }
}

/**
 * Default tags for trade details, used when no tags are provided in the data.
 * doesnt update existing pokemon tags, even when changed(maybe bad), only used when creating a new pokemon object
 * @type {TagObject[]}
 */
TradeDetails.defaultTags = [
    new TagObject({title: 'Size', selected: 'None', optionsArray: ['None', 'XXL', 'XXS']}),
    new TagObject({title: 'Level', selected: 'None', optionsArray: ['None', 'Lvl 1', 'Lvl 40', 'Lvl 50']}),
    new TagObject({title: 'Registered', selected: 'None', optionsArray: ['None', 'Unreg', 'Reg']}),
    new TagObject({title: 'Priority', selected: 'None', optionsArray: ['None', 'Priority']}),
    new TagObject({title: 'Multiple Accounts', selected: 'None', optionsArray: ['None', 'Alt', 'Main']}),
    new TagObject({title: 'Pokeball Type', selected: 'None', optionsArray: ['None', 'Poke Ball', 'Ultra Ball', 'Great Ball', 'Premier Ball', 'Master Ball', 'Safari Ball']}),
    new TagObject({title: 'Gender', selected: 'None', optionsArray: ['None', 'Male', 'Female']}),
]