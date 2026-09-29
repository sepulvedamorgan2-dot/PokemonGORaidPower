
import OffCanvasContainer from "./OffCanvasContainer.js";
import SearchBarContainer from "./SearchBarContainer.js";
import horizontalCardContainer from "./HorizontalCardContainer.js";
const AddPokemonOffCanvas =  {
    components: {
        OffCanvasContainer,
        SearchBarContainer,
    },

    data: function () {
        return {

        }
    },

    props: {
        searchResults: Array,
    },

    methods: {
        emitObject(pokemonToEmit) {
            console.log(this.searchResults + "search results" );
            console.log("please")
            console.log(pokemonToEmit);
            // this.$emit('clickedObject', pokemonToEmit);
            this.$emit('clickedObject', pokemonToEmit)

        },
    },

    computed: {},

    template: `
      <div >
        <div class="btn btn-primary w-100 " type="button" v-on:click="$refs.addPokemonOffCanvas.openOffCanvas()">
          <i class=" d-md-block">Add Pokemon</i>
        </div>
        <teleport to="#app">
        <off-canvas-container ref="addPokemonOffCanvas" title="Add Pokemon" @previous-off-canvas="console.log('ee');$refs.addPokemonOffCanvas.openOffCanvas()">


          <div class="">
            <div class="p-2 mt-2 border-bottom">
              <search-bar-container @search-query="emitObject" title="Search Pokemon"></search-bar-container>

              <horizontal-card-container :array-to-display="searchResults" >

              </horizontal-card-container>
            </div>

          </div>
        </off-canvas-container>
        </teleport>

      </div>    
    `,


}

export default AddPokemonOffCanvas;