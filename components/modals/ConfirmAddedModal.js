// For subcomponent
// import xxx from './PokemonlistItem.js';
import ModalContainer from '../containers/ModalContainer.js';
const ConfirmAddedModal = {
    components: {
        ModalContainer,
    },

    data: function () {
        return {

        }
    },

    props: {
        item: {Object, required: true },
    },

    methods: {
        handleSubmit: function (){
            this.$refs.AddModal.openModal()
        }
    },

    computed: {},

    template: `
      <div>
        <button
                v-on:click="handleSubmit">
        </button>
        <teleport to="#app">
          <modal-container title="Confirm Deletion" ref="AddModal">
            <template #default>
              <p>Are you sure you want to delete <strong>{{ item.name }}</strong>?</p>
            </template>
            <template #footer>
              <button type="button" data-bs-toggle="offcanvas" class="btn btn-danger" v-on:click="$emit('deleteItem', item); this.$refs.deleteItemModal.hideModal()">Delete</button>
            </template>
          </modal-container>
        </teleport>
      </div>
    `,


}

export default ConfirmAddedModal;