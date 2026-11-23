<script>

import OffCanvasContainer from "@/Components/Universal/OffCanvasContainer.vue";
import PokemonTradeImage from "@/Components/TradePageComponents/PokemonTradeImage.vue";
import {defaultHaveOptions, defaultWantOptions} from "@/models/TradeCard.js";


export default {
  name: "OfferTradeOffCanvas",
  components: {
    PokemonTradeImage,
    OffCanvasContainer,

  },

  data: function () {
    return {
      title: [
        'ADDTITLEFUNCTIONALITY',
        'edit'
      ],
      alterDetails: false
    }
  },


  props: {
    offer: {type: Object, required: true, default: null}
  },
  methods: {
    defaultWantOptions() {
      return defaultWantOptions
    },
    defaultHaveOptions() {
      return defaultHaveOptions
    },
    onlySelected(offer, selectedList) {
      for (const subOption of offer.optionsArray) {
        if (subOption.selected !== offer.optionsArray[0].selected) {
          const valueArray = this.getValueArray(selectedList)
          if (valueArray.includes(subOption.selected)) {
            console.log(offer)
            return true
          }
        }
      }
    },
    getValueArray(list) {
      const valueArray = []
      for (const [key, value] of Object.entries(list)) {
        if (value.selected !== undefined) {
          valueArray.push(value.selected)
        }
      }
      return valueArray
    },
    getVueSelected(option, cardList, selectOption) {
      const optionObject = {}
      console.log(option.option.key)
      console.log(cardList[option.option.key])
      console.log(selectOption)
      if (cardList[option.option.key].selected === selectOption.selected) {
        console.log('this')
        return true;
      }

      return false

    }

  },

}
</script>

<template>
  <div>
    <slot name="openButton">

    </slot>
  </div>

  <teleport to="#app">
    <OffCanvasContainer :title-array="title" ref="OfferTradeOffCanvas">
      <template #pageOne>
        <div v-if="offer" class="container">
          <div>
            <h3 class="pt-2">Receiving Pokemon</h3>
            <div class="row g-2">
              <pokemon-trade-image class="col-3 " v-for="pokemonInstance in offer.haveList"
                                   :pokemon-instance="pokemonInstance"></pokemon-trade-image>
            </div>
            <h3 class="pt-2">Offering Pokemon</h3>
            <div class="row g-2">
              <pokemon-trade-image class="col-3 " v-for="pokemonInstance in offer.wantList"
                                   :pokemon-instance="pokemonInstance"></pokemon-trade-image>
            </div>
          </div>
          <div>
            <h3 class="pt-2">Trade Options</h3>
            <div class="form-check">
              <input v-model="alterDetails" class="form-check-input" type="checkbox" value=""
                     id="flexCheckIndeterminate">
              <label class="form-check-label" for="flexCheckIndeterminate">
                Alter Trade Details
              </label>
            </div>
          </div>
          <div v-for="option in defaultWantOptions()" :key="option.key"
               class="pt-0 pb-0                                                                    4nh">
            <div v-if="onlySelected(option, offer.tradeCard.wantOptions)">
              <label class="form-label w-100">
                {{ option.title }}
                <select :disabled="!alterDetails" class="form-select">
                  <option :selected="getVueSelected({option}, offer.tradeCard.wantOptions, selectOption)"
                          v-for="selectOption in option.optionsArray" value="1">
                    {{ selectOption.selected }}
                  </option>

                </select>
              </label>
            </div>
          </div>
          <div v-for="option in defaultHaveOptions()" :key="option.key" class="pt-0 mt-0">
            <div v-if="onlySelected(option, offer.tradeCard.haveOptions)">
              <label class="form-label w-100">
                {{ option.title }}
                <select :disabled="!alterDetails" class="form-select">
                  <option :selected="getVueSelected({option}, offer.tradeCard.haveOptions, selectOption)"
                          v-for="selectOption in option.optionsArray" value="1">
                    {{ selectOption.selected }}
                  </option>

                </select>
              </label>
            </div>
          </div>
          <div class="sticky-bottom mt-3">
            <button type="button" class="w-100 fs-4 mb-2 btn btn-primary">Send Offer</button>
          </div>
        </div>


      </template>
    </OffCanvasContainer>
  </teleport>
</template>

<style lang="scss" scoped>

</style>