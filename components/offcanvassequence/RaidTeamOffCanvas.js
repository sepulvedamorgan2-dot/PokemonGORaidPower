// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import SearchAndDisplayOffCanvas from "../offcanvasviews/SearchAndDisplayOffCanvas.js";
const RaidTeamOffCanvas =  {
    name: 'RaidTeamOffCanvas',

    components: {
        OffCanvasContainer,
        SearchAndDisplayOffCanvas,
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
        },updateCPIfMega(pokemonObject) {

            if (this.pokemonTeam.activeMegaId === pokemonObject.Id) {
                return pokemonObject.cp * 1.33;
            }
            return pokemonObject.cp;
        }, removeFromListActive(pokemonToRemove) {
            this.pokemonTeam.activeTeam.splice(this.pokemonTeam.activeTeam.indexOf(pokemonToRemove.Id) , 1);

        },megaClickedPokemon(pokemonToMega) {

            this.pokemonTeam.activeMegaId = pokemonToMega.Id;

        }, getTitle(){
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
        <off-canvas-container :have-arrow="addTeam" @clicked="getTitle()"  :id="pokemonTeam.type" :title="title" ref="RaidTeamOffCanvas">
          <div v-show="editTeam">
            <div class=" ps-3">
              <p class="fs-4 fw-medium mt-2 details-add-name text-capitalize">Active Team</p>
            </div>
            <div class="row g-0 border-bottom" v-for="pokemon in pokemonTeam.activeTeam"
                 :key="pokemon.Id">
              <div class="col-3 col-md-2">
                <img class="img-fluid"
                     :src="getSpriteLink(returnFullPokemon(pokemon).pokemonId)"
                     alt="pokemonImg">
              </div>
              <div class="col-6 col-md-7">
                <div class="p-1 ms-1">
                  <p class="fs-5 mb-0 text-capitalize">{{ returnFullPokemon(pokemon).name }}
                  </p>

                  <div class="d-flex mt-0">
                    <p class="me-2 fs-6 mb-0">RP:{{ updateCPIfMega(returnFullPokemon(pokemon)) }}</p>
                    <p class="fs-6 mb-0">CP:{{ updateCPIfMega(returnFullPokemon(pokemon)) }}</p>

                  </div>

                </div>
              </div>

              <div class="col-3">
                <div class="d-flex justify-content-end me-4 align-items-center h-100">
                  <i v-if="returnFullPokemon(pokemon).fastMoveType"
                     :class="getClass(returnFullPokemon(pokemon).fastMoveType, \`rounded mb-1 p-1  fs-tinyer bi bi-lightning-charge\`)"></i>
                  <i v-if="returnFullPokemon(pokemon).chargedMoveType1"
                     :class="getClass(returnFullPokemon(pokemon).chargedMoveType1, \`rounded mb-1 ms-1 fs-tinyer p-1 bi bi-lightning-charge-fill\`)"></i>
                  <i v-if="returnFullPokemon(pokemon).chargedMoveType2"
                     :class="getClass(returnFullPokemon(pokemon).chargedMoveType2, \`rounded mb-1 ms-1   fs-tinyer p-1 bi bi-lightning-charge-fill\`)"></i>
                  <i type="button" data-bs-toggle="collapse"
                     :data-bs-target="'#'+returnFullPokemon(pokemon).Id"
                     class="bi bi-pencil ms-2 ms-sm-4"></i>
                </div>
              </div>

              <div class="collapse" :data-bs-parent="'#'+pokemonTeam.type" :id="returnFullPokemon(pokemon).Id">

                <div class="card border-0 card-body py-2 pt-0">
                  <div class="row g-1">


                    <div class="col-12 col-sm-6 " v-if="returnFullPokemon(pokemon).canMegaEvolve">
                      <button type="button"
                              class="btn btn-secondary w-100"
                              v-on:click="megaClickedPokemon(returnFullPokemon(pokemon))">Mega
                      </button>
                    </div>
                    <div :class="{'col-12' : !returnFullPokemon(pokemon).canMegaEvolve,
                                                'col-12 col-sm-6' : returnFullPokemon(pokemon).canMegaEvolve}">
                      <button type="button"
                              class="btn btn-danger w-100 text-white"
                              v-on:click="removeFromListActive(returnFullPokemon(pokemon))"
                              data-bs-toggle="collapse"

                      >Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2">
              <button v-on:click="getTitle()"
                      class="btn btn-primary w-100 fs-4 w-100">
                Add Pokemon
              </button>
            </div>
          </div>
          <div v-show="addTeam">
            <search-and-display-off-canvas @clicked-object="addPokemonToTeam" :list-to-search="onlyNewPokemon"></search-and-display-off-canvas>
          </div>
        </off-canvas-container>
      </teleport>

    `,


}

export default RaidTeamOffCanvas;