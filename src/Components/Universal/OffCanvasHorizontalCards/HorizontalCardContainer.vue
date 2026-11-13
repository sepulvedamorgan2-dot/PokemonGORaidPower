<script>

import HorizontalCard from "@/Components/Universal/OffCanvasHorizontalCards/HorizontalCard.vue";
import HaveListCard from "@/Components/Universal/OffCanvasHorizontalCards/HaveListCard.vue";
import WantListCard from "@/Components/Universal/OffCanvasHorizontalCards/WantListCard.vue";
import RaidTeamCard from "@/Components/Universal/OffCanvasHorizontalCards/RaidTeamCard.vue";
import ExistingCard from "@/Components/Universal/OffCanvasHorizontalCards/ExistingCard.vue";

export default {
  name: "HorizontalCardContainer",
  computed: {
    ExistingCard() {
      return ExistingCard
    },
    RaidTeamCard() {
      return RaidTeamCard
    },
    HaveListCard() {
      return HaveListCard
    },
    WantListCard() {
      return WantListCard
    },
    ImageOnlyCard() {
      return HaveListCard
    }
  },
  components: {
    HorizontalCard: HorizontalCard,
    HaveListCard: HaveListCard,
    WantListCard: WantListCard,
    RaidTeamCard: RaidTeamCard,
    ExistingCard: ExistingCard,
  },

  data: function () {
    return {
      arrayToDisplay2: [],
    }
  },

  props: {
    arrayToDisplay: {Array, required: true},
    cardStyle: {String, default: "Horizontal"},
    searchQuery: {type: String, Default: ""},
    warning: {type: Boolean, Default: false},
    listToHighlight: {type: Array, default: []},
  },

  methods: {}
  , watch: {
    arrayToDisplay: {
      handler: function () {

        this.arrayToDisplay2 = this.arrayToDisplay;
        console.log(this.cardStyle + 'Card')
      },

      deep: true
    },
  },
}
</script>

<template>
  <div :class="{'d-flex flex-wrap': cardStyle === 'WantList' || cardStyle === 'HaveList'}">
    <div style="height: 100px" class="w-100 text-center align-content-center"
         v-if='warning && cardStyle === "HaveList" && searchQuery === "" || !warning && arrayToDisplay.length < 1'>
      <p><a href="@/pokelist.html">Add Pokémon to your Poke-List</a></p>
      <p v-if='warning && cardStyle === "HaveList" && searchQuery === ""'>Non-Personal list below</p>

    </div>

    <component v-for="card in arrayToDisplay"
               @clicked-object-existing="pokemon => $emit('clickedObjectExisting', pokemon)"
               @clicked-object="pokemon => $emit('clickedObject', pokemon)"
               @pokemon-removed="$emit('pokemonRemoved')"
               :pokemon-instance="card"

               :list-to-highlight="listToHighlight" :is="cardStyle + 'Card'"></component>
  </div>


</template>

<style scoped>

</style>