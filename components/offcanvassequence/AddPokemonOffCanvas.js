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
            titleArray: [
                "Add Pokemon",
                ""
            ],
            pokemonToAdd: null,
            pokemonList: []
        }
    },

    props: {
        cardStyle: {Number, required: true},
        pokemonListFromApi: {type: Array, required: true},
        button: {type: String, required: true},
    },

    methods: {
        handleClick: function (object) {
            this.pokemonToAdd = object;
            this.$refs.AddPokemonOffCanvas.pageNumber++

        }
    },

    watch: {
        pokemonListFromApi: {
            handler: function () {
                this.pokemonList = this.pokemonListFromApi;
            }, deep: true,
        },


        pokemonToAdd: function () {
            this.titleArray = [
                "Add Pokemon",
                this.pokemonToAdd.name
            ]
        },deep: true,
    },




    template: `
        
        <div class="">
          <div >
            
            <div v-if="button==='plus'"  class="position-fixed bottom-0 end-0 m-4" style="z-index: 1030;">
              <button v-on:click="$refs.AddPokemonOffCanvas.openOffCanvas(); $refs.AddPokemonOffCanvas.pageNumber = 1" type="button" class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-lg" style="width: 56px; height: 56px;">
                <i class="bi bi-plus-lg fs-4"></i>
              </button>
              
            </div>
            <div v-else>
              
                <i v-on:click="$refs.AddPokemonOffCanvas.openOffCanvas(); $refs.AddPokemonOffCanvas.pageNumber = 1" class="bi bi-pencil-fill fs-4"></i>
            
            </div>
          </div>
          
          <teleport to="#app">
            <OffCanvasContainer :title-array="titleArray" ref="AddPokemonOffCanvas">
              <template v-slot:pageOne>
                <SearchAndDisplayOffCanvas @clicked-object-existing="$emit('clicked-object-existing', $event)" :list-to-search="pokemonList" @clicked-object="handleClick" :card-style="cardStyle" :array-length="5" :button-style="1">
                </SearchAndDisplayOffCanvas> 
              </template>
              <template v-slot:pageTwo >
                <add-edit-off-canvas :active-item="pokemonToAdd" @add-pokemon="$emit('addPokemon', $event); $refs.AddPokemonOffCanvas.hideOffCanvas();" :isNew=true > </add-edit-off-canvas>
              </template>
            </OffCanvasContainer>
          </teleport>
        </div>
      
        
    `,


}

export default AddPokemonOffCanvas;