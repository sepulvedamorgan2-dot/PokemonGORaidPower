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
        addTradeCard(tradeCard) {
            console.log('app')
            this.tradeCardList.push(tradeCard);
        }
    },


    });

export default app;