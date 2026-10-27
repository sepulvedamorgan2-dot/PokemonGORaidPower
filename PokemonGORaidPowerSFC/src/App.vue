<script>

import {fetchPokemonList} from "@/Services/Helpers";
import NavbarMain from "@/Components/Universal/NavbarMain.vue";

export default {
  name: "App",
  components: {
    NavbarMain,
  },
  data: function () {
    return {
      pokemonList: [],
      pokemonTeamList: [],
      pokemonListAPI: [],

    }
  },
  methods: {
    fetchPokemonList,

  },
  mounted: async function () {
    this.pokemonListAPI = await this.fetchPokemonList();
    if (localStorage.getItem('pokemonList')) {
      this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
    } else {
      this.pokemonList = []
    }
    if (localStorage.getItem('pokemonTeamList')) {
      this.pokemonTeamList = JSON.parse(localStorage.getItem('pokemonTeamList'));

      // Notes because i googled if there was a better way than looping through 3 arrays to find what does/doesnt exist and this is new-ish to me
      // All set items must be unique
      // .map returns a new array with only the id's that gets turned into a set
      const pokemonListIds = new Set(this.pokemonList.map(p => p.Id));
      for (const team of this.pokemonTeamList) {
        // filter loops throguh all id's and if pokemonListIds.has returns false, that id is removed from the list
        team.activeTeam = team.activeTeam.filter(id => pokemonListIds.has(id));
        if (team.activeTeam.length < 6 && team.backupPokemon.length > 0) {
          team.activeTeam.push(team.backupPokemon.shift());
        }
      }
    } else {
      this.pokemonTeamList = [];
      for (const type of this.types) {
        console.log(type);
        this.pokemonTeamList.push({
          id: this.pokemonTeamList.length,
          type: type,
          activeTeam: [],
          backupPokemon: [],
          activeMegaId: null
        });

      }
      localStorage.setItem('pokemonTeamList', JSON.stringify(this.pokemonTeamList))
    }
  },
  watch: {
    pokemonList: {
      handler: function () {
        for (let pokemon of this.pokemonList) {
          if(!pokemon.cp){
            pokemon.cp = 50;
          }

          if(pokemon.fastMove){
            pokemon.fastMove.type.name = pokemon.fastMove.type.names.English.toLowerCase()
            console.log(pokemon.fastMove)
          } else{

          }
          if (pokemon.chargedMoveOne){
            pokemon.chargedMoveOne.type.name = pokemon.chargedMoveOne.type.names.English.toLowerCase()
          } else{

          }
          if (pokemon.chargedMoveTwo){
            pokemon.chargedMoveTwo.type.name = pokemon.chargedMoveTwo.type.names.English.toLowerCase()
          } else{

          }
        }
        if (this.pokemonList) {
          localStorage.setItem('pokemonList', JSON.stringify(this.pokemonList))
        } else {
          this.pokemonList = []
        }



      }, deep: true

    }
    ,
    pokemonTeamList: {

      handler: function () {

        if (this.pokemonTeamList) {
          localStorage.setItem('pokemonTeamList', JSON.stringify(this.pokemonTeamList))
        } else {
          this.pokemonTeamList = []
        }

      }, deep: true
    },
  }

}

</script>

<template>
  <NavbarMain pageTitle="Pokemon Go Raid Power"/>
  <router-view :pokemon-list-api="pokemonListAPI" :pokemon-team-list="pokemonTeamList" :pokemon-list="pokemonList"></router-view>
</template>

<style scoped></style>
