<script>

import NavbarMain from "@/Components/Universal/NavbarMain.vue";
import {shallowRef} from "vue"
import {PokemonList} from "@/models/PokemonList.js"
import {TradeCardList} from "@/models/TradeCardList.js";
import DataFactory from "@/models/DataFactory.js";
import GameDataFactory from "@/models/GameDataFactory.js";

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
  mounted: async function () {
    this.pokemonListAPI = await GameDataFactory.fetchPokemonListApi();
    this.pokemonList = DataFactory.fetchPokemonList();
    this.pokemonTeamList = DataFactory.fetchPokemonTeamList(this.pokemonList);
    this.tradeCardList = DataFactory.fetchTradeCardList()

  },

  watch: {
    pokemonList: {
      handler: function () {
        DataFactory.savePokemonList(this.pokemonList)
        GameDataFactory.fetchSinglePokemon({
          pokemonId: 1,
          image: `https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm1.cJAN_2020_NOEVOLVE.s.icon.png`,
          name: 'Bulbasaur',
        })
      }, deep: true
    },
      pokemonTeamList: {
        handler: function () {
          DataFactory.savePokemonTeamList(this.pokemonTeamList)
        }, deep: true
      },
      tradeCardList: {
        handler: function () {
          DataFactory.saveTradeCardList(this.tradeCardList)
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
