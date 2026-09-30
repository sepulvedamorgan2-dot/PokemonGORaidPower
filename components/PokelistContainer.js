import PokemonlistItem from './PokemonlistItem.js';

const PokelistContainer = {
    components: {
        PokemonlistItem
    },

    data: function () {
        return {}

    },

    props: {
        searchedAndFilteredArray: Object,
        fullPokemonList: Array,
    },

    methods: {

    },

    computed: {},

    template: `
      
      <div class="container p-0 p-sm-2">
        <div class="row bg-lighter g-0 ">
          <div class="col-auto col-sm-auto d-none d-sm-block">
            <div class="horz-card-img"></div>
          </div>

          <div class="col-4 col-sm-3 col-lg-2  d-flex align-items-center">
            <p class="fs-6 mb-1 ms-1">Pokemon</p>
          </div>
          <div class="col-auto col-sm-auto d-sm-none d-block">
            <div class="horz-card-img"></div>
          </div>

          <div class=" col ms-auto d-flex d-sm-none align-items-center ">
            <p class="fs-6 mb-1 ms-1">Moves</p>
          </div>
          <div class="col-auto d-none d-sm-block">
            <div class="spacer"></div>
          </div>
          <div class=" col-auto d-flex align-items-center d-none d-sm-blockd-none d-sm-block">
            <p class="fs-6 mb-1 ms-1 power-width ">CP</p>

          </div>
          <div class="col-auto d-none d-sm-block">
            <div class="spacer"></div>
          </div>
          <div class=" col-auto d-flex align-items-center d-none d-sm-block">
            <p class="fs-6 mb-1 ms-1 power-width ">RP</p>

          </div>
          <div class="col-auto d-none d-md-block">
            <div class="spacer"></div>
          </div>
          <div class=" col-auto d-none d-lg-flex align-items-center ">
            <p class="fs-6 mb-1 ms-1 movewidth ">Fast Attack</p>

          </div>
          <div class="col-auto d-none d-md-block">
            <div class="spacer"></div>
          </div>
          <div class=" col-auto d-none d-lg-flex align-items-center ">
            <p class="fs-6 mb-1 ms-1 movewidth ">Charged Attack</p>

          </div>
          <div class="ms-auto col-2 d-flex me-0 text-center text-sm-end ">
            <p class="fs-6 mb-1  ms-sm-auto me-2">Details</p>

          </div>


        </div>


        <!-- Pokemon horitzonal card -->
        <div class="alternateBg">
          <pokemonlist-item v-for="pokemon in searchedAndFilteredArray" :key="pokemon.Id" :pokemon="pokemon"  @clickedPokemon="$emit('clickedPokemon', pokemon)" @delete-item="item => $emit('deleteItem', item)"></pokemonlist-item>
        </div>
      </div>
    `,


}

export default PokelistContainer;