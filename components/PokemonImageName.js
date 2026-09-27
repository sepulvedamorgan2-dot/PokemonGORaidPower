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
        getSpriteLink(pokemonID) {

            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        }
        ,
    },

    computed: {},

    template: `
      <div>
        <div class="row justify-content-center pt-3 pb-2">
          <div class="col-7">
            <img :src="getSpriteLink(activeItem.pokemonId)"
                 class="bg-white img-fluid details-img w-100 border border-dark-subtle rounded" :alt="activeItem.name">
          </div>
        </div>

        <div class="">

          <h3 class="text-center text-capitalize">{{ activeItem.name }}</h3>

        </div>
      </div>
    `,


}

export default PokemonImageName;