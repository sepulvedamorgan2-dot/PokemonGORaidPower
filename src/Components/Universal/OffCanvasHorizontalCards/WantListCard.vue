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
  <div
       :class="{ 'col-auto position-relative' : true, 'bg-light' : listToHighlight && listToHighlight.some((p) => p.image === pokemon.image)}">
    <image-with-details
        v-on:click="
         listToHighlight && listToHighlight.some((p) => p.image === pokemon.image) ?
         $emit('clickedObjectExisting', [pokemon, true]) :
          $emit('clickedObjectExisting', [pokemon, false]) "
        :pokemon-instance="pokemon"></image-with-details>
  </div>
</template>

<style scoped>

</style>