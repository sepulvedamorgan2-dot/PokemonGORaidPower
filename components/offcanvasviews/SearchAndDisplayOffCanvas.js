
import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import SearchBarContainer from "../molecules/SearchBarContainer.js";
import HorizontalCardContainer from "../containers/HorizontalCardContainer.js";
const SearchAndDisplayOffCanvas =  {
    name: 'SearchAndDisplayOffCanvas',
    components: {
        OffCanvasContainer,
        SearchBarContainer,
        HorizontalCardContainer,
    },

    data: function () {
        return {
            searchResults: [],
            query: ''
        }
    },

    props: {
        listToSearch: Array,
        filter: {Boolean, default: true},
        arrayLength: {type: Number, default: 5},
        cardStyle: {type: Number, required: true},
        warning: { type: Boolean, default: false }
    },

    methods: {
         updateSearchResults(query) {
            this.query = query;
            let resultObjects = [];
            for (let pokemonQueried of this.listToSearch) {
                if(query.length < 5){
                if (resultObjects.length >= 12) {

                    break;

                }}

                try{
                if (pokemonQueried.includes(query.toLowerCase())) {
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


        }
        ,
    },
    watch: {
        listToSearch: {
            handler: function () {
                this.updateSearchResults(this.query);
            }
        }, deep: true,
    },
    mounted() {
        this.updateSearchResults(this.query);
    },
    computed: {},

    template: `

      <div class=" mt-2 ">
        <search-bar-container  class="px-2" @search-query="updateSearchResults" @filter-clicked="console.log('filterclicked')" :list-to-search="listToSearch"  title="Search Pokemon"></search-bar-container>

        <horizontal-card-container :warning="warning" :search-query="query" :array-to-display="searchResults"  :card-style="cardStyle"
                                   @clicked-object="object => $emit('clickedObject', object)"
                                   @clicked-object-existing="object => $emit('clickedObjectExisting', object)"
                                  >

        </horizontal-card-container>
      </div>

          
    `,


}

export default SearchAndDisplayOffCanvas;