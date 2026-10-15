// For subcomponent
// import xxx from './PokemonlistItem.js';
let counter = 1
const OffCanvasContainer = {
    components: {

    },

    data: function () {
        return {

            id: "off-canvas-" + counter++,
            pageNumber: 1,

        }
    },

    props: {

        title: {String, required: false},
        titleArray: {Type: Array, required: false},

    },

    methods: {
        hideOffCanvas() {

            this.bsOffCanvas.hide();

        },
        openOffCanvas() {
            this.bsOffCanvas.show();
        },
        getTitle(){
            let test = []
            for(let i=0; i < this.pageNumber; i++)  {
                if (i > 0){
                    test.push({title: `${this.titleArray[i]}`, number: i + 1})
                } else{

                    test.push({title: this.titleArray[i], number: i + 1})
                }
            }
            return test;
        }, titleClicked(titleNumber){
            this.pageNumber = titleNumber;
        },


    }, mounted() {
        this.bsOffCanvas = new bootstrap.Offcanvas(this.$refs.offCanvas);
    },

    computed: {},

    template: `
      <div ref="offCanvas" class="offcanvas offcanvas-end " :aria-labelledby="this.id" tabindex="-1"
           style="overflow-y: scroll; height: 100%">
        <div class="offcanvas-header bg-primary text-center text-white">
          <i v-if="pageNumber > 1" type="button" class="bi bi-arrow-left text-white fs-5 me-3"
             v-on:click="pageNumber--"></i>
          <span v-if="pageNumber > 1" v-for="title in getTitle()">
          <a v-on:click="titleClicked(title.number)" :class="
          {'offcanvas-title text-capitalize me-2 text-decoration-none text-light force-hover': true,
          'text-decoration-underline pe-auto text-light ': title.number < pageNumber }">{{ title.title }} </a>
          <span class="text-decoration-none" v-if="title.number !== pageNumber"> > &nbsp;</span>
          </span>
          <span v-else v-for="title in getTitle()" class="offcanvas-title text-capitalize me-2">{{ title.title }}</span>
          <button type="button" class="btn-close" v-on:click="hideOffCanvas"
                  aria-label="back"></button>
        </div>
        <slot v-if="pageNumber === 1" name="pageOne">

        </slot>
        <div v-show="pageNumber === 2">
        <slot name="pageTwo">

        </slot>
        </div>
        <div v-show="pageNumber === 3">
          <slot name="pageThree">

          </slot>
        </div>
        <div v-show="pageNumber === 4">
          <slot name="pageFour">

          </slot>
        </div>
        <slot v-if="pageNumber === 5" name="pageFive">

        </slot>
      </div>

    `,


}

export default OffCanvasContainer;