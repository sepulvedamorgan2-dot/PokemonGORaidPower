import AddPokemonOffCanvas from "../offcanvassequence/AddPokemonOffCanvas.js";
import PokemonTagsOffCanvas from "../offcanvassequence/PokemonTagsOffCanvas.js";
import CardContainer from "../CardContainer.js";
import {defaultOptions} from '/styles/Data/DefaultTradeSettings.js'


const TradeCard = {
    name: 'TradeCard',
    computed: {

    },

    components: {
        AddPokemonOffCanvas,
        CardContainer,
        PokemonTagsOffCanvas,

    },

    data: function () {
        return {
            pokeListApiFiltered: [],
            pokeListFiltered: [],
            mode: 0,
            tradeCard: this.existingTradeCard  || {
                title: '',
                haveList: [],
                wantList: [],
                selectedOptions: defaultOptions
            },
            validation: false,

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
        }, returnNewPokemon(allList, listToExclude, listToUpdate) {
            console.log('returning new pokemon');

            const onlyNewPokemon = []
            for (const pokemonObject of allList) {
                if (!listToExclude.map(p => p.image).includes(pokemonObject.image)) {
                    onlyNewPokemon.push(pokemonObject);
                }
            }
            if (listToUpdate) {
                this.pokeListApiFiltered = onlyNewPokemon;
            } else {
                this.pokeListFiltered = onlyNewPokemon;
            }

        }, deleteFromList(pokemon, list) {
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
    },


    template: `
      <CardContainer :card-title="tradeCard.title" >
        <template v-slot:card-actions>
          <div class="d-flex  py-0  mb-1">
            <i v-show="mode === 0" v-on:click="mode = 1" class="bi bi-pencil-fill fs-5 mt-1"></i>
            <i v-show="mode === 1" v-on:click="mode = 0" class="bi bi-eye me-3 fs-5 mt-1"></i>
            <div v-if="mode === 1 && pokemonListApi"  v-on:click="returnNewPokemon(pokemonListApi, tradeCard.wantList, true);">
             
              <add-pokemon-off-canvas @clicked-object-existing="addWantedList"
                                      
                                      button="pencil" :pokemon-list-from-api="pokeListApiFiltered"
                                      :card-style=4></add-pokemon-off-canvas>
              </div>
                
          </div>

        </template>
        <template v-slot:card-body>
          <div class="col-10  ps-1 pb-2">
            <div class="ms-0 ms-sm-1">
              <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                Wanted</h4>

            </div>
          </div>
          <div class="ms-1" v-if="mode === 0">
            <h4 v-for="option in tradeCard.selectedOptions.want" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',
            
            }" class="col-auto badge me-1  ">{{ option.text }}</h4>
          </div>

          <div v-if="tradeCard.selectedOptions.want && mode === 1">
            <div v-if="tradeCard.selectedOptions.want && Object.keys(tradeCard.selectedOptions.want).length > 0">
              <div class="ms-1 d-flex   flex-wrap">
                <label v-for="option in tradeCard.selectedOptions.want" :key="option.title" class="fs-tiny fw-light form-label">
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
            <p v-if="validation" class="text-danger ms-1">Must have one pokemon wanted</p>
          <div class="row  p-2 py-0 mb-1">
            <div class="row row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 g-sm-2 g-md-2 p-sm-1 ">
              <div class="col col-md-2" v-for="pokemon in tradeCard.wantList">
                <div class="text-center border rounded-4 ">
                  <div class="position-relative">
                    <pokemon-tags-off-canvas v-if="mode === 1" :pokemon="pokemon"></pokemon-tags-off-canvas>
                    <img  v-on:dblclick="deleteFromList(pokemon, true)" :class="{'img-fluid w-100': true,
                  'lucky': pokemon.tradeDetails.tags[1].selected === 'Lucky'}"
                         :src="pokemon.image"
                         alt="pokemonImg">
                    <p v-if="pokemon.tradeDetails.tradeQuantity > 1" class="corner-tl-text"> {{ pokemon.tradeDetails.tradeQuantity }}x</p>
                    <img v-if="pokemon.image.includes('.s.')" src="/media/images/shiny.png" alt="Shiny"
                         class="corner-tl-img m-2">
                   
                  </div>
                  <div>
                    <p style="font-size: 14px;" v-for="tag in pokemon.tradeDetails.tags" v-show="tag.selected !== 'None' && tag.selected !=='Lucky'"
                       class="mb-0">
                      {{ tag.selected }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row p-2 py-0 border-top mb-1">
            <div class="col-10 ps-2 ps-sm-2">
              <div class="ms-0 ms-sm-1">
                <h4 class="fs-3 fw-bold pt-2 mb-0 text-capitalize text-start pb-0">
                  For Trade</h4>

              </div>
            </div>
            <div class="col-2 d-flex justify-content-end">

              <div class="d-flex p-sm-2 me-sm-1 mt-sm-1 p-2 pb-0 pb-sm-0">
                <div v-show="mode === 1" v-on:click="returnNewPokemon(pokemonList, tradeCard.haveList, false)">
                  <add-pokemon-off-canvas 
                                          @clicked-object-existing="addHaveList" button="pencil"
                                          :pokemon-list-from-api="pokeListFiltered"
                                          :card-style=4></add-pokemon-off-canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="ms-1" v-if="mode === 0">
            <h4 v-for="option in tradeCard.selectedOptions.have" :class="{
                ['bg-'+option.tagClass]: option.tagClass !== 'd-none',
                'd-none': option.tagClass === 'd-none',
            
            }" class="col-auto badge me-1  ">{{ option.text }}</h4>
          </div>

          <div v-if="tradeCard.selectedOptions.have && mode === 1">
            <div v-if="tradeCard.selectedOptions.have && Object.keys(tradeCard.selectedOptions.have).length > 0">
              <div class="ms-1 d-flex   flex-wrap">
                <label v-for="option in tradeCard.selectedOptions.have" :key="option.title" class="fs-tiny fw-light form-label">
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

          <div class="row  p-2 py-0 mb-1">
            <div class="row row-cols-md-1 mt-0 pt-0 row-cols-4 g-1 g-sm-2 g-md-2 p-sm-1 ">
              <div class="col col-md-2" v-for="pokemon in tradeCard.haveList">
                <div class="text-center border rounded-4 ">
                  <div class="position-relative">
                    <img v-on:dblclick="deleteFromList(pokemon, false)" :class="{'img-fluid w-100': true,
                  'lucky': pokemon.tradeDetails.tags['guaranteed lucky'] === 'Lucky'}"
                         :src="pokemon.image"
                         alt="pokemonImg">
                    <p v-if="pokemon.tradeQuantity > 1" class="corner-tl-text"> {{ pokemon.tradeQuantity }}x</p>
                    <img v-if="pokemon.image.includes('.s.')" src="/media/images/shiny.png" alt="Shiny"
                         class="corner-tl-img m-2">
                    <pokemon-tags-off-canvas v-if="mode === 1" :pokemon="pokemon"></pokemon-tags-off-canvas>
                  </div>
                  <div>
                    <p style="font-size: 14px;" v-for="tag in pokemon.tradeDetails.tags" v-show="tag !== 'None' && tag !=='Lucky'"
                       class="mb-0">
                      {{ tag }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <button v-if="isNew" type="button" class="btn btn-primary" @click="manageAdd(tradeCard)">Add New Trade Card</button>
        </template>
      </CardContainer>

    `,


}

export default TradeCard;