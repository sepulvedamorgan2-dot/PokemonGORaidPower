<script>
import AddEditOffCanvas from "@/Components/Universal/OffCanvasViews/AddEditView.vue";
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import HorizontalCard from "@/Components/Universal/OffCanvasHorizontalCards/HorizontalCard.vue";

export default {
  name: "ImageOnlyCard",
  extends: HorizontalCard,
  components: {
    AddEditOffCanvas: AddEditOffCanvas,
    ImageWithDetails: ImageWithDetails,
  }


}
</script>

<template>
  <!--i need to be shot batmans parents style for this bit of code-->
  <div class="row g-0 border-bottom">
    <div class="col-auto ">
      <image-with-details :pokemon-instance="pokemon"></image-with-details>
    </div>
    <div class="col">
      <div class="p-1 ms-1">
        <p class="fs-5 mb-0 text-capitalize">{{ pokemon.name }} </p>
        <div class="d-flex mt-0">
          <p class="me-2 fs-6 mb-0">RP:{{ pokemon.cp }}</p>
          <p class="fs-6 mb-0">CP:{{ pokemon.cp }}</p>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="d-flex justify-content-end me-4 align-items-center h-100">
        <i v-if="pokemon.fastMove"
           :class="pokemon.getFastClass('text-bg', `rounded mb-1 p-1  fs-tinyer bi bi-lightning-charge`)"></i>
        <i v-if="pokemon.chargedMoveOne"
           :class="pokemon.getChargedClass('text-bg', 1, `rounded mb-1 ms-1 fs-tinyer p-1 bi bi-lightning-charge-fill`)"></i>
        <i v-if="pokemon.chargedMoveTwo"
           :class="pokemon.getChargedClass('text-bg', 2, `rounded mb-1 ms-1   fs-tinyer p-1 bi bi-lightning-charge-fill`)"></i>
        <i type="button"
           class="bi bi-plus ms-2 fs-5 ms-sm-4" v-on:click="$emit('clickedObject', pokemon)"></i>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>