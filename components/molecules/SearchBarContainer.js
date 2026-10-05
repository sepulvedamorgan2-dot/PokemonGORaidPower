// For subcomponent
// import xxx from './PokemonlistItem.js';
import FilterOffCanvas from '../offcanvassequence/FilterOffCanvas.js'
import FilterView from "../offcanvasviews/FilterView.js";
const SearchBarContainer = {
    name: 'SearchBarContainer',
    components: {
        FilterOffCanvas,
        FilterView,
    },

    data: function () {
        return {
            searchQuery: '',
            matches: []
        }
    },

    props: {
        placeHolder: {String, required: false},
        title: {String, required: false},
        filter: {Boolean, default: false},
        filterOffCanvas: {Boolean, default: false},
        filterOffCanvasList: {Array, default: null},
    },

    methods: {},

    watch: {
        searchQuery: {
            handler: function () {


                    this.$emit('searchQuery', this.searchQuery);


            }
        }
    },

    computed: {},

    template: `
      <div class="container-fluid container-sm px-2">
        <p class="form-label w-100  mb-1 ms-1 fs-6">
          {{ title }}
        </p>
        <div class="row g-2 mb-2">


          <div class="col">
            
            <label aria-label="Search Bar" class="w-100">
              <input type="text" class="form-control" id="searchBar" :placeholder="placeHolder"
                     v-model="searchQuery">
            </label>
          </div>
          <div class="col-auto" v-if="filter">
            <div class="btn btn-outline-secondary  w-100" type="button" id="filterButton "
                 v-on:click="$emit('filterClicked')">
              <i class="bi bi-filter"></i>
            </div>
          </div>
          <div class="col-auto" v-if="filterOffCanvas">
            <filter-off-canvas @search-results="matches = $event" :list-to-filter="filterOffCanvasList" :search-query="searchQuery"></filter-off-canvas>
          </div>
          
        </div>
      </div>

    `,

}


export default SearchBarContainer;