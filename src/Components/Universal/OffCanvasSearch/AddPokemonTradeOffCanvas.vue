<script>
import AddPokemonOffCanavss from "@/Components/Universal/OffCanvasSearch/AddPokemonOffCanavss.vue";
import HorizontalCardContainerTrade from "@/Components/Universal/OffCanvasSearch/HorizontalCardContainerTrade.vue";

export default {
  name: "AddPokemonTradeOffCanvas",
  computed: {
    HorizontalCardContainerTrade() {
      return HorizontalCardContainerTrade
    }
  },
  extends: AddPokemonOffCanavss,
  props: {
    listToHighlight: {
      type: Array,
     required: true,
    },
    cardContainerStyle: {type: Object, default: HorizontalCardContainerTrade},
    cardStyle: {type: Object, required: true},
    secondaryPokemonListToSearch: {type: Array, default: []},
  },
  methods: {
    /**
     * Handles the click event for a Pokemon instance. If the Pokemon instance is not instantiated, it calls the handleUninstantiatedClick method to fetch and initialize the Pokemon data. Otherwise, it logs the clicked Pokemon instance.
     * @param [pokemonInstance, Boolean] is either a Pokemon instance or an uninstantiated Pokemon object. If it's uninstantiated, the method will fetch and initialize the Pokemon data.
     */
    async handleClick(pokemonInstance) {

      if (!pokemonInstance[0]?.id) {
        const pokemonToAdd = await this.handleUninstantiatedClick(pokemonInstance[0]);

        this.$emit('addPokemon', [pokemonToAdd,  pokemonInstance[1]]);
      } else{
        this.$emit('addPokemon', pokemonInstance);

      }
    },

  }

}
</script>

<template>
  <div >
    <div v-on:click="$refs.AddPokemonOffCanvas.openOffCanvas(); $refs.AddPokemonOffCanvas.pageNumber = 1">
      <slot name="actionButton">

        <button
            type="button" class="btn rounded-circle d-flex align-items-center justify-content-center"
            style="width: 56px; height: 56px;">
          <i class="bi bi-plus-lg fs-4"></i>
        </button>
      </slot>
    </div>
    <teleport to="#app">
      <OffCanvasContainer :title-array="['Add Pokemon']" ref="AddPokemonOffCanvas">
        <template #pageOne>
          <component :secondary-pokemon-list-to-search="secondaryPokemonListToSearch" :is="cardContainerStyle" :card-container-style="HorizontalCardContainerTrade" :list-to-highlight="listToHighlight" :card-style="cardStyle" :list-to-search="pokemonListToSearch"
                     @clicked-pokemon="handleClick($event)"></component>
        </template>
      </OffCanvasContainer>
    </teleport>
  </div>
</template>

<style scoped>

</style>