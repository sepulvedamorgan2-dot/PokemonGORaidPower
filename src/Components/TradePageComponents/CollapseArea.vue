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
  <div>
    <div class="btn btn-outline-dark d-inline " data-bs-toggle="collapse" :data-bs-target="'#' + id"  v-on:click="swapIcon" >
      <i class="h6">View Tags</i>
      <i  :class="iconClass"></i>
    </div>
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