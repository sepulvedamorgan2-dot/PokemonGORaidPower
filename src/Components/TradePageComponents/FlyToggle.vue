<script>
export default {
  name: "FlyToggle",
  props: {
    /**
     * images array contains an array of {src: string, value: string} objects that represent the images to be displayed in the toggle.
     * The value property is used to identify the selected image when the toggle is clicked.
     */
    imageArray: {type: Array, required: true},
    property: {type: Object, required: true},
    isEnabled: {type: Boolean, default: true},
  },
  data: function () {
    return{
      toggleIndex: 0,
      toggleQuantity: this.imageArray?.length

    }
  },
  methods: {
    // getImage(src) {
    //   try {
    //     console.log(src)
    //     return new URL(`${src}`);
    //   } catch (error) {
    //     console.error(`Error loading image: ${src}`, error);
    //     return ''; // Return a fallback image or an empty string if the image fails to load
    //   }
    // }
  },
  mounted() {
    if (this.property) {
      console.log('Property value:', this.property);
      this.toggleIndex = this.imageArray.findIndex(image => image.value === this.property);
    }
  }

}
</script>

<template>
  <div @click="isEnabled ? toggleIndex = (toggleIndex + 1) % toggleQuantity : null; isEnabled ? $emit('emitValue', imageArray[toggleIndex].value): null" style="max-width: 60px" class="me-2">
    <div class="text-center" v-for="image in imageArray"  :key="image.src">
    <img

         @click="isEnabled ? $emit('emitValue', image.value) : null"
         v-show="toggleIndex === imageArray.indexOf(image)"
         class="img-fluid rounded-4 border border-2 border-dark "
         :src="image.src"
         alt="">
    <p style="font-size: 10px" v-show="toggleIndex === imageArray.indexOf(image) && isEnabled">{{ image.value }}</p>
    </div>

  </div>
</template>

<style scoped>

</style>