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
            this.$emit('clicked-object', pokemonToEmit);
        },
    }
    , watch: {
        arrayToDisplay: {
            handler: function () {
                console.log("please" + this.arrayToDisplay);
                this.arrayToDisplay2 = this.arrayToDisplay;
            },
            deep: true
        }
    },

    computed: {},

    template: `
        <div  v-for="pokemon in arrayToDisplay" :key="pokemon.pokemonId">
          <off-canvas-horizontal-card @clickedPokemon="$emit('clickedPokemon', pokemon)" :pokemon-to-render="pokemon">
          </off-canvas-horizontal-card>
        </div>
    `,


}

export default HorizontalCardContainer;