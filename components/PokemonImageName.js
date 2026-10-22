// For subcomponent
// import xxx from './PokemonlistItem.js';

const PokemonImageName = {
    components: {

    },

    data: function () {
        return {

        }
    },

    props: {
        activeItem: { type: Object }
    },

    methods: {

    },

    computed: {},

    template: `
      <div>
        <div class="d-flex justify-content-center pt-3 pb-2">
          <div class="" style="width: 50%">
            <img :src="activeItem.image"
                 class="bg-white img-fluid details-img w-100 border border-dark-subtle rounded" :alt="activeItem.name">
          </div>
        </div>

        <div v-if="activeItem.name" class="">

          <h3 class="text-center text-capitalize">{{ activeItem.name }}</h3>

        </div>
      </div>
    `,


}

export default PokemonImageName;