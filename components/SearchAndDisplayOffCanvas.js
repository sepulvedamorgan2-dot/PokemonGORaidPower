
import OffCanvasContainer from "./OffCanvasContainer.js";
import SearchBarContainer from "./SearchBarContainer.js";
import HorizontalCardContainer from "./HorizontalCardContainer.js";
const SearchAndDisplayOffCanvas =  {
    components: {
        OffCanvasContainer,
        SearchBarContainer,
        HorizontalCardContainer,
    },

    data: function () {
        return {
            searchResults: [],

        }
    },

    props: {
        listToSearch: Array,
        arrayLength: {type: Number, default: 5},
        buttonStyle: {type: Number, required: true},
    },

    methods: {
        emitObject(pokemonToEmit, endTag) {
            console.log(this.searchResults + "search results" );
            console.log("please")
            console.log(pokemonToEmit);
            // this.$emit('clickedObject', pokemonToEmit);
            if (endTag) {
                this.$emit(`clickedObject${endTag}`, pokemonToEmit)
            }else {
                this.$emit(`clickedObject`, pokemonToEmit)
            }


        }, updateSearchResults(query) {
            console.log(query);
            let resultObjects = [];
            for (let pokemonQueried of this.listToSearch) {
                if (resultObjects.length >= this.arrayLength) {
                    break;
                }
                if (pokemonQueried.includes(query.toLowerCase()) && pokemonQueried.includes("-mega") === false) {
                    let pokemonObject = {};
                    pokemonObject.name = pokemonQueried;
                    pokemonObject.pokemonId = this.listToSearch.indexOf(pokemonQueried) + 1;
                    resultObjects.push(pokemonObject);
                }
            }

            this.searchResults = resultObjects;
            console.log(this.searchResults);

        }
        ,
    },

    computed: {},

    template: `
      <div >
        
        <button class="btn btn-primary w-100 " type="button" v-on:click="$refs.searchAndDisplayOffCanvas.openOffCanvas()">
          <i class=" d-md-block">Add Pokemon</i>
        </button>
        <teleport to="#app">
        <off-canvas-container ref="searchAndDisplayOffCanvas" title="Add Pokemon" >


          <div class="">
            <div class="p-2 mt-2 border-bottom">
              <search-bar-container @search-query="updateSearchResults" title="Search Pokemon"></search-bar-container>

              <horizontal-card-container :array-to-display="searchResults" :button-style="buttonStyle" @clicked-object="object => emitObject(object, 'Add')" @previous-off-canvas="$refs.searchAndDisplayOffCanvas.openOffCanvas()"  >

              </horizontal-card-container>
            </div>

          </div>
        </off-canvas-container>
        </teleport>

      </div>    
    `,


}

export default SearchAndDisplayOffCanvas;