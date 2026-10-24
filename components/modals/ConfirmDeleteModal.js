// For subcomponent
// import xxx from './PokemonlistItem.js';
import ModalContainer from '../containers/ModalContainer.js';
const ConfirmDeleteModal = {
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

    },

    computed: {},

    template: `
      <div>
        <div v-on:click="this.$refs.deleteItemModal.openModal()">
          <slot>
            <button type="button"
                    class="btn btn-danger mb-2 py-2 fs-4 text-white w-100">Delete Pokemon
            </button>
          </slot>
        </div>
        <teleport to="#app">
          <modal-container title="Confirm Deletion" ref="deleteItemModal">
            <template #default>
              <p>Are you sure you want to delete <strong>{{ item.name }}</strong>?</p>
            </template>
            <template #footer>
              <button type="button" data-bs-toggle="offcanvas" class="btn btn-danger"
                      v-on:click="$emit('deleteItem', item); this.$refs.deleteItemModal.hideModal()">Delete
              </button>
            </template>
          </modal-container>
        </teleport>
      </div>
    `,


}

export default ConfirmDeleteModal;