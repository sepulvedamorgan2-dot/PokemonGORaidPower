<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import SearchBar from "@/Components/Universal/SearchBar.vue";
import HorizontalCardContainer from "@/Components/Universal/OffCanvasSearch/HorizontalCardContainer.vue";
import SearchAndDisplayView from "@/Components/Universal/OffCanvasSearch/SearchAndDisplayView.vue";
import HaveListCard from "@/Components/Universal/OffCanvasHorizontalCards/HaveListCard.vue";
import WantListCard from "@/Components/Universal/OffCanvasHorizontalCards/WantListCard.vue";

export default {
  name: "DualSearchAndDisplayView",
  extends: SearchAndDisplayView,
  props: {
    secondaryPokemonListToSearch: {
      type: Array, default: []
    }
  },

  computed: {
    WantListCard() {
      return WantListCard
    },
    HaveListCard() {
      return HaveListCard
    },
    getResultsSecondary() {

      let resultObjects = [];
      for (let pokemonQueried of this.secondaryPokemonListToSearch) {
        if (resultObjects.length > 50) {
          return resultObjects;
        }

        if (pokemonQueried.pokemon.name.includes(this.query.toLowerCase()) || this.query === "") {
          resultObjects.push(pokemonQueried);
        }
      }
      return resultObjects;

    },


  },

  methods: {

  },
  mounted(){

  }


}
</script>

<template>
  <div class=" mt-2 ">
    <search-bar  class="px-2" @search-query="query = $event" place-holder="Ex: Bidoof" title="Search Pokemon"></search-bar>
    <component :is="cardContainerStyle"
                               :array-to-display="getResults"
                               :card-style="cardStyle"
               :list-to-highlight="listToHighlight"
                               @clicked-pokemon="$emit('clickedPokemon', $event)">
    </component>
    <div class="d-flex flex-wrap py-3 border-top border-bottom my-1" v-if="query === ''">
      <div style="height: 100px" class="w-100 text-center align-content-center">
        <p><a href="/pokelist.html">Add Pokémon to your Inventory/Wishlist</a></p>
        <p>Non-Personal list below</p>

      </div>
    </div>
    <component :is="cardContainerStyle"
               :array-to-display="getResultsSecondary"
               :card-style="WantListCard"
               :list-to-highlight="listToHighlight"
               @clicked-pokemon="$emit('clickedPokemon', $event)">
    </component>
  </div>
</template>

<style scoped>

</style>