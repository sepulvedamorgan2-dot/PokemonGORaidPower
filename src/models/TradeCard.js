import {TagObject} from "@/models/Tag.js"
import {PokemonList} from "@/models/PokemonList.js";
import GameDataFactory from "@/models/factories/GameDataFactory.js";
/**
 * TradeCard represents a trade card that contains a list of Pokémon the user has and wants.
 * It also contains options for both the have and want lists, which are represented as TagObjects.
 * @param data An object containing the properties of the TradeCard.
 */
export function TradeCard(data = {}) {
    this.id = data.id ?? null;
    this.title = data.title ?? 'My Trade Card';
    this.haveList = data.haveList
        ? new PokemonList(data.haveList)
        : new PokemonList();
    this.wantList = data.wantList ?
        new PokemonList(data.wantList)
        : new PokemonList();
    this.haveOptions = data.haveOptions?.length > 0
        ? data.haveOptions
        : TradeCard.defaultHaveOptions.map(tag => new TagObject({
                title: tag.title,
                selected: tag.selected,
                optionsArray: [...tag.optionsArray],
                tagClass: tag.tagClass
            }
        ));

    this.wantOptions = data.wantOptions?.length > 0
        ? data.wantOptions
        : TradeCard.defaultWantOptions.map(tag => new TagObject({
            title: tag.title,
            selected: tag.selected,
            optionsArray: [...tag.optionsArray],
            tagClass: tag.tagClass
        }));
    this.addHaveList = async function (pokemon) {
        if (pokemon?.tradeDetails?.tags){
            this.haveList.add(pokemon);
        } else {
            await GameDataFactory.fetchSinglePokemon(pokemon)
                .then(fetchedPokemon => {
                    if (fetchedPokemon) {
                        this.haveList.add(fetchedPokemon);
                    } else {
                        console.error('Failed to fetch pokemon for have list:', pokemon);
                    }
                });
        }



    }
    this.addWantedList = async function(pokemon) {
        await GameDataFactory.fetchSinglePokemon(pokemon)
            .then(fetchedPokemon => {
            if (fetchedPokemon) {
                this.wantList.add(fetchedPokemon);
            } else {
                console.error('Failed to fetch pokemon for want list:', pokemon);
            }
        });

    }
    this.removeFromHaveList = function (pokemon) {
        this.haveList.remove(pokemon.id);
    }
    this.removeFromWantedList = function (pokemon) {
        this.wantList.removeByImage(pokemon.image);
    }
    this.updateOptionClasses = function () {
        for (const option of this.wantOptions) {
            for (const subOption of option.optionsArray) {
                if (subOption.selected === option.selected) {
                    option.tagClass = subOption.tagClass;
                    break;
                }
            }
        }
        for (const option of this.haveOptions) {
            for (const subOption of option.optionsArray) {
                if (subOption.selected === option.selected) {
                    option.tagClass = subOption.tagClass;
                    break;
                }
            }
        }

    }

}

TradeCard.defaultHaveOptions = [
    new TagObject({
        title: 'Flying Capability',
        selected: 'Cant Fly',
        optionsArray: [
            {selected: 'Can Fly', tagClass: 'success'},
            {selected: 'Cant Fly', tagClass: 'danger'}
        ],
        tagClass: 'danger'
    }),
    new TagObject({
        title: 'Trinket Usage',
        selected: 'No Trinket',
        optionsArray: [
            {selected: 'No Trinket', tagClass: 'd-none'},
            {selected: 'My Trinket', tagClass: 'tertiary'}
        ],
        tagClass: 'd-none'
    }),
    new TagObject({
            title: 'Guaranteed Luckies',
            selected: 'N/A',
            optionsArray: [
                {selected: 'N/A', tagClass: 'd-none'},
                {selected: 'Guaranteed Luckies', tagClass: 'typeelectric'}
            ],
            tagClass: 'd-none'
        }
    )
];
TradeCard.defaultWantOptions = [
    new TagObject({
        title: 'Trinket Usage',
        selected: 'No Trinket',
        optionsArray: [
            {selected: 'No Trinket', tagClass: 'd-none'},
            {selected: 'Your Trinket', tagClass: 'tertiary'}
        ],
        tagClass: 'd-none'
    }),
    new TagObject({
            title: 'Trade Friendship',
            selected: 'No Friendship Info',
            optionsArray: [
                {selected: 'No Friendship Info', tagClass: 'd-none'},
                {selected: 'Instant Registered', tagClass: 'success'},
                {selected: 'Instant Un-Registered', tagClass: 'typedragon'},
                {selected: '7 Day / 800k Dust', tagClass: 'typeground'},
                {selected: '30 Day / 80k Dust', tagClass: 'typeghost'},
            ],
            tagClass: 'success'
        }
    ),
    new TagObject({
            title: 'Mirror Trade(s)',
            selected: 'N/A',
            optionsArray: [
                {selected: 'N/A', tagClass: 'd-none'},
                {selected: 'Mirror Trade(s)', tagClass: 'typepoison'}
            ],
            tagClass: 'success'
        }
    ),
    new TagObject({
            title: 'Guaranteed Luckies',
            selected: 'N/A',
            optionsArray: [
                {selected: 'N/A', tagClass: 'd-none'},
                {selected: 'Guaranteed Luckies', tagClass: 'typeelectric'}
            ],
            tagClass: 'd-none'
        }
    )
];
