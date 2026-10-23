import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {fetchPokemonList} from "./Helpers.js";
import NavbarMain from "./components/NavbarMain.js";
import TradeCard from "./components/trade/TradeCard.js";
import ToggleCard from "./components/trade/ToggleCard.js";

const app = createApp({

    components: {
        NavbarMain,
        TradeCard,
        ToggleCard
    },

    data: function () {

        return {
            pokemonList: [],
            pokemonListAPI: [],
            haveList: [],
            wantList: [],
            tradeCard: {
                id: 0,
                title: '',
                haveList: [],
                wantList: [],
                selectedOptions: {},
            },
            selectedOptions: {}
        }
    },

    methods: {
        fetchPokemonList


    },
    computed: {},

    mounted: async function () {
        this.pokemonListAPI = await this.fetchPokemonList();
        if (localStorage.getItem('pokemonList')) {

            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        } else {
            this.pokemonList = []
        }

        if (localStorage.getItem('haveList')) {

            this.haveList = JSON.parse(localStorage.getItem('haveList'));
            const idList = new Set(this.pokemonList.map(pokemon => pokemon.Id))
            this.haveList = this.haveList.filter(pokemon => idList.has(pokemon.Id));
        } else {
            this.haveList = []
        }

        if (localStorage.getItem('wantList')) {

            this.wantList = JSON.parse(localStorage.getItem('wantList'));
        } else {
            this.wantList = []
        }
        if (localStorage.getItem('selectedOptions')) {
            this.selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
        } else{
            this.selectedOptions.want = [

                {
                    title: 'Trinket Usage',
                    text: 'No Trinket',
                    tagClass: 'd-none',
                    optionsArray: [
                        {text: 'No Trinket', tagClass: 'd-none'}, {text: 'Your Trinket', tagClass: 'tertiary'}
                    ]
                },
                {
                    title: 'Trade Friendship',
                    text: 'Instant',
                    tagClass: 'success',
                    optionsArray: [
                        {text: 'Instant', tagClass: 'success'}, {text: '7 Day Trade', tagClass: 'typeground'}, {text: '30 Day Trade', tagClass: 'typeground'},
                    ]
                },
                {
                    title: 'Pokemon Level',
                    text: 'Any Level',
                    tagClass: 'success',
                    optionsArray: [
                        {text: 'Any Level', tagClass: 'd-none'}, {text: 'Level 40', tagClass: 'typewater'}, {text: 'Level 50', tagClass: 'typefire'}
                    ]
                },
                {
                    title: 'Trade Ratio',
                    text: '1:1',
                    tagClass: 'success',
                    optionsArray: [
                        {text: '1:1', tagClass: 'd-none'}, {text: '2:1', tagClass: 'typewater'}, {text: '3:1', tagClass: 'typefire'}
                    ]
                },
                {
                    title: 'Mirror Trade',
                    text: 'N/A',
                    tagClass: 'success',
                    optionsArray: [
                        {text: 'N/A', tagClass: 'd-none'}, {text: 'Mirror Trade', tagClass: 'typePoison'}
                    ]
                }

            ]
            this.selectedOptions.have = [
                {
                    title: 'Flying Capability',
                    text: 'Can Fly',
                    tagClass: 'success',
                    optionsArray: [
                        {text: 'Can Fly', tagClass: 'success'}, {text: 'Cant Fly', tagClass: 'danger'}
                    ]
                },
                {
                    title: 'Trinket Usage',
                    text: 'No Trinket',
                    tagClass: 'd-none',
                    optionsArray: [
                        {text: 'No Trinket', tagClass: 'd-none'}, {text: 'My Trinket', tagClass: 'tertiary'}
                    ]
                },
                {
                    title: 'Pokemon Level',
                    text: 'Any Level',
                    tagClass: 'success',
                    optionsArray: [
                        {text: 'Any Level', tagClass: 'd-none'}, {text: 'Level 40', tagClass: 'typewater'}, {text: 'Level 50', tagClass: 'typefire'}
                    ]
                },


            ]
        }


    }, deep: true,

    watch: {
        pokemonList: {
            handler: function () {

                if (this.pokemonList) {
                    localStorage.setItem('pokemonList', JSON.stringify(this.pokemonList))
                } else {
                    this.pokemonList = []
                }


            }, deep: true

        },
        wantList: {
            handler: function () {

                if (this.wantList) {
                    localStorage.setItem('wantList', JSON.stringify(this.wantList))
                } else {
                    this.wantList = []
                }


            }, deep: true

        },
        haveList: {
            handler: function () {
                if (this.haveList) {
                    localStorage.setItem('haveList', JSON.stringify(this.haveList))


                } else {
                    this.haveList = []
                }
            }, deep: true
        },
        selectedOptions: {






            handler: function () {
                for(const option of this.selectedOptions.want) {
                    for(const subOption of option.optionsArray) {
                        if(subOption.text === option.text) {
                            option.tagClass = subOption.tagClass;
                            break;
                        }
                    }
                }
                if (this.selectedOptions) {
                    localStorage.setItem('selectedOptions', JSON.stringify(this.selectedOptions))
                } else {
                    this.selectedOptions = {}
                }
            }, deep: true,
        }


    }

});

export default app;