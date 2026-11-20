<script>
import PokelistContainer from "@/Components/PokeListComponents/PokelistContainer.vue";
import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import FilterOffCanvas from "@/Components/Universal/OffCanvasSequences/FilterOffCanvas.vue";
import SearchBar from "@/Components/Universal/SearchBar.vue";

import NavbarMain from "@/Components/Universal/NavbarMain.vue";
import AddPokemonOffCanavss from "@/Components/Universal/OffCanvasSearch/AddPokemonOffCanavss.vue";



export default {

  components: {
    PokelistContainer,
    OffCanvasContainer,
    NavbarMain,
    FilterOffCanvas,
    SearchBarContainer: SearchBar,
    AddPokemonOffCanavss

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
    updateMatches(newList) {
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

    <add-pokemon-off-canavss :pokemon-list-to-search="pokemonListApi" @add-pokemon="pokemonList.addAnyAmountOfPokemon($event)"></add-pokemon-off-canavss>

    <pokelist-container :searched-and-filtered-array="matches" :full-pokemon-list="pokemonList"
                        ref="pokelistContainer"></pokelist-container>
  </div>

</template>

<style scoped></style>
