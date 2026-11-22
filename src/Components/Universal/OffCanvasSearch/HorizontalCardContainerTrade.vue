<script>
import HorizontalCardContainer from "@/Components/Universal/OffCanvasSearch/HorizontalCardContainer.vue";

export default {
  name: "HorizontalCardContainerTrade",
  extends: HorizontalCardContainer,
  props: {
    isHaveList: {type: Boolean, default: false},
  }
}
</script>

<template>
  <div class="d-flex row-cols-5 flex-wrap gap-0">

    <component
        class="col"
        v-if="isHaveList"
        :list-to-highlight="listToHighlight"
        v-for="pokemon in listToHighlight"
        :is="cardStyle"
        :pokemon-instance="pokemon"
        @clicked-pokemon="$emit('clickedPokemon', $event)"
    ></component>
    <p class="col-12" v-if="isHaveList">eee</p>
    <component
        class="col"
        :list-to-highlight="listToHighlight"
        v-for="pokemon in arrayToDisplay"
        :is="cardStyle"
        :pokemon-instance="pokemon"
        @clicked-pokemon="$emit('clickedPokemon', $event)"
    ></component>

  </div>
</template>

<style scoped>

</style>