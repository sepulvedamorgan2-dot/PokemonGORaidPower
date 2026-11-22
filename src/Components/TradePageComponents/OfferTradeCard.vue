<script>

import CardContainer from "@/Components/Universal/CardContainer.vue";
import AlertWithClose from "@/Components/Universal/AlertWithClose.vue";
import {defaultHaveOptions, defaultWantOptions, TradeCard} from "@/models/TradeCard.js";
import PokemonTradeImage from "@/Components/TradePageComponents/PokemonTradeImage.vue";
import ToggleButton from "@/Components/TradePageComponents/ToggleButton.vue";
import {FLY_TOGGLE_IMAGE_ARRAY} from "@/models/ImageToggleArrays.js";
import OfferTradeOffCanvas from "@/Components/Universal/OffCanvasSequences/OfferTradeOffCanvas.vue";
import cloneDeep from "lodash.clonedeep";


export default {
  name: 'OfferTradeCard',
  computed: {},
  components: {
    OfferTradeOffCanvas,
    PokemonTradeImage,
    CardContainer,
    AlertWithClose,
    ToggleButton,


  },
  data: function () {
    return {
      mode: 0,
      tradeCard: null,
      validation: false,
      offerWantedList: [],
      offerHaveList: [],
      offer: null


    }
  },
  props: {
    existingTradeCard: {type: TradeCard},
  },
  watch: {},

  methods: {
    cloneDeep,
    FLY_TOGGLE_IMAGE_ARRAY() {
      return FLY_TOGGLE_IMAGE_ARRAY
    },
    validate() {
      if (!(this.offerWantedList.length > 0 && this.offerHaveList.length > 0)) {
        this.validation = true
        return false;
      }
      this.validation = false
      this.offer = {
        haveList: this.offerHaveList,
        wantList: this.offerWantedList,
        tradeCard: this.tradeCard,
      }
      this.$refs.OfferTradeOffCanvas.$refs.OfferTradeOffCanvas.openOffCanvas();
      this.$refs.OfferTradeOffCanvas.$refs.OfferTradeOffCanvas.pageNumber = 1;
      return true;
    },
    handleSubmitOffer() {
      if (!this.validate()) {
        return;
      }
      console.log('Offer Submitted:', this.offer);
    },
    addPokemonToList(pokemonInstance, list) {
      console.log(pokemonInstance);
      console.log(list);
      if (list.some(item => item.pokemon.image === pokemonInstance.pokemon.image)) {
        console.log('eee')
        list.splice(list.indexOf(pokemonInstance), 1);
        return;
      }
      list.push(pokemonInstance);
    }
  }
  ,
  mounted() {
    this.tradeCard = this.existingTradeCard.getUnreffedClone()
  }
  ,

}

</script>

<template>
  <div v-if="tradeCard">
    <div v-if="mode === 1">
      <alert-with-close :dismissible=false @handle-click="" message="Click a Pokémon to add it to the trade."
                        color-class="typedragon">

      </alert-with-close>
    </div>
    <CardContainer class="ps-1" :custom-title="true">

      <template v-slot:card-header-manuel>
        <div class="d-flex pt-1">
          <toggle-button style="max-width: 70px" :is-enabled="false"
                         :image-array="FLY_TOGGLE_IMAGE_ARRAY()" :property="tradeCard.flyingOrRemote"
          ></toggle-button>
          <h4 class="fs-1 fw-bold pt-0 mb-0 text-capitalize text-start pb-0">
            {{ tradeCard.title }}</h4>

        </div>
      </template>
      <template v-slot:card-body>
        <div class="row ">
          <div class="col-10 ps-3 ps-1 ">
            <div class="ms-0 ms-sm-1">
              <h4 class="fs-3 fw-bold pt-1 mb-0 text-capitalize text-start pb-0">
                {{ mode === 0 ? `Wanted` : `Your Offered Pokémon` }}</h4>

            </div>
          </div>


        </div>
        <div class="ms-1">
          <h4 v-for="option in tradeCard.wantOptions" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class="col-auto badge me-1 mb-1 ">
            {{ option.selected }}
          </h4>
        </div>
        <p v-if="validation" class="text-danger  ms-1 pt-0">Must select one wanted pokémon</p>
        <div class="row pb-1 row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 p-sm-1 ">
          <pokemon-trade-image :class="
          {
            'col col-md-2  ': true,


          }" :edit-mode="false"
                               :highlight="offerWantedList.some(item => item.pokemon.image === pokemonInstance.pokemon.image)"
                               :pokemon-instance="pokemonInstance"
                               v-for="pokemonInstance in tradeCard.wantList.items" :key="pokemonInstance.pokemon.image"
                               @click="mode === 1 ? addPokemonToList(pokemonInstance, offerWantedList) : null"></pokemon-trade-image>
        </div>
        <div class="row  border-top ">
          <div class="col-10 ps-3 ps-1 ">
            <div class="ms-0 ms-sm-1">
              <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                {{ mode === 0 ? `For Trade` : `Select Pokémon to Receive` }}</h4>
            </div>
          </div>
        </div>
        <div class="ms-1">
          <h4 v-for="option in tradeCard.haveOptions" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class="col-auto badge me-1 mb-1 ">
            {{ option.selected }}
          </h4>
        </div>
        <p v-if="validation" class="text-danger ms-1 pt-0">Must select one offered pokémon </p>
        <div class="row pb-1 row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 p-sm-1 ">
          <pokemon-trade-image :class="
          {
            'col col-md-2 rounded-4': true,


          }" :highlight="offerHaveList.some(item => item.pokemon.image === pokemonInstance.pokemon.image)"
                               :pokemon-instance="pokemonInstance"
                               v-for="pokemonInstance in tradeCard.haveList.items"
                               :key="pokemonInstance.pokemon.image"
                               :edit-mode="false"
                               @click="mode === 1 ? addPokemonToList(pokemonInstance, offerHaveList) : null"></pokemon-trade-image>

        </div>
        <div class="pt-1">
          <button v-if="mode === 0" type="button" class="btn btn-primary w-100 rounded-4" @click="mode = 1">
            Make an Offer
          </button>
          <offer-trade-off-canvas :offer="cloneDeep(offer)" ref="OfferTradeOffCanvas">
            <template #openButton>
              <button v-if="mode === 1" type="button" class="btn btn-primary w-100 rounded-4"
                      @click="handleSubmitOffer()">
                Confirm your offer
              </button>
            </template>
          </offer-trade-off-canvas>
        </div>
      </template>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped>
.horz-card-img {
  width: 80px;
  aspect-ratio: 1;

  @media (max-width: 767px) {
    width: 70px;

  }
}
</style>