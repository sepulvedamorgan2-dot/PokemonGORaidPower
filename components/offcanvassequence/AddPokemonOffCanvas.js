// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import SearchAndDisplayOffCanvas from "../offcanvasviews/SearchAndDisplayOffCanvas.js";
import AddEditOffCanvas from "../offcanvasviews/AddEditOffCanvas.js";
const AddPokemonOffCanvas = {
    name: 'AddPokemonOffCanvas',

    components: {
        OffCanvasContainer,
        SearchAndDisplayOffCanvas,
        AddEditOffCanvas,
    },

    data: function () {
        return {

            pageNumber: 1,
            titleArray: [
                "Add Pokemon",
                ""
            ],

            pokemonToAdd: null,
        }
    },

    props: {
        cardStyle: {Number, required: true},
        pokemonListFromApi: {type: Array, required: true},
    },

    methods: {
        handleClick: function (object) {
            this.pokemonToAdd = object;
            this.pageNumber++
        }
    },

    watch: {
        pokemonToAdd: function () {
            this.titleArray = [
                "Add Pokemon",
                this.pokemonToAdd.name
            ]
        }
    },

    mounted() {
        // this.getTitle();
    },


    template: `
        
        <div class="">
          <div >
            
            <div class="position-fixed bottom-0 end-0 m-4" style="z-index: 1030;">
              <button v-on:click="$refs.AddPokemonOffCanvas.openOffCanvas(); pageNumber = 1" type="button" class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-lg" style="width: 56px; height: 56px;">
                <i class="bi bi-plus-lg fs-4"></i>
              </button>
            </div>
          </div>
          
          <teleport to="#app">
            <OffCanvasContainer  @clicked="pageNumber--" :page-number="pageNumber" :title-array="titleArray" ref="AddPokemonOffCanvas">
              <div v-show="pageNumber === 1" >
                <SearchAndDisplayOffCanvas  :list-to-search="pokemonListFromApi" @clicked-object="handleClick" :card-style="cardStyle" :array-length="5" :button-style="1">
                </SearchAndDisplayOffCanvas>
              </div>
              <div v-if="pageNumber === 2" >
                <add-edit-off-canvas  :active-item="pokemonToAdd" @add-pokemon="$emit('addPokemon', $event); $refs.AddPokemonOffCanvas.hideOffCanvas();" :isNew=true > </add-edit-off-canvas>
              </div>
            </OffCanvasContainer>
          </teleport>
        </div>
      
        
    `,


}

export default AddPokemonOffCanvas;