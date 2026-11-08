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
      pokeListApiFiltered: [],
      pokeListFiltered: [],
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
    }
  },

  methods: {

    addHaveList(pokemon) {
      this.tradeCard.addHaveList(pokemon);
      this.returnNewPokemon();
    },
    addWantedList(pokemon) {
      this.validation = false;
      this.tradeCard.addWantedList(pokemon);
      this.returnNewPokemon();
    },
    returnNewPokemon() {
      this.pokeListApiFiltered = this.pokemonListApi.filter(pokemonObject => {
        const wantList = this.tradeCard?.wantList.items ?? [];
        return !wantList.some(p => p.image === pokemonObject.image);
      });
      //
      this.pokeListFiltered = this.pokemonList.items.filter(p => {
            for (const pokemon of this.tradeCard.haveList.items) {
              if (pokemon === p) {
                return false
              }
            }
            return true
          }
      );
      //
      if (this.warning && this.pokeListFiltered.length > 0) {
        this.warning = false
        this.pokeListFiltered = this.pokemonList.items.filter(pokemonObject =>
            this.pokeListFiltered = this.pokemonList.items.filter(pokemonObject => {
              const haveList = [this.tradeCard?.haveList.items ?? []];
              return !haveList.some(p => p.image === pokemonObject.image);
            }))
      }
      //
      if (this.pokeListFiltered.length === 0) {
        this.pokeListFiltered = [...this.pokemonListApi]
        this.warning = true
      }

    },
    manageAdd(cardToAdd) {
      if (cardToAdd.wantList.items.length < 1) {
        this.validation = true
        return false;
      }
      this.$emit('addTradeCard', cardToAdd);
      this.tradeCard = new TradeCard();

    }
  },
  mounted() {
    if (this.isNew) {
      this.mode = 1
    }
    this.returnNewPokemon()
  },

}

</script>

<template>
  <div>
    <div v-if="mode === 1">
      <alert-with-close :dismissible=false @handle-click="" message="Double Click to remove a pokemon"
                        color-class="typedragon">

      </alert-with-close>
    </div>
    <CardContainer :custom-title="true">
      <template v-slot:card-actions>
        <div class="d-flex  py-0  mb-1">
          <i v-show="mode === 0" v-on:click="mode = 1; returnNewPokemon()" class="bi bi-pencil-fill fs-5 mt-1"></i>
          <!--            <i v-show="mode === 1" v-on:click="mode = 0" class="bi bi-eye me-3 fs-5 mt-1"></i>-->
          <div v-if="mode === 1 && pokemonListApi"
          >
          </div>
          <div v-if="mode === 1 && !isNew">
            <confirm-delete-modal @delete-item="$emit('deleteItem', tradeCard)" :item="{name: tradeCard.title}"><i
                class="bi bi-trash-fill fs-3 p-3"></i></confirm-delete-modal>
          </div>

        </div>

      </template>
      <template v-slot:card-header-manuel>
        <h4 v-if="mode===0" class="fs-2 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
          {{ tradeCard.title }}</h4>
        <label v-if="mode===1" class="form-label">
          Trade Card Title
          <input type="text" v-if="mode===1" class="form-control" v-model="tradeCard.title">
        </label>
      </template>
      <template v-slot:card-body>
        <div class="row ">
          <div class="col-10 ps-3 ps-1 ">
            <div class="ms-0 ms-sm-1">
              <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                Wanted</h4>

            </div>
          </div>


          <div class="ms-1" v-if="mode === 0">
            <h4 v-for="option in tradeCard.wantOptions" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class="col-auto badge me-1  ">
              {{ option.selected }}
            </h4>
          </div>
        </div>

        <div class="row ps-0 pt-2 pb-0" v-if="mode === 1">
          <collapse-area teleport-id="want">
            <select-list :options="tradeCard.wantOptions">
            </select-list>
          </collapse-area>
        </div>
        <div class="pb-0" id="want">

        </div>

        <p v-if="validation" class="text-danger ms-1 pt-0">Must have one pokemon wanted</p>
        <vue-draggable draggable=".draggable" v-model="tradeCard.wantList.items"
                       class="row pb-1 row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 g-sm-2 g-md-2 p-sm-1 ">

          <div  v-if="mode ===1" class=" col col-md-2">
            <div class="d-flex horz-card-img img-fluid w-100 text-center align-items-center   justify-content-center border rounded-4 ">

              <!-- AFTER (Fixed) -->
              <add-pokemon-off-canvas @clicked-object-existing="addWantedList"
                                      button="pencil"
                                      v-on:click="returnNewPokemon()"
                                      :pokemon-list-from-api="pokeListApiFiltered"
                                      :card-style="4">
              </add-pokemon-off-canvas>
            </div>

          </div>
          <div class="col col-md-2 draggable" v-for="pokemon in tradeCard.wantList.items">
            <div class="text-center border rounded-4 ">
              <div class="position-relative">
                <image-with-details @dblclick="tradeCard.removeFromWantedList(pokemon)" :no-quantity="true"
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
                   class="mb-0">
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


          <div class="ms-1" v-if="mode === 0">
            <h4 v-for="option in tradeCard.haveOptions" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class="col-auto badge me-1  ">
              {{ option.selected }}
            </h4>
          </div>
        </div>

        <div class="row ps-0 pt-2 pb-1" v-if="mode === 1">
          <collapse-area teleport-id="have">
            <select-list :options="tradeCard.haveOptions">
            </select-list>
          </collapse-area>
        </div>
        <div class="pb-0" id="have">

        </div>

        <div class="row  p-2 py-1 mb-1">


          <vue-draggable class="row row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 g-sm-2 g-md-2 p-sm-1 "
                         draggable=".draggableTwo" v-model="tradeCard.haveList.items">
            <div style="aspect-ratio: 1/1" v-if="mode ===1" class="col col-md-2">
              <div class="d-flex text-center align-items-center h-100  justify-content-center border rounded-4 ">

                <!-- AFTER (Fixed) -->
                <add-pokemon-off-canvas @clicked-object-existing="addHaveList"
                                        button="pencil"
                                        v-on:click="returnNewPokemon()"
                                        :pokemon-list-from-api="pokeListFiltered"
                                        :card-style="4">
                </add-pokemon-off-canvas>
              </div>

            </div>
            <div class="col col-md-2 draggableTwo" v-for="pokemon in tradeCard.haveList.items">
              <div class="text-center border rounded-4 ">
                <div @dblclick="tradeCard.removeFromHaveList(pokemon)" class="position-relative">

                  <image-with-details :noPresetSize="true" :pokemon="pokemon">
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
                     class="mb-0">
                    {{ tag.selected }}
                  </p>
                </div>
              </div>
            </div>
          </vue-draggable>


        </div>

        <button v-if="isNew" type="button" class="btn btn-primary w-100 rounded-4" @click="manageAdd(tradeCard)">Save
          New
          Trade Card
        </button>
        <button v-if="!isNew && mode === 1" type="button" class="btn btn-primary w-125 rounded-4" @click="mode = 0">Save
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