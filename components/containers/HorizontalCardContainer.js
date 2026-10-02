// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasHorizontalCard from "../OffCanvasHorizontalCard.js";
const HorizontalCardContainer = {
    name: "HorizontalCardContainer",

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
        buttonStyle: {Number, Required : true},
    },

    methods: {

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
<!--:key="card.pokemonId" -->
      <off-canvas-horizontal-card :button-style="buttonStyle" v-for="card in arrayToDisplay" @clicked-object="pokemon => $emit('clickedObject', pokemon)"
                                  :pokemon="card">
      </off-canvas-horizontal-card>
       
    `,


}

export default HorizontalCardContainer;