
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
        filter: {Boolean, default: true},
        arrayLength: {type: Number, default: 5},
        cardStyle: {type: Number, required: true},

    },

    methods: {
         updateSearchResults(query) {
            console.log(this.listToSearch);
            let resultObjects = [];
            for (let pokemonQueried of this.listToSearch) {
                if (resultObjects.length >= 6) {
                    alert(resultObjects.length);
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

      <div class=" mt-2 border-bottom">
        <search-bar-container class="px-2" @search-query="updateSearchResults" @filter-clicked="console.log('filterclicked')" :list-to-search="listToSearch"  title="Search Pokemon"></search-bar-container>

        <horizontal-card-container :array-to-display="searchResults"  :card-style="cardStyle"
                                   @clicked-object="object => $emit('clickedObject', object)"
                                  >

        </horizontal-card-container>
      </div>

          
    `,


}

export default SearchAndDisplayOffCanvas;