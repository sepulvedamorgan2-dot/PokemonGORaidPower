<script>
import AddPokemonTradeOffCanvas from "@/Components/Universal/OffCanvasSearch/AddPokemonTradeOffCanvas.vue";
import ToggleButton from "@/Components/TradePageComponents/ToggleButton.vue";
import haveListCard from "@/Components/Universal/OffCanvasHorizontalCards/HaveListCard.vue";
import DualSearchAndDisplayView from "@/Components/Universal/OffCanvasSearch/DualSearchAndDisplay.vue";
import SearchAndDisplayView from "@/Components/Universal/OffCanvasSearch/SearchAndDisplayView.vue";
import HorizontalCardContainerTrade from "@/Components/Universal/OffCanvasSearch/HorizontalCardContainerTrade.vue";
import wantListCard from "@/Components/Universal/OffCanvasHorizontalCards/WantListCard.vue";
import TradeCard from "@/Components/TradePageComponents/TradeCard.vue";
import ToggleCard from "@/Components/TradePageComponents/ToggleCard.vue";
import TradePage from "@/Components/TradePageComponents/TradePage.vue";
import {
  FLY_TOGGLE_IMAGE_ARRAY,
  FLY_TOGGLE_IMAGE_DEFAULT, MIRROR_TOGGLE_IMAGE_ARRAY,
  MIRROR_TOGGLE_IMAGE_DEFAULT, TRINKET_TOGGLE_IMAGE_ARRAY,
  TRINKET_TOGGLE_IMAGE_DEFAULT
} from "@/models/ImageToggleArrays.js";

export default {
  name: "FindTradeForm",
  computed: {
    haveListCard() {
      return haveListCard
    },
    DualSearchAndDisplayView() {
      return DualSearchAndDisplayView
    },
    SearchAndDisplayView() {
      return SearchAndDisplayView
    },
    HorizontalCardContainerTrade() {
      return HorizontalCardContainerTrade
    },
    wantListCard() {
      return wantListCard
    }
  },
  components: {
    ToggleButton,
    AddPokemonTradeOffCanvas,

    TradeCard,
    ToggleCard,
    TradePage
  },

  data: function () {

    return {
      wantedSearchList: [],
      haveSearchList: [],
      toggleFilters: {
        canFly: Object.assign({}, FLY_TOGGLE_IMAGE_DEFAULT),
        isMirror: Object.assign({}, MIRROR_TOGGLE_IMAGE_DEFAULT),
        useTrinket: Object.assign({}, TRINKET_TOGGLE_IMAGE_DEFAULT)
      }

    }
  },
  props: {
    pokemonList: {type: Array, required: true},
    pokemonListApi: {type: Array, required: true},
  },

  methods: {
    TRINKET_TOGGLE_IMAGE_ARRAY() {
      return TRINKET_TOGGLE_IMAGE_ARRAY
    },
    MIRROR_TOGGLE_IMAGE_ARRAY() {
      return MIRROR_TOGGLE_IMAGE_ARRAY
    },
    FLY_TOGGLE_IMAGE_ARRAY() {
      return FLY_TOGGLE_IMAGE_ARRAY
    },
    clearSearch() {
      this.wantedSearchList = [];
      this.haveSearchList = [];
      this.toggleFilters = {
        canFly: structuredClone(FLY_TOGGLE_IMAGE_DEFAULT),
        isMirror: structuredClone(MIRROR_TOGGLE_IMAGE_DEFAULT),
        useTrinket: structuredClone(TRINKET_TOGGLE_IMAGE_DEFAULT),
      };
    },
    manageListClick(pokemonInstanceBoolean, list) {


      if (!pokemonInstanceBoolean[1]) {
        if (list.length > 9) {
          alert('You can only search for 10 Pokemon at a time')
          return;
        }
        list.push(pokemonInstanceBoolean[0])
      } else {
        const index = list.findIndex(pokemon => pokemon.pokemon.image === pokemonInstanceBoolean[0].pokemon.image);
        if (index !== -1) {
          list.splice(index, 1);
        }
      }
    },
    findTrade(){

      const searchParams = {
        wantedList: this.wantedSearchList,
        haveList: this.haveSearchList,
        filters: this.toggleFilters
      }
      this.$emit('search', searchParams);
    }
  },

}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-5 mt-3">
      <div class="card ">
        <div class="card-body ">
          <h1>Search Trades</h1>
          <div class="row g-2 g-md-3">
            <div class="col-6 ">
              <add-pokemon-trade-off-canvas :card-container-style="SearchAndDisplayView" :card-style="wantListCard"
                                            @add-pokemon="manageListClick($event, wantedSearchList)"
                                            :list-to-highlight="wantedSearchList"
                                            :pokemon-list-to-search="pokemonListApi">
                <template #actionButton>

                  <div class="ratio ratio-1x1 w-100 rounded-4 border force-hover">
                    <div class="d-flex align-items-center justify-content-center p-2 text-center">
                      <p class="mb-0">Add Pokemon To Receive</p>

                    </div>
                  </div>
                </template>
              </add-pokemon-trade-off-canvas>
            </div>
            <div class="col-6">
              <add-pokemon-trade-off-canvas :card-container-style="DualSearchAndDisplayView"
                                            :card-style="haveListCard"
                                            @add-pokemon="manageListClick($event, haveSearchList)"
                                            :list-to-highlight="haveSearchList"
                                            :secondary-pokemon-list-to-search="pokemonListApi"
                                            :pokemon-list-to-search="pokemonList.items">
                <template #actionButton>

                  <div class="ratio ratio-1x1 w-100 rounded-4 border force-hover">
                    <div class="d-flex align-items-center justify-content-center p-2 text-center">
                      <p class="mb-0">Add Pokemon To Give</p>

                    </div>
                  </div>
                </template>
              </add-pokemon-trade-off-canvas>
            </div>

          </div>
          <h2 class="pt-2">Filter Toggles</h2>
          <div class="row g-0 g-lg-0">
            <div class="col-4">
              <label >
                Flight Info
                <toggle-button
                    @emit-value="toggleFilters.canFly.value = $event"
                    :property="toggleFilters.canFly.value"
                    :image-array="FLY_TOGGLE_IMAGE_ARRAY()"></toggle-button>
              </label>
            </div>
            <div class="col-4">
              <label>
                Mirror Info
                <toggle-button
                    @emit-value="toggleFilters.isMirror.value = $event"
                    :property="toggleFilters.isMirror.value"
                    :image-array="MIRROR_TOGGLE_IMAGE_ARRAY()"></toggle-button>
              </label>
            </div>
            <div class="col-4">
              <label>
                Trinket Info
                <toggle-button @emit-value="toggleFilters.useTrinket.value = $event" :property="toggleFilters.useTrinket.value"
                               :image-array="TRINKET_TOGGLE_IMAGE_ARRAY()"></toggle-button>
              </label>
            </div>
          </div>
          <div class="row g-1 pt-2">
            <div @click="clearSearch()" class="col-6">
              <button class="btn w-100 btn-secondary">
                Clear Search
              </button>
            </div>
            <div class="col-6">
              <button @click="findTrade()" class="btn w-100 btn-primary">
                Find Your Trade
              </button>
            </div>
            <div class="col-12">
              <button @click="findTrade()" class="btn w-100 btn-outline-primary">
                 Browse All Newest Trades
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>