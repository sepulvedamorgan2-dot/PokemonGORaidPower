// For subcomponent
// import xxx from './PokemonlistItem.js';
let counter = 1
const ModalContainer = {
    components: {

    },

    data: function () {
        return {
            bsModal: null,
            id: "modal-" + counter++,
            lastModal: null,
        }
    },

    props: {

        title: {String, required: false},
        haveArrow: Boolean,

    },

    methods: {
        hideModal() {
            console.log('hideModal')
            this.bsModal.hide();
        },
        openModal(OpenPrevious) {

            try{
                this.lastModal.hide()
            } catch(e) {

            }
            this.bsModal.show();
            this.lastModal = this.bsModal;

        }

    }, mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.modal);
    },

    computed: {},

    template: `
      <div ref="modal" class="modal fade" :aria-labelledby="this.id" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary text-center text-white">
              <h5 class="modal-title">{{ title }}</h5>
            </div>
            <div class="modal-body">
              <slot name="default"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
            
          </div>
        </div>
      </div>
    `,


}

export default ModalContainer;