<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import PokemonTradeImage from "@/Components/TradePageComponents/PokemonTradeImage.vue";
import {defaultHaveOptions, defaultWantOptions} from "@/models/TradeCard.js";


export default {
  name: "OfferTradeOffCanvas",
  methods: {
    defaultWantOptions() {
      return defaultWantOptions
    },
    defaultHaveOptions() {
      return defaultHaveOptions
    }
  },
  components: {
    PokemonTradeImage,
    OffCanvasContainer,

  },

  data: function () {
    return {
      title: [
        'ADDTITLEFUNCTIONALITY',
        'edit'
      ],
    }
  },

  props: {
    offer: {type: Object, required: true}

  },
}
</script>

<template>
  <div>
    <slot name="openButton">

    </slot>
  </div>

  <teleport to="#app">
    <OffCanvasContainer :title-array="title" ref="OfferTradeOffCanvas">
      <template #pageOne>
        <div class="container">
          <div>
            <h3 class="pt-2">Receiving Pokemon</h3>
            <div class="row g-2">
              <pokemon-trade-image class="col-3 " v-for="pokemonInstance in offer.haveList"
                                   :pokemon-instance="pokemonInstance"></pokemon-trade-image>
            </div>
            <h3 class="pt-2">Offering Pokemon</h3>
            <div class="row g-2">
              <pokemon-trade-image class="col-3 " v-for="pokemonInstance in offer.wantList"
                                   :pokemon-instance="pokemonInstance"></pokemon-trade-image>
            </div>
          </div>
          <p>{{offer.tradeCard.allTags}}</p>
          <div  v-for="offer in defaultWantOptions()" :key="offer.key" class="pt-2">
            <div>
              <label class="form-label w-100">
                {{offer.title}}
              <select class="form-select" >
                <option  :selected="option.selected" v-for="option in offer.optionsArray" value="1">{{option.selected}}</option>

              </select>
              </label>
            </div>
          </div>
        </div>


      </template>
    </OffCanvasContainer>
  </teleport>
</template>

<style lang="scss" scoped>

</style>