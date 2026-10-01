// For subcomponent
// import xxx from './PokemonlistItem.js';
import PokemonImageName from "./PokemonImageName.js";
import ConfirmDeleteModal from "./ConfirmDeleteModal.js";
const DetailsOffCanvas = {
    components: {
        PokemonImageName,


        ConfirmDeleteModal,
    },

    data: function () {
        return {

        }
    },

    props: {
        activeItem: {type: Object, required: true},

    },

    methods: {
        getClass(type, otherClasses) {
            return ` type${type} ${otherClasses}`;
        }


    },

    computed: {},

    template: `

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
                <div class="pt-3 px-3">
                  <button v-else type="button"
                          class="btn btn-primary mb-2 py-2 fs-4 w-100" v-on:click="$emit('clicked')">Edit Pokemon
                  </button>
                  
                </div>
                <!--                delete button-->
                <div class="px-3">
                  <confirm-delete-modal :item="activeItem" @delete-item="item => $emit('deleteItem', item)"></confirm-delete-modal>
                </div>
              </div>

              <!-- end -->
            </div>

    `,


}

export default DetailsOffCanvas;