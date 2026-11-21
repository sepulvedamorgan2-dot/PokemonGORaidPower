<script>
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import PokemonTagsOffCanvas from "@/Components/Universal/OffCanvasSequences/PokemonTagsOffCanvas.vue";
import {PokemonInstance} from "@/models/PokemonInstance.js";
import {TestToExludeTag} from "@/models/TradeDetails.js";

export default {
  name: "PokemonTradeImage",
  components: {PokemonTagsOffCanvas, ImageWithDetails},
  props: {
    pokemonInstance: {type: PokemonInstance, required: true},
    noQuantity: {type: Boolean, default: true},
    noPresetSize: {type: Boolean, default: true},
    editMode: {type: Boolean, default: true},
    },
  methods: {
    TestToExludeTag
  }

}
</script>

<template>
  <div class="col col-md-2 draggable">
    <div class="text-center border rounded-4 ">
      <div class="position-relative">
        <image-with-details
                            :no-quantity="true"
                            :noPresetSize="true" :pokemon-instance="pokemonInstance">
          <pokemon-tags-off-canvas v-if="editMode" :pokemon-instance="pokemonInstance"></pokemon-tags-off-canvas>
        </image-with-details>
      </div>
      <div class="pb-1">
        <p style="font-size: 13px; font-weight: 500"
           v-if="pokemonInstance.tradeDetails.tradeBackground.shorthandName"
           v-show="pokemonInstance.tradeDetails.tradeBackground !== ''"
           :class="{'mb-0': true, ['text-type' + pokemonInstance.tradeDetails.tradeBackground.color]: true}">
          {{ pokemonInstance.tradeDetails.tradeBackground.shorthandName }}
        </p>
        <p style="font-size: 14px;" v-for="(tag, key) in pokemonInstance.tradeDetails"
           v-show="TestToExludeTag({key, tag})"
           class="mb-0 text-capitalize">
          {{ tag }}
        </p>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>