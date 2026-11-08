<script>
export default {
  name: "SelectList",
  props: {
    options: {type: Array, required: true},
  }
}
</script>

<template>
  <div class="pt-2" v-if="options">
    <div v-if="options && Object.keys(options).length > 0">
      <div class="ms-1 d-flex   flex-wrap">
        <label v-for="option in options" :key="option.title"
               class="fs-tiny fw-light form-label">
          {{ option.title }}
          <select style="text-indent: -1px; border-width: 1.5px" :class="{
                    'form-select  w-auto px-3 rounded-pill me-2 ': true,
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