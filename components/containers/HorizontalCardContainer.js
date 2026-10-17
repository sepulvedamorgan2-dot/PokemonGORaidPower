// For subcomponent
// import xxx from './PokemonlistItem.js';
import HorizontalCard from "../HorizontalCard.js";
const HorizontalCardContainer = {
    name: "HorizontalCardContainer",

    components: {
        OffCanvasHorizontalCard: HorizontalCard,
    },

    data: function () {
        return {
            arrayToDisplay2: [],
        }
    },

    props: {
        arrayToDisplay: {Array, required: true},
        cardStyle: {Number, Required : true},
    },

    methods: {

    }
    , watch: {
        arrayToDisplay: {
            handler: function () {

                this.arrayToDisplay2 = this.arrayToDisplay;
            },
            deep: true
        },
    },

    computed: {},

    template: `
<!--:key="card.pokemonId" -->
      <off-canvas-horizontal-card :card-style="cardStyle" v-for="card in arrayToDisplay" @clicked-object-existing="pokemon => $emit('clickedObjectExisting', pokemon)" @clicked-object="pokemon => $emit('clickedObject', pokemon)" @pokemon-removed="$emit('pokemonRemoved')"
                                  :pokemon="card">
      </off-canvas-horizontal-card>
       
    `,


}

export default HorizontalCardContainer;