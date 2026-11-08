<script>
export default {
  name: "AlertWithClose",
  props: {
    message: {type: String, required: true},
    colorClass: {type: String, default: "primary"},
    dismissible: {type: Boolean, default: true},
  },
  data: function () {
    return {
      isVisible: true
    }
  }
}
</script>

<template>
  <div v-if="isVisible" :class="
  {
    'width-handler alert alert-primary py-2 rounded-pill d-flex mb-2': true,
    ['bg-lighter-' + colorClass + ' border-' + colorClass]: true,

  }
" role="alert">
    <slot><i class=" bi bi-info-circle me-2 col-auto"></i></slot>
    <x class=" text-wrap col-auto text-size pe-2">{{ message }}</x>
    <i v-if="dismissible" @click="isVisible = false; $emit('handleClick')"
       class="force-hover bi ms-auto bi-x-circle col-auto"></i>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:color";
@import "@/scss/variable.scss";

.text-size {
  font-size: 15px;
}

@each $name, $color in $theme-colors {
  .bg-lighter-#{$name} {
    background-color: color.adjust($color, $lightness: 28%) !important;
  }
}


</style>

<!--.width-handler {-->
<!--@media (min-width: 576px) {-->
<!--width: fit-content;-->
<!--}-->
<!--}-->