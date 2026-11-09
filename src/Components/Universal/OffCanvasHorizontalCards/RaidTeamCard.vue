<script>
import AddEditOffCanvas from "@/Components/Universal/OffCanvasViews/AddEditView.vue";
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import HorizontalCard from "@/Components/Universal/OffCanvasHorizontalCards/HorizontalCard.vue";

export default {
  name: "ImageOnlyCard",
  extends: HorizontalCard,
  components: {
    AddEditOffCanvas: AddEditOffCanvas,
    ImageWithDetails: ImageWithDetails,
  }


}
</script>

<template>
  <div class="row g-0 border-bottom">
    <div class="col-auto">
      <image-with-details :pokemon="pokemon"></image-with-details>
    </div>
    <div class="col">
      <div class="p-1 ms-1">
        <p class="fs-5 mb-0 text-capitalize">{{ pokemon.name }}
        </p>

        <div class="d-flex mt-0">
          <p class="me-2 fs-6 mb-0">RP:{{ pokemonTeam.updateIfMega(pokemon) }}</p>
          <p class="fs-6 mb-0">CP:{{ pokemonTeam.updateIfMega(pokemon) }}</p>

        </div>

      </div>
    </div>
    <div class="col-3">
      <div class="d-flex justify-content-end me-4 align-items-center h-100">
        <i v-if="pokemon.fastMove"
           :class="pokemon.getFastClass('text-bg', `rounded mb-1 p-1  fs-tinyer bi bi-lightning-charge`)"></i>
        <i v-if="pokemon.chargedMoveOne"
           :class="pokemon.getChargedClass('text-bg', 1, `rounded mb-1 ms-1 fs-tinyer p-1 bi bi-lightning-charge-fill`)"></i>
        <i v-if="pokemon.chargedMoveTwo"
           :class="pokemon.getChargedClass('text-bg', 2, `rounded mb-1 ms-1   fs-tinyer p-1 bi bi-lightning-charge-fill`)"></i>
        <i type="button" data-bs-toggle="collapse"
           :data-bs-target="'#'+pokemon.id"
           class="bi bi-pencil ms-2 ms-sm-4"></i>
      </div>
    </div>
    <div class="collapse" :data-bs-parent="'#'+pokemonTeam.type" :id="pokemon.id">
      <div class="card border-0 card-body py-2 pt-0">
        <div class="row g-1">


          <div class="col-12 col-sm-6 " v-if="pokemon.canMegaEvolve">
            <button type="button"
                    class="btn btn-secondary w-100"
                    v-on:click="$emit('megaPokemon', pokemon)">Mega
            </button>
          </div>
          <div :class="{'col-12' : !pokemon.canMegaEvolve,
                                                'col-12 col-sm-6' : pokemon.canMegaEvolve}">
            <button type="button"
                    class="btn btn-danger w-100 text-white"
                    v-on:click="$emit('removePokemon', pokemon)"
                    data-bs-toggle="collapse">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>