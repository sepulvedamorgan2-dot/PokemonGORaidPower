<script>
let counter = 1
export default {
  name: 'CollapseArea',
  data: function () {
    return {
      id: 'collapse' + counter++,
      iconClass: 'ps-1 fs-6 bi bi-eye'
    }
  },
  props: {
    teleportId: {Type: String, Required: true}
  },
  methods: {
    swapIcon: function () {
      if(this.iconClass === 'ps-1 fs-6 bi bi-eye'){
        this.iconClass = 'ps-1 fs-6 bi bi-eye-slash'
      } else{
        this.iconClass = 'ps-1 fs-6 bi bi-eye'
      }

    }
  },


}
</script>

<template>
  <div class="pt-1">
    <button class=" ms-sm-1 rounded-5 btn pt-1 btn-outline-primary d-inline " data-bs-toggle="collapse" :data-bs-target="'#' + id"  v-on:click="swapIcon" >
      <x style="font-size: 15px">View Trade Tags</x>
      <i  :class="iconClass"></i>
    </button>
    <teleport defer :to="'#' + teleportId">
      <div :id="id" data-bs-toggle="collapse" class="collapse">
        <slot>

        </slot>
      </div>
    </teleport>
  </div>
</template>

<style scoped>

</style>