<script>
import {Modal} from'bootstrap';
let counter = 1
export default {
  name: "ConfirmAddedModal",
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
    this.bsModal = new Modal(this.$refs.modal);
  },

  computed: {},
}
</script>

<template>
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
</template>

<style scoped>

</style>