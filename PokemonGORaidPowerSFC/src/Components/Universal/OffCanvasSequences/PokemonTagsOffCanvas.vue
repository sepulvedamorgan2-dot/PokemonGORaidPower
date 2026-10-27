<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import TagsOffCanvas from "@/Components/Universal/OffCanvasViews/TagsOffCanvasView.vue";

export default {
  name: "PokemonTagsOffCanvas",
  components: {
    OffCanvasContainer,
    TagsOffCanvas,

  },

  data: function () {
    return {
      title: [
        this.pokemon.name,
        'edit'
      ],


    }
  },

  props: {
    pokemon: {type: Object, required: true}
  },
}
</script>

<template>
  <img v-on:click="$refs.PokemonTagsOffCanvas.openOffCanvas(); $refs.PokemonTagsOffCanvas.pageNumber = 1" src="/media/images/pencil.svg" alt="Edit Pokemon"
       style="margin: .5rem .7rem; width: 14px"  class="corner-tr-img">




  <teleport to="#app">
    <OffCanvasContainer   :title-array="title" ref="PokemonTagsOffCanvas">
      <template #pageOne>
        <TagsOffCanvas :pokemon="pokemon"></TagsOffCanvas>
      </template>
    </OffCanvasContainer>
  </teleport>
</template>

<style scoped>

</style>