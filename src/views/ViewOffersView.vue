<script>

import ToggleCard from "@/Components/TradePageComponents/ToggleCard.vue";
import TradeCard from "@/Components/TradePageComponents/TradeCard.vue";
import TradePage from "@/Components/TradePageComponents/TradePage.vue";
import PageTabs from "@/Components/TradePageComponents/PageTabs.vue";


export default {
  name: 'ViewOffersView',
  components: {
    PageTabs,

    TradeCard,
    ToggleCard,
    TradePage
  },

  data: function () {

    return {}
  },
  props: {
    pokemonList: {type: Array, required: true},
    pokemonListApi: {type: Array, required: true},
    tradeCardList: {type: Array, required: true},
    offers: {type: Array, required: true}
  },

  methods: {},

}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8 mt-3">
        <page-tabs ref="pageTab">
          <template #pageOne>
            <div class="row g-1 pt-2">
              <div class="col-6">
                <button @click="$refs.pageTab.tabNumber = 1" class="btn btn-primary w-100 h-100 rounded-1">Received Offers</button>
              </div>
              <div class="col-6">
                <button @click="$refs.pageTab.tabNumber = 2" class="btn btn-outline-primary w-100 h-100 rounded-1">Outgoing Offers</button>
              </div>
            </div>
<!--            if status is pending show offer-->
            <div>
              <div v-for="offer in offers"  class="col-12 col-md-6 pt-2">
                <p>{{ offer.title }}</p>
              </div>
            </div>
          </template>
          <template #pageTwo>
            <div class="row g-1">
              <div class="col-6">
                <button @click="$refs.pageTab.tabNumber = 1" class="btn btn-outline-primary w-100 h-100 rounded-1">Received Offers</button>
              </div>
              <div class="col-6">
                <button @click="$refs.pageTab.tabNumber = 2" class="btn btn-primary w-100 h-100 rounded-1">Outgoing Offers</button>
              </div>
            </div>
          </template>

        </page-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>