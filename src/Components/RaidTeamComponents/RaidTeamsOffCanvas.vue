<script>

import HorizontalCard from "@/Components/Universal/OffCanvasHorizontalCards/HorizontalCard.vue";
import FilterView from "@/Components/Universal/OffCanvasViews/FilterView.vue";
import SearchAndDisplayView from "@/Components/Universal/OffCanvasViews/SearchAndDisplayView.vue";
import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import RaidTeamCard from "@/Components/Universal/OffCanvasHorizontalCards/RaidTeamCard.vue";


export default {
  name: "RaidTeamsOffCanvas",
  components: {
    RaidTeamCard,
    OffCanvasContainer,
    SearchAndDisplayView,
    FilterView,
    HorizontalCard,
  },

  data: function () {
    return {

      onlyNewPokemon: [],
      offCanvasTitle: [
        this.pokemonTeam.type,
        "Add",
        "Filter"
      ],
      filterObject: {
        filterType: '',
        filterCP: 0,
        filterShadow: '',
        filterMega: '',
      },
    }
  },

  props: {
    pokemonList: {Array, Required: true},
    pokemonTeam: {Array, Required: true}
  },

  methods: {


     returnNewPokemon() {
      this.onlyNewPokemon = []
      for (const pokemonObject of this.pokemonList.items) {
        if (!this.pokemonTeam.activeTeam.includes(pokemonObject.id) && !this.pokemonTeam.backupPokemon.includes(pokemonObject.id)) {
          this.onlyNewPokemon.push(pokemonObject);
        }
      }

    },
  },

}
</script>

<template>
  <div>
    <i class="bi bi-pencil fs-5 " type="button"
       v-on:click="$refs.RaidTeamOffCanvas.openOffCanvas(); $refs.RaidTeamOffCanvas.pageNumber = 1; returnNewPokemon() "
       data-bs-target="#editTeamOffCanvas"></i>

    <teleport to="#app" >
      <off-canvas-container :title-array="offCanvasTitle"
                            ref="RaidTeamOffCanvas">

        <template v-slot:pageOne>
          <div>
          <div class=" ps-3">
            <p class="fs-4 fw-medium mt-2 details-add-name text-capitalize">Active Team</p>
          </div>
          <div v-for="pokemon in pokemonTeam.activeTeam"
               :key="pokemon">
            <raid-team-card :pokemon-team="pokemonTeam" card-style="RaidTeam"
                             :pokemon="pokemonList.findPokemonById(pokemon)"
                             @pokemon-removed="returnNewPokemon"
                             @remove-pokemon="pokemonTeam.removeFromTeam($event.id)"
                             @mega-pokemon="pokemonTeam.activeTeamMega($event.id)"
            ></raid-team-card>
          </div>
          <div v-if="pokemonTeam.backupPokemon.length > 0">
            <div class=" ps-3">
              <p class="fs-4 fw-medium mt-2 details-add-name text-capitalize">Backup Team</p>
            </div>
            <div v-for="pokemon in pokemonTeam.backupPokemon"
                 :key="pokemon.Id">
              <raid-team-card :pokemon-team="pokemonTeam" card-style="RaidTeam"
                               :pokemon="pokemonList.findPokemonById(pokemon)"
                               @remove-pokemon="pokemonTeam.removeFromTeam($event.id)"

                               ></raid-team-card>
            </div>
          </div>


          <div class="p-2 sticky-bottom">
            <button v-on:click="$refs.RaidTeamOffCanvas.pageNumber++"
                    class="btn btn-primary w-100 fs-4 w-100">
              Add Pokemon
            </button>
          </div>
          </div>
        </template>


        <template  v-slot:pageTwo>
          <search-and-display-view card-style="Existing"   :filter-object=filterObject @filter-clicked="$refs.RaidTeamOffCanvas.pageNumber++"
                                   @clicked-object="pokemonTeam.addToTeam($event.id); returnNewPokemon()" :list-to-search="onlyNewPokemon"
                                   title="Search Your Pokemon"></search-and-display-view>
        </template>

        <template v-slot:pageThree>
          <FilterView @filter-object="filterObject = $event"></FilterView>
        </template>
      </off-canvas-container>
    </teleport>
  </div>
</template>


<style scoped>

</style>