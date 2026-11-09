<script>
import PokelistContainer from "@/Components/PokeListComponents/PokelistContainer.vue";
import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import FilterOffCanvas from "@/Components/Universal/OffCanvasSequences/FilterOffCanvas.vue";
import SearchBarContainer from "@/Components/Universal/SearchBarContainer.vue";
import AddPokemonOffCanvas from "@/Components/Universal/OffCanvasSequences/AddPokemonOffCanvas.vue";
import NavbarMain from "@/Components/Universal/NavbarMain.vue";


export default {

  components: {
        PokelistContainer,
        OffCanvasContainer,
        NavbarMain,
        FilterOffCanvas,
        SearchBarContainer,
        AddPokemonOffCanvas,

  },
  props: {
    pokemonList: {Type: Array, required: true},
    pokemonListApi: {Type: Array, required: true},
  },
  data: function () {

    return {
      matches: [],
      searchForPokemon: '',
      searchResults: [],
    }
  },

  methods: {
    updateMatches(newList){
      this.matches = newList;
    },

        addPokemon(activeItem) {
      this.pokemon = activeItem[0];
      this.qty = activeItem[1];

      for (let i = 0; i < this.qty; i++) {
        this.pokemon.Id = this.getNextPokemonId()

        console.log(this.pokemon.Id);
        this.pokemonList.unshift({...this.pokemon});
      }
      this.matches = this.pokemonList


    }
  ,



  },

  mounted: async function () {
    console.log(this.pokemonList)
    this.matches = {...this.pokemonList};
  }, deep: true,
}

</script>

<template>
  <div>

  <add-pokemon-off-canvas button="plus" @add-pokemon="pokemonList.add($event)" :filter=false  :pokemon-list-from-api="pokemonListApi" array-length=5 card-style="Horizontal" > </add-pokemon-off-canvas>

  <pokelist-container :searched-and-filtered-array="matches" :full-pokemon-list="pokemonList"
                      ref="pokelistContainer"></pokelist-container>
  </div>

</template>

<style scoped></style>
