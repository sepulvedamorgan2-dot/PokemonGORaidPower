import {TagObject} from "@/models/Tag.js";
import {PokemonDetails} from "@/models/PokemonDetails.js";
import {PokemonList} from "@/models/PokemonList.js";
import GameDataFactory from "@/models/GameDataFactory.js";

export function TradeCard(data = {}) {
    this.id = null;
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
    this.addHaveList = function (pokemon) {
        this.haveList.add(pokemon);
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
        this.wantList.remove(pokemon.id);
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
            title: 'Pokemon Level',
            selected: 'Any Level',
            optionsArray: [
                {selected: 'Any Level', tagClass: 'd-none'},
                {selected: 'Level 40', tagClass: 'typewater'},
                {selected: 'Level 50', tagClass: 'typefire'}
            ],
            tagClass: 'd-none'
        }
    ),
    new TagObject({
            title: 'Guaranteed Lucky',
            selected: 'N/A',
            optionsArray: [
                {selected: 'N/A', tagClass: 'd-none'},
                {selected: 'Guaranteed Lucky', tagClass: 'typeelectric'}
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
            selected: 'Instant',
            optionsArray: [
                {selected: 'Instant', tagClass: 'success'},
                {selected: '7 Day Trade', tagClass: 'typeground'},
                {selected: '30 Day Trade', tagClass: 'typeground'},
                {selected: '1 Mil Dust Trade', tagClass: 'typedragon'},
                {selected: '800k Dust Trade', tagClass: 'typedragon'}
            ],
            tagClass: 'success'
        }
    ),
    new TagObject({
            title: 'Pokemon Level',
            selected: 'Any Level',
            optionsArray: [
                {selected: 'Any Level', tagClass: 'd-none'},
                {selected: 'Level 40', tagClass: 'typewater'},
                {selected: 'Level 50', tagClass: 'typefire'}
            ],
            tagClass: 'success'
        }
    ),
    new TagObject({
            title: 'Trade Ratio',
            selected: '1:1',
            optionsArray: [
                {selected: '1:1', tagClass: 'd-none'},
                {selected: '2:1', tagClass: 'typewater'},
                {selected: '3:1', tagClass: 'typefire'}
            ],
            tagClass: 'success'
        }
    ),
    new TagObject({
            title: 'Mirror Trade',
            selected: 'N/A',
            optionsArray: [
                {selected: 'N/A', tagClass: 'd-none'},
                {selected: 'Mirror Trade', tagClass: 'typepoison'}
            ],
            tagClass: 'success'
        }
    ),
    new TagObject({
            title: 'Guaranteed Lucky',
            selected: 'N/A',
            optionsArray: [
                {selected: 'N/A', tagClass: 'd-none'},
                {selected: 'Guaranteed Lucky', tagClass: 'typeelectric'}
            ],
            tagClass: 'd-none'
        }
    )
];
