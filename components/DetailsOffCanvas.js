// For subcomponent
// import xxx from './PokemonlistItem.js';
import PokemonImageName from "./PokemonImageName.js";
import OffCanvasContainer from "./OffCanvasContainer.js";
import AddEditOffCanvas from "./AddEditOffCanvas.js";
const DetailsOffCanvas = {
    components: {
        PokemonImageName,
        OffCanvasContainer,
        AddEditOffCanvas
    },

    data: function () {
        return {

        }
    },

    props: {
        activeItem: {type: Object, required: true},

    },

    methods: {
        getClass(type, otherclasses) {
            return ` type${type} ${otherclasses}`;
        }, openOffCanvas(OpenPrevious) {

            try{
                this.lastOffCanvas.hide()
            } catch(e) {

            }
            this.bsOffCanvas.show();
            this.lastOffCanvas = this.bsOffCanvas;

        }


    },

    computed: {},

    template: `
      <div class="col-auto ms-auto  align-items-center d-flex">
        <div >
          <i type="button"  data-bs-target="#pokemonDetailsOffCanvas"
              v-on:click="$refs.pokemonDetailsOffCanvas.openOffCanvas()"
             class="bi bi-three-dots me-4 fs-4"></i>

        </div>
        <teleport to="#app">
          <off-canvas-container ref="pokemonDetailsOffCanvas" title="Pokemon Details">
            <pokemon-image-name :active-item="activeItem"></pokemon-image-name>
            <div class="flex-grow-1 d-flex flex-column">

              <div class="text-center">

                <span class="fs-5 text-dark mb-0">{{ activeItem.cp }}</span>
                <span class="text-uppercase fw-bold text-tertiary fs-6 mt-2 mb-1 ms-1">RP</span>
                <span class=" fs-5 text-dark mb-0 ms-2">{{ activeItem.cp }}</span>
                <span class="text-uppercase fw-bold text-secondary fs-tiny   mt-2 mb-1 ms-1">CP</span>
              </div>
              <div>
                <div class="px-3">
                  <div class="mt-3">
                    <h5>Details</h5>
                  </div>
                  <div class="">
                    <span v-if="activeItem.isShadow" class="badge p-2 px-3 fs-tiny  typeghost">Shadow</span>
                    <span v-if="activeItem.canMegaEvolve" class="badge p-2 px-3 fs-tiny  typefire">Can Mega</span>
                    <span v-if="!activeItem.canMegaEvolve && !activeItem.isShadow"
                          class="badge p-2 px-3 fs-6  typefire">Cannot Mega/Isnt Shadow</span>

                  </div>


                  <div class="mt-2">
                    <h5>Fast Move Type</h5>
                  </div>
                  <div class="">
                        <span v-if="activeItem.fastMoveType"
                              :class="getClass(activeItem.fastMoveType, \`badge p-2 px-3 fs-tiny text-capitalize\`)">{{ activeItem.fastMoveType }}</span>
                    <span v-if="!activeItem.fastMoveType"
                          :class="\`bg-secondary badge p-2 px-3 fs-tiny text-capitalize\`">Not Added</span>
                  </div>


                  <div class="mt-2">
                    <h5>Charged Move Type</h5>
                  </div>
                  <div class="">

                        <span v-if="activeItem.chargedMoveType1"
                              :class="getClass(activeItem.chargedMoveType1, \`badge p-2 px-3 fs-tiny text-capitalize\`)">{{ activeItem.chargedMoveType1 }}</span>
                    <span v-if="!activeItem.chargedMoveType1"
                          :class="\`bg-secondary badge p-2 text-capitalize\`">Not Added</span>

                    <span v-if="activeItem.chargedMoveType2"
                          :class="getClass(activeItem.chargedMoveType2, \`badge p-2 px-3 fs-tiny ms-2 text-capitalize\`)">{{ activeItem.chargedMoveType2 }}</span>
                    <span v-if="!activeItem.chargedMoveType2"
                          :class="\`bg-secondary badge p-2 text-capitalize\`">Not Added</span>
                  </div>
                </div>
                <!-- Edit button -->
                <add-edit-off-canvas @previous-off-canvas="$refs.pokemonDetailsOffCanvas.openOffCanvas()" :active-item="activeItem"  @add-pokemon="addPokemon"></add-edit-off-canvas>
                <!--                delete button-->
                <div class="px-3">
                  <button type="button"
                          class="btn btn-danger mb-2 py-2 fs-4 text-white w-100" data-bs-toggle="modal"
                          data-bs-target="#confirmDelete">Delete Pokemon
                  </button>
                </div>
              </div>

              <!-- end -->
            </div>
          </off-canvas-container>
        </teleport>
      </div>
    `,


}

export default DetailsOffCanvas;