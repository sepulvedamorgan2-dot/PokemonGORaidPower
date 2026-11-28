<script>

import CardContainer from "@/Components/Universal/CardContainer.vue";
import AlertWithClose from "@/Components/Universal/AlertWithClose.vue";
import {defaultHaveOptions, defaultWantOptions, TradeCard} from "@/models/TradeCard.js";
import PokemonTradeImage from "@/Components/TradePageComponents/PokemonTradeImage.vue";
import ToggleButton from "@/Components/TradePageComponents/ToggleButton.vue";
import {FLY_TOGGLE_IMAGE_ARRAY} from "@/models/ImageToggleArrays.js";
import OfferTradeOffCanvas from "@/Components/Universal/OffCanvasSequences/OfferTradeOffCanvas.vue";
import cloneDeep from "lodash.clonedeep";
import AddPokemonTradeOffCanvas from "@/Components/Universal/OffCanvasSearch/AddPokemonTradeOffCanvas.vue";
import HaveListCard from "@/Components/Universal/OffCanvasHorizontalCards/HaveListCard.vue";
import searchAndDisplayView from "@/Components/Universal/OffCanvasSearch/SearchAndDisplayView.vue";
import DualSearchAndDisplayView from "@/Components/Universal/OffCanvasSearch/DualSearchAndDisplay.vue";
import SearchAndDisplayView from "@/Components/Universal/OffCanvasSearch/SearchAndDisplayView.vue";
import haveListCard from "@/Components/Universal/OffCanvasHorizontalCards/HaveListCard.vue";
import DualSearchAndDisplay from "@/Components/Universal/OffCanvasSearch/DualSearchAndDisplay.vue";
import wantListCard from "@/Components/Universal/OffCanvasHorizontalCards/WantListCard.vue";
import {Offer} from "@/models/Offer.js";


export default {
  name: 'OfferTradeCard',
  computed: {
    wantListCard() {
      return wantListCard
    },
    DualSearchAndDisplay() {
      return DualSearchAndDisplay
    },
    haveListCard() {
      return haveListCard
    },
    SearchAndDisplayView() {
      return SearchAndDisplayView
    },
    DualSearchAndDisplayView() {
      return DualSearchAndDisplayView
    },
    searchAndDisplayView() {
      return searchAndDisplayView
    },
    HaveListCard() {
      return HaveListCard
    }
  },
  components: {
    AddPokemonTradeOffCanvas,
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
      customOfferList: [],
      offerHaveList: [],
      offer: null


    }
  },
  props: {
    existingTradeCard: {type: TradeCard},
    userPokemonList: {type: Array, required: false, default: null},
    pokemonListApi: {type: Array, required: false, default: null},
  },
  watch: {},

  methods: {
    handleCustomOffer(pokemonInstance) {
      if (this.customOfferList.some(item => item.pokemon.image === pokemonInstance[0].pokemon.image)) {
        this.customOfferList.splice(this.customOfferList.indexOf(pokemonInstance[0]), 1);
        return;
      }
      this.customOfferList.push(pokemonInstance[0]);
    },
    cloneDeep,
    FLY_TOGGLE_IMAGE_ARRAY() {
      return FLY_TOGGLE_IMAGE_ARRAY
    },
    validate() {
      if ((!this.offerWantedList.length > 0 || !this.customOfferList.length > 0) && !this.offerHaveList.length > 0) {
        this.validation = true
        return false;
      }
      this.validation = false
      const offer = {
        haveList: this.offerHaveList,
        wantList: this.offerWantedList,
        tradeCard: this.tradeCard,
      }
      for (const pokemonInstance of this.customOfferList) {
        offer.wantList.push(pokemonInstance)
      }
      this.offer = cloneDeep(offer)

      this.$refs.OfferTradeOffCanvas.$refs.OfferTradeOffCanvas.openOffCanvas();
      this.$refs.OfferTradeOffCanvas.$refs.OfferTradeOffCanvas.pageNumber = 1;
      return true;
    },
    handleSubmitOffer(offer) {
      const offerToSubmit = new Offer({
        flyingOrRemote: offer.tradeCard.flyingOrRemote,
        offerCreatorReceives: offer.tradeCard.haveList.items,
        cardCreatorReceives: offer.tradeCard.wantList.items,
        // replacce with full user objects
        // offerCreator: offer.tradeCard.creator,
        // cardCreator: offer.tradeCard.creator,
        playerIdArray: [1,2],
        haveOptions: offer.tradeCard.haveOptions,
        wantOptions: offer.tradeCard.wantOptions,

      })
      console.log('Unchanged Offer:', this.offer);
      console.log('Offer Submitted:', offerToSubmit);
      this.$emit('submitOffer', offerToSubmit);

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
          <div v-if="mode ===1 && tradeCard.allowCustomOffers" class=" col col-md-2">
            <div
                class="d-flex horz-card-img img-fluid w-100 text-center align-items-center   justify-content-center border rounded-4 ">

              <add-pokemon-trade-off-canvas
                  @add-pokemon="handleCustomOffer($event)"
                  :card-style="wantListCard"
                  :pokemon-list-to-search="userPokemonList.items"
                  :list-to-highlight="customOfferList"
                  :card-container-style="DualSearchAndDisplay"
                  :secondary-pokemon-list-to-search="pokemonListApi"
              >
                <template #actionButton>
                  Offer Custom Pokémon
                </template>
              </add-pokemon-trade-off-canvas>
            </div>
          </div>
          <pokemon-trade-image :class="
          {
            'col col-md-2  ': true,
          }"
                               :highlight="offerWantedList.some(item => item.pokemon.image === pokemonInstance.pokemon.image)"
                               :pokemon-instance="pokemonInstance"
                               :edit-mode="offerWantedList.some(item => item.pokemon.image === pokemonInstance.pokemon.image)"
                               v-for="pokemonInstance in tradeCard.wantList.items" :key="pokemonInstance.pokemon.image"
                               @clicked="mode === 1 ? addPokemonToList(pokemonInstance, offerWantedList) : null"></pokemon-trade-image>
        </div>
        <div v-if="customOfferList.length > 0">
          <div class="row ">
            <div class="col-10 ps-3 ps-1 ">
              <div class="ms-0 ms-sm-1">
                <h4 class="fs-4 fw-bold pt-1 mb-0 text-capitalize text-start pb-0">
                  Custom Offered Pokemon</h4>

              </div>
            </div>
          </div>
          <div class="row pb-1 row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 p-sm-1 ">
            <pokemon-trade-image :class="
          {
            'col col-md-2 rounded-4': true,


          }" :highlight="customOfferList.some(item => item.pokemon.image === pokemonInstance.pokemon.image)"
                                 :pokemon-instance="pokemonInstance"
                                 v-for="pokemonInstance in customOfferList"
                                 @dblclick="customOfferList.splice(customOfferList.indexOf(pokemonInstance), 1)"
                                 :key="pokemonInstance.pokemon.image"
                                 :edit-mode="customOfferList.some(item => item.pokemon.image === pokemonInstance.pokemon.image)"
                                 @clicked="mode === 1 ? addPokemonToList(pokemonInstance, customOfferList) : null"></pokemon-trade-image>

          </div>
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
                               :edit-mode="offerHaveList.some(item => item.pokemon.image === pokemonInstance.pokemon.image)"
                               @clicked="mode === 1 ? addPokemonToList(pokemonInstance, offerHaveList) : null"></pokemon-trade-image>

        </div>
        <div class="pt-1">
          <button v-if="mode === 0" type="button" class="btn btn-primary w-100 rounded-4" @click="mode = 1">
            Make an Offer
          </button>
          <offer-trade-off-canvas @offer-submitted="handleSubmitOffer" :offer="cloneDeep(offer)" ref="OfferTradeOffCanvas">
            <template #openButton>
              <button @click="validate()" v-if="mode === 1" type="button" class="btn btn-primary w-100 rounded-4"
                      >
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