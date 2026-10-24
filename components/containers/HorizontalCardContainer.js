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
        searchQuery: {type: String, Default : ""},
        warning: {type: Boolean, Default : false},
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
      <div :class="{'d-flex flex-wrap': cardStyle === 4 || cardStyle === 5}">
      <div style="height: 100px" class="w-100 text-center align-content-center"
           v-if='warning && cardStyle ===5 && searchQuery === "" || !warning && cardStyle === 5 && arrayToDisplay.length < 1'>
        <p><a href="./pokelist.html">Add Pokemon to your  Poke-List</a></p>
        <p v-if='warning && cardStyle ===5 && searchQuery === ""' >Non-Personal list below</p>

      </div>
      
      <off-canvas-horizontal-card :card-style="cardStyle" v-for="card in arrayToDisplay"
                                  @clicked-object-existing="pokemon => $emit('clickedObjectExisting', pokemon)"
                                  @clicked-object="pokemon => $emit('clickedObject', pokemon)"
                                  @pokemon-removed="$emit('pokemonRemoved')"
                                  :pokemon="card"
        >
      </off-canvas-horizontal-card>
      </div>


    `,


}

export default HorizontalCardContainer;