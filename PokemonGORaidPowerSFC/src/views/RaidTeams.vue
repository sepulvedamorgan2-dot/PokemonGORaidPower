<script>
import NavbarMain from "@/Components/Universal/NavbarMain.vue";
import RaidTeamCardContainer from "@/Components/RaidTeamComponents/RaidTeamCardContainer.vue";

export default {
  name: 'RaidTeams',
  components: {
    NavbarMain,
    RaidTeamCardContainer,
  },
  data: function () {

    return {
      types: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
      pokemonTeam: {
        id: 1,
        type: "",
        activeTeam: [],
        backupPokemon: [],
        activeMegaId: 0

      }
    }
  },
  props: {
    pokemonTeamList: {Type: Array, default: []},
    pokemonList: {Type: Array, default: []}
  },

}
</script>

<template>
  <div class="pb-3">



    <raid-team-card-container :pokemon-list="pokemonList" :pokemon-team-list="pokemonTeamList">
    </raid-team-card-container>

  </div>
</template>

<style scoped>

</style>