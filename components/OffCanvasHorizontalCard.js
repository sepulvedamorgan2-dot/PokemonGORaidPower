// For subcomponent
// import xxx from './PokemonlistItem.js';
import AddEditOffCanvas from "./AddEditOffCanvas.js";
const OffCanvasHorizontalCard = {
    components: {
        AddEditOffCanvas: AddEditOffCanvas,
    },

    data: function () {
        return {

        }
    },

    props: {
        pokemon: {Object, required: true},

    },

    methods: {

        getSpriteLink(pokemonID) {
            console.log("ptr" + this.pokemon)
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
          <img class="img-fluid horz-card-img " :src="getSpriteLink(pokemon.pokemonId)"
               alt="pokemonImg">
        </div>
        <div class="col-6">
          <div class="ms-0 ms-sm-0">
            <p class="fs-5 mb-0 text-capitalize">{{ pokemon.name }}</p>

          </div>
        </div>
        <div class="col-3">
          <button v-on:click="$emit('clickedObject', pokemon)" class="btn btn-sm btn-primary w-100 searchedPokemonBtn">Select</button>
<!--          <add-edit-off-canvas :active-item="pokemonToRender" :button-style="buttonStyle" is-new=true @add-pokemon="emitClickedObject" @previous-off-canvas="$emit('previousOffCanvas')"></add-edit-off-canvas>-->
        </div>

      </div>

    `,


}

export default OffCanvasHorizontalCard;