// For subcomponent
// import xxx from './PokemonlistItem.js';

const ComponentName = {
    components: {

    },

    data: function () {
        return {
            searchForPokemon: ''
        }
    },

    props: {
        title: {String, required: true},
        haveFilter: {Boolean, default: false},
        haveExtraButton: {Boolean, default: false},
        placeHolder: {String, required: false},
        filterToggle: {String, required: false},
        filterToggleId: {String, required: false},
    },

    methods: {

    },

    watch: {
        searchForPokemon: {
            handler: function () {
                this.$emit('searchQuery', this.searchForPokemon)
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


            <label aria-label="SearchPokemon" class="w-100">
              <input type="text" class="form-control" id="searchBar" :placeholder="placeHolder"
                     v-model="searchForPokemon">
            </label>
          </div>
          <div v-if="haveFilter" class="col-auto">
            <div class="btn btn-outline-secondary  w-100" type="button" id="filterButton"
                 :data-bs-toggle="filterToggle" :data-bs-target="filterToggleId">
              <i class="bi bi-filter"></i>

            </div>
          </div>
          <div v-if="haveExtraButton" class="col-12 col-sm-4 col-md-3 ">
            <slot>

            </slot>
          </div>


        </div>


      </div>

    `,


}

export default ComponentName;