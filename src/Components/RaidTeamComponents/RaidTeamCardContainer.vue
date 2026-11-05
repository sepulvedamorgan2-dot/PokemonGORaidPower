<script>

import RaidTeamCard from "@/Components/RaidTeamComponents/RaidTeamCard.vue";

export default {
  name: "RaidTeamCardContainer",
  components: {
    RaidTeamCard,
  },

  data: function () {
    return {

    }
  },

  props: {
    pokemonList: {Array, required: true},
    pokemonTeamList: {Array, required: true},
  },

}
</script>

<template>
  <div class="container-fluid container-md" >

    <div class="row g-3 mt-sm-2 mt-1 " >
      <div  class="col-12 col-sm-6 col-xl-4 mt-3 typecard" v-for="pokemonTeam in pokemonTeamList" :key="pokemonTeam.id">
        <raid-team-card :pokemon-list="pokemonList" :pokemon-team="pokemonTeam">
        </raid-team-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>