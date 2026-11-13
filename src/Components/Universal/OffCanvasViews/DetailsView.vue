<script>

import PokemonImageName from "@/Components/Universal/PokemonImageName.vue";
import ConfirmDeleteModal from "@/Components/Universal/Modal/ConfirmDeleteModal.vue";

export default {
  name: "DetailsOffCanvas",
  components: {
    PokemonImageName,


    ConfirmDeleteModal,
  },

  props: {
    pokemon: {type: Object, required: true},
  },

}
</script>

<template>
  <pokemon-image-name :active-item="pokemon"></pokemon-image-name>
  <div class="flex-grow-1 d-flex flex-column">

    <div class="text-center">

      <span class="fs-5 text-dark mb-0">{{ pokemon.cp }}</span>
      <span class="text-uppercase fw-bold text-tertiary fs-6 mt-2 mb-1 ms-1">RP</span>
      <span class=" fs-5 text-dark mb-0 ms-2">{{ pokemon.cp }}</span>
      <span class="text-uppercase fw-bold text-secondary fs-tiny   mt-2 mb-1 ms-1">CP</span>
    </div>
    <div>
      <div class="px-3">
<!--        <div class="mt-3">-->
<!--          <h5>Details</h5>-->
<!--        </div>-->
<!--        <div class="">-->
<!--          <span v-if="pokemon.isShadow" class="badge p-2 px-3 fs-tiny  typeghost">Shadow</span>-->
<!--          <span v-if="pokemon.canMegaEvolve" class="badge p-2 px-3 fs-tiny  typefire">Can Mega</span>-->
<!--          <span v-if="!pokemon.canMegaEvolve && !pokemon.isShadow"-->
<!--                class="badge p-2 px-3 fs-6  typefire">Cannot Mega/Isnt Shadow</span>-->

<!--        </div>-->


        <div class="mt-2">
          <h5>Fast Move</h5>
        </div>
        <div class="">
                        <span v-if="pokemon.fastMove"
                              :class="pokemon.getFastClass(`text-bg`, `rounded-pill p-2 px-3 fs-tiny text-capitalize`)">{{
                            pokemon.fastMove.name
                          }}</span>
          <span v-else
                :class="`bg-secondary badge p-2 px-3 fs-tiny text-capitalize`">Not Added</span>
        </div>


        <div class="mt-2">
          <h5>Charged Move(s)</h5>
        </div>
        <div class="">

                        <span v-if="pokemon.chargedMoveOne"
                              :class="pokemon.getChargedClass(`text-bg`,1, `rounded-pill p-2 px-3 fs-tiny text-capitalize`)">{{
                            pokemon.chargedMoveOne.name
                          }}</span>
          <span v-else
                :class="`bg-secondary badge p-2 text-capitalize`">Not Added</span>

          <span v-if="pokemon.chargedMoveTwo"
                :class="pokemon.getChargedClass(`text-bg`,2, `badge p-2 px-3 fs-tiny ms-2 text-capitalize`)">{{
              pokemon.chargedMoveTwo.name
            }}</span>
          <span v-else
                :class="`bg-secondary badge p-2 text-capitalize`">Not Added</span>
        </div>
      </div>
      <!-- Edit button -->
      <div class="pt-3 px-3">
        <button type="button"
                class="btn btn-primary mb-2 py-2 fs-4 w-100" v-on:click="$emit('clicked')">Edit Pokemon
        </button>

      </div>
      <!--                delete button-->
      <div class="px-3">
        <confirm-delete-modal :item="pokemon"
                              @delete-item="item => $emit('deleteItem', item)"></confirm-delete-modal>
      </div>
    </div>

    <!-- end -->
  </div>
</template>

<style scoped>

</style>