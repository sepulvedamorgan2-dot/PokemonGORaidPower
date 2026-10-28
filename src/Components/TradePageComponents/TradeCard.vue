<script>

import {defaultOptions} from "@/Services/DefaultTradeSettings.js";
import AddPokemonOffCanvas from "@/Components/Universal/OffCanvasSequences/AddPokemonOffCanvas.vue";
import CardContainer from "@/Components/Universal/CardContainer.vue";
import PokemonTagsOffCanvas from "@/Components/Universal/OffCanvasSequences/PokemonTagsOffCanvas.vue";
import CollapseArea from "@/Components/TradePageComponents/CollapseArea.vue";
import ConfirmDeleteModal from "@/Components/Universal/Modal/ConfirmDeleteModal.vue";
import ImageWithDetails from "@/Components/Universal/ImageWithDetails.vue";

export default{
  name: 'TradeCard',
  components: {
    AddPokemonOffCanvas,
    CardContainer,
    PokemonTagsOffCanvas,
    CollapseArea,
    ConfirmDeleteModal,
    ImageWithDetails,

  },
  data: function () {
    return {
      pokeListApiFiltered: [],
      pokeListFiltered: [],
      mode: 0,
      tradeCard: this.existingTradeCard  || {
        title: 'My Trade',
        haveList: [],
        wantList: [],
        selectedOptions: defaultOptions
      },
      validation: false,
      warning: false,

    }
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
        console.log('changed')
        for (const option of this.tradeCard.selectedOptions.want) {
          for (const subOption of option.optionsArray) {
            if (subOption.text === option.text) {
              option.tagClass = subOption.tagClass;
              break;
            }
          }
        }
        for (const option of this.tradeCard.selectedOptions.have) {
          for (const subOption of option.optionsArray) {
            if (subOption.text === option.text) {
              option.tagClass = subOption.tagClass;
              break;
            }
          }
        }
      }, deep: true
    }
  },
  props: {
    pokemonList: {Type: Array, required: true},
    pokemonListApi: {Type: Array, required: true},
    existingTradeCard: {type: Object},
    isNew: {type: Boolean, default: false},
  },
  methods: {
    addHaveList(pokemon) {

      this.tradeCard.haveList.push(pokemon);
      this.returnNewPokemon(this.pokemonListApi, this.tradeCard.haveList, false);
    },
    addWantedList(pokemon) {
      this.validation = false;
      this.tradeCard.wantList.push(pokemon);
      this.returnNewPokemon(this.pokemonListApi, this.tradeCard.wantList, true);
    },
    returnNewPokemon() {

      this.pokeListApiFiltered = this.pokemonListApi.filter(
          pokemonObject => !this.tradeCard.wantList.some(p => p.image === pokemonObject.image)
      );

      // Filter Have List (User Data)
      this.pokeListFiltered = this.pokemonList.filter(
          pokemonObject => !this.tradeCard.haveList.some(p => p.Id === pokemonObject.Id)
      );
      if(this.warning && this.pokeListFiltered.length > 0){
        this.warning = false
        this.pokeListFiltered = this.pokemonList.filter(
            pokemonObject => !this.tradeCard.haveList.some(p => p.Id === pokemonObject.Id)
        );
      }
      if(this.pokeListFiltered.length === 0){
        this.pokeListFiltered = [...this.pokemonListApi]
        this.warning = true
      }

    },
    deleteFromList(pokemon, list) {
      if (this.mode === 1) {
        if (list) {
          const index = this.tradeCard.wantList.indexOf(pokemon);
          if (index > -1) {
            this.tradeCard.wantList.splice(index, 1);
          }
        } else {
          const index = this.tradeCard.haveList.indexOf(pokemon);
          if (index > -1) {
            this.tradeCard.haveList.splice(index, 1);
          }
          this.warning = false
          this.returnNewPokemon()
        }

      }
    }, manageAdd(cardToAdd){
      if(cardToAdd.wantList.length < 1) {
        this.validation = true
        return false;

      }

      this.$emit('addTradeCard', cardToAdd);
      this.tradeCard = {
        haveList: [],
        wantList: [],
        selectedOptions: defaultOptions
      }

    }
  },
  mounted(){
    if(this.isNew){
      this.mode = 1
    }
    this.returnNewPokemon()



  },
}

</script>

<template>
  <CardContainer :custom-title="true">
    <template v-slot:card-actions>
      <div class="d-flex  py-0  mb-1">
        <i v-show="mode === 0" v-on:click="mode = 1; returnNewPokemon()"  class="bi bi-pencil-fill fs-5 mt-1"></i>
        <!--            <i v-show="mode === 1" v-on:click="mode = 0" class="bi bi-eye me-3 fs-5 mt-1"></i>-->
        <div v-if="mode === 1 && pokemonListApi"
        >

        </div>
        <div v-if="mode === 1 && !isNew">
          <confirm-delete-modal @delete-item="$emit('deleteItem', tradeCard)" :item="{name: tradeCard.title}"><i class="bi bi-trash-fill fs-3 p-3"></i></confirm-delete-modal>
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
        <div class="col-10 ps-3 ps-1 pb-2">
          <div class="ms-0 ms-sm-1">
            <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
              Wanted</h4>

          </div>
        </div>
        <div class="col-2 "  v-if="mode ===1">
          <!-- AFTER (Fixed) -->
          <add-pokemon-off-canvas @clicked-object-existing="addWantedList"
                                  button="pencil"
                                  v-on:click="returnNewPokemon()"
                                  :pokemon-list-from-api="pokeListApiFiltered"
                                  :card-style="4">
          </add-pokemon-off-canvas>
        </div>

        <div class="ms-1" v-if="mode === 0">
          <h4 v-for="option in tradeCard.selectedOptions.want" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class="col-auto badge me-1  ">
            {{ option.text }}
          </h4>
        </div>
      </div>

      <div v-if="mode === 1">
        <collapse-area teleport-id="want">
          <div class="pt-2" v-if="tradeCard.selectedOptions.want">
            <div v-if="tradeCard.selectedOptions.want && Object.keys(tradeCard.selectedOptions.want).length > 0">
              <div class="ms-1 d-flex   flex-wrap">
                <label v-for="option in tradeCard.selectedOptions.want" :key="option.title"
                       class="fs-tiny fw-light form-label">
                  {{ option.title }}
                  <select style="text-indent: -1px; border-width: 1.5px" :class="{
                    'form-select  w-auto px-3 rounded-pill me-2 ': true,
                    ['border-'+option.tagClass]: option.tagClass !== 'd-none',
                'btn-outline border-dark': option.tagClass === 'd-none',
                }" v-model="option.text" :key="option.title">
                    <option v-for="subOption in option.optionsArray" :value="subOption.text">{{ subOption.text }}
                    </option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </collapse-area>
      </div>
      <div class="pb-2" id="want">

      </div>

      <p v-if="validation" class="text-danger ms-1 pt-2">Must have one pokemon wanted</p>
      <div style="height: 120px" class="w-100 text-center align-content-center" v-if="tradeCard.wantList.length < 1">
        <p>No Wanted Pokemon Added</p>

      </div>
      <div class="row  p-2 py-0 mb-1">
        <div class="row row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 g-sm-2 g-md-2 p-sm-1 ">
          <div class="col col-md-2" v-for="pokemon in tradeCard.wantList">
            <div class="text-center border rounded-4 ">
              <div class="position-relative">

                <image-with-details :no-quantity="true" :noPresetSize="true" :pokemon="pokemon">
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
        </div>
      </div>

      <div class="row  border-top ">
        <div class="col-10 ps-3 ps-1 pb-2">
          <div class="ms-0 ms-sm-1">
            <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
              For Trade</h4>

          </div>
        </div>
        <div class="col-2" v-if="mode ===1">
          <add-pokemon-off-canvas @clicked-object-existing="addHaveList"
                                  :warning="warning"
                                  button="pencil" :pokemon-list-from-api="pokeListFiltered"
                                  :card-style=5 ></add-pokemon-off-canvas>
        </div>

        <div class="ms-1" v-if="mode === 0">
          <h4 v-for="option in tradeCard.selectedOptions.have" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',}" class="col-auto badge me-1  ">
            {{ option.text }}
          </h4>
        </div>
      </div>

      <div v-if="mode === 1">
        <collapse-area teleport-id="have">
          <div class="pt-2" v-if="tradeCard.selectedOptions.have">
            <div v-if="tradeCard.selectedOptions.have && Object.keys(tradeCard.selectedOptions.have).length > 0">
              <div class="ms-1 d-flex   flex-wrap">
                <label v-for="option in tradeCard.selectedOptions.have" :key="option.title"
                       class="fs-tiny fw-light form-label">
                  {{ option.title }}
                  <select style="text-indent: -1px; border-width: 1.5px" :class="{
                    'form-select  w-auto px-4 rounded-pill me-2 ': true,
                    ['border-'+option.tagClass]: option.tagClass !== 'd-none',
                'btn-outline border-dark': option.tagClass === 'd-none',
                }" v-model="option.text" :key="option.title">
                    <option v-for="subOption in option.optionsArray" :value="subOption.text">{{ subOption.text }}
                    </option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </collapse-area>
      </div>
      <div class="pb-2" id="have">

      </div>
      <div style="height: 120px" class="w-100 text-center align-content-center" v-if="tradeCard.haveList.length < 1">
        <p>No Pokemon For Trade Listed</p>

      </div>

      <div class="row  p-2 py-0 mb-1">
        <div class="row row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 g-sm-2 g-md-2 p-sm-1 ">
          <div class="col col-md-2" v-for="pokemon in tradeCard.haveList">
            <div class="text-center border rounded-4 ">
              <div class="position-relative">

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
        </div>
      </div>
      <button v-if="isNew" type="button" class="btn btn-primary w-100" @click="manageAdd(tradeCard)">Save New Trade Card
      </button>
      <button v-if="!isNew && mode === 1" type="button" class="btn btn-primary w-100" @click="mode = 0">Save Trade Card
      </button>
    </template>
  </CardContainer>

</template>

<style scoped>

</style>