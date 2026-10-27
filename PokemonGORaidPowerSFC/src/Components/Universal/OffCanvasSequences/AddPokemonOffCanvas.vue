<script>

import SearchAndDisplayOffCanvas from "@/Components/Universal/OffCanvasViews/SearchAndDisplayView.vue";
import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import AddEditView from "@/Components/Universal/OffCanvasViews/AddEditView.vue";

export default {
  name: "AddPokemonOffCanvas",
  components: {
    OffCanvasContainer,
    SearchAndDisplayOffCanvas,
    AddEditView,
  },

  data: function () {
    return {
      titleArray: [
        "Add Pokemon",
        ""
      ],
      pokemonToAdd: null,
      pokemonList: []
    }
  },

  props: {
    cardStyle: {Number, required: true},
    pokemonListFromApi: {type: Array, required: true},
    button: {type: String, required: true},
    warning: {type: Boolean, default: false},
  },

  methods: {
    handleClick: function (object) {
      this.pokemonToAdd = object;
      this.$refs.AddPokemonOffCanvas.pageNumber++

    }
  },

  watch: {
    pokemonListFromApi: {
      handler: function () {
        this.pokemonList = this.pokemonListFromApi;
      }, deep: true,
    },


    pokemonToAdd: function () {
      this.titleArray = [
        "Add Pokemon",
        this.pokemonToAdd.name
      ]
    },deep: true,
  },
  mounted(){
    this.pokemonList = this.pokemonListFromApi;
  },

}
</script>

<template>
  <div v-if="button==='plus'"  class="position-fixed bottom-0 end-0 m-4" style="z-index: 1030;">
    <button v-on:click="console.log('eee');$refs.AddPokemonOffCanvas.openOffCanvas(); $refs.AddPokemonOffCanvas.pageNumber = 1" type="button" class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-lg" style="width: 56px; height: 56px;">
      <i class="bi bi-plus-lg fs-4"></i>
    </button>

  </div>
  <div class="d-flex justify-content-end" v-else>

    <i  v-on:click="$refs.AddPokemonOffCanvas.openOffCanvas(); $refs.AddPokemonOffCanvas.pageNumber = 1" class="bi bi-plus fs-3 p-2 force-hover"></i>

  </div>

  <teleport to="#app">
    <OffCanvasContainer :title-array="titleArray" ref="AddPokemonOffCanvas">
      <template v-slot:pageOne>
        <SearchAndDisplayOffCanvas :warning="warning"  @clicked-object-existing="$emit('clicked-object-existing', $event)" :list-to-search="pokemonList" @clicked-object="handleClick" :card-style="cardStyle" :array-length="5" :button-style="1">
        </SearchAndDisplayOffCanvas>
      </template>
      <template v-slot:pageTwo >
        <add-edit-view :active-item="pokemonToAdd" @add-pokemon="$emit('addPokemon', $event); $refs.AddPokemonOffCanvas.hideOffCanvas();" :isNew=true > </add-edit-view>
      </template>
    </OffCanvasContainer>
  </teleport>
</template>

<style scoped>

</style>