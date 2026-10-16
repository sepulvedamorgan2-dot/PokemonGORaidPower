// For subcomponent
// import xxx from './PokemonlistItem.js';
import PokemonImageName from "../PokemonImageName.js";

const AddOrEditOffCanvas = {
    name: 'AddOrEditOffCanvas',
    components: {
        PokemonImageName,


    },

    data: function () {
        return {
            pokemon: {
                Id: 1,
                name: "",
                pokemonId: 1,
                cp: 1000,
                isShadow: false,
                canMegaEvolve: false,
                fastMoveType: "",
                chargedMoveType1: "",
                chargedMoveType2: "",

            }, quantity: 1,
            level: ''
        }
    },

    props: {
        activeItem: {type: Object, required: true},
        isNew: {type: Boolean, default: false},

    },




    methods: {
        openOffCanvas() {


            this.bsOffCanvas.show();

        }, updateCpNumber(number){
            this.activeItem.cp = Math.round(number.target.value * this.activeItem.maxCp / 100);

        }
    },
    computed: {

    },
    mounted() {

    },

    template: `
      <div v-if="activeItem"> 
        <pokemon-image-name :active-item="activeItem"></pokemon-image-name>
        <div class="flex-grow-1 d-flex flex-column">

          <!--              <confirm-added-modal item="{{ activeItem.name }}"></confirm-added-modal>-->
          <form class="container-fluid d-flex flex-column flex-grow-1 needs-validation"

                v-on:submit.prevent="$emit('addPokemon', [activeItem, quantity]); " >

            <div>
              <label :for="'range' + activeItem.Id" class="form-label">Creature Power (CP): {{ activeItem.cp }}</label>
              <input type="range" class="form-range" min="1" :max="100" v-on:input="updateCpNumber($event)"  :id="'range' + activeItem.Id">
            </div>
            
            <div class="mt-2">
              <button class="btn btn-primary w-100 rounded-0" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapseEX1" aria-expanded="false" aria-controls="collapseEX1">
                Edit Move Types (optional)
              </button>
            </div>

            <div class="collapse" id="collapseEX1" data-bs-parent="#editTeamCollapse">
              <div class="card bg-light border-0 card-body py-2 pt-0 rounded-0">
                <!-- Fast type div -->
                <div class="row g-2 btn-group mt-2" role="group" aria-label="Pokemon Creature Power Buttons">
                  <div class="col-12">
                    <label class="form-label w-100">
                      Fast Move
                      <select class="form-select" v-model="activeItem.fastMoveType">
                        <option value="">None Selected</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                      </select>
                    </label>
                  </div>
                </div>

                <!-- Charged type div -->
                <div class="row g-2 btn-group" role="group" aria-label="Pokemon Creature Power Buttons">
                  <div class="col-12 col-sm-6">
                    <label class="form-label w-100">
                      Charged Move 1
                      <select class="form-select" id="chargedMoveSelect1edit"
                              v-model="activeItem.chargedMoveType1">
                        <option value="">None Selected</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                      </select>
                    </label>
                  </div>
                  <div class="col-12 col-sm-6">
                    <label class="form-label w-100">
                      Charged Move 2
                      <select class="form-select" id="chargedMoveSelect2edit"
                              v-model="activeItem.chargedMoveType2">
                        <option value="">None Selected</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- toggle options -->
            <div class="row g-2 my-2">
              <div>
                <label class="form-check-label">
                  <input type="checkbox" id="isShadowedit" v-model="activeItem.isShadow"
                         class="border-dark-subtle form-check-input">
                  Shadow
                </label>
              </div>
              <div>
                <label class="form-check-label">
                  <input type="checkbox" id="isMegaedit" v-model="activeItem.canMegaEvolve"
                         class="border-dark-subtle form-check-input">
                  Can Mega Evolve
                </label>
              </div>
            </div>
            <div v-if="isNew">
              <label class="form-label w-25   ">
                Quantity
                <input required type="number" v-model="quantity" min="1"
                       max="10" class="form-control"
                       placeholder="Quantity">
              </label>
            </div>
            <!-- done button -->
            <div v-if="isNew" class="row g-2 mt-auto">
              <div class="col-12">
                <button type="submit"
                        class="btn btn-primary mb-2 py-2 fs-4 w-100">Add Pokemon
                </button>
              </div>
            </div>
            <div v-else class="row g-2 mt-auto">
              <div class="col-12">
                <button type="button"  v-on:click="$emit('clicked')"
                        class="btn btn-primary mb-2 py-2 fs-4 w-100">Done
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `,


}

export default AddOrEditOffCanvas;