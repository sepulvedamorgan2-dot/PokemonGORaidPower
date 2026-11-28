<script>
import PokelistContainer from "@/Components/PokeListComponents/PokelistContainer.vue";
import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import FilterOffCanvas from "@/Components/Universal/OffCanvasSequences/FilterOffCanvas.vue";
import SearchBar from "@/Components/Universal/SearchBar.vue";
import {addDoc} from "firebase/firestore";
import NavbarMain from "@/Components/Universal/NavbarMain.vue";
import AddPokemonOffCanavss from "@/Components/Universal/OffCanvasSearch/AddPokemonOffCanavss.vue";

import {PokelistCollection} from "@/firebase/PokelistCollection.js";



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
    addPokemon(pokemonInstance) {
      while (pokemonInstance[1] > 0) {
        PokelistCollection.addToPokelist(pokemonInstance[0], this.authUser);
        pokemonInstance[1]--;
      }
    }
    ,
  },
  inject: {
    authUser: {
      default: null
    }
  },

  mounted: async function () {
    this.matches = {...this.pokemonList};
  }, deep: true,
}

</script>

<template>
  <div>

<!--    <add-pokemon-off-canavss :pokemon-list-to-search="pokemonListApi" @add-pokemon="pokemonList.addAnyAmountOfPokemon($event)"></add-pokemon-off-canavss>-->
    <add-pokemon-off-canavss :pokemon-list-to-search="pokemonListApi" @add-pokemon="addPokemon($event)"></add-pokemon-off-canavss>


    <pokelist-container :searched-and-filtered-array="matches" :full-pokemon-list="pokemonList"
                        ref="pokelistContainer"></pokelist-container>
  </div>

</template>

<style scoped></style>
