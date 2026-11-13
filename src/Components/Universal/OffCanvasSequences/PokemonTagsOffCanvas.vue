<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import TagsOffCanvas from "@/Components/Universal/OffCanvasViews/TagsOffCanvasView.vue";
import {PokemonInstance} from "@/models/PokemonInstance.js";

export default {
  name: "PokemonTagsOffCanvas",
  components: {
    OffCanvasContainer,
    TagsOffCanvas,

  },

  data: function () {
    return {
      title: [
        this.pokemonInstance?.pokemon?.name,
        'edit'
      ],


    }
  },

  props: {
    pokemonInstance: {type: PokemonInstance, required: true}
  },
}
</script>

<template>
  <img v-on:click="$refs.PokemonTagsOffCanvas.openOffCanvas(); $refs.PokemonTagsOffCanvas.pageNumber = 1" src="@/Images/pencil.svg" alt="Edit Pokemon"
       style="margin: .5rem .7rem; width: 14px"  class="corner-tr-img">




  <teleport to="#app">
    <OffCanvasContainer   :title-array="title" ref="PokemonTagsOffCanvas">
      <template #pageOne>
        <TagsOffCanvas :pokemon-instance="pokemonInstance"></TagsOffCanvas>
      </template>
    </OffCanvasContainer>
  </teleport>
</template>

<style lang="scss" scoped>
%corner-base {
  position: absolute;
  width: 20%;
  height: auto;
  margin: .2rem;
}
.corner-tr-img {
  @extend %corner-base;
  top: 0;
  right: 0;
}
</style>