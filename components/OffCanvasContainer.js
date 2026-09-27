// For subcomponent
// import xxx from './PokemonlistItem.js';
import PokemonImageName from './pokemonImageName.js'
const OffCanvasContainer = {
    components: {
        PokemonImageName,
    },

    data: function () {
        return {

        }
    },

    props: {
        activePokemon: { type: Object },
        title: {String, required: false},
        backArrowId: {String, required: false},
        id: {String, required: true},
    },

    methods: {

    },

    computed: {},

    template: `
      <div class="offcanvas offcanvas-end " tabindex="-1" :id="id">
        <div class="offcanvas-header bg-primary text-center text-white">
          <i v-if="backArrowId" type="button" class="bi bi-arrow-left text-white fs-5 me-3" data-bs-toggle="offcanvas"
             :data-bs-target="backArrowId"></i>
          <h5 class="offcanvas-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-toggle="offcanvas"
                  aria-label="back"></button>
        </div>
        <slot></slot>
      </div>

    `,


}

export default OffCanvasContainer;