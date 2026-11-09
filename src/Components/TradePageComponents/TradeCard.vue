<script>
import {VueDraggable} from 'vue-draggable-plus'
import AddPokemonOffCanvas from "@/Components/Universal/OffCanvasSequences/AddPokemonOffCanvas.vue";
import CardContainer from "@/Components/Universal/CardContainer.vue";
import PokemonTagsOffCanvas from "@/Components/Universal/OffCanvasSequences/PokemonTagsOffCanvas.vue";
import CollapseArea from "@/Components/TradePageComponents/CollapseArea.vue";
import ConfirmDeleteModal from "@/Components/Universal/Modal/ConfirmDeleteModal.vue";
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import AlertWithClose from "@/Components/Universal/AlertWithClose.vue";
import SelectList from "@/Components/TradePageComponents/SelectList.vue";
import {TradeCard} from "@/models/TradeCard.js";
import {shallowRef} from "vue";
import {PokemonList} from "@/models/PokemonList.js";


export default {
  name: 'TradeCard',
  components: {
    VueDraggable,
    AddPokemonOffCanvas,
    CardContainer,
    PokemonTagsOffCanvas,
    CollapseArea,
    ConfirmDeleteModal,
    ImageWithDetails,
    AlertWithClose,
    SelectList,
  },
  data: function () {
    return {

      pokemonListFiltered: [],
      mode: 0,
      tradeCard: this.existingTradeCard || new TradeCard(),
      validation: false,
      warning: false,
    }
  },
  props: {
    pokemonList: {Type: Array, required: true},
    pokemonListApi: {Type: Array, required: true},
    existingTradeCard: {type: Object},
    isNew: {type: Boolean, default: false},
  },
  watch: {
    existingTradeCard: {
      handler: function (newVal) {
        if (newVal) {
          this.tradeCard = newVal;
        }
      },
      immediate: true
    }, tradeCard: {
      handler: function (newVal) {
        this.tradeCard.updateOptionClasses();
      }, deep: true
    }, warning: {

      handler: function () {
        if (!this.warning) {
          this.returnNewPokemon()
        }
      }
    }
  }
  ,

  methods: {
    manageHaveRemove(pokemon) {
      if (this.pokemonList.items.some(p => p.id === pokemon.id) && this.warning === true) {
        console.log('eeee')
        this.warning = false;
      }
      this.tradeCard.removeFromHaveList(pokemon)
      this.returnNewPokemon()
    }
    ,
    addHaveList(pokemon) {
      console.log(pokemon);
      if (pokemon[1]) {
        this.tradeCard.removeFromHaveList(pokemon[0])
      } else {
        this.tradeCard.addHaveList(pokemon[0]);
      }

      this.returnNewPokemon();
    }
    ,
    addWantedList(pokemon) {
      if (pokemon[1]) {
        console.log(pokemon);
        this.tradeCard.removeFromWantedList(pokemon[0])
      } else {
        this.validation = false;
        this.tradeCard.addWantedList(pokemon[0]);
      }

      this.returnNewPokemon();
    }
    ,
    returnNewPokemon() {
      this.pokemonListFiltered = Object.assign(new PokemonList(), this.pokemonList, {
        items: [...this.pokemonList.items]
      });
      for (let pokemon of this.tradeCard.haveList.items) {
        this.pokemonListFiltered.remove(pokemon.id);
      }
      if (this.pokemonListFiltered.items.length === 0) {
        this.warning = true;
        this.pokemonListFiltered = {items: [...this.pokemonListApi]}
      }
    }
    ,
    manageAdd(cardToAdd) {
      if (cardToAdd.wantList.items.length < 1) {
        this.validation = true
        return false;
      }
      this.$emit('addTradeCard', cardToAdd);
      this.tradeCard = new TradeCard();

    }
  }
  ,
  mounted() {
    if (this.isNew) {
      this.mode = 1
    }
    this.returnNewPokemon()
  }
  ,


}

</script>

<template>
  <div v-if="tradeCard">
    <div v-if="mode === 1">
      <alert-with-close :dismissible=false @handle-click="" message="Double Click to remove a pokemon"
                        color-class="typedragon">

      </alert-with-close>
    </div>
    <CardContainer :custom-title="true">
      <template v-slot:card-actions>
        <div class="d-flex  py-0  mb-1">
          <i v-show="mode === 0" v-on:click="mode = 1; returnNewPokemon()"
             class="bi bi-pencil-fill fs-3 p-2 force-hover mt-1"></i>
          <!--            <i v-show="mode === 1" v-on:click="mode = 0" class="bi bi-eye me-3 fs-5 mt-1"></i>-->
          <div v-if="mode === 1 && pokemonListApi"
          >
          </div>
          <div v-if="mode === 1 && !isNew">
            <confirm-delete-modal @delete-item="$emit('deleteItem', tradeCard)" :item="{name: tradeCard.title}"><i
                class="bi bi-trash-fill  p-2 force-hover fs-3 mt-3"></i></confirm-delete-modal>
          </div>

        </div>

      </template>
      <template v-slot:card-header-manuel>
        <h4 v-if="mode===0" class="fs-1 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
          {{ tradeCard.title }}</h4>
        <label v-if="mode===1" class="form-label">
          Trade Card Title
          <input type="text" v-if="mode===1" style="border-width: 2px !important;"
                 class="fs-3 form-control border-primary bg-light-subtle border-0 border-bottom rounded-0"
                 v-model="tradeCard.title">
        </label>
      </template>
      <template v-slot:card-body>
        <div class="row ">
          <div class="col-10 ps-3 ps-1 ">
            <div class="ms-0 ms-sm-1">
              <h4 class="fs-3 fw-bold pt-1 mb-0 text-capitalize text-start pb-0">
                Wanted</h4>

            </div>
          </div>


        </div>
        <div class="ms-1" v-if="mode === 0">
          <h4 v-for="option in tradeCard.wantOptions" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class="col-auto badge me-1 mb-1 ">
            {{ option.selected }}
          </h4>
        </div>
        <div class="row ps-0 pt-0 pb-0" v-if="mode === 1">
          <collapse-area teleport-id="want">
            <select-list :options="tradeCard.wantOptions">
            </select-list>
          </collapse-area>
        </div>
        <div class="pb-0" id="want">
        </div>
        <p v-if="validation" class="text-danger ms-1 pt-0">Must have one pokemon wanted</p>
        <vue-draggable :disabled="mode !== 1" :delay="100" :delay-on-touch-only="true"
                       :force-fallback="true" draggable=".draggable" v-model="tradeCard.wantList.items"
                       class="row pb-1 row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 p-sm-1 ">

          <div v-if="mode ===1" class=" col col-md-2">
            <div
                class="d-flex horz-card-img img-fluid w-100 text-center align-items-center   justify-content-center border rounded-4 ">

              <!-- AFTER (Fixed) -->
              <add-pokemon-off-canvas @clicked-object-existing="addWantedList"
                                      button="pencil"
                                      v-on:click="returnNewPokemon()"
                                      :pokemon-list-from-api="pokemonListApi"
                                      :list-to-highlight="tradeCard.wantList.items"
                                      card-style="WantList">
              </add-pokemon-off-canvas>

            </div>
            <div class="pb-1">
            </div>

          </div>
          <div class="col col-md-2 draggable" v-for="pokemon in tradeCard.wantList.items">
            <div class="text-center border rounded-4 ">
              <div class="position-relative">
                <image-with-details @dblclick="mode === 1 ? tradeCard.removeFromWantedList(pokemon) : null" :no-quantity="true"
                                    :noPresetSize="true" :pokemon="pokemon">
                  <pokemon-tags-off-canvas v-if="mode === 1" :pokemon="pokemon"></pokemon-tags-off-canvas>
                </image-with-details>
              </div>
              <div class="pb-1">
                <p style="font-size: 13px; font-weight: 500"
                   v-if="pokemon.tradeDetails.tradeBackground.shorthandName"
                   v-show="pokemon.tradeDetails.tradeBackground !== ''"
                   :class="{'mb-0': true, ['text-type' + pokemon.tradeDetails.tradeBackground.color]: true}">
                  {{ pokemon.tradeDetails.tradeBackground.shorthandName }}
                </p>
                <p style="font-size: 14px;" v-for="tag in pokemon.tradeDetails.tags"
                   v-show="tag.selected !== 'None' && tag.selected !=='Lucky'"
                   class="mb-0 text-capitalize">
                  {{ tag.selected }}
                </p>
              </div>
            </div>
          </div>
        </vue-draggable>


        <div class="row  border-top ">
          <div class="col-10 ps-3 ps-1 ">
            <div class="ms-0 ms-sm-1">
              <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                For Trade</h4>
            </div>
          </div>
        </div>
        <div class="ms-1" v-if="mode === 0">
          <h4 v-for="option in tradeCard.haveOptions" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class="col-auto badge me-1 mb-1 ">
            {{ option.selected }}
          </h4>
        </div>
        <div class="row ps-0 pt-0 pb-0" v-if="mode === 1">
          <collapse-area teleport-id="have">
            <select-list :options="tradeCard.haveOptions">
            </select-list>
          </collapse-area>
        </div>
        <div class="pb-0" id="have">
        </div>
        <vue-draggable :disabled="mode !== 1"  :delay="100" :delay-on-touch-only="true"
                       :force-fallback="true" draggable=".draggable" v-model="tradeCard.haveList.items"
                       class="row pb-1 row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 p-sm-1 ">

          <div v-if="mode ===1" class=" col col-md-2">
            <div
                class="d-flex horz-card-img img-fluid w-100 text-center align-items-center   justify-content-center border rounded-4 ">

              <!-- AFTER (Fixed) -->
              <add-pokemon-off-canvas @clicked-object-existing="addHaveList"
                                      button="pencil"
                                      :warning="warning"
                                      v-on:click="returnNewPokemon()"
                                      :pokemon-list-from-api="pokemonListFiltered.items"
                                      :list-to-highlight="tradeCard.haveList.items"
                                      card-style="HaveList">
              </add-pokemon-off-canvas>

            </div>
            <div class="pb-1">
            </div>

          </div>
          <div class="col col-md-2 draggable" v-for="pokemon in tradeCard.haveList.items">
            <div class="text-center border rounded-4 ">
              <div class="position-relative">
                <image-with-details @dblclick="mode === 1 ? manageHaveRemove(pokemon) : null" :no-quantity="true"
                                    :noPresetSize="true" :pokemon="pokemon">
                  <pokemon-tags-off-canvas v-if="mode === 1" :pokemon="pokemon"></pokemon-tags-off-canvas>
                </image-with-details>
              </div>
              <div class="pb-1">
                <p style="font-size: 13px; font-weight: 500"
                   v-if="pokemon.tradeDetails.tradeBackground.shorthandName"
                   v-show="pokemon.tradeDetails.tradeBackground !== ''"
                   :class="{'mb-0': true, ['text-type' + pokemon.tradeDetails.tradeBackground.color]: true}">
                  {{ pokemon.tradeDetails.tradeBackground.shorthandName }}
                </p>
                <p style="font-size: 14px;" v-for="tag in pokemon.tradeDetails.tags"
                   v-show="tag.selected !== 'None' && tag.selected !=='Lucky'"
                   class="mb-0 text-capitalize">
                  {{ tag.selected }}
                </p>
              </div>
            </div>
          </div>
        </vue-draggable>
        <button v-if="isNew" type="button" class="btn btn-primary w-100 rounded-4" @click="manageAdd(tradeCard)">Save
          New
          Trade Card
        </button>
        <button v-if="!isNew && mode === 1" type="button" class="btn btn-primary w-100 rounded-4" @click="mode = 0">Save
          Trade Card
        </button>
      </template>
    </CardContainer>
  </div>
</template>

<style lang="scss" scoped>
.horz-card-img {
  width: 80px;
  aspect-ratio: 1;

  @media (max-width: 767px) {
    width: 70px;

  }
}
</style>