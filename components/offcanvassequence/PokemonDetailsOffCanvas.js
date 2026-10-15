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
            title: [
                this.pokemon.name,
                'edit'
            ],

        }
    },

    props: {
        pokemon: {type: Object, required: true}
    },

    methods: {

    },

    computed: {},



    template: `
        
        <div class="col-auto ms-auto  align-items-center d-flex">
          <div >
            <i type="button" 
               v-on:click="$refs.PokemonDetailsOffCanvas.openOffCanvas(); $refs.PokemonDetailsOffCanvas.pageNumber = 1"
               class="bi bi-three-dots me-4 fs-4"></i>

          </div>
          
          <teleport to="#app">
            <OffCanvasContainer   :title-array="title" ref="PokemonDetailsOffCanvas">
              <template #pageOne>
                <details-off-canvas @clicked="$refs.PokemonDetailsOffCanvas.pageNumber++" @delete-item="item => $emit('deleteItem', item)" :active-item="pokemon"></details-off-canvas>
              </template>
              <template #pageTwo>
                <add-edit-off-canvas @clicked="$refs.PokemonDetailsOffCanvas.pageNumber--" :active-item="pokemon"></add-edit-off-canvas>
              </template>
            </OffCanvasContainer>
          </teleport>
        </div>
      
        
    `,



}

export default PokemonDetailsOffCanvas;