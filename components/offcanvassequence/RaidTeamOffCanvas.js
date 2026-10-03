// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import SearchAndDisplayOffCanvas from "../offcanvasviews/SearchAndDisplayOffCanvas.js";
import HorizontalCard from "../HorizontalCard.js";
const RaidTeamOffCanvas =  {
    name: 'RaidTeamOffCanvas',

    components: {
        OffCanvasContainer,
        SearchAndDisplayOffCanvas,
        HorizontalCard,
    },

    data: function () {
        return {
            editTeam: true,
            addTeam: false,
            onlyNewPokemon: [],
            title: null,
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
        },  getTitle(){
            this.addTeam = !this.addTeam;
            this.editTeam = !this.editTeam;
            if(this.editTeam){
                this.title = this.pokemonTeam.type + ' Type Team';
            } else{
                this.title = this.pokemonTeam.type + ' > Add Pokemon'
            }

        }, reset(){
            this.title = this.pokemonTeam.type + ' Type Team';
            this.addTeam = false;
            this.editTeam = true;
            this.returnNewPokemon()
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

    watch: {
        pokemonList: {
            handler() {
                this.returnNewPokemon();
            },
            deep: true
        }
    },



    template: `
      <div>
        <i class="bi bi-pencil fs-5 " type="button" v-on:click="$refs.RaidTeamOffCanvas.openOffCanvas(); reset(); "
           data-bs-target="#editTeamOffCanvas"></i>
      </div>


      <teleport to="#app2">
        <off-canvas-container :have-arrow="addTeam" @clicked="getTitle()" :id="pokemonTeam.type" :title="title"
                              ref="RaidTeamOffCanvas">

          <div v-show="editTeam">
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
              <button v-on:click="getTitle()"
                      class="btn btn-primary w-100 fs-4 w-100">
                Add Pokemon
              </button>
            </div>
          </div>


          <div v-show="addTeam">
            <search-and-display-off-canvas @clicked-object="addPokemonToTeam" :card-style=2
                                           :list-to-search="onlyNewPokemon"></search-and-display-off-canvas>
          </div>


        </off-canvas-container>
      </teleport>

    `,


}

export default RaidTeamOffCanvas;