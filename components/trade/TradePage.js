// For subcomponent
// import xxx from './PokemonlistItem.js';

import PageTabs from "./PageTabs.js";
import TradeCard from "./TradeCard.js";
import CardContainer from "../CardContainer.js";
import tradeCard from "./TradeCard.js";

const TradePage = {
    name: 'TradePage',
    computed: {
        tradeCard() {
            return tradeCard
        }
    },

    components: {
        PageTabs,
        TradeCard,
        CardContainer

    },

    data: function () {
        return {
            tradeCardToEdit: null,
        }
    },

    props: {
        pokemonList: {type: Array, required: true},
        pokemonListApi: {type: Array, required: true},
        tradeCardList: {type: Array, required: true},
    },

    methods: {

    },

    watch: {

    },



    template: `
      <page-tabs ref="pageTab" :tab-array="['Trade Cards', 'New Card']">


        <template #pageOne>
          <div class="row g-2">
            <div v-for="tradeCard in tradeCardList" class="col-12 col-md-6">
              <card-container   card-title="Trade Card">
                <template v-slot:card-actions>
                  <i v-on:click="$refs.pageTab.tabNumber = 3; tradeCardToEdit = tradeCard " class="bi bi-eye fs-3 "></i>
                </template>
                <template v-slot:card-body>
                  <div class="row g-2 g-sm-2 g-md-2 pt-2 ">
                    <div class="col-4  position-relative" v-if="tradeCard.wantList.length > 0"
                         v-for="pokemon in tradeCard.wantList.slice(0,6)">
                      <img :class="{'img-fluid w-100': true,
                  'lucky': pokemon.tradeDetails.tags[1] === 'Lucky'}"
                           :src="pokemon.image"
                           alt="pokemonImg">
                      <!--                  <p v-if="pokemon.tradeQuantity > 1" class="corner-tl-text"> {{ pokemon.tradeQuantity }}x</p>-->
                      <img v-if="pokemon.image.includes('.s.')" src="/media/images/shiny.png" alt="Shiny"
                           class="corner-tl-img m-2 p-0">
                    </div>
                  </div>
                </template>
              </card-container>
            </div>
          </div>
        </template>
        <template #pageTwo>
          <trade-card @add-trade-card="$emit('addTradeCard', $event); console.log('clicked page')"
                      :pokemon-list="pokemonList" :pokemon-list-api="pokemonListApi" :is-new=true></trade-card>
        </template>
        <template #pageThree>
          <trade-card @add-trade-card="$emit('addTradeCard', $event); console.log('clicked page')"
                      :pokemon-list="pokemonList" :existing-trade-card="tradeCardToEdit"
                      :pokemon-list-api="pokemonListApi" :is-new=false></trade-card>
        </template>
      </page-tabs>

    `,


}

export default TradePage;