// For subcomponent
// import xxx from './PokemonlistItem.js';
import CardContainer from "../CardContainer.js";
import ToggleButton from "./ToggleButton.js";
import CollapseArea from "./CollapseArea.js";
const ComponentName = {
    name: 'ComponentName',

    components: {
        CardContainer,
        ToggleButton,
        CollapseArea,
    },

    data: function () {
        return {

        }
    },

    props: {
        selectedOptions: {Type: Array, required: true},
    },

    methods: {
        // updateOption(index) {
        //     console.log('sad')
        //     index[0].text = index[0].optionsArray[index[1]].text;
        //     index[0].tagClass = index[0].optionsArray[index[1]].tagClass;
        // }
    },

    watch: {

    },



    template: `
      <card-container card-title="Trade Options">
        <template v-slot:card-actions>
          <collapse-area teleport-id="toggleCard">
            <div class="row g-2">
              <toggle-button style="min-width: 25%" v-for="option in selectedOptions" class="col-auto"
                             :saved-value="option"></toggle-button>
              <!--            <toggle-button property="trinket" :saved-value="selectedOptions"></toggle-button>-->
            </div>
          </collapse-area>
        </template>
        <template v-slot:card-body>
          <div id="toggleCard">
            
          </div>
          
        </template>
      </card-container>

    `,


}

export default ComponentName;