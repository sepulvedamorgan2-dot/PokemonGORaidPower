// For subcomponent
// import xxx from './PokemonlistItem.js';
import PokemonImageName from "./PokemonImageName.js";

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
        }
    },

    props: {
        activeItem: {type: Object, required: true},
        isNew: {type: Boolean, default: false},

    },




    methods: {
        openOffCanvas() {


            this.bsOffCanvas.show();

        },
    },
    computed: {

    },

    template: `
      <div>
        <pokemon-image-name :active-item="activeItem"></pokemon-image-name>
        <div class="flex-grow-1 d-flex flex-column">

          <!--              <confirm-added-modal item="{{ activeItem.name }}"></confirm-added-modal>-->
          <form class="container-fluid d-flex flex-column flex-grow-1 needs-validation"

                v-on:submit.prevent="$emit('addPokemon', [activeItem, quantity]); " >

            <!-- cp button div -->

            <div class="row g-2 btn-group" role="group" aria-label="Pokemon Creature Power Buttons">
              <div class="col-6">
                <input :id="'tierOneCP' + activeItem.Id + activeItem.pokemonId" :checked="activeItem.cp < 1500"
                       v-model.number="activeItem.cp"
                       :value="1200" type="radio" class="btn-check"
                       :name="'btnradio' + activeItem.Id + activeItem.pokemonId" required>
                <label class="btn btn-outline-primary w-100" :for="'tierOneCP' + activeItem.Id + activeItem.pokemonId">0-1500CP</label>
              </div>
              <div class="col-6">
                <input :id="'tierTwoCP' + activeItem.Id + activeItem.pokemonId"
                       :checked="activeItem.cp >= 1500 && activeItem.cp < 2500"
                       v-model.number="activeItem.cp" :value="2300" type="radio" class="btn-check"
                       :name="'btnradio' + activeItem.Id + activeItem.pokemonId" required>
                <label class="btn btn-outline-primary w-100" :for="'tierTwoCP' + activeItem.Id + activeItem.pokemonId">1500+CP</label>
              </div>
              <div class="col-6">
                <input :id="'tierThreeCP' + activeItem.Id + activeItem.pokemonId"
                       :checked="activeItem.cp >= 2500 && activeItem.cp < 3500"
                       v-model.number="activeItem.cp" :value="3400" type="radio" class="btn-check"
                       :name="'btnradio' + activeItem.Id + activeItem.pokemonId">
                <label class="btn btn-outline-primary w-100"
                       :for="'tierThreeCP' + activeItem.Id + activeItem.pokemonId">2500+CP</label>
              </div>
              <div class="col-6">
                <input :id="'tierFourCP' + activeItem.Id + activeItem.pokemonId" :checked="activeItem.cp >= 3500"
                       v-model.number="activeItem.cp"
                       :value="3700" type="radio" class="btn-check"
                       :name="'btnradio' + activeItem.Id + activeItem.pokemonId">
                <label class="btn btn-outline-primary w-100" :for="'tierFourCP' + activeItem.Id + activeItem.pokemonId">3500+CP</label>
              </div>
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