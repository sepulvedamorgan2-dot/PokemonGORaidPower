<script>
import PokelistContainer from "@/Components/PokeListComponents/PokelistContainer.vue";
import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import FilterOffCanvas from "@/Components/Universal/OffCanvasSequences/FilterOffCanvas.vue";
import SearchBarContainer from "@/Components/Universal/SearchBarContainer.vue";
import AddPokemonOffCanvas from "@/Components/Universal/OffCanvasSequences/AddPokemonOffCanvas.vue";
import NavbarMain from "@/Components/Universal/NavbarMain.vue";
import {fetchPokemonList} from "@/Services/Helpers";

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
      qty: 1,

      pokemon: {
        Id: 1,
        name: "",
        type: "",
        pokemonId: 1,
        cp: 1000,
        isShadow: false,
        canMegaEvolve: false,
        fastMove: {},
        chargedMoveOne: {},
        chargedMoveTwo: {},
        image: '',
        maxCp: 0,
        fastMoves: [],
        chargedMoves: [],
        megaCapable: false,


      },

      activeItem: {},

      searchResults: [],


    }
  },

  methods: {
    updateMatches(newList){
      this.matches = newList;
    },
    fetchPokemonList,
        addPokemon(activeItem) {


      this.pokemon = activeItem[0];
      this.qty = activeItem[1];

      for (let i = 0; i < this.qty; i++) {
        this.pokemon.Id = this.getNextPokemonId()

        console.log(this.pokemon.Id);
        this.pokemonList.unshift({...this.pokemon});
        this.activeItem = this.pokemon
      }
      this.matches = this.pokemonList
      // BAD


    }
  ,
    deletePokemon(pokemonToDelete) {
      console.log(pokemonToDelete);
      this.pokemonList.splice(this.pokemonList.indexOf(pokemonToDelete), 1);
      this.updateMatches(this.pokemonList);
    }
  ,
    getNextPokemonId() {
      if(this.pokemonList.length < 1){
        return 1
      }
      try {
        return Math.max(...this.pokemonList.map(p => p.Id)) + 1
      } catch (error) {
        return 0;
      }
    },

  },

  mounted: async function () {
    console.log(this.pokemonList)
    this.matches = {...this.pokemonList};
  }, deep: true,
}

</script>

<template>
  <div>

  <add-pokemon-off-canvas button="plus" @add-pokemon="addPokemon"  :filter=false  :pokemon-list-from-api="pokemonListApi" array-length=5 :card-style=1 > </add-pokemon-off-canvas>

  <pokelist-container :searched-and-filtered-array="matches" :full-pokemon-list="pokemonList"
                      ref="pokelistContainer" @delete-item="deletePokemon"></pokelist-container>
  </div>

</template>

<style scoped></style>
