<script>

import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import CardContainer from "@/Components/Universal/CardContainer.vue";
import PageTabs from "@/Components/TradePageComponents/PageTabs.vue";
import TradeCard from "@/Components/TradePageComponents/TradeCard.vue";
export default {
  name: 'TradePage',
  computed: {
    tradeCard() {
      return tradeCard
    }
  },
  components: {
    PageTabs,
    TradeCard,
    CardContainer,
    ImageWithDetails

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


}

</script>

<template>
  <page-tabs ref="pageTab" :tab-array="['Trade Cards', 'New Card']">

    <template #pageOne>
      <div class="row  g-2">
        <div v-on:click="$refs.pageTab.tabNumber = 3; tradeCardToEdit = tradeCard " v-for="tradeCard in tradeCardList" class="force-hover col-12  col-md-6">
          <card-container class="h-100" :card-title="tradeCard.title">
            <template v-slot:card-actions>
              <i  class="bi bi-eye fs-3 "></i>
            </template>
            <template v-slot:card-body>
              <div class="row g-2 g-sm-2 g-md-2 pt-2 ">
                <div class="col-4"
                   v-for="pokemon in tradeCard.wantList.slice(0,6)">
                  <image-with-details :no-quantity="true" :pokemon="pokemon">
                  </image-with-details>
                </div>
              </div>
            </template>
          </card-container>
        </div>
        <div v-if="tradeCardList.length === 0" class="col-12 col-md-6">
          <card-container>

            <template v-slot:card-body>
              <div style="height: 200px" class="text-center justify-content-center align-items-center  d-flex">
                <div v-on:click="$refs.pageTab.tabNumber = 2">
                  <p class="mb-0">Create a Trade Card</p>
                  <p class="mb-1"><i class="fs-2  bi bi-plus-circle"></i></p>

                </div>
              </div>
            </template>
          </card-container>
        </div>
      </div>
    </template>
    <template #pageTwo>
      <button class="btn btn-primary rounded-pill mb-2" v-on:click="$refs.pageTab.tabNumber = 1">Back</button>
      <trade-card
          @add-trade-card="$emit('addTradeCard', $event); tradeCardToEdit = tradeCardList[tradeCardList.length - 1]; $refs.pageTab.tabNumber = 3; console.log('clicked page')"
          :pokemon-list="pokemonList" :pokemon-list-api="pokemonListApi" :is-new=true></trade-card>
    </template>
    <template #pageThree>
      <button class="btn btn-primary rounded-pill mb-2" v-on:click="$refs.pageTab.tabNumber = 1">Back</button>
      <trade-card @delete-item="tradeCardList.splice(tradeCardList.indexOf($event), 1);$refs.pageTab.tabNumber = 1 "
                  @return-home="$refs.pageTab.tabNumber = 1; tradeCardToEdit = null; console.log('clicked page')"
                  :pokemon-list="pokemonList" :existing-trade-card="tradeCardToEdit"
                  :pokemon-list-api="pokemonListApi" :is-new=false></trade-card>
    </template>
  </page-tabs>
</template>

<style scoped>

</style>