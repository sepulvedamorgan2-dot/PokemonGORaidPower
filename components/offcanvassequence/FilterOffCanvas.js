import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import FilterView from "../offcanvasviews/FilterView.js";
const FilterOffCanvas = {
    name: "FilterOffCanvas",
    components: {
        OffCanvasContainer,
        FilterView,
    },

    data: function () {
        return {
            filterObject: {
                filterType: '',
                filterCP: 0,
                filterShadow: '',
                filterMega: '',
            }
        }
    },

    props: {
        listToFilter: {Array, Required: true},
        searchQuery: {String, Required: false}
    },

    methods: {
        updateFilter(newFilter){
            this.filterObject = newFilter
            this.pokemonSearch()
        },  pokemonSearch() {


            this.matches = [];

            for (let eachItem of this.listToFilter) {
                // filter name

                if (
                    eachItem.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
                    (this.filterObject.filterType === '' || eachItem.type === this.filterObject.filterType) &&
                    (this.filterObject.filterShadow === '' || Boolean(eachItem.isShadow) === (this.filterObject.filterShadow === true || this.filterObject.filterShadow === 'true')) &&
                    (this.filterObject.filterMega === '' || Boolean(eachItem.canMegaEvolve) === (this.filterObject.filterMega === true || this.filterObject.filterMega === 'true')) &&
                    (this.filterObject.filterCP <= eachItem.cp)


                ) {

                    this.matches.push(eachItem);


                }

            }

            this.$emit('searchResults', this.matches)
        },
    },

    mounted() {
        this.pokemonSearch();
    },

    watch: {
        searchQuery: {
            handler: function () {
                this.pokemonSearch();
            }
        }
    },


    computed: {

    },

    template: `
      <div>
        <div class="btn btn-outline-secondary  w-100" type="button" id="filterButton "
             v-on:click="$refs.FilterOffCanvas.openOffCanvas()">
          <i class="bi bi-filter"></i>

        </div>
        <teleport to="#app">
          <off-canvas-container :title-array="['Filter Pokemon']" ref="FilterOffCanvas">
            <template #pageOne>
              <filter-view @filter-object="updateFilter"></filter-view>
            </template>
          </off-canvas-container>
        </teleport>
      </div>
    `,


}

export default FilterOffCanvas;