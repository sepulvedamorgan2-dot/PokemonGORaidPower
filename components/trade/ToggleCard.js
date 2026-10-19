// For subcomponent
// import xxx from './PokemonlistItem.js';
import CardContainer from "../CardContainer.js";
import ToggleButton from "./ToggleButton.js";
const ComponentName = {
    name: 'ComponentName',

    components: {
        CardContainer,
        ToggleButton,

    },

    data: function () {
        return {

        }
    },

    props: {
        selectedOptions: {Type: Array, required: true},
    },

    methods: {
        saveOption(value, property){

        }
    },

    watch: {

    },



    template: `
      <card-container card-title="Trade Options">
        <template v-slot:card-body>
          <div class="row g-2 mt-1" >
            <toggle-button style="min-width: 25%"   v-for="option in selectedOptions" class="col-auto" :saved-value="option"></toggle-button>
<!--            <toggle-button property="trinket" :saved-value="selectedOptions"></toggle-button>-->
          </div>
        </template>
      </card-container>

    `,


}

export default ComponentName;