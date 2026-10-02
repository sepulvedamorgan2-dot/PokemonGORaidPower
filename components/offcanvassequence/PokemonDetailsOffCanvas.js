// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import DetailsOffCanvas from "../offcanvasviews/DetailsOffCanvas.js";
import AddEditOffCanvas from "../offcanvasviews/AddEditOffCanvas.js";
const PokemonDetailsOffCanvas = {
    name: 'PokemonDetailsOffCanvas',

    components: {
        OffCanvasContainer,
        DetailsOffCanvas,
        AddEditOffCanvas,
    },

    data: function () {
        return {
            title: '',
            details: false,
            edit: true,
        }
    },

    props: {
        pokemon: {type: Object, required: true}
    },

    methods: {
        getTitle(){
            this.details = !this.details;
            this.edit = !this.edit;
            if(this.edit){
                this.title = this.pokemon.name + " > Edit";
            } else{
                this.title = this.pokemon.name;
            }
        },
        reset(){
            this.edit = false;
            this.details = true;

        }
    },

    computed: {},
    mounted() {
        this.getTitle();
    },


    template: `
        
        <div class="col-auto ms-auto  align-items-center d-flex">
          <div >
            <i type="button" 
               v-on:click="$refs.PokemonDetailsOffCanvas.openOffCanvas(); reset() "
               class="bi bi-three-dots me-4 fs-4"></i>

          </div>
          
          <teleport to="#app">
            <OffCanvasContainer :title="title" ref="PokemonDetailsOffCanvas">
              <div v-show="details" >
                <details-off-canvas @clicked="getTitle()" @delete-item="item => $emit('deleteItem', item)" :active-item="pokemon"></details-off-canvas>
              </div>
              <div v-show="edit" >
                <add-edit-off-canvas @clicked="getTitle();" :active-item="pokemon"></add-edit-off-canvas>
              </div>
            </OffCanvasContainer>
          </teleport>
        </div>
      
        
    `,


}

export default PokemonDetailsOffCanvas;