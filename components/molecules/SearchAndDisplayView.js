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
            searchQuery: "",

            matches: [],
        }
    },

    props: {
        list: {Type: Array, required: true},
        title: {Type: String, default: 'Search'},
        filterObject: {
            Type: Object, default: {
                filterFast: '',
                filterCharged: '',
                filterCP: 0,
                filterShadow: '',
                filterMega: '',
            },
        },
        noFilter: {Type: Boolean, default: false},
        pageNumber: {Type: Number},
        warning: { type: Boolean, default: false},
    },

    methods: {
        updateSearchQuery(newQuery) {
            this.searchQuery = newQuery;
            this.pokemonSearch()
        },  pokemonSearch() {
            // I think this component is modular except for this part

            this.matches = [];


            for (let eachItem of this.list) {
                // filter name
                if (this.noFilter) {
                    this.matches.push(eachItem);
                    continue;
                }

                if (
                    eachItem.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
                    (this.filterObject.filterType === '' || eachItem.type.name === this.filterObject.filterType) &&
                    (this.filterObject.filterShadow === '' || Boolean(eachItem.isShadow) === (this.filterObject.filterShadow === true || this.filterObject.filterShadow === 'true')) &&
                    (this.filterObject.filterMega === '' || Boolean(eachItem.canMegaEvolve) === (this.filterObject.filterMega === true || this.filterObject.filterMega === 'true')) &&
                    (this.filterObject.filterCP <= eachItem.cp)
                ) {

                    this.matches.push(eachItem);


                }

            }

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

                this.pokemonSearch()
            }, deep: true,
        },
        list: {
            handler: function () {
                this.pokemonSearch()
            }, deep: true,
        },

    },


    template: `
      <div>
        <search-bar-container :filter=true @search-query="updateSearchQuery" class="p-2"
                              @filter-clicked="$emit('filterClicked')" place-holder="Ex: Bidoof"
                              :title="title"></search-bar-container>
        <horizontal-card-container :warning="warning"  @clicked-object="object => $emit('clickedObject', object)"
                                   :array-to-display="matches" :card-style=2></horizontal-card-container>
      </div>


    `,


}

export default SearchAndDisplayView;