<script>
export default {
  name: "CardContainer",

  props: {
    cardTitle: {
      type: String,

    },
    customTitle: {type: Boolean, default: false},

  },
}
</script>

<template>
  <div class="card ">
    <div class="card-body p-2  p-sm-2 p-md-2">
      <div v-if="cardTitle || customTitle" class="row p-2 py-0  mb-1">
        <div class="col-10 ps-2 ps-sm-2">
          <div class="ms-0 ms-sm-1">
            <div v-if="!customTitle">
              <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                {{ cardTitle }}</h4>
            </div>
            <div v-if="customTitle">
              <slot name="card-header-manuel">
              </slot>
            </div>
          </div>
        </div>
        <div class="col-2 d-flex justify-content-end">

          <div class="me-sm-1 mt-sm-1 pb-0 pb-sm-0">
            <slot name="card-actions">
            </slot>
          </div>
        </div>
      </div>
      <slot name="card-body">
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>