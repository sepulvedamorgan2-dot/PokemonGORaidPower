<script>

   import ToggleCard from "@/Components/TradePageComponents/ToggleCard.vue";
   import TradeCard from "@/Components/TradePageComponents/TradeCard.vue";
   import TradePage from "@/Components/TradePageComponents/TradePage.vue";


   export default {
     name: 'TradeCardView',
     components: {

       TradeCard,
       ToggleCard,
       TradePage
     },

     data: function () {

       return {

         tradeCard: {
           id: 0,
           title: '',
           haveList: [],
           wantList: [],
           selectedOptions: {},
         },

       }
     },
     props: {
       pokemonList: {type: Array, required: true},
       pokemonListApi: {type: Array, required: true},
       tradeCardList: {type: Array, required: true},
     },

     methods: {
       addTradeCard(tradeCard) {
         console.log('app')
         this.tradeCardList.push(tradeCard);
       }
     },

   }
</script>

<template>

  <!-- ee-->
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8 mt-3">
        <trade-page @add-trade-card="addTradeCard" :pokemon-list-api="pokemonListApi" :pokemon-list="pokemonList" :trade-card-list="tradeCardList" ></trade-page>
        <!--                <trade-card class="mb-2" :options="selectedOptions" :have-list="haveList"  :wanted-list="wantList" :pokemon-list-api="pokemonListAPI" :pokemon-list="pokemonList" :></trade-card>-->
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>