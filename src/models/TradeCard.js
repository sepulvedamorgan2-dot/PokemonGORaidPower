import {TagObject} from "@/models/Tag.js"
import {PokemonList} from "@/models/PokemonList.js";
import GameDataApi from "@/models/factories/GameDataApi.js";

/**
 * TradeCard represents a trade card that contains a list of Pokémon the user has and wants.
 * It also contains options for both the have and want lists, which are represented as TagObjects.
 * @param data An object containing the properties of the TradeCard.
 */
export function TradeCard(data = {}) {
    this.id = data.id ?? null;
    this.title = data.title ?? 'My Trade Card';
    this.featuredPokemon = data.featuredPokemon ?? [];
    this.allBackgrounds = data.allBackgrounds ?? [];
    this.allTags = data.allTags ?? [];
    this.allHaveNames = data.allHaveNames ?? [];
    this.allWantNames = data.allWantNames ?? [];
    this.flyingOrRemote = data.flyingOrRemote ?? 'Cant Fly';
    this.haveList = data.haveList
        ? new PokemonList(data.haveList)
        : new PokemonList();
    this.wantList = data.wantList ?
        new PokemonList(data.wantList)
        : new PokemonList();
    this.haveOptions = {
        canFly: data.haveOptions?.canFly ?? 'Can Fly',
        trinketUsage: data.haveOptions?.trinketUsage ?? 'No Trinket',
        guaranteedLuckies: data.haveOptions?.guaranteedLuckies ?? 'N/A'
    };
    this.wantOptions = {
        trinketUsage: data.wantOptions?.trinketUsage ?? 'No Trinket',
        tradeFriendship: data.wantOptions?.tradeFriendship ?? 'No Friendship Info',
        mirrorTrades: data.wantOptions?.mirrorTrades ?? 'N/A',
        guaranteedLuckies: data.wantOptions?.guaranteedLuckies ?? 'N/A'
    }



    this.assignFeaturedPokemon = function () {
        this.featuredPokemon = []
        console.log('Assigning featured pokemon for trade card:', this.title);
        if (this.haveList?.items?.length > 0) {
            for (let i = 0; i < this.haveList.items.length && i < 4; i++) {
                console.log(this.haveList.items[i]);
                this.featuredPokemon.push({
                    image: this.haveList.items[i].pokemon.image,
                    name: this.haveList.items[i].pokemon.name,
                })
                for (const [key, value] of Object.entries(this.haveList.items[i].tradeDetails)) {
                    if (value !== 'None' && value !== null) {
                        this.featuredPokemon[i][key] = value;
                    }
                }

            }

        }
        const haveItems = this.haveList?.items ?? [];
        const wantItems = this.wantList?.items ?? [];
        const allPokemon = [...this.haveList?.items, ...this.wantList?.items];
        const haveNames = new Set();
        const wantNames = new Set();
        const backgrounds = new Set();
        const tags = new Set();
        for (const item of haveItems) {
            const name = item?.pokemon?.name?.trim().toLowerCase();
            if (name) haveNames.add(name);
        }

        for (const item of wantItems) {
            const name = item?.pokemon?.name?.trim().toLowerCase();
            if (name) wantNames.add(name);
        }
        for (const item of allPokemon) {
            console.log('ITEM:', item)
            const details = item?.tradeDetails ?? {};

            for (const [key, value] of Object.entries(details)) {
                if (value === undefined || value === null || value === '' || value === 'None') {
                    continue;
                }

                if (key === 'tradeBackground') {
                    backgrounds.add(String(value));
                } else if (key !== 'tradeBackground' && key !== 'tradeQuantity') {
                    tags.add(String(value));
                }
            }
        }
        this.allBackgrounds = Array.from(backgrounds);
        this.allTags = Array.from(tags);
        this.allHaveNames = Array.from(haveNames);
        this.allWantNames = Array.from(wantNames);

    }

    this.addHaveList = async function (pokemon) {
        if (pokemon?.tradeDetails?.tags) {
            this.haveList.addSinglePokemon(pokemon);
            this.assignFeaturedPokemon();
        } else {
            await GameDataApi.fetchSinglePokemon(pokemon)
                .then(fetchedPokemon => {
                    if (fetchedPokemon) {
                        this.haveList.addSinglePokemon(fetchedPokemon);
                        this.assignFeaturedPokemon();
                    } else {
                        console.error('Failed to fetch pokemon for have list:', pokemon);
                    }
                });
        }


    }
    this.addWantedList = async function (pokemon) {

        this.wantList.addSinglePokemon(pokemon);
        this.assignFeaturedPokemon()


    }
    this.removeFromHaveList = function (pokemon) {
        if (pokemon?.id) {
            this.haveList.remove(pokemon.id);
        } else {
            this.haveList.removeByUID(pokemon?.pokemon?.uniquePokemonId);
        }
        this.assignFeaturedPokemon()
    }
    this.removeFromWantedList = function (pokemon) {
        this.wantList.removeByImage(pokemon.pokemon.image);
        this.assignFeaturedPokemon()
    }
    this.updateOptionClasses = function () {
        for (let i = 0; i < defaultWantOptions.length; i++) {
            console.log(defaultWantOptions[i]);
            for (const [key, value] of Object.entries(this.wantOptions)) {
                if (key === defaultWantOptions[i].key) {
                    for (const option of defaultWantOptions[i].optionsArray) {
                        if (option.selected === value) {
                            defaultWantOptions[i].tagClass = {className: option.tagClass, selected: option.selected};
                            break;
                        }
                    }
                }
            }
        }
        // for (const [key, value] of Object.entries(this.wantOptions)) {
        //     for (const option of defaultWantOptions) {
        //         if (key === subOption.key) {
        //             option.tagClass = subOption.tagClass;
        //             break;
        //         }
        //     }
        // }
        // for (const option of this.haveOptions) {
        //     for (const subOption of option.optionsArray) {
        //         if (subOption.selected === option.selected) {
        //             option.tagClass = subOption.tagClass;
        //             break;
        //         }
        //     }
        // }

    }
}

export const defaultHaveOptions = [

    {
        title: 'Trinket Usage',
        key: 'trinketUsage',
        optionsArray: [
            {selected: 'No Trinket', tagClass: 'd-none'},
            {selected: 'My Trinket', tagClass: 'tertiary'}
        ],
    },
    {
        title: 'Guaranteed Luckies',
        key: 'guaranteedLuckies',
        optionsArray: [
            {selected: 'N/A', tagClass: 'd-none'},
            {selected: 'Guaranteed Luckies', tagClass: 'typeelectric'}
        ],
    }
];
export const defaultWantOptions = [
    {
        title: 'Trinket Usage',
        key: 'trinketUsage',
        optionsArray: [
            {selected: 'No Trinket', tagClass: 'd-none'},
            {selected: 'Your Trinket', tagClass: 'tertiary'}
        ],
    },
    {
        title: 'Trade Friendship',
        key: 'tradeFriendship',
        optionsArray: [
            {selected: 'No Friendship Info', tagClass: 'd-none'},
            {selected: 'Instant Registered', tagClass: 'success'},
            {selected: 'Instant Un-Registered', tagClass: 'typedragon'},
            {selected: '7 Day / 800k Dust', tagClass: 'typeground'},
            {selected: '30 Day / 80k Dust', tagClass: 'typeghost'},
        ],
    },
    {
        title: 'Mirror Trade(s)',
        key: 'mirrorTrades',
        optionsArray: [
            {selected: 'N/A', tagClass: 'd-none'},
            {selected: 'Mirror Trade(s)', tagClass: 'typepoison'}
        ],

    }
    ,
    {
        title: 'Guaranteed Luckies',
        key: 'guaranteedLuckies',
        optionsArray: [
            {selected: 'N/A', tagClass: 'd-none'},
            {selected: 'Guaranteed Luckies', tagClass: 'typeelectric'}
        ],

    }

];
