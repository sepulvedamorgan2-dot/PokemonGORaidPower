<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import SearchBar from "@/Components/Universal/SearchBar.vue";
import AddEditView from "@/Components/Universal/OffCanvasViews/AddEditView.vue";
import SearchAndDisplayOffCanvas from "@/Components/Universal/OffCanvasSearch/SearchAndDisplayView.vue";
import HorizontalCard from "@/Components/Universal/OffCanvasHorizontalCards/HorizontalCard.vue";
import AddEditOffCanvas from "@/Components/Universal/OffCanvasViews/AddEditView.vue";
import GameDataFactory from "@/models/factories/GameDataFactory.js";

export default {
  name: "AddPokemonOffCanavss",
  components: {
    AddEditOffCanvas,
    OffCanvasContainer,
    SearchAndDisplayOffCanvas,

  },
  props: {
    pokemonListToSearch: {type: Array, required: true},
  },
  methods: {
    async handleClick(pokemonInstance) {
      this.selectedPokemon = await this.initPokemon(pokemonInstance);
      this.titleArray = [
        "Add Pokemon",
        pokemonInstance?.pokemon.name]
      this.$refs.AddPokemonOffCanvas.pageNumber = 2
    },
    async handleUninstantiatedClick(pokemonInstance) {
      console.log(pokemonInstance);
       return await this.initPokemon(pokemonInstance)
          .then
          ((pokemonInstance) => {

                  return pokemonInstance
              }
          )

    },
    async initPokemon(pokemonInstance) {
      if (this.pokemon?.pokemon) {
        return this.pokemon;
      } else {
        console.log(await GameDataFactory.fetchSinglePokemon(pokemonInstance))
        return GameDataFactory.fetchSinglePokemon(pokemonInstance);
      }}
  },
  watch: {},
  computed: {
    HorizontalCard() {
      return HorizontalCard
    }
  },
  data() {
    return {

      selectedPokemon: null,
      titleArray: [
        "Add Pokemon",
        "",
      ]
    }
  },


}
</script>

<template>
  <div >
    <div v-on:click="$refs.AddPokemonOffCanvas.openOffCanvas();">
      <slot name="actionButton">
        <div class="position-fixed bottom-0 end-0 m-4" style="z-index: 1030;">
          <button
              type="button"
              class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-lg"
              style="width: 56px; height: 56px;">
            <i class="bi bi-plus-lg fs-4"></i>
          </button>
        </div>
      </slot>
    </div>
    <teleport to="#app">
      <OffCanvasContainer :title-array="titleArray" ref="AddPokemonOffCanvas">
        <template #pageOne>
          <search-and-display-off-canvas :card-style="HorizontalCard" :list-to-search="pokemonListToSearch" @clicked-pokemon="handleClick($event); $refs.AddPokemonOffCanvas.pageNumber = 2"></search-and-display-off-canvas>
        </template>
        <template #pageTwo>
          <add-edit-off-canvas :pokemon-instance="selectedPokemon" @add-pokemon="$emit('addPokemon', $event); $refs.AddPokemonOffCanvas.hideOffCanvas()"></add-edit-off-canvas>
        </template>
        <template #pageThree>
          <slot name="offCanvasPageThree">

          </slot>
        </template>
      </OffCanvasContainer>
    </teleport>
  </div>
</template>

<style scoped>

</style>