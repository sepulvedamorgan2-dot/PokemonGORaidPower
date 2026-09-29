// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasHorizontalCard from "./OffCanvasHorizontalCard.js";
const HorizontalCardContainer = {
    components: {
        OffCanvasHorizontalCard,
    },

    data: function () {
        return {
            arrayToDisplay2: [],
        }
    },

    props: {
        arrayToDisplay: {Array, required: true},
    },

    methods: {
        emitClickedObject(pokemonToEmit) {
            console.log("please")
            console.log(pokemonToEmit);
            // this.$emit('clickedObject', pokemonToEmit);
            this.$emit('clickedObject', pokemonToEmit)
        },
    }
    , watch: {
        arrayToDisplay: {
            handler: function () {
                console.log("please" + this.arrayToDisplay);
                this.arrayToDisplay2 = this.arrayToDisplay;
            },
            deep: true
        },
    },

    computed: {},

    template: `

      <off-canvas-horizontal-card v-for="pokemon in arrayToDisplay" @clicked-object="emitClickedObject"
                                  :key="pokemon.pokemonId" :pokemon-to-render="pokemon">
      </off-canvas-horizontal-card>
       
    `,


}

export default HorizontalCardContainer;