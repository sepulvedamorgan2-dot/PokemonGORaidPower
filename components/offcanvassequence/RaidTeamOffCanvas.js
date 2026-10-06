// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import SearchAndDisplayView from "../molecules/SearchAndDisplayView.js";
import HorizontalCard from "../HorizontalCard.js";
const RaidTeamOffCanvas =  {
    name: 'RaidTeamOffCanvas',

    components: {
        OffCanvasContainer,
        SearchAndDisplayView,
        HorizontalCard,
    },

    data: function () {
        return {
            pageNumber: 0,
            onlyNewPokemon: [],
            offCanvasTitle: [
                this.pokemonTeam.type,
                "Add",
                "Filter"
            ]
        }
    },

    props: {
        pokemonList: {Array, Required: true},
        pokemonTeam: {Array, Required: true}
    },

    methods: {
        getSpriteLink(pokemonID) {

            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        }
        ,returnFullPokemon(pokemonIdOnly) {
            return   {...this.pokemonList.find(p => p.Id === pokemonIdOnly)}
        }
        ,getClass(type, otherClasses) {
            return ` type${type} ${otherClasses}`;
        },  forwardPage(){
            this.pageNumber++

        }, backPage(){
            this.pageNumber--;
        },
        reset(){
            // this.title = this.pokemonTeam.type + ' Type Team';
            // this.addTeam = false;
            // this.editTeam = true;
            // this.returnNewPokemon()
        }, addPokemonToTeam(pokemonObject) {

            if (this.pokemonTeam.activeTeam.length < 6) {
                this.pokemonTeam.activeTeam.push(pokemonObject.Id);
            } else {
                this.pokemonTeam.backupPokemon.push(pokemonObject.Id);
            }
            this.returnNewPokemon()


        }, returnNewPokemon(){
            this.onlyNewPokemon = []
            for (const pokemonObject of this.pokemonList) {
                if (!this.pokemonTeam.activeTeam.includes(pokemonObject.Id) && !this.pokemonTeam.backupPokemon.includes(pokemonObject.Id)) {
                    this.onlyNewPokemon.push(pokemonObject);
                }
            }

        },
    },
    //
    // watch: {
    //     pokemonList: {
    //         handler() {
    //             this.returnNewPokemon();
    //         },
    //         deep: true,
    //         immediate: true
    //     }
    // },


    computed: {

    },





    template: `
      <div>
        <i class="bi bi-pencil fs-5 " type="button" v-on:click="$refs.RaidTeamOffCanvas.openOffCanvas(); pageNumber = 1; returnNewPokemon() "
           data-bs-target="#editTeamOffCanvas"></i>
      </div>


      <teleport to="#app2">
        <off-canvas-container :title-array="offCanvasTitle" :page-number="pageNumber" @clicked="pageNumber--"  
                              ref="RaidTeamOffCanvas">

          <div v-show="pageNumber === 1">
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
              <button v-on:click="forwardPage()"
                      class="btn btn-primary w-100 fs-4 w-100">
                Add Pokemon
              </button>
            </div>
          </div>


          <div v-show="pageNumber === 2 || pageNumber === 3">
            <search-and-display-view :filter=true @view-number="pageNumber = $event" :page-number="pageNumber" @clicked-object="addPokemonToTeam" :list="onlyNewPokemon" title="Search Your Pokemon"></search-and-display-view>
          </div>
          
          


        </off-canvas-container>
      </teleport>

    `,


}

export default RaidTeamOffCanvas;