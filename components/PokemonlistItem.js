import DetailsOffCanvas from "./offcanvasviews/DetailsOffCanvas.js";
import AddEditOffCanvas from "./offcanvasviews/AddEditOffCanvas.js";
import PokemonDetailsOffCanvas from "./offcanvassequence/PokemonDetailsOffCanvas.js";

const PokemonlistItem = {
    components: {
        AddEditOffCanvas,
        DetailsOffCanvas,
        PokemonDetailsOffCanvas,
    },
    data: function () {

        return {}

    },

    props: {
        pokemon: {Object, required: false},



    },

    methods: {
        getClass(type, otherclasses) {
            return ` type${type} ${otherclasses}`;
        }
        ,
        openOffCanvas() {
            this.bsOffCanvas.show();
        }
    },

    computed: {},

    template: `
      

      <div class="row g-0 py-0">
        <div class="col-auto position-relative">
          <img :src="pokemon.image"
               alt="Pokemon" class="shadow-pokemon img-fluid horz-card-img">
          <img v-if="pokemon.isShadow" src="/media/images/shadow.png" alt="Shadow" class="corner-bl-img">
          <img v-if="pokemon.image.includes('.s.')" src="/media/images/shiny.png" alt="Shadow" class="corner-tr-img">
        </div>
        <div class="col-4 col-sm-3 col-lg-2 d-flex  align-items-center">
          <p class="fs-5 mb-1 ms-1 text-capitalize">{{ pokemon.name }}</p>

        </div>
        <div class=" col ms-auto d-flex d-sm-none align-items-center ">
          <i v-if="pokemon.fastMove"
             :class="getClass(pokemon.fastMove.type.name, \`rounded  p-1 fs-tinyer bi bi-lightning-charge\`)"></i>
          <i v-if="pokemon.chargedMoveOne"
             :class="getClass(pokemon.chargedMoveOne.type.name, \`rounded ms-1 fs-tinyer p-1 bi bi-lightning-charge-fill\`)"></i>
          <i v-if="pokemon.chargedMoveTwo"
             :class="getClass(pokemon.chargedMoveTwo.type.name, \`rounded ms-1  fs-tinyer p-1 bi bi-lightning-charge-fill\`)"></i>
        </div>
        <div class="col-auto d-none d-sm-flex">
          <div class="spacer"></div>
        </div>
        <div class=" col-auto d-none d-sm-flex  align-items-center">
          <p class="fs-6 mb-0 ms-1 power-width">{{ pokemon.cp }}</p>

        </div>
        <div class="col-auto d-none d-sm-flex">
          <div class="spacer"></div>
        </div>
        <div class=" col-auto d-none d-sm-flex  align-items-center">
          <p class="fs-6 mb-0 ms-1 power-width">{{ pokemon.cp }}</p>

        </div>
        <div class="col-auto d-none d-sm-flex">
          <div class="spacer"></div>
        </div>
        <div class=" col-auto d-none d-lg-flex movewidth align-items-center ">
                    <span v-if="pokemon.fastMove"
                          :class="getClass(pokemon.fastMove.type.name, \`badge p-2 text-capitalize\`)">{{ pokemon.fastMove.names.English }}</span>
          <span v-if="!pokemon.fastMove"
                :class="\`bg-secondary badge p-2 text-capitalize\`">Not Added</span>

        </div>
        <div class="col-auto d-none d-sm-flex">
          <div class="spacer"></div>
        </div>
        <div class=" col-auto d-none d-lg-flex movewidth align-items-center ms-2">
            <span
                v-if="pokemon.chargedMoveOne" :class="getClass(pokemon.chargedMoveOne.type.name, \`badge p-2 text-capitalize\`)">{{ pokemon.chargedMoveOne.names.English }}</span>
          <span v-else
                :class="\`bg-secondary badge p-2 text-capitalize\`">Move 1 Not Added</span>
          <span
              v-if="pokemon.chargedMoveTwo" :class="getClass(pokemon.chargedMoveTwo.type.name, \`badge p-2 ms-2 text-capitalize\`)">{{ pokemon.chargedMoveTwo.names.English }}</span>
          <span v-else :class="\`bg-secondary ms-2 badge p-2 text-capitalize\`">Move 2 Not Added</span>

        </div>

        <pokemon-details-off-canvas :pokemon="pokemon"
                                    @delete-item="item => $emit('deleteItem', item)"></pokemon-details-off-canvas>

      </div>



    `,


}

export default PokemonlistItem;