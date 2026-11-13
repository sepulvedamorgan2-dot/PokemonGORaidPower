<script>
import AddEditOffCanvas from "@/Components/Universal/OffCanvasViews/AddEditView.vue";
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import {PokemonInstance} from "@/models/PokemonInstance.js";

export default {
  name: "HorizontalCard",
  components: {

    AddEditOffCanvas: AddEditOffCanvas,
    ImageWithDetails: ImageWithDetails,
  },

  data: function () {
    return {}
  },

  props: {
    pokemonInstance: {PokemonInstance, required: true},
    cardStyle: {String, required: true},
    pokemonTeam: {Object, required: false},
    listToHighlight: {Array, required: false},
  },

  methods: {},

}
</script>

<template>
  <div class="row g-0 align-items-center">
    <div class="col-auto">
      <image-with-details :pokemon-instance="pokemonInstance"></image-with-details>
    </div>
    <div class="col">
      <div class="ms-0 ms-sm-0">
        <p class="fs-5 mb-0 text-capitalize">{{ pokemonInstance?.pokemon?.name }} </p>

      </div>
    </div>
    <div class="col-3 pe-2">
      <button v-on:click="$emit('clickedObject', pokemonInstance)" class=" btn btn-sm btn-primary w-100 searchedPokemonBtn">
        Select
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>