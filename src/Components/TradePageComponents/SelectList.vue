<script>

export default {
  name: "SelectList",
  methods: {

  },
  props: {
    options: {type: Array, required: true},
    selectedOptions: {type: Array, required: true}
  }
}
</script>

<template>
  <div class="pt-1" >
    <div>
      <div class="ms-1 d-flex   flex-wrap">
        <label v-for="option in options" :key="option.key"
               class="fs-tiny fw-light me-1 form-label mb-1">
          {{ option.title }}
          <select style="text-indent: -1px; border-width: 1px; font-weight: normal" :class="{
                    'form-select   px-3 rounded-pill  me-2 fs-tiny ': true,
                    ['border-'+selectedOptions[option.key].tagClass]: option.tagClass !== 'd-none',
                'btn-outline border-dark': option.tagClass === 'd-none',
                }" v-model="selectedOptions[option.key]" :key="option.title">
            <option v-for="subOption in option.optionsArray" :value="{selected: subOption.selected, tagClass: subOption.tagClass}">{{
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