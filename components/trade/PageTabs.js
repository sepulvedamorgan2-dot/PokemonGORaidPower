// For subcomponent
// import xxx from './PokemonlistItem.js';
let counter = 1
const PageTabs = {
    name: 'PageTabs',
    components: {

    },

    data: function () {
        return {

            id: "pageTab" + counter++,
            tabNumber: 1,

        }
    },

    props: {
        tabArray: {Type: Array, required: false, default: null},



    },

    methods: {


    }, mounted() {

    },

    computed: {},

    template: `
      <div ref="pageTabs">
        <div v-if="tabNumber === 1 " class="row g-2">
          <p  v-for="tab in tabArray" v-on:click="tabNumber = tabArray.indexOf(tab) + 1" 
               :class="{
              'col text-center btn mx-1': true,
              'border-secondary bg-white rounded': tabArray.indexOf(tab) + 1 === tabNumber
          
                }">{{ tab }}
          </p>

        </div>
        
        <slot v-if="tabNumber=== 1" name="pageOne">

        </slot>
        <div v-if="tabNumber === 2">
        <slot name="pageTwo">

        </slot>
        </div>
        <div v-show="tabNumber === 3">
          <slot name="pageThree">

          </slot>
        </div>
        <div v-show="tabNumber === 4">
          <slot name="pageFour">

          </slot>
        </div>
        <div v-show="tabNumber === 5">
          <slot name="pageFive">

          </slot>
        </div>

      </div>

    `,


}

export default PageTabs;