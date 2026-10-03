// For subcomponent
// import xxx from './PokemonlistItem.js';
import FilterOffCanvas from '../offcanvassequence/FilterOffCanvas.js'

const SearchBarContainer = {
    name: 'SearchBarContainer',
    components: {
        FilterOffCanvas
    },

    data: function () {
        return {
            searchQuery: '',
            matches: []
        }
    },

    props: {
        title: {String, required: true},
        haveExtraButton: {Boolean, default: false},
        placeHolder: {String, required: false},
        listToFilter: {Array, required: false},
        listToSearch: {Array, required: false},
    },

    methods: {},

    watch: {
        searchQuery: {
            handler: function () {
                if (!this.listToFilter) {

                    this.$emit('searchQuery', this.searchQuery);

                }
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
          <div v-if="listToFilter" class="col-auto">
            <filter-off-canvas :list-to-filter="listToFilter" :searchQuery="searchQuery"
                               @matched-pokemon="matches => $emit('searchResults', matches)"></filter-off-canvas>
          </div>
          <!--          <div v-if="haveExtraButton" class="col-12 col-sm-4 col-md-3 ">-->
          <!--            <slot>-->

          <!--            </slot>-->
          <!--          </div>-->


        </div>


      </div>

    `,


}

export default SearchBarContainer;