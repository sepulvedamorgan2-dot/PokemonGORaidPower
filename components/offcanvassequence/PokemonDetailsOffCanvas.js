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
            pageNumber: 1,
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
               v-on:click="$refs.PokemonDetailsOffCanvas.openOffCanvas(); pageNumber = 1 "
               class="bi bi-three-dots me-4 fs-4"></i>

          </div>
          
          <teleport to="#app">
            <OffCanvasContainer :page-number="pageNumber" @clicked="pageNumber--" :title-array="title" ref="PokemonDetailsOffCanvas">
              <div v-show="pageNumber === 1" >
                <details-off-canvas @clicked="pageNumber++" @delete-item="item => $emit('deleteItem', item)" :active-item="pokemon"></details-off-canvas>
              </div>
              <div v-show="pageNumber === 2" >
                <add-edit-off-canvas @clicked="pageNumber--" :active-item="pokemon"></add-edit-off-canvas>
              </div>
            </OffCanvasContainer>
          </teleport>
        </div>
      
        
    `,


}

export default PokemonDetailsOffCanvas;