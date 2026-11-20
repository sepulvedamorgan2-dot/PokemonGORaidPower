<script>
import FilterOffCanvas from "@/Components/Universal/OffCanvasSequences/FilterOffCanvas.vue";
import FilterView from "@/Components/Universal/OffCanvasViews/FilterView.vue";

export default {
  name: "SearchBarContainer",
  components: {
    FilterOffCanvas,
    FilterView,
  },

  data: function () {
    return {
      searchQuery: '',
      matches: []
    }
  },

  props: {
    placeHolder: {String, required: false},
    title: {String, required: false},
  },

  watch: {
    searchQuery: {
      handler: function () {
        this.$emit('searchQuery', this.searchQuery);
      }
    }
  },

}
</script>

<template>
  <div class="container-fluid container-sm px-2 ">
    <p class="form-label w-100  mb-1 ms-1 fs-6">
      {{ title }}
    </p>
    <div class="row g-2 mb-2">


      <div class="col">
        <label aria-label="Search Bar" class="w-100">
          <input type="text" class="form-control" id="searchBar" :placeholder="placeHolder"
                 v-model="searchQuery">
        </label>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>