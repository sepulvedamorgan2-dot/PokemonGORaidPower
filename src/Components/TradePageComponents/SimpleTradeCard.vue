<script>
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import CardContainer from "@/Components/Universal/CardContainer.vue";
import {TradeCard} from "@/models/TradeCard.js";
import ToggleButton from "@/Components/TradePageComponents/ToggleButton.vue";
import {FLY_TOGGLE_IMAGE_ARRAY} from "@/models/ImageToggleArrays.js";
import PokemonTradeImage from "@/Components/TradePageComponents/PokemonTradeImage.vue";


export default {
  name: "SimpleTradeCard",
  methods: {
    FLY_TOGGLE_IMAGE_ARRAY() {
      return FLY_TOGGLE_IMAGE_ARRAY
    },
    allOptionEntries() {
      const entries = [];

      for (const [key, value] of Object.entries(this.tradeCard?.haveOptions ?? {})) {
        entries.push(value);
      }

      for (const [key, value] of Object.entries(this.tradeCard?.wantOptions ?? {})) {
        entries.push(value);
      }
      console.log(entries)
      return entries;
    }
  },
  components: {PokemonTradeImage, ToggleButton, CardContainer, ImageWithDetails},
  props: {
    tradeCard: {Type: TradeCard, required: true},
    haveFlightInfo: {Type: Boolean, default: true}
  },
  computed: {}
}
</script>

<template>

  <card-container :custom-title="true">
    <template v-slot:card-actions>
      <!--      <i class="bi bi-eye fs-3 "></i>-->
    </template>
    <template #card-header-manuel>
      <div class="d-flex pt-1">
        <toggle-button style="max-width: 60px" v-if="haveFlightInfo" :image-array="FLY_TOGGLE_IMAGE_ARRAY()"
                       :is-enabled="false" :property="tradeCard.flyingOrRemote"></toggle-button>
        <h4 class="fs-3 fw-bold  mb-0 text-capitalize text-start pb-0 pt-1">{{ tradeCard?.title }}</h4>
      </div>
    </template>
    <template #card-body>
      <div class="px-1">
        <h4 v-for="option in allOptionEntries()" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class=" col-auto badge me-1 mb-1 ">
          {{ option.selected }}
        </h4>
        <!--      undecided on this:-->
        <h5 class="pb-0 mb-0 ms-1 pt-1">Featured Offerings:</h5>
        <div class="row g-2 g-sm-2 g-md-2 pt-2 ms-0 me-0 ">
          <div class="col-4"
               v-for="pokemonInstance in tradeCard?.featuredPokemon">
            <pokemon-trade-image :noPresetSize="true" :no-quantity="true" :pokemon-instance="pokemonInstance">
            </pokemon-trade-image>
          </div>
        </div>
        <div>
          <slot name="card-body-button">
            <div class="row pt-2">
              <div class="col-12">
                <button class="btn btn-primary w-100 rounded-4">See Full Trade</button>
              </div>

            </div>
          </slot>
        </div>
      </div>
    </template>

  </card-container>
</template>

<style scoped>

</style>