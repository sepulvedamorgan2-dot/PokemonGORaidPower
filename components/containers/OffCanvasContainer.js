// For subcomponent
// import xxx from './PokemonlistItem.js';
let counter = 1
const OffCanvasContainer = {
    components: {

    },

    data: function () {
        return {
            bsOffCanvas: null,
            id: "off-canvas-" + counter++,
            lastOffCanvas: null,

        }
    },

    props: {

        title: {String, required: false},
        titleArray: {Type: Array, required: false},
        pageNumber: {Type: Number, required: false},
    },

    methods: {
        hideOffCanvas() {
            console.log('hideOffCanvas')
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
            console.log(titleNumber)
            console.log(this.pageNumber);
            while(titleNumber < this.pageNumber) {
                titleNumber++;
                this.$emit('clicked');
            }
        }, returnSpacer(){
            if(this.pageNumber > 1){return ' - '}
        }

    }, mounted() {
        this.bsOffCanvas = new bootstrap.Offcanvas(this.$refs.offCanvas);
    },

    computed: {},

    template: `
      <div ref="offCanvas" class="offcanvas offcanvas-end " :aria-labelledby="this.id" tabindex="-1"  style="overflow-y: scroll; height: 100%">
        <div class="offcanvas-header bg-primary text-center text-white">
          <i v-if="pageNumber > 1" type="button" class="bi bi-arrow-left text-white fs-5 me-3" 
             v-on:click="$emit('clicked')"></i>
          <a v-if="pageNumber > 1" v-for="title in getTitle()" v-on:click="titleClicked(title.number)"  :class="
          {'offcanvas-title text-capitalize me-2 text-decoration-none text-light ': true,
          'text-decoration-underline pe-auto text-light ': title.number < pageNumber }">{{title.title}}</a>
          <span v-else v-for="title in getTitle()"  class="offcanvas-title text-capitalize me-2">{{title.title}}</span>
          <button type="button" class="btn-close" v-on:click="hideOffCanvas"
                  aria-label="back"></button>
        </div>
        <slot></slot>
      </div>

    `,


}

export default OffCanvasContainer;