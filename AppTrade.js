import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {fetchPokemonList} from "./Helpers.js";
import NavbarMain from "./components/NavbarMain.js";
import TradeCard from "./components/trade/TradeCard.js";

const app = createApp({

    components: {
        NavbarMain,
        TradeCard,

    },

    data: function () {

        return {
            pokemonList: [],
            pokemonListAPI: [],
            haveList: [],
            wantList: [],
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
        }



    }

});

export default app;