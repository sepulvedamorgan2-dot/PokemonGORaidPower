<script>

import HorizontalCard from "@/Components/Universal/OffCanvasHorizontalCards/HorizontalCard.vue";

export default {
  name: "HorizontalCardContainer",
  components: {
    HorizontalCard: HorizontalCard,

  },

  data: function () {
    return {
      arrayToDisplay2: [],
    }
  },

  props: {
    arrayToDisplay: {Array, required: true},
    cardStyle: {Object, default: HorizontalCard},
    listToHighlight: {type: Array, default: []},
  },

}
</script>

<template>

  <div>
    <component
        v-for="pokemon in arrayToDisplay"
        :is="cardStyle"
        :pokemon-instance="pokemon"
        :list-to-highlight="listToHighlight"
        @clicked-pokemon="$emit('clickedPokemon', pokemon)"
    ></component>
  </div>




</template>

<style scoped>

</style>