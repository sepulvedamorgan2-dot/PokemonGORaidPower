<script>

import RaidTeamCard from "@/Components/RaidTeamComponents/RaidTeamCard.vue";
import {VueDraggable} from "vue-draggable-plus";

export default {
  name: "RaidTeamCardContainer",
  components: {
    VueDraggable,
    RaidTeamCard,
  },

  data: function () {
    return {}
  },

  props: {
    pokemonList: {Array, required: true},
    pokemonTeamList: {Array, required: true},
  },
  computed: {
    // Create a writable computed property to satisfy v-model without mutating the prop directly
    localPokemonTeamList: {
      get() {
        return this.pokemonTeamList;
      },
      set(value) {
        this.$emit('update:pokemonTeamList', value);
      }
    }
  }

}
</script>

<template>
  <div class="container-fluid container-md" v-if="pokemonTeamList && pokemonTeamList.length > 0">

    <vue-draggable :delay="100" :delay-on-touch-only="true"
                   :force-fallback="true" draggable=".draggable"
                   v-model="localPokemonTeamList"
                   class="row gx-2 gy-0"
                   >
      <!--      <div class="col-12 col-sm-6 col-xl-4 mt-3 draggable typecard"-->
      <!--          >-->
      <div v-for="pokemonTeam in pokemonTeamList" class="col-12 col-sm-6 col-xl-4 mt-3 draggable typecard">
        <raid-team-card  :key="pokemonTeam.id"
                        :pokemon-list="pokemonList" :pokemon-team="pokemonTeam">
        </raid-team-card>
      </div>
      <!--      </div>-->
    </vue-draggable>

  </div>
</template>

<style scoped>

</style>