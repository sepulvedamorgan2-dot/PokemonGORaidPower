<script>
export default {
  name: "SelectList",
  props: {
    options: {type: Array, required: true},
  }
}
</script>

<template>
  <div class="pt-1" v-if="options">
    <div v-if="options && Object.keys(options).length > 0">
      <div class="ms-1 d-flex   flex-wrap">
        <label v-for="option in options" :key="option.title"
               class="fs-tiny fw-light me-1 form-label mb-1">
          {{ option.title }}
          <select style="text-indent: -1px; border-width: 1px; font-weight: normal" :class="{
                    'form-select   px-3 rounded-pill  me-2 fs-tiny ': true,
                    ['border-'+option.tagClass]: option.tagClass !== 'd-none',
                'btn-outline border-dark': option.tagClass === 'd-none',
                }" v-model="option.selected" :key="option.title">
            <option v-for="subOption in option.optionsArray" :value="subOption.selected">{{
                subOption.selected
              }}
            </option>
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>