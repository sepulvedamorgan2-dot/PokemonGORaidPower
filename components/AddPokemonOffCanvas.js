// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasContainer from "./OffCanvasContainer.js";
import SearchAndDisplayOffCanvas from "./SearchAndDisplayOffCanvas.js";
import AddEditOffCanvas from "./AddEditOffCanvas.js";
const AddPokemonOffCanvas = {
    name: 'AddPokemonOffCanvas',

    components: {
        OffCanvasContainer,
        SearchAndDisplayOffCanvas,
        AddEditOffCanvas,
    },

    data: function () {
        return {
            title: 'Select Pokemon To Add',
            details: false,
            search: true,
            pokemonToAdd: null,
        }
    },

    props: {

        pokemonListFromApi: {type: Array, required: true},
    },

    methods: {
        getTitle(){
            console.log('getTitle');
            this.details = !this.details;
            this.search = !this.search;
            if(this.details){
                this.title = this.pokemonToAdd.name + " > Details";
            } else{
                this.title = this.pokemonToAdd.name;
            }
        }, reset(){
            this.details = false;
            this.search = true;
            this.title = 'Select Pokemon To Add';

        }
    },

    computed: {},
    watch: {
        pokemonToAdd: {
            handler: function () {
                this.getTitle();
            }
        }
    },
    mounted() {
        // this.getTitle();
    },


    template: `
        
        <div class="">
          <div >
            
            <div class="position-fixed bottom-0 end-0 m-4" style="z-index: 1030;">
              <button v-on:click="$refs.AddPokemonOffCanvas.openOffCanvas(); reset()" type="button" class="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow-lg" style="width: 56px; height: 56px;">
                <i class="bi bi-plus-lg fs-4"></i>
              </button>
            </div>
          </div>
          
          <teleport to="#app">
            <OffCanvasContainer :have-arrow="details" @clicked="reset(d)" :title="title" ref="AddPokemonOffCanvas">
              <div v-show="search" >
                <SearchAndDisplayOffCanvas  :list-to-search="pokemonListFromApi" @clicked-object="object=> (pokemonToAdd = object)" :array-length="5" :button-style="1">
                </SearchAndDisplayOffCanvas>
              </div>
              <div v-if="details" >
                <add-edit-off-canvas @add-pokemon="$refs.AddPokemonOffCanvas.hideOffCanvas();pokemon => $emit('add-pokemon', pokemon)" isNew="true" :active-item="pokemonToAdd" @clicked="reset();"> </add-edit-off-canvas>
              </div>
            </OffCanvasContainer>
          </teleport>
        </div>
      
        
    `,


}

export default AddPokemonOffCanvas;