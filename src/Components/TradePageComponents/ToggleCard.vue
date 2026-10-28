<script>
import CardContainer from '@/Components/Universal/CardContainer.vue'
import ToggleButton from "@/Components/TradePageComponents/ToggleButton.vue";
import CollapseArea from "@/Components/TradePageComponents/CollapseArea.vue";

export default {
  name: 'ToggleCard',
  components: {
    CardContainer,
    ToggleButton,
    CollapseArea,

  },
  props: {
    selectedOptions: {Type: Array, required: true},
  },

}

</script>

<template>
  <card-container card-title="Trade Options">
    <template v-slot:card-actions>
      <collapse-area teleport-id="toggleCard">
        <div class="row g-2">
          <toggle-button style="min-width: 25%" v-for="option in selectedOptions" class="col-auto"
                         :saved-value="option"></toggle-button>
          <!--            <toggle-button property="trinket" :saved-value="selectedOptions"></toggle-button>-->
        </div>
      </collapse-area>
    </template>
    <template v-slot:card-body>
      <div id="toggleCard">

      </div>

    </template>
  </card-container>
</template>

<style scoped>

</style>