// For subcomponent
// import xxx from './PokemonlistItem.js';

import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import SearchAndDisplayView from "../molecules/SearchAndDisplayView.js";
import FilterView from "../offcanvasviews/FilterView.js";
import HorizontalCard from "../HorizontalCard.js";
const RaidTeamOffCanvas =  {
    name: 'RaidTeamOffCanvas',

    components: {
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
                filterFast: '',
                filterCharged: '',
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

        returnFullPokemon(pokemonIdOnly) {
            return   {...this.pokemonList.find(p => p.Id === pokemonIdOnly)}
        }
        ,
        addPokemonToTeam(pokemonObject) {
            if (this.pokemonTeam.activeTeam.length < 6) {
                this.pokemonTeam.activeTeam.push(pokemonObject.Id);
            } else {
                this.pokemonTeam.backupPokemon.push(pokemonObject.Id);
            }
            this.returnNewPokemon();
        }, returnNewPokemon(){
            this.onlyNewPokemon = []
            for (const pokemonObject of this.pokemonList) {
                if (!this.pokemonTeam.activeTeam.includes(pokemonObject.Id) && !this.pokemonTeam.backupPokemon.includes(pokemonObject.Id)) {
                    this.onlyNewPokemon.push(pokemonObject);
                }
            }

        },
    },

    computed: {

    },





    template: `
      <div>
        <i class="bi bi-pencil fs-5 " type="button" v-on:click="$refs.RaidTeamOffCanvas.openOffCanvas(); pageNumber = 1; returnNewPokemon() "
           data-bs-target="#editTeamOffCanvas"></i>
      </div>


      <teleport to="#app2">
        <off-canvas-container :title-array="offCanvasTitle" :page-number="pageNumber" @go-back="pageNumber--"  
                              ref="RaidTeamOffCanvas">

          <template v-slot:pageOne>
            <div class=" ps-3">
              <p class="fs-4 fw-medium mt-2 details-add-name text-capitalize">Active Team</p>
            </div>
            <div v-for="pokemon in pokemonTeam.activeTeam"
                 :key="pokemon.Id">
              <horizontal-card :pokemon-team="pokemonTeam" :card-style="3"
                               :pokemon="returnFullPokemon(pokemon)"></horizontal-card>
            </div>
            <div v-if="pokemonTeam.backupPokemon.length > 0">
              <div class=" ps-3">
                <p class="fs-4 fw-medium mt-2 details-add-name text-capitalize">Backup Team</p>
              </div>
              <div v-for="pokemon in pokemonTeam.backupPokemon"
                   :key="pokemon.Id">
                <horizontal-card :pokemon-team="pokemonTeam" :card-style="3"
                                 :pokemon="returnFullPokemon(pokemon)"></horizontal-card>
              </div>
            </div>


            <div class="p-2 sticky-bottom">
              <button v-on:click="$refs.RaidTeamOffCanvas.pageNumber++"
                      class="btn btn-primary w-100 fs-4 w-100">
                Add Pokemon
              </button>
            </div>
          </template>


          <template v-slot:pageTwo>
            <search-and-display-view :filter-object=filterObject @filter-clicked="$refs.RaidTeamOffCanvas.pageNumber++"  @clicked-object="addPokemonToTeam" :list="onlyNewPokemon" title="Search Your Pokemon"></search-and-display-view>
          </template>
            
          <template v-slot:pageThree>
            <FilterView  @filter-object="filterObject = $event"></FilterView>
          </template>
        </off-canvas-container>
      </teleport>

    `,


}

export default RaidTeamOffCanvas;