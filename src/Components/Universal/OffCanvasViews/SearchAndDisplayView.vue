<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import SearchBarContainer from "@/Components/Universal/SearchBarContainer.vue";
import HorizontalCardContainer from "@/Components/Universal/OffCanvasHorizontalCards/HorizontalCardContainer.vue";

export default {
  name: "SearchAndDisplayOffCanvas",
  components: {
    OffCanvasContainer,
    SearchBarContainer,
    HorizontalCardContainer,
  },

  data: function () {
    return {
      searchResults: [],
      query: '',
      resultsLength: 50,

    }
  },

  props: {
    listToSearch: Array,
    filter: {Boolean, default: true},
    arrayLength: {type: Number, default: 5},
    cardStyle: {type: String, required: true},
    warning: { type: Boolean, default: false },
    listToHighlight: { type: Array, default: [] },
  },

  methods: {
    updateSearchResults(query) {
      this.query = query;
      let resultObjects = [];
      for (let pokemonQueried of this.listToSearch) {
        if(query.length < 4){
          if (resultObjects.length >= this.resultsLength) {

            break;

          }}

        try{
          if (pokemonQueried.includes(query.toLowerCase())) {
            let pokemonObject = {};
            pokemonObject.name = pokemonQueried;
            pokemonObject.pokemonId = this.listToSearch.indexOf(pokemonQueried) + 1;
            resultObjects.push(pokemonObject);
          } } catch(e) {

          if (pokemonQueried.name.includes(query.toLowerCase()) && pokemonQueried.name.includes("-mega") === false) {

            resultObjects.push(pokemonQueried);
          }}
      }

      this.searchResults = resultObjects;


    }
    ,
  },
  watch: {
    listToSearch: {
      handler: function () {
        this.updateSearchResults(this.query);
      }
    }, deep: true,
  },
  mounted() {
    this.updateSearchResults('');
  },

}
</script>

<template>
  <div class=" mt-2 ">
    <search-bar-container  class="px-2" @search-query="updateSearchResults" @filter-clicked="console.log('filterclicked')" :list-to-search="listToSearch"  title="Search Pokemon"></search-bar-container>

    <horizontal-card-container :warning="warning" :search-query="query" :array-to-display="searchResults"  :card-style="cardStyle" :list-to-highlight="listToHighlight" :array-length="arrayLength"
                               @clicked-object="object => $emit('clickedObject', object)"
                               @clicked-object-existing="object => $emit('clickedObjectExisting', object)"
    >

    </horizontal-card-container>
  </div>
</template>

<style scoped>

</style>