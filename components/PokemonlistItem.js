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
        , getSpriteLink(pokemonID) {

            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        },
        openOffCanvas() {
            this.bsOffCanvas.show();
        }
    },

    computed: {},

    template: `
      

      <div class="row g-0 py-0">
        <div class="col-auto">
          <img :src="getSpriteLink(pokemon.pokemonId)"
               alt="Pokemon" class="img-fluid horz-card-img">
        </div>
        <div class="col-4 col-sm-3 col-lg-2 d-flex  align-items-center">
          <p class="fs-5 mb-1 ms-1 text-capitalize">{{ pokemon.name }}</p>

        </div>
        <div class=" col ms-auto d-flex d-sm-none align-items-center ">
          <i v-if="pokemon.fastMoveType"
             :class="getClass(pokemon.fastMoveType, \`rounded  p-1 fs-tinyer bi bi-lightning-charge\`)"></i>
          <i v-if="pokemon.chargedMoveType1"
             :class="getClass(pokemon.chargedMoveType1, \`rounded ms-1 fs-tinyer p-1 bi bi-lightning-charge-fill\`)"></i>
          <i v-if="pokemon.chargedMoveType2"
             :class="getClass(pokemon.chargedMoveType2, \`rounded ms-1  fs-tinyer p-1 bi bi-lightning-charge-fill\`)"></i>
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
                    <span v-if="pokemon.fastMoveType"
                          :class="getClass(pokemon.fastMoveType, \`badge p-2 text-capitalize\`)">{{ pokemon.fastMoveType }}</span>
          <span v-if="!pokemon.fastMoveType"
                :class="\`bg-secondary badge p-2 text-capitalize\`">Not Added</span>

        </div>
        <div class="col-auto d-none d-sm-flex">
          <div class="spacer"></div>
        </div>
        <div class=" col-auto d-none d-lg-flex movewidth align-items-center ms-2">
            <span
                :class="getClass(pokemon.chargedMoveType1, \`badge p-2 text-capitalize\`)">{{ pokemon.chargedMoveType1 }}</span>
          <span v-if="!pokemon.chargedMoveType1"
                :class="\`bg-secondary badge p-2 text-capitalize\`">Move 1 Not Added</span>
          <span
              :class="getClass(pokemon.chargedMoveType2, \`badge p-2 ms-2 text-capitalize\`)">{{ pokemon.chargedMoveType2 }}</span>
          <span v-if="!pokemon.chargedMoveType2" :class="\`bg-secondary ms-2 badge p-2 text-capitalize\`">Move 2 Not Added</span>

        </div>

        <pokemon-details-off-canvas :pokemon="pokemon"
                                    @delete-item="item => $emit('deleteItem', item)"></pokemon-details-off-canvas>

      </div>



    `,


}

export default PokemonlistItem;