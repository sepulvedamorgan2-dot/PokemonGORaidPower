// For subcomponent
// import xxx from './PokemonlistItem.js';

const OffCanvasContainer = {
    components: {

    },

    data: function () {
        return {
            bsOffCanvas: null,
        }
    },

    props: {

        title: {String, required: false},
        backArrowId: {String, required: false},


    },

    methods: {
        hideOffCanvas() {
            console.log('hideOffCanvas')
            this.bsOffCanvas.hide();
        },
        openOffCanvas() {
            this.bsOffCanvas.show();
        }

    }, mounted() {
        this.bsOffCanvas = new bootstrap.Offcanvas(this.$refs.offCanvas);
    },

    computed: {},

    template: `
      <div ref="offCanvas" class="offcanvas offcanvas-end "  tabindex="-1"  style="overflow-y: scroll; height: 100%">
        <div class="offcanvas-header bg-primary text-center text-white">
          <i v-if="backArrowId" type="button" class="bi bi-arrow-left text-white fs-5 me-3" data-bs-toggle="offcanvas"
             :data-bs-target="backArrowId"></i>
          <h5 class="offcanvas-title">{{ title }}</h5>
          <button type="button" class="btn-close" v-on:click="hideOffCanvas"
                  aria-label="back"></button>
        </div>
        <slot></slot>
      </div>

    `,


}

export default OffCanvasContainer;