<script>

import ModalContainer from "@/Components/Universal/Modal/ModalContainer.vue";

export default {
  name: "ConfirmAddedModal",
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
}
</script>

<template>
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
</template>

<style scoped>

</style>