// For subcomponent
// import xxx from './PokemonlistItem.js';
import OffCanvasContainer from "../containers/OffCanvasContainer.js";
import TagsOffCanvas from "../offcanvasviews/TagsOffCanvas.js";

const PokemonTagsOffCanvas = {
    name: 'PokemonTagsOffCanvas',

    components: {
        OffCanvasContainer,
        TagsOffCanvas,

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
        
       
            <img v-on:click="$refs.PokemonTagsOffCanvas.openOffCanvas(); $refs.PokemonTagsOffCanvas.pageNumber = 1" src="/media/images/pencil.svg" alt="Edit Pokemon"
                 style="margin: .5rem .7rem; width: 14px"  class="corner-tr-img"> 
            

         
          
          <teleport to="#app">
            <OffCanvasContainer   :title-array="title" ref="PokemonTagsOffCanvas">
              <template #pageOne>
                <TagsOffCanvas :pokemon="pokemon"></TagsOffCanvas>
              </template>
            </OffCanvasContainer>
          </teleport>
        
      
        
    `,



}

export default PokemonTagsOffCanvas;