<script>
import {VueDraggable} from 'vue-draggable-plus'
import AddPokemonOffCanvas from "@/Components/Universal/OffCanvasSearch/AddPokemonOffCanvas.vue";
import CardContainer from "@/Components/Universal/CardContainer.vue";
import PokemonTagsOffCanvas from "@/Components/Universal/OffCanvasSequences/PokemonTagsOffCanvas.vue";
import CollapseArea from "@/Components/TradePageComponents/CollapseArea.vue";
import ConfirmDeleteModal from "@/Components/Universal/Modal/ConfirmDeleteModal.vue";
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";
import AlertWithClose from "@/Components/Universal/AlertWithClose.vue";
import SelectList from "@/Components/TradePageComponents/SelectList.vue";
import {defaultHaveOptions, defaultWantOptions, TradeCard} from "@/models/TradeCard.js";
import {PokemonList} from "@/models/PokemonList.js";
import AddPokemonTradeOffCanvas from "@/Components/Universal/OffCanvasSearch/AddPokemonTradeOffCanvas.vue";
import wantListCard from "@/Components/Universal/OffCanvasHorizontalCards/WantListCard.vue";
import haveListCard from "@/Components/Universal/OffCanvasHorizontalCards/HaveListCard.vue";
import DualSearchAndDisplay from "@/Components/Universal/OffCanvasSearch/DualSearchAndDisplay.vue";
import SearchAndDisplayView from "@/Components/Universal/OffCanvasSearch/SearchAndDisplayView.vue";
import PokemonTradeImage from "@/Components/TradePageComponents/PokemonTradeImage.vue";

import ToggleButton from "@/Components/TradePageComponents/ToggleButton.vue";
import {FLY_TOGGLE_IMAGE_ARRAY} from "@/models/ImageToggleArrays.js";


export default {
  name: 'TradeCard',
  computed: {
    SearchAndDisplayView() {
      return SearchAndDisplayView
    },
    DualSearchAndDisplay() {
      return DualSearchAndDisplay
    },
    haveListCard() {
      return haveListCard
    },
    wantListCard() {
      return wantListCard
    }
  },
  components: {
    FlyToggle: ToggleButton,
    PokemonTradeImage,
    AddPokemonTradeOffCanvas,
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
      tradeCard: null,
      validation: false,
      warning: false,
    }
  },
  props: {
    pokemonList: {Type: Array, required: true},
    pokemonListApi: {Type: Array, required: true},
    existingTradeCard: {type: TradeCard},
    isNew: {type: Boolean, default: false},
  },
  watch: {
    // existingTradeCard: {
    //   handler: function (newVal) {
    //     if (newVal) {``
    //       this.tradeCard = newVal;
    //     }
    //   },
    //   immediate: true
    // },
    tradeCard: {
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
    FLY_TOGGLE_IMAGE_ARRAY() {
      return FLY_TOGGLE_IMAGE_ARRAY
    },
    defaultHaveOptions() {
      return defaultHaveOptions
    },
    defaultWantOptions() {
      return defaultWantOptions
    },
    manageHaveRemove(pokemon) {
      if (this.pokemonList.items.some(p => p.id === pokemon.id) && this.warning === true) {

        this.warning = false;
      }
      this.tradeCard.removeFromHaveList(pokemon)
      this.returnNewPokemon()

    }
    ,
    addHaveList(pokemon) {

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
        this.tradeCard.removeFromWantedList(pokemon[0])
      } else {
        this.validation = false;
        this.tradeCard.addWantedList(pokemon[0]);
      }

      this.returnNewPokemon();
    }
    ,
    validate() {
      if (!(this.tradeCard.wantList.items.length > 0 && this.tradeCard.haveList.items.length > 0)) {
        this.validation = true
        return false;
      }
      this.validation = false
      return true;
    },
    saveTradeCard() {
      if (!this.validate()) {
        this.validation = true
        return false;
      }
      this.existingTradeCard.saveCardChanges(this.tradeCard.getUnreffedClone());
      this.mode = 0;
    },
    returnNewPokemon() {
      this.pokemonListFiltered = Object.assign(new PokemonList(), this.pokemonList, {
        items: [...this.pokemonList.items]
      });
      for (let pokemonInstance of this.tradeCard.haveList.items) {
        this.pokemonListFiltered.remove(pokemonInstance.id);
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
    } else {
      this.mode = 0
    }

    this.tradeCard = this.existingTradeCard ? this.existingTradeCard.getUnreffedClone() : new TradeCard();
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
    <CardContainer class="ps-1" :custom-title="true">
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
        <div class="d-flex pt-1">
          <fly-toggle style="max-width: 70px" :is-enabled="mode === 1" @emit-value="tradeCard.flyingOrRemote = $event"
                      :image-array="FLY_TOGGLE_IMAGE_ARRAY()" :property="tradeCard.flyingOrRemote"></fly-toggle>
          <h4 v-if="mode===0" class="fs-2 fw-bold pt-0 mb-0 text-capitalize text-start pb-0">
            {{ tradeCard.title }}</h4>
          <label v-if="mode===1" class="form-label">
            Trade Card Title
            <input type="text" v-if="mode===1" style="border-width: 2px !important;"
                   class="fs-5 form-control border-primary bg-light-subtle border-0 border-bottom rounded-0"
                   v-model="tradeCard.title">
          </label>
        </div>
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
            <select-list :options="defaultWantOptions()" :selected-options=" tradeCard.wantOptions">
            </select-list>
          </collapse-area>
        </div>
        <div class="pb-0" id="want">
        </div>
        <p v-if="validation" class="text-danger ms-1 pt-0">Must have one pokémon wanted</p>
        <vue-draggable :disabled="mode !== 1" :delay="100" :delay-on-touch-only="true"
                       :force-fallback="true" draggable=".draggable" v-model="tradeCard.wantList.items"
                       class="row pb-1 row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 p-sm-1 ">

          <div v-if="mode ===1" class=" col col-md-2">
            <div
                class="d-flex horz-card-img img-fluid w-100 text-center align-items-center   justify-content-center border rounded-4 ">


              <add-pokemon-trade-off-canvas
                  @add-pokemon="addWantedList"
                  :card-style="wantListCard"
                  :pokemon-list-to-search="pokemonListApi"
                  :list-to-highlight="tradeCard.wantList.items"
                  :card-container-style="SearchAndDisplayView"
                  :seccondary-pokemon-list-to-search="pokemonListApi"
              ></add-pokemon-trade-off-canvas>

            </div>
            <div class="pb-1">
            </div>

          </div>
          <pokemon-trade-image class="col col-md-2 draggable" :edit-mode="mode === 1"
                               :pokemon-instance="pokemonInstance"
                               v-for="pokemonInstance in tradeCard.wantList.items" :key="pokemonInstance.pokemon.image"
                               @dblclick="mode === 1 ? tradeCard.removeFromWantedList(pokemonInstance) : null"></pokemon-trade-image>


        </vue-draggable>
        <div v-if="mode === 1" class="ms-1 py-2">
          <div class="form-check">
            <input v-model="tradeCard.allowCustomOffers" class="form-check-input" type="checkbox" value=""
                   id="allowCustomOffers">
            <label class="form-check-label" for="allowCustomOffers">
              Allow Custom Pokemon to be offered
            </label>
          </div>
        </div>


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
            <select-list :options="defaultHaveOptions()" :selected-options="tradeCard.haveOptions">
            </select-list>
          </collapse-area>
        </div>
        <div class="pb-0" id="have">
        </div>
        <p v-if="validation" class="text-danger ms-1 pt-0">Must have one offered pokémon </p>
        <vue-draggable :disabled="mode !== 1" :delay="100" :delay-on-touch-only="true"
                       :force-fallback="true" draggable=".draggable" v-model="tradeCard.haveList.items"
                       class="row pb-1 row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 p-sm-1 ">

          <div v-if="mode ===1" class=" col col-md-2">
            <div
                class="d-flex horz-card-img img-fluid w-100 text-center align-items-center   justify-content-center border rounded-4 ">
              <add-pokemon-trade-off-canvas
                  @add-pokemon="addHaveList"
                  :card-style="haveListCard"
                  :pokemon-list-to-search="pokemonList.items"
                  :list-to-highlight="tradeCard.haveList.items"
                  :card-container-style="DualSearchAndDisplay"
                  :secondary-pokemon-list-to-search="pokemonListApi"
              ></add-pokemon-trade-off-canvas>

            </div>
            <div class="pb-1">
            </div>

          </div>
          <pokemon-trade-image class="col col-md-2 draggable" :pokemon-instance="pokemonInstance"
                               v-for="pokemonInstance in tradeCard.haveList.items"
                               :key="pokemonInstance.pokemon.image"
                               :edit-mode="mode === 1"
                               @dblclick="mode === 1 ? manageHaveRemove(pokemonInstance) : null"></pokemon-trade-image>

        </vue-draggable>
        <button v-if="isNew" type="button" class="btn btn-primary w-100 rounded-4" @click="manageAdd(tradeCard)">Save
          New
          Trade Card
        </button>
        <button v-if="!isNew && mode === 1" type="button" class="btn btn-primary w-100 rounded-4"
                @click="saveTradeCard()">Save
          Changes
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