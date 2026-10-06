// For subcomponent
// import xxx from './PokemonlistItem.js';
import SearchBarContainer from "./SearchBarContainer.js";
import HorizontalCardContainer from "../containers/HorizontalCardContainer.js";
import FilterView from "../offcanvasviews/FilterView.js";
const SearchAndDisplayView = {
    name: 'SearchAndDisplayView',
    components: {
        SearchBarContainer,
        HorizontalCardContainer,
        FilterView,
    },

    data: function () {
        return {
            searchView: true,
            filterView: false,
            searchQuery: "",
            filterObject: {
                filterFast: '',
                filterCharged: '',
                filterCP: 0,
                filterShadow: '',
                filterMega: '',
            },
            matches: [],
        }
    },

    props: {
        list: {Type: Array, required: true},
        title: {Type: String, default: 'Search'},
        filter: {Type: Boolean, default: false},
        pageNumber: {Type: Number},
    },

    methods: {
        updateSearchQuery(newQuery){
            this.searchQuery = newQuery;
            this.pokemonSearch()
        }, swapView(){
            this.filterView = !this.filterView;
            this.searchView = !this.searchView;
            if(this.filterView){
                this.$emit('viewNumber', 3);
            } else {
                this.$emit('viewNumber', 4);
            }
        }, updateFilter(filterObject){
            this.filterObject = filterObject;
        }, pokemonSearch() {
            // I think this component is modular except for this part
            console.log('pokemon Search')
            this.matches = [];

            for (let eachItem of this.list) {
                // filter name
                console.log(eachItem);
                if (
                    eachItem.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
                    (this.filterObject.filterFast === '' || eachItem.fastMoveType === this.filterObject.filterFast) &&
                    (this.filterObject.filterCharged === '' || eachItem.chargedMoveType1 === this.filterObject.filterCharged || eachItem.chargedMoveType2 === this.filterObject.filterCharged) &&
                    (this.filterObject.filterShadow === '' || Boolean(eachItem.isShadow) === (this.filterObject.filterShadow === true || this.filterObject.filterShadow === 'true')) &&
                    (this.filterObject.filterMega === '' || Boolean(eachItem.canMegaEvolve) === (this.filterObject.filterMega === true || this.filterObject.filterMega === 'true')) &&
                    (this.filterObject.filterCP <= eachItem.cp)

                ) {

                    this.matches.push(eachItem);


                }

            }
            console.log(this.matches);
            this.$emit('matchedPokemon', this.matches)
        },
    },

    watch: {
        searchQuery: {
            handler: function () {
                this.pokemonSearch()
            }, deep: true,
        },
        filterObject: {
            handler: function () {
                console.log('filterObject')
                this.pokemonSearch()
            }, deep: true,
        },
        list: {
            handler: function () {
                this.pokemonSearch()
            }, deep: true,
        }, pageNumber: {
            handler: function () {
                if (this.pageNumber === 2) {
                    this.searchView = true
                    this.filterView = false
                } else if (this.pageNumber === 3) {
                    this.searchView = false
                    this.filterView = true
                }
            }, deep: true,
        }

    },



    template: `
      <div v-show="searchView">
        <search-bar-container :filter="filter" @search-query="updateSearchQuery" class="p-2" @filter-clicked="swapView" place-holder="Ex: Bidoof" :title="title"></search-bar-container>
        <horizontal-card-container @clicked-object="object => $emit('clickedObject', object)" :array-to-display="matches" :card-style=2 ></horizontal-card-container>
      </div>
      <div v-show="filterView">
        <filter-view @filter-object="updateFilter" @swap-view="swapView" ></filter-view>
      </div>
        
    `,


}

export default SearchAndDisplayView;