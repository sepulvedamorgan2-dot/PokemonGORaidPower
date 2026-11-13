<script>


import AddEditOffCanvas from "@/Components/Universal/OffCanvasViews/AddEditView.vue";
import DetailsOffCanvas from "@/Components/Universal/OffCanvasViews/DetailsView.vue";
import PokemonDetailsOffCanvas from "@/Components/Universal/OffCanvasSequences/PokemonDetailsOffCanvas.vue";
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import {PokemonInstance} from "@/models/PokemonInstance.js";

export default {

  name: "PokemonlistItem",
  components: {

    AddEditOffCanvas,
    DetailsOffCanvas,
    PokemonDetailsOffCanvas,
    ImageWithDetails
  },
  data: function () {

    return {}

  },

  props: {
    pokemonInstance: {type: PokemonInstance, required: false},



  },

  methods: {
    openOffCanvas() {
      this.bsOffCanvas.show();
    }
  },

}
</script>

<template>
  <div class="row g-0 py-0">
    <div class="col-auto ">
      <image-with-details :pokemon-instance="pokemonInstance"
                          :alt="pokemonInstance.pokemon.name"></image-with-details>
    </div>
    <div class="col-4 col-sm-3 col-lg-2 d-flex  align-items-center">
      <p class="fs-5 mb-1 ms-1 text-capitalize">{{ pokemonInstance.pokemon.name }}</p>

    </div>
    <div class=" col ms-auto d-flex d-sm-none align-items-center ">
      <i v-if="pokemonInstance.fastMove"
         :class="pokemonInstance.getFastClass(`text-bg`, `rounded  p-1 fs-tinyer bi bi-lightning-charge`)"></i>
      <i v-if="pokemonInstance.chargedMoveOne"
         :class="pokemonInstance.getChargedClass(`text-bg`,1, `rounded ms-1 fs-tinyer p-1 bi bi-lightning-charge-fill`)"></i>
      <i v-if="pokemonInstance.chargedMoveTwo"
         :class="pokemonInstance.getChargedClass(`text-bg`,2, `rounded ms-1  fs-tinyer p-1 bi bi-lightning-charge-fill`)"></i>
    </div>
    <div class="col-auto d-none d-sm-flex">
      <div class="spacer"></div>
    </div>
    <div class=" col-auto d-none d-sm-flex  align-items-center">
      <p class="fs-6 mb-0 ms-1 power-width">{{ pokemonInstance.cp }}</p>

    </div>
    <div class="col-auto d-none d-sm-flex">
      <div class="spacer"></div>
    </div>
    <div class=" col-auto d-none d-sm-flex  align-items-center">
      <p class="fs-6 mb-0 ms-1 power-width">{{ pokemonInstance.cp }}</p>

    </div>
    <div class="col-auto d-none d-sm-flex">
      <div class="spacer"></div>
    </div>
    <div class=" col-auto d-none d-lg-flex movewidth align-items-center ">
                    <span v-if="pokemonInstance.fastMove"
                          :class="pokemonInstance.getFastClass(`text-bg`, `badge p-2 text-capitalize`)">{{ pokemonInstance.fastMove.name }}</span>
      <span v-if="!pokemonInstance.fastMove"
            :class="`bg-secondary badge p-2 text-capitalize`">Not Added</span>

    </div>
    <div class="col-auto d-none d-sm-flex">
      <div class="spacer"></div>
    </div>
    <div class=" col-auto d-none d-lg-flex movewidth align-items-center ms-2">
            <span
                v-if="pokemonInstance.chargedMoveOne" :class="pokemonInstance.getChargedClass(`text-bg`,1, `badge p-2 text-capitalize`)">{{ pokemonInstance.chargedMoveOne.name }}</span>
      <span v-else
            :class="`bg-secondary badge p-2 text-capitalize`">Move 1 Not Added</span>
      <span
          v-if="pokemonInstance.chargedMoveTwo" :class="pokemonInstance.getChargedClass(`text-bg`,2, `badge p-2 ms-2 text-capitalize`)">{{ pokemonInstance.chargedMoveTwo.name }}</span>
      <span v-else :class="`bg-secondary ms-2 badge p-2 text-capitalize`">Move 2 Not Added</span>

    </div>

    <pokemon-details-off-canvas :pokemon="pokemonInstance"
                                @delete-item="item => $emit('deleteItem', item)"></pokemon-details-off-canvas>

  </div>

</template>

<style scss scoped>
.power-width {
  width: 80px;
}

.movewidth {
  width: 120px;
}
.spacer {
  width: 25px;
}
</style>