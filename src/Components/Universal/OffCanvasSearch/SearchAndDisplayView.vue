<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import SearchBar from "@/Components/Universal/SearchBar.vue";
import HorizontalCardContainer from "@/Components/Universal/OffCanvasSearch/HorizontalCardContainer.vue";

export default {
  name: "SearchAndDisplayView",
  components: {
    OffCanvasContainer,
    SearchBar,
    HorizontalCardContainer,
  },

  data: function () {
    return {
      searchResults: [],
      query: '',

    }
  },

  props: {
    listToSearch: {type: Array, required: true},
    cardStyle: {type: Object, required: true},
    cardContainerStyle: {type: Object, default: HorizontalCardContainer},
    listToHighlight: {type: Array, default: []},
  },
  computed: {
    HorizontalCardContainer() {
      return HorizontalCardContainer
    },
    getResults() {

        let resultObjects = [];
        for (let pokemonQueried of this.listToSearch) {
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
               @clicked-pokemon="$emit('clickedPokemon', $event); console.log($event)">
    </component>


  </div>
</template>

<style scoped>

</style>