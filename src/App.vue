<script>

import {fetchPokemonList} from "@/Services/Helpers";
import NavbarMain from "@/Components/Universal/NavbarMain.vue";
import {shallowRef} from "vue"
import {PokemonList} from "@/models/PokemonList.js"
import {PokemonTeam} from "@/models/PokemonTeam.js";
import {TradeCard} from "@/models/TradeCard.js";
import {Pokemon} from "@/models/Pokemon.js";
import {PokemonDetails} from "@/models/PokemonDetails.js";
import {TradeDetails} from "@/models/TradeDetails.js";
import {TradeCardList} from "@/models/TradeCardList.js";

export default {
  name: "App",
  components: {
    NavbarMain,
  },
  data: function () {
    return {
      types: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
      pokemonList: new PokemonList(),
      pokemonTeamList: null,
      pokemonListAPI: shallowRef([]),
      tradeCardList: new TradeCardList(),
    }
  },
  methods: {
    fetchPokemonList,

  },
  mounted: async function () {
    this.pokemonListAPI = await this.fetchPokemonList()


    if (localStorage.getItem('pokemonList')) {
      this.pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
      const moistList = new PokemonList();
      for (const pokemon of this.pokemonList.items) {
        const moistToAdd = (Object.assign(new Pokemon, pokemon));
        moistToAdd.pokemonDetails = Object.assign(new PokemonDetails, pokemon.pokemonDetails);
        moistToAdd.tradeDetails = Object.assign(new TradeDetails, pokemon.tradeDetails);
        moistList.add(moistToAdd);
      }
      this.pokemonList = moistList
    } else {
      this.pokemonList = new PokemonList();
    }


    if (localStorage.getItem('pokemonTeamList')) {
      this.pokemonTeamList = JSON.parse(localStorage.getItem('pokemonTeamList'));

      // Notes because i googled if there was a better way than looping through 3 arrays to find what does/doesnt exist and this is new-ish to me
      // All set items must be unique
      // .map returns a new array with only the id's that gets turned into a set
      const pokemonListIds = new Set(this.pokemonList.items.map(p => p.id));
      for (const team of this.pokemonTeamList) {
        // filter loops throguh all id's and if pokemonListIds.has returns false, that id is removed from the list
        team.activeTeam = team.activeTeam.filter(id => pokemonListIds.has(id));
        if (team.activeTeam.length < 6 && team.backupPokemon.length > 0) {
          team.activeTeam.push(team.backupPokemon.shift());
        }
      }
      const moistTeamList = [];
      for (const pokemonTeam of this.pokemonTeamList) {
        const moistToAdd = (Object.assign(new PokemonTeam, pokemonTeam));
        moistTeamList.push(moistToAdd);
      }
      console.log(moistTeamList);
      this.pokemonTeamList = moistTeamList
    } else {
      this.pokemonTeamList = [];
      for (const type of this.types) {
        console.log(type);
        this.pokemonTeamList.push(new PokemonTeam({
          id: this.pokemonTeamList.length,
          type: type,
          activeTeam: [],
          backupTeam: [],
          activeMegaId: null
        }))

        }
        localStorage.setItem('pokemonTeamList', JSON.stringify(this.pokemonTeamList))
      }
      console.log(localStorage.getItem('tradeCardList'));
      if (localStorage.getItem('tradeCardList')) {
        this.tradeCardList = JSON.parse(localStorage.getItem('tradeCardList'));
        const moistTradeCardList = new TradeCardList();
        for (let tradeCard of this.tradeCardList.items) {
          tradeCard = Object.assign(new TradeCard, tradeCard);
          let moistWantList = [];
          for (let pokemon of tradeCard.wantList) {
            pokemon = Object.assign(new Pokemon, pokemon);
            pokemon.pokemonDetails = Object.assign(new PokemonDetails, pokemon.pokemonDetails);
            pokemon.tradeDetails = Object.assign(new TradeDetails, pokemon.tradeDetails);
            moistWantList.push(pokemon);
            console.log(pokemon);
          }
          tradeCard.wantList = moistWantList;
        }
        this.tradeCardList = moistTradeCardList;

      } else {
        this.tradeCardList = new TradeCardList();
      }



  },
  watch: {
    pokemonList: {
      handler: function () {
        for (let pokemon of this.pokemonList.items) {
          if (!pokemon.cp) {
            pokemon.cp = 50;
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
    tradeCardList: {
      handler: function () {

        if (this.tradeCardList) {
          localStorage.setItem('tradeCardList', JSON.stringify(this.tradeCardList))

        } else {
          this.tradeCardList = []
        }
      }, deep: true
    },
  }
}

</script>

<template>
  <NavbarMain pageTitle="Pokemon Go Raid Power"/>
  <router-view :trade-card-list="tradeCardList" :pokemon-list-api="pokemonListAPI" :pokemon-team-list="pokemonTeamList"
               :pokemon-list="pokemonList"></router-view>
</template>

<style scoped></style>
