// For subcomponent
// import xxx from './PokemonlistItem.js';

const OffCanvasHorizontalCard = {
    components: {

    },

    data: function () {
        return {

        }
    },

    props: {
        pokemonToRender: {Object, required: true},
    },

    methods: {

        getSpriteLink(pokemonID) {
            console.log("ptr" + this.pokemonToRender)
            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        }
        ,
    },

    computed: {},

    template: `
      <div class="row g-0 align-items-center">
        <div class="col-3">
          <img class="img-fluid horz-card-img " :src="getSpriteLink(pokemonToRender.pokemonId)"
               alt="pokemonImg">
        </div>
        <div class="col-6">
          <div class="ms-0 ms-sm-0">
            <p class="fs-5 mb-0 text-capitalize">{{ pokemonToRender.name }}</p>

          </div>
        </div>
        <div class="col-3">
          <div class="p-1">
            <button class="btn btn-sm btn-primary w-100 searchedPokemonBtn"
                    data-bs-toggle="offcanvas" data-bs-target="#addPokemonDetailsOffcanvas"
                    v-on:click="$emit('clickedPokemon', pokemonToRender.pokemonId)">Select
            </button>
          </div>
        </div>

      </div>

    `,


}

export default OffCanvasHorizontalCard;