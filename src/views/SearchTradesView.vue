<script>


import FindTradeForm from "@/Components/TradePageComponents/FindTradeForm.vue";
import PageTabs from "@/Components/TradePageComponents/PageTabs.vue";
import SimpleTradeCard from "@/Components/TradePageComponents/SimpleTradeCard.vue";
import TradeCard from "@/Components/TradePageComponents/TradeCard.vue";
import OfferTradeCard from "@/Components/TradePageComponents/OfferTradeCard.vue";


export default {
  name: 'SearchTradesView',

  components: {
    OfferTradeCard,
    TradeCard,
    SimpleTradeCard,
    PageTabs,
    FindTradeForm,
  },
  data: function () {
    return {
      tradeCardToView: null,
    }
  },

  props: {
    pokemonList: {type: Array, required: true},
    pokemonListApi: {type: Array, required: true},
    tradeCardList: {type: Array, required: true},
    offers: {type: Array}
  },
  methods: {
    handleSearch(searchParams) {
      console.log('Search parameters received:', searchParams);
      this.$refs.pageTab.tabNumber = 2;
    },
    openTradeCard(tradeCard) {

      this.tradeCardToView = tradeCard;
      this.$refs.pageTab.tabNumber = 3;
    },

  }


}
</script>

<template>

  <!-- ee-->

  <div class="container">
    <div>
      <page-tabs ref="pageTab">
        <template #pageOne>
          <find-trade-form @search="handleSearch($event)" :pokemon-list-api="pokemonListApi"
                           :pokemon-list="pokemonList"></find-trade-form>
        </template>
        <template #pageTwo>

          <button class="btn btn-primary mb-2  mt-3 rounded-4" v-on:click="$refs.pageTab.tabNumber = 1">Search Again
          </button>
          <div >
            <div class="col-12">
              <label class="form-label">Search Results</label>
            </div>

          </div>
          <div class="row g-1">
            <div v-for="tradeCard in tradeCardList.items" class="col-12 force-hover  col-sm-6 col-lg-4">
            <simple-trade-card  :haveFlightInfo="true"
                               v-on:click="openTradeCard(tradeCard)"
                                :key="tradeCard.id" :trade-card="tradeCard">
            </simple-trade-card>
          </div>
          </div>
        </template>
        <template #pageThree>
          <button class="btn btn-primary mb-0  mt-3 rounded-4" v-on:click="$refs.pageTab.tabNumber = 1">Search Again
          </button>
          <div class="row justify-content-center">

            <offer-trade-card @submit-offer="offers.push($event)" :user-pokemon-list="pokemonList" class="col-12 col-6-sm pt-2" :isNew="false" :pokemon-list-api="pokemonListApi" :pokemon-list="pokemonList"
                        :existing-trade-card="tradeCardToView">

            </offer-trade-card>
          </div>


        </template>
      </page-tabs>

    </div>
  </div>
</template>

<style scoped>

</style>