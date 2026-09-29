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
        pokemonToRender: {Object, required: true},
    },

    methods: {

        getSpriteLink(pokemonID) {
            console.log("ptr" + this.pokemonToRender)
            if (typeof pokemonID === "number") {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
            }

        }
        ,emitClickedObject(pokemonToEmit) {
            console.log("please")
            console.log(pokemonToEmit);
            // this.$emit('clickedObject', pokemonToEmit);
            this.$emit('clickedObject', pokemonToEmit)
        },
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
          <add-edit-off-canvas :active-item="pokemonToRender" is-new=true @add-pokemon="emitClickedObject"></add-edit-off-canvas>
        </div>

      </div>

    `,


}

export default OffCanvasHorizontalCard;