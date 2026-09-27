// For subcomponent
// import xxx from './PokemonlistItem.js';

const ComponentName = {
    components: {

    },

    data: function () {
        return {

        }
    },

    props: {

    },

    methods: {

    },

    computed: {},

    template: `
      <div class="flex-grow-1 d-flex flex-column">

        <div class="text-center">

          <span class="fs-5 text-dark mb-0">{{ activeItem.cp }}</span>
          <span class="text-uppercase fw-bold text-tertiary fs-6 mt-2 mb-1 ms-1">RP</span>
          <span class=" fs-5 text-dark mb-0 ms-2">{{ activeItem.cp }}</span>
          <span class="text-uppercase fw-bold text-secondary fs-tiny   mt-2 mb-1 ms-1">CP</span>
        </div>
        <div>
          <div class="px-3">
            <div class="mt-4">
              <h5>Details</h5>
            </div>
            <div class="">
              <span v-if="activeItem.isShadow" class="badge p-2 px-3 fs-6  typeghost">Shadow</span>
              <span v-if="activeItem.canMegaEvolve" class="badge p-2 px-3 fs-6 ms-2 typefire">Can Mega</span>
              <span v-if="!activeItem.canMegaEvolve && !activeItem.isShadow"
                    class="badge p-2 px-3 fs-6  typefire">Cannot Mega/Isnt Shadow</span>

            </div>


            <div class="mt-3">
              <h5>Fast Move Type</h5>
            </div>
            <div class="">
                        <span v-if="activeItem.fastMoveType"
                              :class="getClass(activeItem.fastMoveType, \`badge p-2 px-3 fs-6 text-capitalize\`)">{{ activeItem.fastMoveType }}</span>
              <span v-if="!activeItem.fastMoveType" :class="\`bg-secondary badge p-2 text-capitalize\`">Not Added</span>
            </div>


            <div class="mt-3">
              <h5>Charged Move Type</h5>
            </div>
            <div class="">

                        <span v-if="activeItem.chargedMoveType1"
                              :class="getClass(activeItem.chargedMoveType1, \`badge p-2 px-3 fs-6 text-capitalize\`)">{{ activeItem.chargedMoveType1 }}</span>
              <span v-if="!activeItem.chargedMoveType1"
                    :class="\`bg-secondary badge p-2 text-capitalize\`">Not Added</span>

              <span v-if="activeItem.chargedMoveType2"
                    :class="getClass(activeItem.chargedMoveType2, \`badge p-2 px-3 fs-6 ms-2 text-capitalize\`)">{{ activeItem.chargedMoveType2 }}</span>
              <span v-if="!activeItem.chargedMoveType2"
                    :class="\`bg-secondary badge p-2 text-capitalize\`">Not Added</span>
            </div>
          </div>
          <!-- Edit button -->
          <div class="px-3 pt-5">
            <button type="button"
                    class="btn btn-primary mb-2 py-2 fs-4 w-100" data-bs-toggle="offcanvas"
                    data-bs-target="#editPokemonOffCanvas">Edit Pokemon
            </button>
          </div>
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
        
    `,


}

export default ComponentName;