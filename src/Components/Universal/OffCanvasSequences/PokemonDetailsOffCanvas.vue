<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";

import DetailsOffCanvas from "@/Components/Universal/OffCanvasViews/DetailsView.vue";
import AddEditView from "@/Components/Universal/OffCanvasViews/AddEditView.vue";
import {PokemonInstance} from "@/models/PokemonInstance.js";

export default {
  name: "PokemonDetailsOffCanvas",
  components: {
    OffCanvasContainer,
    DetailsOffCanvas,
    AddEditView,
  },

  data: function () {
    return {
      title: [
        this.pokemon.pokemon.name,
        'edit'
      ],

    }
  },

  props: {
    pokemon: {type: PokemonInstance, required: true}
  },


}
</script>

<template>
  <div class="col-auto ms-auto  align-items-center d-flex">
    <div >
      <i type="button"
         v-on:click="$refs.PokemonDetailsOffCanvas.openOffCanvas(); $refs.PokemonDetailsOffCanvas.pageNumber = 1"
         class="bi bi-three-dots me-4 fs-4"></i>

    </div>

    <teleport to="#app">
      <OffCanvasContainer   :title-array="title" ref="PokemonDetailsOffCanvas">
        <template #pageOne>
          <details-off-canvas @clicked="$refs.PokemonDetailsOffCanvas.pageNumber++" @delete-item="item => $emit('deleteItem', item)" :pokemon="pokemon"></details-off-canvas>
        </template>
        <template #pageTwo>
          <add-edit-view @clicked="$refs.PokemonDetailsOffCanvas.pageNumber--" :pokemon-instance="pokemon"></add-edit-view>
        </template>
      </OffCanvasContainer>
    </teleport>
  </div>

</template>

<style scoped>

</style>