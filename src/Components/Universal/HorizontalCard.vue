<script>
import AddEditOffCanvas from "@/Components/Universal/OffCanvasViews/AddEditView.vue";
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";

export default {
  name: "HorizontalCard",
  components: {
    AddEditOffCanvas: AddEditOffCanvas,
    ImageWithDetails: ImageWithDetails,
  },

  data: function () {
    return {}
  },

  props: {
    pokemon: {Object, required: true},
    cardStyle: {Number, required: true},
    pokemonTeam: {Object, required: false},
    listToHighlight: {Array, required: false},
  },

  methods: {},

}
</script>

<template>
  <div v-if="cardStyle === 1" class="row g-0 align-items-center">
    <div class="col-auto">
      <image-with-details :pokemon="pokemon"></image-with-details>
    </div>
    <div class="col">
      <div class="ms-0 ms-sm-0">
        <p class="fs-5 mb-0 text-capitalize">{{ pokemon.name }} </p>

      </div>
    </div>
    <div class="col-3 pe-2">
      <button v-on:click="$emit('clickedObject', pokemon)" class=" btn btn-sm btn-primary w-100 searchedPokemonBtn">
        Select
      </button>
    </div>
  </div>
  <!--    Style 2-->
  <div v-if="cardStyle === 2" class="row g-0 border-bottom">
    <div class="col-auto ">
      <image-with-details :pokemon="pokemon"></image-with-details>
    </div>
    <div class="col">
      <div class="p-1 ms-1">
        <p class="fs-5 mb-0 text-capitalize">{{ pokemon.name }} </p>

        <div class="d-flex mt-0">
          <p class="me-2 fs-6 mb-0">RP:{{ pokemon.cp }}</p>
          <p class="fs-6 mb-0">CP:{{ pokemon.cp }}</p>

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
        <i type="button"
           class="bi bi-plus ms-2 fs-5 ms-sm-4" v-on:click="$emit('clickedObject', pokemon)"></i>

      </div>
    </div>
  </div>
  <!--    card 3-->
  <div v-if="cardStyle === 3" class="row g-0 border-bottom">
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
  <!--      Card 4-->
  <!--i need to be shot batmans parents style for this bit of code-->
  <div v-if="cardStyle === 4 || cardStyle === 5"
       :class="{ 'col-auto position-relative' : true, 'bg-light' : cardStyle === 4 ? listToHighlight && listToHighlight.some((p) => p.image === pokemon.image) : listToHighlight && listToHighlight.some((p) => p.id === pokemon.id)}">

    <image-with-details
        v-on:click="cardStyle === 4 ? listToHighlight && listToHighlight.some((p) => p.image === pokemon.image) ? $emit('clickedObjectExisting', [pokemon, true]) : $emit('clickedObjectExisting', [pokemon, false]) : listToHighlight && listToHighlight.some((p) => p.id === pokemon.id) ? $emit('clickedObjectExisting', [pokemon, true]) : $emit('clickedObjectExisting', [pokemon, false])"
        :pokemon="pokemon"></image-with-details>
  </div>
</template>

<style scoped>

</style>