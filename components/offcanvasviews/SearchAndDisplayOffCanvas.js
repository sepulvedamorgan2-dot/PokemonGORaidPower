
import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import SearchBarContainer from "../molecules/SearchBarContainer.js";
import HorizontalCardContainer from "../containers/HorizontalCardContainer.js";
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
         updateSearchResults(query) {
            console.log(this.listToSearch);
            let resultObjects = [];
            for (let pokemonQueried of this.listToSearch) {
                if (resultObjects.length >= this.arrayLength) {
                    break;
                }
                try{
                if (pokemonQueried.includes(query.toLowerCase()) && pokemonQueried.includes("-mega") === false) {
                    let pokemonObject = {};
                    pokemonObject.name = pokemonQueried;
                    pokemonObject.pokemonId = this.listToSearch.indexOf(pokemonQueried) + 1;
                    resultObjects.push(pokemonObject);
                } } catch(e) {

                    if (pokemonQueried.name.includes(query.toLowerCase()) && pokemonQueried.name.includes("-mega") === false) {

                        resultObjects.push(pokemonQueried);
                    }}
            }

            this.searchResults = resultObjects;
            console.log(this.searchResults);

        }
        ,
    },
    watch: {
        listToSearch: {
            handler: function () {
                this.updateSearchResults('');
            }
        }
    },
    computed: {},

    template: `

      <div class="p-2 mt-2 border-bottom">
        <search-bar-container @search-query="updateSearchResults"   title="Search Pokemon"></search-bar-container>

        <horizontal-card-container :array-to-display="searchResults"  :button-style="buttonStyle"
                                   @clicked-object="object => $emit('clickedObject', object)"
                                  >

        </horizontal-card-container>
      </div>

          
    `,


}

export default SearchAndDisplayOffCanvas;