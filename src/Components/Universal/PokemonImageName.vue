<script>
import ImageWithDetails from './ImageWithDetails.vue';

export default {
  components: {
    ImageWithDetails
  },
  name: "PokemonImageName",
  data: function () {
    return {

    }
  },

  props: {
    activeItem: { type: Object }
  },
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-center pt-3 pb-2">
      <div class="" style="width: 50%">
        <image-with-details :pokemon="activeItem"
                            :noPresetSize="true" class="bg-white img-fluid details-img w-100 border border-dark-subtle rounded" :alt="activeItem.name"></image-with-details>
      </div>
    </div>

    <div v-if="activeItem.name" class="">

      <h3 class="text-center text-capitalize">{{ activeItem.name }}</h3>

    </div>
  </div>
</template>

<style scoped>

</style>