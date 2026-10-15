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
                filterFast: '',
                filterCharged: '',
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
        },  pokemonSearch() {


            this.matches = [];

            for (let eachItem of this.listToFilter) {
                // filter name

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

            this.$emit('searchResults', this.matches)
        },
    },

    watch: {
        searchQuery: {
            handler: function () {
                this.pokemonSearch();
            }
        }, filterObject: {
            handler: function () {
                this.pokemonSearch();
            }, deep: true
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