<script>

import PokemonImageName from "@/Components/Universal/PokemonImageName.vue";
import GameDataFactory from "@/models/GameDataFactory.js";


export default {
  name: "AddEditOffCanvas",
  components: {
    PokemonImageName,


  },

  data: function () {
    return {

      quantity: 1,


    }
  },

  props: {
    pokemon: {type: Object, required: true},
    isNew: {type: Boolean, default: false},
  },
  // async mounted() {
  //   await this.initPokemon();
  // },
  methods: {

    openOffCanvas() {
      this.bsOffCanvas.show();
    }, updateCpNumber(number){
      this.pokemon.cp = Math.round(number.target.value * this.pokemon.pokemonDetails.maxCp / 100);
    }, submitPokemon(pokemon, quantity) {
      if(!pokemon.cp){
        pokemon.cp = 50;
      }
      this.$emit('addPokemon', [pokemon, quantity]);
    }
  },
}
</script>

<template>
  <div v-if="pokemon">
    <pokemon-image-name :active-item="pokemon"></pokemon-image-name>
    <div class="flex-grow-1 d-flex flex-column">

      <!--              <confirm-added-modal item="{{ pokemon.name }}"></confirm-added-modal>-->
      <form class="container-fluid d-flex flex-column flex-grow-1 needs-validation"

            v-on:submit.prevent="submitPokemon(pokemon, quantity); " >

        <div>
          <label :for="'range' + pokemon.Id" class="form-label">Creature Power (CP): {{ pokemon.cp }}</label>
          <input required type="range" class="form-range" min="1" :max="100" v-on:input="updateCpNumber($event)"  :id="'range' + pokemon.Id">
        </div>

        <div class="mt-2">
          <button class="btn btn-primary w-100 rounded-0" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseEX1" aria-expanded="false" aria-controls="collapseEX1">
            Edit Move Types (optional)
          </button>
        </div>

        <div class="collapse" id="collapseEX1" data-bs-parent="#editTeamCollapse">
          <div class="card bg-light border-0 card-body py-2 pt-0 rounded-0">
            <!-- Fast type div -->
            <div class="row g-2 btn-group mt-2" role="group" aria-label="Pokemon Creature Power Buttons">
              <div class="col-12">
                <label class="form-label w-100">
                  Fast Move
                  <select class="form-select text-capitalize" v-model="pokemon.fastMove">
                    <option v-for="move in pokemon.pokemonDetails.fastMoves" :value="move">{{move.name}}</option>

                  </select>
                </label>
              </div>
            </div>

            <!-- Charged type div -->
            <div class="row g-2 btn-group" role="group" aria-label="Pokemon Creature Power Buttons">
              <div class="col-12 col-sm-6">
                <label class="form-label w-100">
                  Charged Move 1
                  <select class="form-select text-capitalize" id="chargedMoveSelect1edit"
                          v-model="pokemon.chargedMoveOne">
                    <option v-for="move in pokemon.pokemonDetails.chargedMoves" :value="move">{{move.name}}</option>
                  </select>
                </label>
              </div>
              <div class="col-12 col-sm-6">
                <label class="form-label w-100">
                  Charged Move 2
                  <select class="form-select text-capitalize" id="chargedMoveSelect2edit"
                          v-model="pokemon.chargedMoveTwo">
                    <option v-for="move in pokemon.pokemonDetails.chargedMoves" :value="move">{{move.name}}</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- toggle options -->
        <div class="row g-2 my-2">
          <div>
            <label class="form-check-label">
              <input type="checkbox" id="isShadowedit" v-model="pokemon.isShadow"
                     class="border-dark-subtle form-check-input">
              Shadow
            </label>
          </div>
          <div v-show="pokemon.pokemonDetails.megaCapable">
            <label class="form-check-label">
              <input type="checkbox" v-model="pokemon.canMegaEvolve"
                     class="border-dark-subtle form-check-input">
              Can Mega Evolve
            </label>
          </div>
        </div>
        <div v-if="isNew">
          <label class="form-label w-25   ">
            Quantity
            <input required type="number" v-model="quantity" min="1"
                   max="10" class="form-control"
                   placeholder="Quantity">
          </label>
        </div>
        <!-- done button -->
        <div v-if="isNew" class="row g-2 mt-auto">
          <div class="col-12">
            <button type="submit"
                    class="btn btn-primary mb-2 py-2 fs-4 w-100">Add Pokemon
            </button>
          </div>
        </div>
        <div v-else class="row g-2 mt-auto">
          <div class="col-12">
            <button type="button"  v-on:click="$emit('clicked')"
                    class="btn btn-primary mb-2 py-2 fs-4 w-100">Done
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>