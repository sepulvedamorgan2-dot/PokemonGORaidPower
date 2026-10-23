import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import {fetchPokemonList} from "./Helpers.js";
import NavbarMain from "./components/NavbarMain.js";
import TradeCard from "./components/trade/TradeCard.js";
import ToggleCard from "./components/trade/ToggleCard.js";

import TradePage from "./components/trade/TradePage.js";

const app = createApp({

    components: {
        NavbarMain,
        TradeCard,
        ToggleCard,
        TradePage
    },

    data: function () {

        return {
            pokemonList: [],
            pokemonListAPI: [],
            haveList: [],
            wantList: [],
            tradeCardList: [],
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
        fetchPokemonList,
        addTradeCard(tradeCard) {
            console.log('app')
            this.tradeCardList.push(tradeCard);
        }


    },
    computed: {},

    mounted: async function () {
        this.pokemonListAPI = await this.fetchPokemonList();
        if (localStorage.getItem('pokemonList')) {

            this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
        } else {
            this.pokemonList = []
        }
        if (localStorage.getItem('tradeCardList')) {

            this.tradeCardList = JSON.parse(localStorage.getItem('tradeCardList'));
        } else {
            this.tradeCardList = []
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
        tradeCardList: {

            handler: function () {
                for (const tradeCard of this.tradeCardList) {
                    for (const option of tradeCard.selectedOptions.want) {
                        for (const subOption of option.optionsArray) {
                            if (subOption.text === option.text) {
                                option.tagClass = subOption.tagClass;
                                break;
                            }
                        }
                    }
                    for (const option of tradeCard.selectedOptions.have) {
                        for (const subOption of option.optionsArray) {
                            if (subOption.text === option.text) {
                                option.tagClass = subOption.tagClass;
                                break;
                            }
                        }
                    }
                }


                    if (this.tradeCardList) {
                        localStorage.setItem('tradeCardList', JSON.stringify(this.tradeCardList))
                    } else {
                        this.tradeCardList = []
                    }


                }
            ,
                deep: true

            },


        }

    });

export default app;