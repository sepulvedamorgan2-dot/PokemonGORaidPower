<script>

import {fetchPokemonList} from "@/Services/Helpers";
import NavbarMain from "@/Components/Universal/NavbarMain.vue";
import {shallowRef} from "vue"
import {PokemonList} from "@/models/PokemonList.js"

export default {
  name: "App",
  components: {
    NavbarMain,
  },
  data: function () {
    return {
      types: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
      pokemonList: new PokemonList([]),
      pokemonTeamList: [],
      pokemonListAPI: shallowRef([]),
      tradeCardList: [],
    }
  },
  methods: {
    fetchPokemonList,

  },
  mounted: async function () {
    this.pokemonListAPI = await this.fetchPokemonList()



    // if (localStorage.getItem('pokemonList')) {
    //   this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
    // } else {
    //   this.pokemonList = []
    // }
    this.pokemonList = new PokemonList();
    if (localStorage.getItem('pokemonTeamList')) {
      this.pokemonTeamList = JSON.parse(localStorage.getItem('pokemonTeamList'));

      // Notes because i googled if there was a better way than looping through 3 arrays to find what does/doesnt exist and this is new-ish to me
      // All set items must be unique
      // .map returns a new array with only the id's that gets turned into a set
      const pokemonListIds = new Set(this.pokemonList.items.map(p => p.Id));
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
    if (localStorage.getItem('tradeCardList')) {

      this.tradeCardList = JSON.parse(localStorage.getItem('tradeCardList'));
    } else {
      this.tradeCardList = []
    }

    this.pokemonList.add(this.pokemonListAPI[0])
  },
  watch: {
    pokemonList: {
      handler: function () {
        for (let pokemon of this.pokemonList.items) {
          if(!pokemon.cp){
            pokemon.cp = 50;
          }
        }
        // if (this.pokemonList) {
        //   localStorage.setItem('pokemonList', JSON.stringify(this.pokemonList))
        // } else {
        //   this.pokemonList = []
        // }



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
    },tradeCardList: {

      handler: function () {
        for (const tradeCard of this.tradeCardList) {
          for (const option of tradeCard.selectedOptions.want) {
            for (const subOption of option.optionsArray) {
              if (subOption.text === option.text) {
                option.tagClass = subOption.tagClass;
                break;
              }
            }
          }
          for (const option of tradeCard.selectedOptions.have) {
            for (const subOption of option.optionsArray) {
              if (subOption.text === option.text) {
                option.tagClass = subOption.tagClass;
                break;
              }
            }
          }
        }
        if (this.tradeCardList) {
          localStorage.setItem('tradeCardList', JSON.stringify(this.tradeCardList))
        } else {
          this.tradeCardList = []
        }
      }
      ,
      deep: true
    },
  }
}

</script>

<template >
  <NavbarMain pageTitle="Pokemon Go Raid Power"/>
  <router-view :trade-card-list="tradeCardList" :pokemon-list-api="pokemonListAPI" :pokemon-team-list="pokemonTeamList" :pokemon-list="pokemonList"></router-view>
</template>

<style scoped></style>
