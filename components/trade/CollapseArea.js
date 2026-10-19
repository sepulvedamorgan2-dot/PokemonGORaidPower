// For subcomponent
// import xxx from './PokemonlistItem.js';
let counter = 1
const CollapseArea = {
    name: 'CollapseArea',

    components: {

    },

    data: function () {
        return {
            id: 'collapse' + counter++,
            iconClass: 'fs-4 bi bi-plus'
        }
    },

    props: {
        teleportId: {Type: String, Required: true}
    },

    methods: {
        swapIcon: function () {
            if(this.iconClass === 'fs-4 bi bi-plus'){
                this.iconClass = 'fs-4 bi bi-dash'
            } else if(this.iconClass === 'fs-4 bi bi-dash'){
                this.iconClass = 'fs-4 bi bi-plus'
            }

        }
    },

    watch: {

    },



    template: `
      <div>
        <div>
          <i data-bs-toggle="collapse" v-on:click="swapIcon" :data-bs-target="'#' + id" :class="iconClass"></i>
        </div>
        <teleport defer :to="'#' + teleportId">
          <div :id="id" data-bs-toggle="collapse" class="collapse">
            <slot>
              
            </slot>
          </div>
        </teleport>
      </div>


    `,


}

export default CollapseArea;