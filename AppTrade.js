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
            option: {
                name: 'Can Fly',
                tagClass: 'success'
            },
            selectedOptions: {

            }
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
            this.selectedOptions = {
                canFly: {
                    title: 'Flying Capability',
                    text: 'Can Fly',
                    tagClass: 'success',
                    optionsArray: [
                        {text: 'Can Fly ', tagClass: 'success'}, {text: 'Cant Fly', tagClass: 'danger'}, {text: 'N/A Fly', tagClass: 'd-none'}
                    ]
                },
                trinket: {
                    title: 'Trinket Usage',
                    text: 'My Trinket',
                    tagClass: 'typeground',
                    optionsArray: [
                        {text: 'No Trinket', tagClass: 'd-none'}, {text: 'My Trinket', tagClass: 'typeelectric'}, {text: 'Your Trinket', tagClass: 'typeelectric'}
                    ]
                },
                tradeFriendshipDays: {
                    title: 'Trade Friendship',
                    text: 'Instant',
                    tagClass: 'success',
                    optionsArray: [
                        {text: 'Instant', tagClass: 'success'}, {text: '7 Day Trade', tagClass: 'typeground'}, {text: '30 Day Trade', tagClass: 'typeground'},
                    ]
                },
                level: {
                    title: 'Pokemon Level',
                    text: 'Any Level',
                    tagClass: 'success',
                    optionsArray: [
                        {text: 'Any Level', tagClass: 'secondary'}, {text: 'Level 40', tagClass: 'typewater'}, {text: 'Level 50', tagClass: 'typefire'}, {text: 'No Level', tagClass: 'd-none'}
                    ]
                },
                ratio: {
                    title: 'Trade Ratio',
                    text: '1:1',
                    tagClass: 'success',
                    optionsArray: [
                        {text: '1:1', tagClass: 'typenormal'}, {text: '2:1', tagClass: 'typewater'}, {text: '3:1', tagClass: 'typefire'}
                    ]
                }
            }
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